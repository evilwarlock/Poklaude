# Static Range Data

This folder is the temporary static range store for the GitHub Pages MVP.

The app does not consume these files yet. They are here so we can start organizing real chart data before adding upload/parsing/database support.

## Folder convention

```text
data/ranges/{stack}bb-{spot}-{position}.json
```

Examples:

```text
data/ranges/20bb-rfi-btn.json
data/ranges/20bb-rfi-co.json
data/ranges/20bb-rfi-sb.json
```

## JSON shape

Each file stores one range spot:

```json
{
  "id": "20bb-rfi-btn",
  "title": "20bb BTN RFI",
  "spotType": "RFI",
  "position": "BTN",
  "stackDepthBb": 20,
  "actions": ["raise", "fold"],
  "status": "dummy",
  "source": {
    "type": "manual_placeholder",
    "label": "Dummy placeholder data"
  },
  "boundaryRule": {
    "method": "grid_adjacency",
    "description": "Borderline hands should be derived from the 13x13 grid: fold hands adjacent to raise hands, plus raise hands adjacent to fold hands.",
    "adjacency": "8-direction"
  },
  "hands": {
    "AA": { "action": "raise", "frequency": 1, "tags": ["premium"] },
    "K7s": {
      "action": "raise",
      "frequency": 1,
      "boundaryType": "borderline_raise",
      "boundaryScore": 0.85,
      "tags": ["suited_king", "boundary"]
    },
    "K6s": {
      "action": "fold",
      "frequency": 0,
      "boundaryType": "borderline_fold",
      "boundaryScore": 0.95,
      "tags": ["suited_king", "boundary"]
    }
  }
}
```

## Borderline definition

Borderline should be derived from the 13x13 range grid instead of manually guessed.

A hand is a `borderline_fold` when:

```text
hand.action == fold
and at least one neighboring hand.action == raise
```

A hand is a `borderline_raise` when:

```text
hand.action == raise
and at least one neighboring hand.action == fold
```

Use 8-direction adjacency:

```text
up, down, left, right, and four diagonals
```

For example, in a 20bb UTG RFI chart, folds near the raise boundary such as `K2s-K7s`, `Q8s`, `J9s`, `QTo`, or similar hands should be tagged as boundary hands if they are adjacent to raises in the grid.

## Update guidance

When replacing dummy data with real chart data:

1. Keep the file name and metadata stable.
2. Update `status` from `dummy` to `verified`.
3. Replace the `hands` object with the real 13x13 hand matrix.
4. Use `frequency` between `0` and `1` for mixed hands.
5. Add `boundaryType`, `boundaryScore`, and `tags` for boundary hands if known.
6. Treat missing hands as unknown while editing; eventually every hand should be present.

Recommended upload/update order is documented in [`docs/range-priority.md`](../../docs/range-priority.md).
