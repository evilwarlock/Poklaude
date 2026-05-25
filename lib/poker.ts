export type Scenario = 'RFI' | 'BB Defense' | 'vs RFI' | 'vs 3-Bet';
export type Position = 'UTG' | 'UTG+1' | 'UTG+2' | 'LJ' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';
export type DrillAction = 'Raise' | 'Fold' | 'All-In' | 'Call';

export type TrainingFilters = {
  closeSpotsOnly: boolean;
  scenarios: Scenario[];
  stackDepths: number[];
  heroPositions: Position[];
  villainPositions: Array<Position | 'Any'>;
};

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

export type DrillAttempt = DrillQuestion & {
  userAction: DrillAction;
  isCorrect: boolean;
  createdAt: string;
};

type Availability<T extends string | number> = {
  value: T;
  label: string;
  enabled: boolean;
  reason?: string;
};

const scenarios: Scenario[] = ['RFI', 'BB Defense', 'vs RFI', 'vs 3-Bet'];
const stacks = [10, 15, 20, 32, 40, 60, 100];
const positions: Position[] = ['UTG', 'UTG+1', 'UTG+2', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
const rfiPositions: Position[] = ['UTG', 'UTG+1', 'HJ', 'CO', 'BTN', 'SB'];

const mvpDisabledReason = 'Coming soon';

export const scenarioOptions: Array<Availability<Scenario>> = [
  { value: 'RFI', label: 'RFI', enabled: true },
  { value: 'BB Defense', label: 'BB Defense', enabled: false, reason: mvpDisabledReason },
  { value: 'vs RFI', label: 'vs RFI', enabled: false, reason: mvpDisabledReason },
  { value: 'vs 3-Bet', label: 'vs 3-Bet', enabled: false, reason: mvpDisabledReason },
];

export const stackOptions: Array<Availability<number>> = [
  { value: 10, label: '10 BB', enabled: false, reason: 'Only 20bb is supported in the MVP' },
  { value: 15, label: '15 BB', enabled: false, reason: 'Only 20bb is supported in the MVP' },
  { value: 20, label: '20 BB', enabled: true },
  { value: 32, label: '32 BB', enabled: false, reason: 'Only 20bb is supported in the MVP' },
  { value: 40, label: '40 BB', enabled: false, reason: 'Only 20bb is supported in the MVP' },
  { value: 60, label: '60 BB', enabled: false, reason: 'Only 20bb is supported in the MVP' },
  { value: 100, label: '100 BB', enabled: false, reason: 'Only 20bb is supported in the MVP' },
];

export const positionOptions: Array<Availability<Position>> = [
  { value: 'UTG', label: 'UTG', enabled: true },
  { value: 'UTG+1', label: 'UTG1', enabled: true },
  { value: 'UTG+2', label: 'UTG2', enabled: false, reason: 'Not shown in the current 7-seat RFI layout' },
  { value: 'LJ', label: 'LJ', enabled: false, reason: 'Not shown in the current 7-seat RFI layout' },
  { value: 'HJ', label: 'HJ', enabled: true },
  { value: 'CO', label: 'CO', enabled: true },
  { value: 'BTN', label: 'BTN', enabled: true },
  { value: 'SB', label: 'SB', enabled: true },
  { value: 'BB', label: 'BB', enabled: false, reason: 'BB is not available for RFI spots' },
];

export const villainPositionOptions: Array<Availability<Position | 'Any'>> = [
  { value: 'Any', label: 'Any', enabled: false, reason: 'Only RFI drills are supported in the MVP' },
  ...positions.map((position) => ({
    value: position,
    label: position === 'UTG+1' ? 'UTG1' : position,
    enabled: false,
    reason: 'Only RFI drills are supported in the MVP',
  })),
];

const rfiBoundaryHands: Array<{
  hand: string;
  cards: [string, string];
  correctAction: DrillAction;
  frequency: number;
  evBb: number;
  boundaryScore: number;
  explanation: string;
}> = [
  {
    hand: 'A5s',
    cards: ['A♠', '5♠'],
    correctAction: 'Raise',
    frequency: 1,
    evBb: 0.22,
    boundaryScore: 0.8,
    explanation: 'A5s is a bottom suited-ace open in the seeded 20bb RFI range, so it is a useful boundary drill.',
  },
  {
    hand: 'K7s',
    cards: ['K♣', '7♣'],
    correctAction: 'Fold',
    frequency: 0,
    evBb: -0.08,
    boundaryScore: 0.85,
    explanation: 'K7s sits just outside the seeded 20bb RFI open range. Fold is the target answer.',
  },
  {
    hand: '55',
    cards: ['5♠', '5♥'],
    correctAction: 'Raise',
    frequency: 1,
    evBb: 0.18,
    boundaryScore: 0.75,
    explanation: '55 is included in the seeded 20bb RFI open range. Lower pairs become the close region.',
  },
  {
    hand: '44',
    cards: ['4♣', '4♦'],
    correctAction: 'Fold',
    frequency: 0,
    evBb: -0.05,
    boundaryScore: 0.9,
    explanation: '44 is a classic threshold hand. In this seeded chart it is below the 20bb RFI open cutoff.',
  },
  {
    hand: 'K8s',
    cards: ['K♦', '8♦'],
    correctAction: 'Raise',
    frequency: 1,
    evBb: 0.3,
    boundaryScore: 0.72,
    explanation: 'K8s is a useful suited-king boundary hand in the seeded 20bb RFI drills.',
  },
];

const seededQuestions: DrillQuestion[] = rfiPositions.flatMap((position) =>
  rfiBoundaryHands.map((spot) => ({
    id: `rfi-20-${position.toLowerCase().replace('+', '')}-${spot.hand.toLowerCase()}`,
    scenario: 'RFI' as const,
    stackDepth: 20,
    heroPosition: position,
    potBb: 1.5,
    hand: spot.hand,
    cards: spot.cards,
    actions: ['Raise', 'Fold'] as DrillAction[],
    correctAction: spot.correctAction,
    frequency: spot.frequency,
    evBb: spot.evBb,
    boundaryScore: spot.boundaryScore,
    explanation: `${displayPosition(position)} 20bb RFI: ${spot.explanation}`,
  })),
);

export const filterOptions = { scenarios, stacks, positions };

export const defaultFilters: TrainingFilters = {
  closeSpotsOnly: false,
  scenarios: ['RFI'],
  stackDepths: [20],
  heroPositions: positionOptions.filter((option) => option.enabled).map((option) => option.value),
  villainPositions: ['Any'],
};

export function getCandidateQuestions(filters: TrainingFilters, attempts: DrillAttempt[]): DrillQuestion[] {
  const missed = new Set(attempts.filter((attempt) => !attempt.isCorrect).map((attempt) => attempt.id));

  const filtered = seededQuestions.filter((question) => {
    const scenarioOk = filters.scenarios.includes(question.scenario);
    const stackOk = filters.stackDepths.includes(question.stackDepth);
    const heroOk = filters.heroPositions.includes(question.heroPosition);
    const closeOk = !filters.closeSpotsOnly || question.boundaryScore >= 0.7;
    return scenarioOk && stackOk && heroOk && closeOk;
  });

  return [...filtered].sort((a, b) => {
    const aMistake = missed.has(a.id) ? 1 : 0;
    const bMistake = missed.has(b.id) ? 1 : 0;
    return bMistake - aMistake || b.boundaryScore - a.boundaryScore;
  });
}

export function pickNextQuestion(filters: TrainingFilters, attempts: DrillAttempt[]): DrillQuestion {
  const candidates = getCandidateQuestions(filters, attempts);
  const pool = candidates.length > 0 ? candidates : seededQuestions;
  const askedCounts = new Map<string, number>();
  attempts.forEach((attempt) => askedCounts.set(attempt.id, (askedCounts.get(attempt.id) ?? 0) + 1));

  const ranked = [...pool].sort((a, b) => {
    const aCount = askedCounts.get(a.id) ?? 0;
    const bCount = askedCounts.get(b.id) ?? 0;
    return aCount - bCount || b.boundaryScore - a.boundaryScore;
  });

  return ranked[0];
}

export function summarizeWeakness(attempts: DrillAttempt[]) {
  const total = attempts.length;
  const mistakes = attempts.filter((attempt) => !attempt.isCorrect);
  const accuracy = total === 0 ? 0 : Math.round(((total - mistakes.length) / total) * 100);

  const grouped = mistakes.reduce<Record<string, number>>((acc, attempt) => {
    const key = `${attempt.scenario} / ${displayPosition(attempt.heroPosition)} / ${attempt.hand}`;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const weakSpots = Object.entries(grouped)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([label, count]) => ({ label, count }));

  return { total, mistakes: mistakes.length, accuracy, weakSpots };
}

export function displayPosition(position: Position) {
  return position === 'UTG+1' ? 'UTG1' : position;
}
