'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  DrillAction,
  DrillAttempt,
  DrillQuestion,
  Position,
  Scenario,
  TrainingFilters,
  defaultFilters,
  filterOptions,
  pickNextQuestion,
  positionOptions,
  scenarioOptions,
  stackOptions,
  summarizeWeakness,
  villainPositionOptions,
  displayPosition,
} from '@/lib/poker';

type ExpandedSection = 'scenario' | 'stack' | 'hero' | 'villain' | null;
type Screen = 'setup' | 'drill' | 'results';

type SelectableOption<T extends string | number> = {
  value: T;
  label: string;
  enabled: boolean;
  reason?: string;
};

const storageKey = 'poklaude_attempts_v1';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [expanded, setExpanded] = useState<ExpandedSection>('stack');
  const [filters, setFilters] = useState<TrainingFilters>(defaultFilters);
  const [attempts, setAttempts] = useState<DrillAttempt[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<DrillQuestion | null>(null);
  const [feedback, setFeedback] = useState<DrillAttempt | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setAttempts(JSON.parse(stored) as DrillAttempt[]);
      } catch {
        setAttempts([]);
      }
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(attempts));
    } catch {
      // ignore (e.g. private browsing storage full)
    }
  }, [attempts]);

  const summary = useMemo(() => summarizeWeakness(attempts), [attempts]);

  function startTraining() {
    const next = pickNextQuestion(filters, attempts);
    setCurrentQuestion(next);
    setFeedback(null);
    setScreen('drill');
  }

  function answerQuestion(action: DrillAction) {
    if (!currentQuestion) return;

    const attempt: DrillAttempt = {
      ...currentQuestion,
      userAction: action,
      isCorrect: action === currentQuestion.correctAction,
      createdAt: new Date().toISOString(),
    };

    setFeedback(attempt);
    setAttempts((prev) => [attempt, ...prev]);
  }

  function nextQuestion() {
    const next = pickNextQuestion(filters, attempts);
    setCurrentQuestion(next);
    setFeedback(null);
  }

  if (screen === 'drill' && currentQuestion) {
    return (
      <DrillScreen
        question={currentQuestion}
        feedback={feedback}
        onBack={() => setScreen('setup')}
        onAnswer={answerQuestion}
        onNext={nextQuestion}
        onResults={() => setScreen('results')}
      />
    );
  }

  if (screen === 'results') {
    return (
      <main className="app-shell">
        <TopBar />
        <h1>Training Results</h1>
        <p className="subtitle">Local browser stats for the current MVP.</p>
        <section className="results">
          <div className="metric">
            <div className="metric-value">{summary.accuracy}%</div>
            <div className="metric-label">Accuracy</div>
          </div>
          <div className="metric">
            <div className="metric-value">{summary.total}</div>
            <div className="metric-label">Total attempts</div>
          </div>
          <div className="metric">
            <div className="metric-value">{summary.mistakes}</div>
            <div className="metric-label">Mistakes</div>
          </div>
        </section>
        <section className="card">
          <div className="card-title">Weak Spots</div>
          <p className="card-subtitle">These will be weighted first in the next session.</p>
          {summary.weakSpots.length === 0 ? (
            <p>No mistakes yet.</p>
          ) : (
            <div className="scenario-list">
              {summary.weakSpots.map((spot) => (
                <div className="scenario-row" key={spot.label}>
                  <span>
                    <span className="scenario-name">{spot.label}</span>
                    <span className="scenario-desc">Missed {spot.count} time{spot.count > 1 ? 's' : ''}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
        <button className="start-bar" onClick={startTraining}>▶ Continue Training</button>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <TopBar />
      <h1>Poklaude</h1>
      <p className="subtitle">Configure your preflop training session</p>

      <section className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Close Spots Only</div>
            <div className="card-subtitle">Practice only hands near the range boundary</div>
          </div>
          <button
            className={`toggle ${filters.closeSpotsOnly ? 'on' : ''}`}
            onClick={() => setFilters((prev) => ({ ...prev, closeSpotsOnly: !prev.closeSpotsOnly }))}
            aria-label="Toggle close spots only"
          >
            <span className="knob" />
          </button>
        </div>
      </section>

      <FilterCard
        title="Scenario"
        count={filters.scenarios.length}
        subtitle={filters.scenarios.length === filterOptions.scenarios.length ? 'All contexts' : filters.scenarios.join(', ')}
        expanded={expanded === 'scenario'}
        onToggle={() => setExpanded(expanded === 'scenario' ? null : 'scenario')}
        onClear={() => setFilters((prev) => ({ ...prev, scenarios: ['RFI'] }))}
      >
        <div className="scenario-list">
          {scenarioOptions.map((scenario) => (
            <button
              key={scenario.value}
              className={`scenario-row ${!scenario.enabled ? 'disabled' : ''}`}
              onClick={() => {
                if (!scenario.enabled) return;
                toggleArrayValue<Scenario>(scenario.value, filters.scenarios, (value) =>
                  setFilters((prev) => ({ ...prev, scenarios: value.length ? value : ['RFI'] })),
                );
              }}
              disabled={!scenario.enabled}
              title={scenario.reason}
            >
              <span>
                <span className="scenario-name">{scenario.label}</span>
                <span className="scenario-desc">{scenario.enabled ? scenarioDescription(scenario.value) : scenario.reason}</span>
              </span>
              {scenario.enabled && filters.scenarios.includes(scenario.value) && <span className="check">✓</span>}
            </button>
          ))}
        </div>
      </FilterCard>

      <FilterCard
        title="Stack Depth"
        count={filters.stackDepths.length}
        subtitle={filters.stackDepths.length === filterOptions.stacks.length ? 'All depths' : `${filters.stackDepths.join(', ')} BB`}
        expanded={expanded === 'stack'}
        onToggle={() => setExpanded(expanded === 'stack' ? null : 'stack')}
        onClear={() => setFilters((prev) => ({ ...prev, stackDepths: [20] }))}
      >
        <div className="option-grid">
          {stackOptions.map((stack) => (
            <OptionPill
              key={stack.value}
              option={stack}
              active={filters.stackDepths.includes(stack.value)}
              onClick={() => toggleArrayValue<number>(stack.value, filters.stackDepths, (value) =>
                setFilters((prev) => ({ ...prev, stackDepths: value.length ? value : [20] })),
              )}
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard
        title="Hero Position"
        count={filters.heroPositions.length}
        subtitle={filters.heroPositions.length === filterOptions.positions.length ? 'All positions' : filters.heroPositions.join(', ')}
        expanded={expanded === 'hero'}
        onToggle={() => setExpanded(expanded === 'hero' ? null : 'hero')}
        onClear={() => setFilters((prev) => ({ ...prev, heroPositions: ['UTG', 'UTG+1', 'UTG+2', 'LJ', 'HJ', 'CO', 'BTN', 'SB'] }))}
      >
        <div className="option-grid">
          {positionOptions.map((position) => (
            <OptionPill
              key={position.value}
              option={position}
              active={filters.heroPositions.includes(position.value)}
              onClick={() => toggleArrayValue<Position>(position.value, filters.heroPositions, (value) =>
                setFilters((prev) => ({ ...prev, heroPositions: value.length ? value : ['UTG'] })),
              )}
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard
        title="Villain Position"
        count={filters.villainPositions.length}
        subtitle="Unavailable for RFI MVP"
        expanded={expanded === 'villain'}
        onToggle={() => setExpanded(expanded === 'villain' ? null : 'villain')}
        onClear={() => setFilters((prev) => ({ ...prev, villainPositions: ['Any'] }))}
      >
        <div className="option-grid">
          {villainPositionOptions.map((position) => (
            <OptionPill
              key={position.value}
              option={position}
              active={filters.villainPositions.includes(position.value)}
              onClick={() => undefined}
            />
          ))}
        </div>
      </FilterCard>

      <button className="start-bar" onClick={startTraining}>▶ Start Training</button>
    </main>
  );
}

function TopBar() {
  return (
    <div className="topbar">
      <div className="logo">♠ Poklaude</div>
      <div className="avatar">Y</div>
    </div>
  );
}

function FilterCard({
  title,
  count,
  subtitle,
  expanded,
  onToggle,
  onClear,
  children,
}: {
  title: string;
  count: number;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  onClear: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            {title} <span className="badge">{count}</span>
          </div>
          <div className="card-subtitle">{subtitle}</div>
        </div>
        <div>
          {expanded && <button className="clear-btn" onClick={onClear}>Reset</button>}
          <button className="chevron" onClick={onToggle}>{expanded ? '⌃' : '⌄'}</button>
        </div>
      </div>
      {expanded && children}
    </section>
  );
}

function OptionPill<T extends string | number>({
  option,
  active,
  onClick,
}: {
  option: SelectableOption<T>;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`pill ${active ? 'active' : ''} ${!option.enabled ? 'disabled' : ''}`}
      onClick={() => {
        if (!option.enabled) return;
        onClick();
      }}
      disabled={!option.enabled}
      title={option.reason}
    >
      <span>{option.label}</span>
      {!option.enabled && <span className="coming-soon">{option.reason ?? 'Coming soon'}</span>}
    </button>
  );
}

const tableOrder: Position[] = ['SB', 'BB', 'UTG', 'UTG+1', 'HJ', 'CO', 'BTN'];

const visualSeatSlots = [
  'seat-bottom',
  'seat-bottom-left',
  'seat-left',
  'seat-top-left',
  'seat-top',
  'seat-top-right',
  'seat-right',
];

function getTableSeatsFromHero(heroPosition: Position) {
  const heroIndex = tableOrder.indexOf(heroPosition);
  const orderedSeats = heroIndex === -1
    ? tableOrder
    : [...tableOrder.slice(heroIndex), ...tableOrder.slice(0, heroIndex)];

  return orderedSeats.map((position, index) => ({
    position,
    label: displayPosition(position),
    className: visualSeatSlots[index],
    isHero: position === heroPosition,
  }));
}

function DrillScreen({
  question,
  feedback,
  onBack,
  onAnswer,
  onNext,
  onResults,
}: {
  question: DrillQuestion;
  feedback: DrillAttempt | null;
  onBack: () => void;
  onAnswer: (action: DrillAction) => void;
  onNext: () => void;
  onResults: () => void;
}) {
  return (
    <main className="drill-shell">
      <button className="back-btn" onClick={onBack}>←</button>
      <div className="table">
        {getTableSeatsFromHero(question.heroPosition).map((seat) => (
          <div className={`seat ${seat.className} ${seat.isHero ? 'hero' : ''}`} key={seat.position}>
            {seat.label}
            {seat.isHero && <><br />{question.stackDepth} bb</>}
          </div>
        ))}
        <div className="spot-title">
          <div className="pot">● {question.potBb.toFixed(2)} bb ⓘ</div>
          <div>{displayPosition(question.heroPosition)} RFI at {question.stackDepth}bb</div>
        </div>
        <div className="cards">
          <div className={`card-face ${question.cards[0].includes('♥') || question.cards[0].includes('♦') ? 'red' : ''}`}>{question.cards[0]}</div>
          <div className={`card-face ${question.cards[1].includes('♥') || question.cards[1].includes('♦') ? 'red' : ''}`}>{question.cards[1]}</div>
        </div>
      </div>

      <section className="action-panel">
        {feedback ? (
          <div className={`feedback ${feedback.isCorrect ? '' : 'bad'}`}>
            <div className="feedback-title">{feedback.isCorrect ? '✓ Correct' : '✕ Incorrect'}</div>
            <div className="feedback-text">
              Your choice: {feedback.userAction}<br />
              Correct: {feedback.correctAction} ({Math.round(feedback.frequency * 100)}%)<br />
              EV: {feedback.evBb.toFixed(2)} bb<br />
              {feedback.explanation}
            </div>
            <div className="actions" style={{ marginTop: 14 }}>
              <button className="action-btn" onClick={onResults}>Results</button>
              <button className="action-btn" onClick={onNext}>Next</button>
            </div>
          </div>
        ) : (
          <div className="actions">
            {question.actions.map((action) => (
              <button className="action-btn" key={action} onClick={() => onAnswer(action)}>{action}</button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function toggleArrayValue<T>(value: T, current: T[], onChange: (next: T[]) => void) {
  if (current.includes(value)) {
    onChange(current.filter((item) => item !== value));
  } else {
    onChange([...current, value]);
  }
}

function scenarioDescription(scenario: Scenario) {
  switch (scenario) {
    case 'RFI':
      return 'Open raising first in';
    case 'BB Defense':
      return 'Defending from big blind';
    case 'vs RFI':
      return 'Facing an open raise';
    case 'vs 3-Bet':
      return 'Facing a 3-bet after you raised';
  }
}
