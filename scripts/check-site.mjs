import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
const companionAsset = '/assets/b9/b9-companion.c96958b2dcbd.js';
const companionSha256 = 'c96958b2dcbd8ead556a7241aef09153673dddcd13153a599be360bb6cbfac03';
function attributesOf(tag) {
  const attributes = new Map();
  const contents = tag.replace(/^<[\w-]+/, '').replace(/\/?>$/, '');
  for (const match of contents.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attributes;
}
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file); else files.push(file);
  }
}
await walk(root);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const expected = ['index.html', 'resume/index.html', 'work/skeet-tracker/index.html', 'work/embedded-workforce/index.html', 'work/security-automation/index.html', 'work/riker-bot/index.html', '404.html'];
for (const entry of expected) assert.ok(files.includes(path.join(root, entry)), `Missing page: ${entry}`);
const pages = new Map();
for (const file of htmlFiles) pages.set(file, await readFile(file, 'utf8'));
let linkCount = 0;
for (const [file, html] of pages) {
  const label = path.relative(root, file);
  const companions = [...html.matchAll(/<b9-companion\b[^>]*>/gi)];
  const remotes = [...html.matchAll(/<b9-remote\b[^>]*>/gi)];
  assert.equal(companions.length, 1, `Expected one B-9 companion: ${label}`);
  assert.equal(remotes.length, 1, `Expected one B-9 remote: ${label}`);
  const companion = attributesOf(companions[0][0]);
  const remote = attributesOf(remotes[0][0]);
  assert.equal(companion.get('id'), 'site-robot', `Unexpected B-9 ID: ${label}`);
  assert.equal(companion.get('size'), '220', `Unexpected B-9 size: ${label}`);
  assert.ok(companion.has('hidden'), `B-9 must start hidden: ${label}`);
  assert.ok(!companion.has('parked') && !companion.has('autostart'), `B-9 must wait for an invitation: ${label}`);
  assert.equal(remote.get('for'), companion.get('id'), `B-9 remote target mismatch: ${label}`);
  const companionScripts = [...html.matchAll(/<script\b[^>]*>/gi)]
    .map(match => attributesOf(match[0]))
    .filter(attributes => /\/b9-companion[.-]/.test(attributes.get('src') ?? ''));
  assert.equal(companionScripts.length, 1, `Expected one B-9 script: ${label}`);
  assert.equal(companionScripts[0].get('src'), companionAsset, `Unexpected B-9 asset: ${label}`);
  assert.ok(companionScripts[0].has('defer'), `B-9 script must be deferred: ${label}`);
  assert.match(html, /<html[^>]+lang="en"/, `Missing language: ${label}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one H1: ${label}`);
  for (const marker of ['name="description"', 'property="og:title"', 'property="og:description"', 'name="viewport"', 'id="main"']) {
    assert.ok(html.includes(marker), `Missing ${marker}: ${label}`);
  }
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(image[0], /alt="[^"]+"/, `Missing image alt: ${label}`);
    assert.match(image[0], /width="\d+"/, `Missing image width: ${label}`);
    assert.match(image[0], /height="\d+"/, `Missing image height: ${label}`);
  }
  assert.ok(!html.includes('href="https://github.com/"'), `Generic GitHub link: ${label}`);
  assert.ok(!html.includes('617-602-2160'), `Phone leaked into HTML: ${label}`);
  assert.ok(!html.includes('Raleigh, NC'), `Address leaked into HTML: ${label}`);
  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1]);
  for (const set of html.matchAll(/srcset="([^"]+)"/g)) references.push(...set[1].split(',').map(item => item.trim().split(/\s+/)[0]));
  const base = 'https://local.invalid/' + label.replace(/index\.html$/, '');
  for (const ref of references) {
    if (/^(https?:|mailto:|data:|tel:)/.test(ref)) continue;
    const url = new URL(ref, base);
    const pathname = decodeURIComponent(url.pathname);
    let target = path.join(root, pathname);
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    assert.ok(target.startsWith(root + path.sep), `Reference outside output: ${ref}`);
    const info = await stat(target).catch(() => null);
    assert.ok(info?.isFile(), `Broken reference in ${label}: ${ref}`);
    if (url.hash && target.endsWith('.html')) {
      const contents = pages.get(target) ?? await readFile(target, 'utf8');
      assert.ok(contents.includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${ref} in ${label}`);
    }
    linkCount++;
  }
}
const companionBundle = await readFile(path.join(root, companionAsset));
assert.equal(createHash('sha256').update(companionBundle).digest('hex'), companionSha256, 'B-9 bundle differs from the verified revision 14 release');
for (const credit of ['AUDIO-CREDITS.md', 'THREE-LICENSE.txt']) {
  const contents = await readFile(path.join(root, 'assets/b9', credit), 'utf8');
  assert.ok(contents.trim().length > 0, `Missing B-9 attribution: ${credit}`);
}
const deck = await readFile(path.join(root, 'downloads/embedded-workforce-platform-integration.pptx'));
assert.equal(deck.subarray(0, 2).toString(), 'PK', 'Presentation is not a ZIP-based Office file');
const pdf = await readFile(path.join(root, 'downloads/james-delosh-resume.pdf'));
assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', 'Resume is not a PDF');
console.log(`PASS: ${htmlFiles.length} HTML pages, ${linkCount} local references, page metadata, accessible image labels, homepage privacy, both downloads, and the B-9 integration, bundle integrity, and credits.`);
