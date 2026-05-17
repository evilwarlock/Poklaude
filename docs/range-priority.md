# Range Build Priority

This document ranks which preflop range modules we should build and upload first.

The guiding principle is:

```text
Prioritize spots that are high frequency, high EV impact, and easy to turn into clean drills.
```

## Summary recommendation

The first major training focus should be **20bb steal and resteal**, but split into clean product modules:

```text
Steal = RFI from CO / BTN / SB
Resteal = Facing Open from BTN / SB / BB
```

For implementation, build steal first, then all-in call-off spots, then resteal.

## Priority ranking

| Rank | Module | Why it matters | Early drill actions |
| --- | --- | --- | --- |
| 1 | 20bb RFI / steal | Very frequent, easy to drill, foundational for all later modules | Raise / Fold |
| 2 | 20bb Facing OpenJam | Expensive mistakes; common around 20bb and below | Call / Fold |
| 3 | 20bb Facing Open / resteal | Core MTT pressure spot; major chip EV impact | Jam / Fold first, then Call / Jam / Fold |
| 4 | 20bb Facing 3B Jam | Natural follow-up after RFI; open/call-off mistakes are costly | Call / Fold |
| 5 | 15bb RFI + Facing OpenJam | Similar decisions become more all-in heavy | Raise/Fold, Call/Fold |
| 6 | 25bb or 30bb RFI | Good bridge to deeper-stack preflop, but less urgent than 20bb | Raise / Fold |
| 7 | Squeeze / Facing Squeeze | Valuable but lower frequency and more conditional | Jam/Fold or Call/Jam/Fold |
| 8 | Facing 3B | Important but more mixed and postflop-realization dependent | Call / 4B / Fold later |
| 9 | Facing 4B | Lower frequency, more advanced branch | Call / Jam / Fold later |
| 10 | Squeeze 3Way+ | Useful but highest complexity and lowest MVP priority | Later |

## Priority 1: 20bb RFI / steal

Start here.

Best positions to upload and support first:

```text
CO / BTN / SB
```

Then add:

```text
HJ / UTG1 / UTG
```

Why:

- These spots happen constantly.
- They are clean binary drills: Raise or Fold.
- They validate the current app structure.
- They create a foundation for later Facing 3B Jam and resteal modules.

Example drills:

```text
20bb BTN RFI: K7s raise or fold?
20bb CO RFI: Q9s raise or fold?
20bb SB RFI: J7o raise or fold?
```

## Priority 2: 20bb Facing OpenJam

This should come soon after 20bb RFI.

Meaning:

```text
Someone jams before hero. Should hero call or fold?
```

Why:

- Calling mistakes are very expensive.
- At 20bb and below, open jams happen frequently in MTTs.
- The drill action is still simple: Call or Fold.

Required metadata:

```text
Hero position
Villain position
Effective stack
Jam size
```

Example drills:

```text
20bb BTN facing HJ open jam: A9o call or fold?
20bb BB facing SB jam: K8s call or fold?
20bb CO facing UTG jam: 77 call or fold?
```

## Priority 3: 20bb Facing Open / resteal

This is the classic resteal module.

Meaning:

```text
Villain opens. Hero decides whether to jam, call, or fold.
```

For the first version, simplify to:

```text
Jam / Fold
```

Later expand to:

```text
Call / Jam / Fold
```

Best first spots:

```text
BTN vs CO open
SB vs BTN open
BB vs BTN open
BB vs SB open
CO vs HJ open
```

Why:

- Very important for MTT chip accumulation.
- More complex than pure RFI because villain position and open size matter.
- Still very drillable if we start with jam/fold decisions.

## Priority 4: 20bb Facing 3B Jam

Meaning:

```text
Hero opens, villain jams, hero decides call or fold.
```

Why:

- This connects naturally after RFI.
- Open/call-off mistakes are high EV mistakes.
- The action can remain simple: Call/Fold.

Example drills:

```text
20bb CO opens, BTN jams, hero has AJo: call or fold?
20bb BTN opens, SB jams, hero has KTs: call or fold?
```

## Lower priority modules

### Squeeze / Facing Squeeze

Useful, but should wait until basic steal/resteal modules work.

Reasons:

- Needs opener position and caller position.
- Needs squeeze position.
- Needs effective stack and sizing assumptions.
- More conditional than RFI or jam/call-off.

### Facing 3B / Facing 4B

Important but not ideal for early MVP.

Reasons:

- Often has more than two valid actions.
- Can include mixed frequencies.
- More dependent on postflop realization, sizing, and position.

### Squeeze 3Way+

Highest complexity. Save this for much later.

## Upload order for range images

When uploading images, use this order:

1. 20bb RFI: BTN
2. 20bb RFI: CO
3. 20bb RFI: SB
4. 20bb RFI: HJ
5. 20bb RFI: UTG1
6. 20bb RFI: UTG
7. 20bb Facing OpenJam: BB vs SB
8. 20bb Facing OpenJam: BTN vs HJ/CO
9. 20bb Facing Open: SB vs BTN
10. 20bb Facing Open: BB vs BTN
11. 20bb Facing 3B Jam: BTN open vs blind jam
12. 20bb Facing 3B Jam: CO open vs BTN/blind jam

## Product build implication

The UI should keep unsupported modules visible but disabled. The next enabled modules should likely be:

```text
V0/V1: RFI 20bb
V2: Facing OpenJam 20bb
V3: Facing Open 20bb
V4: Facing 3B Jam 20bb
```

Do not expand stack depths too early. Finish the 20bb module family first, then add 15bb and 25bb/30bb.
