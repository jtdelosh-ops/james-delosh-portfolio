# B-9 companion integration

The shared page layout includes the compact **Meet B-9** launcher on every
page. The robot starts hidden, silent and still. Visitors can invite him in,
move him or the remote, pause motion, enable sound, or hide him again.
The components respect reduced-motion preferences and are hidden for printing.

## Source

The vendored bundle is revision 14 from
[jtdelosh-ops/b9-web-companion](https://github.com/jtdelosh-ops/b9-web-companion),
commit `421cbc4aa5c723f087a2065aa88a142f525fe867`.

- Source artifact: `dist/b9-companion.js`
- Local artifact: `public/assets/b9/b9-companion.c96958b2dcbd.js`
- SHA-256: `c96958b2dcbd8ead556a7241aef09153673dddcd13153a599be360bb6cbfac03`
- Integration: `src/components/B9Companion.astro`, included by `Layout.astro`

The source artifact is copied without modification. It includes the SVG
artwork, optional Three.js renderer and three original television recordings.
The source repository retains the full demo, component tests and visual checks.
[Audio credits](../public/assets/b9/AUDIO-CREDITS.md) and the
[Three.js license](../public/assets/b9/THREE-LICENSE.txt) accompany the bundle.

## Updating

Build and test the companion in its source repository. Copy the new bundle
into `public/assets/b9/` with the first 12 characters of its SHA-256 in the
filename. Update the component script path, cache path in `public/_headers`,
expected hash in `check-site.mjs`, and provenance above. The filename changes because the bundle is cached as
immutable. Keep the hidden/muted startup and update the license/credits if needed.

Build with `SITE_URL=https://jamesdelosh.com`, run `pnpm check:site`, and check
the launcher, greeting, dismissal, navigation, small-screen layout and résumé
printing before publishing through the existing GitHub/Cloudflare workflow.
