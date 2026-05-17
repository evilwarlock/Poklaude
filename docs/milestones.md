# Milestones

## V0: Static visualization MVP

Status: in progress / mostly done

Goal: make a lightweight, shareable version of the drill experience.

Scope:

- Static Next.js app
- GitHub Pages deployment
- Seeded 20bb RFI drill questions
- Raise/Fold answers
- Mobile-first drill UI
- Local attempt tracking
- Results page with accuracy and weak spots
- Greyed-out unsupported options

Success criteria:

- User can open the public GitHub Pages URL.
- User can start training without login.
- User can answer drills and get feedback.
- User can see basic weak spot summary.
- Unsupported future options are visible but disabled.

## V1: Manual range trainer

Goal: let users create or edit their own 20bb RFI range without needing image parsing.

Scope:

- 13x13 editable hand grid
- Save one or more ranges locally first
- Generate drills from the edited grid
- Borderline weighting based on grid adjacency and frequency
- Better hand-class analysis

Success criteria:

- User can manually enter a 20bb RFI range.
- App generates drills from that range instead of hardcoded seed questions.
- Weakness report groups mistakes by hand class and boundary type.

## V1.5: Range image upload with manual confirmation

Goal: upload a chart image, parse what we can, then let user confirm/fix the grid.

Scope:

- Upload range chart image
- Store original image
- AI or OCR parser extracts candidate hand matrix
- Editable 13x13 grid for correction
- Save confirmed range

Success criteria:

- User can upload a chart and get an editable parsed range.
- Parser does not need to be perfect because manual correction is part of the flow.
- Confirmed range can power drills.

## V2: Persistence and user accounts

Goal: move from static demo to real web app.

Likely stack:

- Vercel for app hosting
- Supabase Auth
- Supabase Postgres
- Supabase Storage

Scope:

- User login
- Saved ranges across devices
- Saved drill attempts
- Database-backed weakness stats
- Multiple range spots per user

Success criteria:

- User can log in and see their saved ranges and history.
- Attempts are persisted beyond the browser.
- Weakness stats update from real database rows.

## V3: More range types and stack depths

Goal: expand beyond 20bb RFI.

Scope:

- More stack depths: 10bb, 15bb, 30bb, 40bb, 60bb+
- More scenarios: BB Defense, vs RFI, vs 3-Bet, Push/Fold
- More action types: Call, All-In, Mixed
- Position-specific chart library

Success criteria:

- UI availability config is backed by real supported range configs.
- Drill generator can handle scenario-specific action sets.
- Weakness reports compare across scenario, position, and stack.

## V4: Course and explanation layer

Goal: connect drills to learning material.

Scope:

- Course/video notes ingestion
- Retrieval by spot, hand class, and mistake type
- Explanation snippets for why the target action is correct
- Study plan based on repeated leaks

Success criteria:

- User mistakes can be linked to relevant explanation material.
- App can recommend focused study blocks.

## V5: Full adaptive poker study assistant

Goal: become an MTT preflop and strategy training assistant.

Possible scope:

- Hand history import
- Final table and ICM tags
- Pool deviation notes
- Custom training plans
- Postflop expansion later

This should wait until the preflop drill loop is clearly useful.
