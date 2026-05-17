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
  { value: 'UTG+1', label: 'UTG+1', enabled: true },
  { value: 'UTG+2', label: 'UTG+2', enabled: true },
  { value: 'LJ', label: 'LJ', enabled: true },
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
    label: position,
    enabled: false,
    reason: 'Only RFI drills are supported in the MVP',
  })),
];

const seededQuestions: DrillQuestion[] = [
  {
    id: 'rfi-20-utg-a5s',
    scenario: 'RFI',
    stackDepth: 20,
    heroPosition: 'UTG',
    potBb: 1.5,
    hand: 'A5s',
    cards: ['A♠', '5♠'],
    actions: ['Raise', 'Fold'],
    correctAction: 'Raise',
    frequency: 1,
    evBb: 0.22,
    boundaryScore: 0.8,
    explanation: 'A5s is a bottom suited-ace open in the seeded 20bb UTG range, so it is a useful boundary drill.',
  },
  {
    id: 'rfi-20-utg-k7s',
    scenario: 'RFI',
    stackDepth: 20,
    heroPosition: 'UTG',
    potBb: 1.5,
    hand: 'K7s',
    cards: ['K♣', '7♣'],
    actions: ['Raise', 'Fold'],
    correctAction: 'Fold',
    frequency: 0,
    evBb: -0.08,
    boundaryScore: 0.85,
    explanation: 'K7s sits just outside the 20bb UTG open range in this seed data. Fold is the target answer.',
  },
  {
    id: 'rfi-20-utg-55',
    scenario: 'RFI',
    stackDepth: 20,
    heroPosition: 'UTG',
    potBb: 1.5,
    hand: '55',
    cards: ['5♠', '5♥'],
    actions: ['Raise', 'Fold'],
    correctAction: 'Raise',
    frequency: 1,
    evBb: 0.18,
    boundaryScore: 0.75,
    explanation: '55 is included in the seeded 20bb UTG open range. Lower pairs become the close region.',
  },
  {
    id: 'rfi-20-utg-44',
    scenario: 'RFI',
    stackDepth: 20,
    heroPosition: 'UTG',
    potBb: 1.5,
    hand: '44',
    cards: ['4♣', '4♦'],
    actions: ['Raise', 'Fold'],
    correctAction: 'Fold',
    frequency: 0,
    evBb: -0.05,
    boundaryScore: 0.9,
    explanation: '44 is a classic threshold hand. In this seeded chart it is below the UTG 20bb open cutoff.',
  },
  {
    id: 'rfi-20-btn-k8s',
    scenario: 'RFI',
    stackDepth: 20,
    heroPosition: 'BTN',
    potBb: 1.5,
    hand: 'K8s',
    cards: ['K♦', '8♦'],
    actions: ['Raise', 'Fold'],
    correctAction: 'Raise',
    frequency: 1,
    evBb: 0.3,
    boundaryScore: 0.72,
    explanation: 'BTN opens wider than UTG. K8s is a reasonable continue/open candidate in the seed set.',
  },
  {
    id: 'bbdef-20-vs-sb-acjd',
    scenario: 'BB Defense',
    stackDepth: 20,
    heroPosition: 'BB',
    villainPosition: 'SB',
    potBb: 4,
    hand: 'AJo',
    cards: ['A♣', 'J♦'],
    actions: ['All-In', 'Call', 'Fold'],
    correctAction: 'All-In',
    frequency: 1,
    evBb: 3.83,
    boundaryScore: 0.35,
    explanation: 'AJo is strong enough to continue aggressively versus SB at 20bb in the seed drill set.',
  },
  {
    id: 'bbdef-20-vs-sb-q8o',
    scenario: 'BB Defense',
    stackDepth: 20,
    heroPosition: 'BB',
    villainPosition: 'SB',
    potBb: 4,
    hand: 'Q8o',
    cards: ['Q♠', '8♦'],
    actions: ['All-In', 'Call', 'Fold'],
    correctAction: 'Call',
    frequency: 1,
    evBb: 0.16,
    boundaryScore: 0.78,
    explanation: 'Q8o is close and should usually defend versus SB in the current seed data.',
  },
  {
    id: 'vsrfi-20-btn-vs-hj-a9o',
    scenario: 'vs RFI',
    stackDepth: 20,
    heroPosition: 'BTN',
    villainPosition: 'HJ',
    potBb: 3.5,
    hand: 'A9o',
    cards: ['A♥', '9♣'],
    actions: ['All-In', 'Call', 'Fold'],
    correctAction: 'Fold',
    frequency: 0,
    evBb: -0.12,
    boundaryScore: 0.82,
    explanation: 'A9o looks tempting but is below the seeded BTN versus HJ RFI continue threshold.',
  },
  {
    id: 'vs3bet-20-co-kqs',
    scenario: 'vs 3-Bet',
    stackDepth: 20,
    heroPosition: 'CO',
    villainPosition: 'BTN',
    potBb: 7.5,
    hand: 'KQs',
    cards: ['K♠', 'Q♠'],
    actions: ['All-In', 'Call', 'Fold'],
    correctAction: 'All-In',
    frequency: 1,
    evBb: 0.62,
    boundaryScore: 0.55,
    explanation: 'KQs performs well enough to continue aggressively versus a BTN 3-bet in this seed spot.',
  },
];

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
    const villainOk =
      filters.villainPositions.includes('Any') ||
      (question.villainPosition ? filters.villainPositions.includes(question.villainPosition) : true);
    const closeOk = !filters.closeSpotsOnly || question.boundaryScore >= 0.7;
    return scenarioOk && stackOk && heroOk && villainOk && closeOk;
  });

  return [...filtered].sort((a, b) => {
    const aMistake = missed.has(a.id) ? 1 : 0;
    const bMistake = missed.has(b.id) ? 1 : 0;
    return bMistake - aMistake || b.boundaryScore - a.boundaryScore;
  });
}

export function pickNextQuestion(filters: TrainingFilters, attempts: DrillAttempt[]): DrillQuestion {
  const candidates = getCandidateQuestions(filters, attempts);
  const pool = candidates.length > 0 ? candidates : seededQuestions.filter((question) => question.scenario === 'RFI' && question.stackDepth === 20);
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
    const key = `${attempt.scenario} / ${attempt.heroPosition} / ${attempt.hand}`;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const weakSpots = Object.entries(grouped)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([label, count]) => ({ label, count }));

  return { total, mistakes: mistakes.length, accuracy, weakSpots };
}
