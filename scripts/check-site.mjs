import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve('dist');
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
const deck = await readFile(path.join(root, 'downloads/embedded-workforce-platform-integration.pptx'));
assert.equal(deck.subarray(0, 2).toString(), 'PK', 'Presentation is not a ZIP-based Office file');
const pdf = await readFile(path.join(root, 'downloads/james-delosh-resume.pdf'));
assert.equal(pdf.subarray(0, 5).toString(), '%PDF-', 'Resume is not a PDF');
console.log(`PASS: ${htmlFiles.length} HTML pages, ${linkCount} local references, page metadata, accessible image labels, homepage privacy, and both downloads.`);
