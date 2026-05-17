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
  "hands": {
    "AA": { "action": "raise", "frequency": 1, "notes": "dummy" },
    "K7s": { "action": "raise", "frequency": 1, "notes": "dummy" },
    "K6s": { "action": "fold", "frequency": 0, "notes": "dummy" }
  }
}
```

## Update guidance

When replacing dummy data with real chart data:

1. Keep the file name and metadata stable.
2. Update `status` from `dummy` to `verified`.
3. Replace the `hands` object with the real 13x13 hand matrix.
4. Use `frequency` between `0` and `1` for mixed hands.
5. Treat missing hands as unknown while editing; eventually every hand should be present.

Recommended upload/update order is documented in [`docs/range-priority.md`](../../docs/range-priority.md).
