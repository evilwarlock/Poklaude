import btn from '@/data/ranges/20bb-rfi-btn.json';
import co from '@/data/ranges/20bb-rfi-co.json';
import hj from '@/data/ranges/20bb-rfi-hj.json';
import sb from '@/data/ranges/20bb-rfi-sb.json';
import utg from '@/data/ranges/20bb-rfi-utg.json';
import utg1 from '@/data/ranges/20bb-rfi-utg1.json';
import utg2 from '@/data/ranges/20bb-rfi-utg2.json';
import vsHjVsUtg2 from '@/data/ranges/20bb-vsopen-hjvsutg2.json';
import vsSbVsBtn from '@/data/ranges/20bb-vsopen-sbvsbtn.json';
import vsSbVsCo from '@/data/ranges/20bb-vsopen-sbvsco.json';
import vsSbVsHj from '@/data/ranges/20bb-vsopen-sbvshj.json';
import vsSbVsUtg from '@/data/ranges/20bb-vsopen-sbvsutg.json';
import vsSbVsUtg1 from '@/data/ranges/20bb-vsopen-sbvsutg1.json';
import vsSbVsUtg2 from '@/data/ranges/20bb-vsopen-sbvsutg2.json';
import vsUtg1VsUtg from '@/data/ranges/20bb-vsopen-utg1vsutg.json';
import vsUtg2VsUtg from '@/data/ranges/20bb-vsopen-utg2vsutg.json';
import vsUtg2VsUtg1 from '@/data/ranges/20bb-vsopen-utg2vsutg1.json';
import vsBbVsBtn from '@/data/ranges/20bb-vsopen-bbvsbtn.json';
import vsBbVsCo from '@/data/ranges/20bb-vsopen-bbvsco.json';
import vsBbVsHj from '@/data/ranges/20bb-vsopen-bbvshj.json';
import vsBbVsSb from '@/data/ranges/20bb-vsopen-bbvssb.json';
import vsBbVsUtg from '@/data/ranges/20bb-vsopen-bbvsutg.json';
import vsBbVsUtg1 from '@/data/ranges/20bb-vsopen-bbvsutg1.json';
import vsBbVsUtg2 from '@/data/ranges/20bb-vsopen-bbvsutg2.json';
import vsBtnVsCo from '@/data/ranges/20bb-vsopen-btnvsco.json';
import vsBtnVsHj from '@/data/ranges/20bb-vsopen-btnvshj.json';
import vsBtnVsUtg from '@/data/ranges/20bb-vsopen-btnvsutg.json';
import vsBtnVsUtg1 from '@/data/ranges/20bb-vsopen-btnvsutg1.json';
import vsBtnVsUtg2 from '@/data/ranges/20bb-vsopen-btnvsutg2.json';
import vsCoVsHj from '@/data/ranges/20bb-vsopen-covshj.json';
import vsCoVsUtg from '@/data/ranges/20bb-vsopen-covsutg.json';
import vsCoVsUtg1 from '@/data/ranges/20bb-vsopen-covsutg1.json';
import vsCoVsUtg2 from '@/data/ranges/20bb-vsopen-covsutg2.json';
import vsHjVsUtg from '@/data/ranges/20bb-vsopen-hjvsutg.json';
import vsHjVsUtg1 from '@/data/ranges/20bb-vsopen-hjvsutg1.json';

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
  { value: 'vs RFI', label: 'vs RFI', enabled: true },
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
  { value: 'UTG+2', label: 'UTG2', enabled: true },
  { value: 'LJ', label: 'LJ', enabled: false, reason: 'Not shown in the current 7-seat RFI layout' },
  { value: 'HJ', label: 'HJ', enabled: true },
  { value: 'CO', label: 'CO', enabled: true },
  { value: 'BTN', label: 'BTN', enabled: true },
  { value: 'SB', label: 'SB', enabled: true },
  { value: 'BB', label: 'BB', enabled: false, reason: 'BB is not available for RFI spots' },
];

export const villainPositionOptions: Array<Availability<Position | 'Any'>> = [
  { value: 'Any', label: 'Any', enabled: true },
  ...positions.map((position) => ({
    value: position,
    label: position === 'UTG+1' ? 'UTG1' : position === 'UTG+2' ? 'UTG2' : position,
    enabled: true,
  })),
];

type RangeFile = {
  position?: string;
  heroPosition?: string;
  openerPosition?: string;
  stackDepthBb: number;
  hands: Record<string, { action: string; frequency: number; boundaryScore?: number }>;
};

function cardsFromHand(hand: string): [string, string] {
  const isPair = hand.length === 2;
  const isSuited = hand.endsWith('s');
  const r1 = hand[0], r2 = hand[1];
  if (isPair) return [`${r1}♠`, `${r2}♥`];
  if (isSuited) return [`${r1}♠`, `${r2}♠`];
  return [`${r1}♠`, `${r2}♥`];
}

function rangeFileToQuestions(file: RangeFile): DrillQuestion[] {
  const position = (file.heroPosition ?? file.position) as Position;
  const villainPosition = file.openerPosition as Position | undefined;
  const isVsOpen = !!file.openerPosition;
  const scenario: Scenario = isVsOpen ? 'vs RFI' : 'RFI';
  const actions: DrillAction[] = isVsOpen ? ['Call', 'Raise', 'All-In', 'Fold'] : ['Raise', 'Fold'];

  function toAction(a: string): DrillAction {
    if (a === 'raise') return 'Raise';
    if (a === 'call') return 'Call';
    if (a === 'jam') return 'All-In';
    return 'Fold';
  }

  return Object.entries(file.hands)
    .filter(([, h]) => h.boundaryScore !== undefined)
    .map(([hand, h]) => ({
      id: `${scenario.replace(' ', '-').toLowerCase()}-${file.stackDepthBb}-${position.toLowerCase().replace('+', '')}${villainPosition ? `-vs${villainPosition.toLowerCase().replace('+', '')}` : ''}-${hand.toLowerCase()}`,
      scenario,
      stackDepth: file.stackDepthBb,
      heroPosition: position,
      villainPosition,
      potBb: isVsOpen ? 2.5 : 1.5,
      hand,
      cards: cardsFromHand(hand),
      actions,
      correctAction: toAction(h.action),
      frequency: h.frequency,
      evBb: 0,
      boundaryScore: h.boundaryScore!,
      explanation: `${displayPosition(position)} ${file.stackDepthBb}bb ${scenario}: ${hand} — ${h.action}`,
    }));
}

const seededQuestions: DrillQuestion[] = [
  btn, co, hj, sb, utg, utg1, utg2,
  vsHjVsUtg2, vsSbVsBtn, vsSbVsCo, vsSbVsHj, vsSbVsUtg, vsSbVsUtg1, vsSbVsUtg2,
  vsUtg1VsUtg, vsUtg2VsUtg, vsUtg2VsUtg1,
  vsBbVsBtn, vsBbVsCo, vsBbVsHj, vsBbVsSb, vsBbVsUtg, vsBbVsUtg1, vsBbVsUtg2,
  vsBtnVsCo, vsBtnVsHj, vsBtnVsUtg, vsBtnVsUtg1, vsBtnVsUtg2,
  vsCoVsHj, vsCoVsUtg, vsCoVsUtg1, vsCoVsUtg2,
  vsHjVsUtg, vsHjVsUtg1,
].flatMap((f) => rangeFileToQuestions(f as RangeFile));

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
    const villainOk = filters.villainPositions.includes('Any') ||
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
  const pool = candidates.length > 0 ? candidates : seededQuestions;
  const askedCounts = new Map<string, number>();
  attempts.forEach((attempt) => askedCounts.set(attempt.id, (askedCounts.get(attempt.id) ?? 0) + 1));

  const ranked = [...pool].sort((a, b) => {
    const aCount = askedCounts.get(a.id) ?? 0;
    const bCount = askedCounts.get(b.id) ?? 0;
    return aCount - bCount || b.boundaryScore - a.boundaryScore;
  });

  return ranked[0] ?? candidates[0];
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
