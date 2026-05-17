# Progress Log

## What we have done

### 1. Defined the MVP direction

We decided to start with a smaller product instead of a full poker AI agent:

```text
Range knowledge -> drills -> answer tracking -> weak spot analysis -> targeted drills
```

The first version focuses on preflop RFI drilling.

### 2. Chose the first supported scope

Current supported MVP scope:

- Scenario: RFI only
- Stack: 20bb only
- Actions: Raise/Fold only
- Data: seeded static drill questions
- Storage: local browser storage
- Hosting: GitHub Pages

### 3. Built the local drill MVP

Implemented:

- Setup page with filters
- Close Spots Only toggle
- Poker table drill screen
- Raise/Fold action buttons
- Feedback panel with correctness, EV, frequency, and explanation
- Results screen with accuracy, mistakes, and weak spots
- Local storage for attempts

### 4. Greyed out unavailable options

Added availability metadata and disabled UI states:

- RFI is available
- Non-RFI scenarios are greyed out
- 20bb is available
- Other stack depths are greyed out
- BB is greyed out as a hero RFI position
- Villain position choices are visible but disabled for RFI MVP

PR:

```text
#1 Grey out unsupported MVP filter options
```

### 5. Added GitHub Pages static deployment

Configured the app as a static Next.js export and added a GitHub Pages workflow.

PR:

```text
#2 Deploy static MVP to GitHub Pages
```

### 6. Fixed build issue due to missing lockfile

The first Pages workflow used npm cache and `npm ci`, but the repo did not have a lockfile. The build failed with a lockfile error.

Fix:

- Removed npm cache config from setup-node
- Changed `npm ci` to `npm install`

PR:

```text
#3 Fix GitHub Pages install step without lockfile
```

### 7. Enabled GitHub Pages deployment

GitHub Pages deployment initially failed with a 404 from `actions/deploy-pages`. The issue was repository settings: Pages needed to be enabled with source set to GitHub Actions.

After enabling Pages, the deployment worked.

## Current status

The static MVP is deployable and working through GitHub Pages.

Current known limitations:

- No uploaded ranges yet
- No editable 13x13 grid yet
- No backend persistence
- No Supabase integration
- No AI image parsing
- No lockfile committed yet

## Immediate next steps

Recommended next order:

1. Commit a lockfile and switch workflow back to `npm ci`.
2. Add a visible app link to `README.md`.
3. Add a manual 13x13 range editor.
4. Generate drills from the edited grid instead of hardcoded seed questions.
5. Add better weakness categories: suited ace, small pair, offsuit broadway, suited connector.
6. Add range image upload and manual confirmation later.
