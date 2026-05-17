# Poklaude Docs

Poklaude is a lightweight poker preflop drill trainer. The product direction is to start with a static 20bb RFI trainer, then grow into an adaptive range-image-to-drill web app.

## Current MVP

The current app is intentionally static:

- Next.js client app
- Seeded drill data in code
- Browser `localStorage` for attempts and weak spots
- Static export deployed through GitHub Pages
- No backend, auth, database, or AI image parser yet

Live static visualization target:

```text
https://evilwarlock.github.io/Poklaude/
```

## Docs index

- [Product Design](./product-design.md)
- [Architecture](./architecture.md)
- [Data Model](./data-model.md)
- [Milestones](./milestones.md)
- [Progress Log](./progress-log.md)

## Product thesis

Upload or select a preflop range, convert it into adaptive drills, identify weak hand classes or boundary spots, then generate the next drill session toward those weak spots.

For the first static MVP, the thesis is simplified to:

> Can a player practice useful 20bb RFI boundary spots in a fast mobile-first UI?
