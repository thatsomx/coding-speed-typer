import { useMemo, useState } from 'react';
import type { Language, Screen, TestResult, Duration } from './types';
import { generateTypingText } from './data/codeSnippets';
import StartScreen from './components/StartScreen';
import HowToPlayModal from './components/HowToPlayModal';
import Countdown from './components/Countdown';
import TypingTest from './components/TypingTest';
import ResultsScreen from './components/ResultsScreen';
import DotGridBackground from './components/DotGridBackground';
import CreditsBadge from './components/CreditsBadge';
import './App.css';

// Alcuni browser non hanno ancora la View Transition API: fallback silenzioso.
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => void;
};

/**
 * Cambia schermata con una transizione fluida nativa del browser
 * (crossfade + morph degli elementi con lo stesso view-transition-name),
 * dando la sensazione di un'unica pagina continua invece di schermate separate.
 */
function transitionTo(updateState: () => void) {
  const doc = document as DocumentWithViewTransition;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (doc.startViewTransition && !prefersReducedMotion) {
    doc.startViewTransition(updateState);
  } else {
    updateState();
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [language, setLanguage] = useState<Language>('javascript');
  const [duration, setDuration] = useState<Duration>(30);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  // Testo di anteprima mostrato "in trasparenza" durante il countdown
  const previewText = useMemo(() => generateTypingText(language, 500), [language, screen]);

  function handleStart() {
    transitionTo(() => setScreen('countdown'));
  }

  function handleCountdownComplete() {
    transitionTo(() => setScreen('typing'));
  }

  function handleTypingFinish(testResult: TestResult) {
    transitionTo(() => {
      setResult(testResult);
      setScreen('results');
    });
  }

  function handleRestart() {
    transitionTo(() => {
      setResult(null);
      setScreen('start');
    });
  }

  return (
    <div className="app">
      <DotGridBackground />

      {screen === 'start' && (
        <StartScreen
          language={language}
          onLanguageChange={setLanguage}
          duration={duration}
          onDurationChange={setDuration}
          onStart={handleStart}
          onHowToPlay={() => setShowHowToPlay(true)}
        />
      )}

      {screen === 'countdown' && (
        <Countdown previewText={previewText} onComplete={handleCountdownComplete} />
      )}

      {screen === 'typing' && (
        <TypingTest
          language={language}
          durationSeconds={duration}
          onFinish={handleTypingFinish}
        />
      )}

      {screen === 'results' && result && (
        <ResultsScreen result={result} onRestart={handleRestart} />
      )}

      {showHowToPlay && (
        <HowToPlayModal duration={duration} onClose={() => setShowHowToPlay(false)} />
      )}

      <CreditsBadge />
    </div>
  );
}
