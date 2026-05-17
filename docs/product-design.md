# Product Design

## Goal

Build a poker MTT preflop drill trainer that turns range knowledge into repeated practice. The long-term loop is:

```text
Range image -> parsed range -> drill generation -> user answers -> weakness analysis -> targeted drills
```

## MVP focus

Start with the smallest useful product:

- 20bb only
- RFI only
- Raise/Fold actions only
- Static seeded drill data
- Mobile-first visualization
- Local browser progress tracking

This keeps the first version focused on interaction quality instead of backend complexity.

## User flow

### Static MVP flow

1. User opens the GitHub Pages app.
2. User sees the training setup screen.
3. Unsupported future options are visible but greyed out.
4. User starts a 20bb RFI session.
5. App presents a hand and asks Raise or Fold.
6. User answers.
7. App shows correctness, target action, frequency, EV, and explanation.
8. App records attempt locally.
9. Results page summarizes accuracy and weak spots.
10. Continue Training uses previous mistakes and boundary scores to prioritize next drills.

### Future dynamic flow

1. User uploads a range chart image.
2. App detects chart metadata: spot type, position, stack depth, actions.
3. App renders an editable 13x13 grid.
4. User confirms or fixes the parsed range.
5. App saves the source range.
6. Drill generator creates weighted hands, emphasizing borderline spots.
7. User answers drills.
8. Weakness analyzer groups mistakes by spot, position, stack, hand class, and boundary type.
9. Next session is biased toward weak spots.

## Supported options policy

The UI should show the full future shape but disable unsupported options. This makes the product roadmap visible without letting users enter unsupported states.

Current availability:

| Section | Available now | Disabled for now |
| --- | --- | --- |
| Scenario | RFI | BB Defense, vs RFI, vs 3-Bet |
| Stack Depth | 20bb | 10bb, 15bb, 32bb, 40bb, 60bb, 100bb |
| Hero Position | UTG, UTG+1, UTG+2, LJ, HJ, CO, BTN, SB | BB for RFI |
| Villain Position | Not relevant for RFI | Any villain-specific choice |
| Actions | Raise, Fold | Call, All-In, Mixed frequencies |

## Drill quality principles

Do not over-sample obvious hands.

Bad drill examples:

- AA UTG 20bb RFI: Raise or Fold?
- 72o UTG 20bb RFI: Raise or Fold?

Useful drill examples:

- A5s vs A4s at the bottom of suited ace opens
- 55 vs 44 around small-pair threshold
- K8s vs K7s around suited king threshold
- QTo vs Q9o around offsuit broadway threshold

## Adaptive weighting

Each candidate hand can receive a score:

```text
weight = base_weight + borderline_bonus + mistake_bonus
```

Where:

- `base_weight`: keeps every supported hand eligible
- `borderline_bonus`: increases hands near range boundaries
- `mistake_bonus`: increases hands the user has recently missed

The current static MVP approximates this by sorting candidates by past mistakes and `boundaryScore`.

## Weakness categories

Useful weakness dimensions:

- Scenario: RFI, BB Defense, vs RFI, vs 3-Bet
- Stack: 20bb, 30bb, 40bb, etc.
- Hero position: UTG, HJ, CO, BTN, SB, BB
- Hand class: pocket pair, suited ace, suited king, offsuit broadway, suited connector
- Boundary class: bottom of open range, top of fold range, mixed-frequency edge
- Mistake direction: overfold, overraise, overcall, overjam

## Non-goals for current MVP

Do not build these yet:

- Video understanding
- Solver integration
- Full hand history review
- Paid account system
- Upload parsing pipeline
- Supabase persistence
- GTO explanation retrieval from course/video content

Those become valuable after the static trainer loop feels good.
