# Content and asset sources

Reviewed September 10, 2026. The original inputs remain outside this separate site project.

- **Positioning and visual system:** user’s portfolio build request and the referenced “Build Professional Portfolio” conversation. Public title is Senior Solutions Architect; the résumé and Remote experience use the formal role.
- **Résumé:** uploaded `resume.pdf` attached to the referenced conversation. Copied unchanged into `public/downloads/james-delosh-resume.pdf`. HTML experience is distilled from this file, with original role dates. No inferred employment dates were added.
- **Skeet Tracker screenshot:** uploaded `image.png`. Optimized crop removes empty side margins and limits the homepage view to the product header, averages, and first history rows. This is the actual supplied screenshot, not a mockup. The original screenshot was preserved.
- **Skeet photo:** uploaded `IMG_9013.jpeg`, 510 × 680, retained at its native dimensions as WebP. The page preserves the portrait composition and rain rather than cropping to a landscape template.
- **Scuba photo:** uploaded `IMG_1365.jpeg`, showing James’s 100th dive. Resized to 1440 × 1080 with a 700px variant and no color filter.
- **Architecture deck:** `Embedded Workforce Platform Integration - Polished.pptx` from the preceding polished-presentation task. Included unchanged. The five diagrams use its previously verified final renders: slides 2 (Principles), 4 (Reference Architecture), 6 (Onboarding Sequence), 10 (Event-Driven Status Updates), and 15 (Why This Design). No original unsanitized presentation is included.
- **Architecture claims:** summarized from the polished presentation’s slides and the explicit assumptions appendix. Employment state remains provider-authoritative; local storage tracks integration state and mappings. Fictional providers, endpoints, and delivery semantics are never described as production guarantees.
- **Skeet Tracker implementation:** [public README](https://github.com/jtdelosh-ops/Skeet-Tracker/blob/main/README.md), file revision `cfc3e0e5a5f6c91bde3823e38f70553ea9029b8b`. No unverified multi-user authentication, adoption metrics, or business outcomes are claimed. The homepage live URL is the user-provided `https://sk33t.net`.
- **Riker implementation:** [bot.py](https://github.com/jtdelosh-ops/RikerBot/blob/main/bot.py), file revision `7e7c510c9084eae0e93a020041f85feeff0b286c`. Verified timezone/DST behavior, quiet hours, scheduling channel allow-list, persistent quote history, slash commands, optional Responses API integration, per-user advice cooldown, status/permission diagnostics, shared send path, and scheduled static-quote fallback.
- **Riker discrepancy resolved in favor of code:** `test_auto` is currently open to users with a guild-wide one-minute cooldown, despite the older README’s administrator-only language. Static-quote fallback applies to spontaneous generated remarks; advice reports disabled AI or returns its own error fallback. Quote deduplication falls back to the full library when all available quotes are recent. Advice cooldown is in-memory, not durable.
- **Links:** LinkedIn and GitHub profile from the user request; email from the uploaded résumé. No generic GitHub homepage link.

Natural-language project narratives synthesize the supplied brief and these sources. They make no claims about production scale, adoption, revenue, or measured impact beyond the source evidence.

## Security Workflow Automation addition

Based on the supplied Identity and Phishing workflow notes and JSON exports reviewed through Drive, plus user-provided sandbox/trial interview context. Built in n8n for a Torq interview, not represented as a Torq implementation. Ticket creation and phishing quarantine are simulated field-setting steps. Identity risk branching uses the supplied risk score; GeoIP enriches context. No production performance claims are made.

Three WebP screenshots come from the supplied local n8n Demo.mp4 at 00:00, 04:30, and 09:00. Only focused screenshots are included; raw workflow exports and full recording are not copied into the website. Video link supplied by James: https://www.youtube.com/watch?v=fR2BJcEP8eI (9:37). Original video and screenshot source files remain untouched.

Hero portrait: Delosh_James-SM__9617.jpg from the user-supplied previews-selected.zip, selected explicitly by James. Optimized to WebP; square framing uses CSS object-fit with no retouching. Original ZIP remains unchanged.
