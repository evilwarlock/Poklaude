# Data Model

## Current static data model

The MVP keeps data in two places:

1. `lib/poker.ts` for static seed questions and filter metadata
2. Browser `localStorage` for user drill attempts

There is no database yet.

## Current TypeScript entities

### Scenario

```ts
export type Scenario = 'RFI' | 'BB Defense' | 'vs RFI' | 'vs 3-Bet';
```

Only `RFI` is enabled in the MVP.

### Position

```ts
export type Position = 'UTG' | 'UTG+1' | 'UTG+2' | 'LJ' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';
```

For RFI, BB is visible but disabled.

### DrillQuestion

```ts
export type DrillQuestion = {
  id: string;
  scenario: Scenario;
  stackDepth: number;
  heroPosition: Position;
  villainPosition?: Position;
  potBb: number;
  hand: string;
  cards: [string, string];
  actions: DrillAction[];
  correctAction: DrillAction;
  frequency: number;
  evBb: number;
  boundaryScore: number;
  explanation: string;
};
```

### DrillAttempt

```ts
export type DrillAttempt = DrillQuestion & {
  userAction: DrillAction;
  isCorrect: boolean;
  createdAt: string;
};
```

## Current filter defaults

```text
Scenario: RFI
Stack: 20bb
Hero positions: UTG, UTG+1, UTG+2, LJ, HJ, CO, BTN, SB
Villain position: Any, but disabled for RFI UI
```

## Future database model

When we add Supabase/Postgres, start with this hybrid model:

### range_spots

One row per supported range spot.

```sql
CREATE TABLE range_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  spot_type TEXT NOT NULL,
  position TEXT NOT NULL,
  stack_depth_bb NUMERIC NOT NULL,
  image_url TEXT,
  hand_matrix_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

Use `hand_matrix_json` as the source of truth in early dynamic versions.

Example:

```json
{
  "AA": { "action": "raise", "frequency": 1.0 },
  "AKs": { "action": "raise", "frequency": 1.0 },
  "A5s": { "action": "raise", "frequency": 1.0 },
  "K7s": { "action": "fold", "frequency": 0.0 },
  "44": { "action": "fold", "frequency": 0.0 }
}
```

### drill_attempts

One row per answer.

```sql
CREATE TABLE drill_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  range_spot_id UUID REFERENCES range_spots(id),
  hand TEXT NOT NULL,
  correct_action TEXT NOT NULL,
  user_action TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  hand_type TEXT,
  boundary_score NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### weakness_stats

Aggregated leak profile.

```sql
CREATE TABLE weakness_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  range_spot_id UUID REFERENCES range_spots(id),
  category_type TEXT NOT NULL,
  category_value TEXT NOT NULL,
  total_attempts INTEGER DEFAULT 0,
  mistake_count INTEGER DEFAULT 0,
  accuracy NUMERIC DEFAULT 0,
  weakness_score NUMERIC DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, range_spot_id, category_type, category_value)
);
```

## Why hybrid SQL plus JSONB

- Range chart is naturally a 13x13 matrix, easy to store as JSON.
- Attempts and weakness stats are naturally analytic rows, easy to query with SQL.
- We can normalize into `range_cells` later if analytics requires every hand cell as a row.

## Later normalized table

Add `range_cells` when needed:

```sql
CREATE TABLE range_cells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  range_spot_id UUID NOT NULL REFERENCES range_spots(id) ON DELETE CASCADE,
  hand TEXT NOT NULL,
  hand_type TEXT NOT NULL,
  action TEXT NOT NULL,
  frequency NUMERIC NOT NULL,
  combo_count NUMERIC NOT NULL,
  boundary_score NUMERIC DEFAULT 0,
  parser_confidence NUMERIC,
  manually_corrected BOOLEAN DEFAULT false,
  UNIQUE(range_spot_id, hand)
);
```
