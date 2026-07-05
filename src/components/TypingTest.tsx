import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CharStatus, Language, TestResult } from '../types';
import { LANGUAGE_LABELS, LANGUAGE_EXTENSIONS } from '../types';
import { generateTypingText } from '../data/codeSnippets';

interface TypingTestProps {
  language: Language;
  durationSeconds?: number;
  onFinish: (result: TestResult) => void;
}

export default function TypingTest({
  language,
  durationSeconds = 30,
  onFinish,
}: TypingTestProps) {
  const targetText = useMemo(() => generateTypingText(language, 2200), [language]);

  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(durationSeconds);

  const inputRef = useRef<HTMLInputElement>(null);
  const sessionStartRef = useRef<number>(Date.now());
  const correctCountRef = useRef(0);
  const incorrectCountRef = useRef(0);
  const finishedRef = useRef(false);

  // Timer a countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          finish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;

    const elapsedSeconds = (Date.now() - sessionStartRef.current) / 1000;

    const correct = correctCountRef.current;
    const incorrect = incorrectCountRef.current;
    const totalKeystrokes = correct + incorrect;

    const wpm = elapsedSeconds > 0 ? Math.round((correct / 5) / (elapsedSeconds / 60)) : 0;
    const accuracy = totalKeystrokes > 0 ? Math.round((correct / totalKeystrokes) * 100) : 100;

    onFinish({
      wpm,
      accuracy,
      errors: incorrect,
      correctChars: correct,
      totalChars: totalKeystrokes,
      timeElapsedSeconds: Math.round(elapsedSeconds),
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (finishedRef.current) return;

    const newValue = e.target.value.slice(0, targetText.length);

    if (newValue.length > typed.length) {
      // Nuovi caratteri digitati: valuta ognuno rispetto al target
      for (let i = typed.length; i < newValue.length; i++) {
        if (newValue[i] === targetText[i]) {
          correctCountRef.current += 1;
        } else {
          incorrectCountRef.current += 1;
        }
      }
    }

    setTyped(newValue);

    if (newValue.length >= targetText.length) {
      finish();
    }
  }

  const charStatuses: CharStatus[] = useMemo(() => {
    return targetText.split('').map((char, i) => {
      if (i >= typed.length) return 'untyped';
      return typed[i] === char ? 'correct' : 'incorrect';
    });
  }, [typed, targetText]);

  const progressPct = Math.min((typed.length / targetText.length) * 100, 100);
  const timerPct = (timeLeft / durationSeconds) * 100;

  return (
    <div className="screen typing-screen" onClick={() => inputRef.current?.focus()}>
      <div className="editor-window">
        <div className="editor-window__tab-bar">
          <span className="traffic-lights">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </span>
          <span className="editor-window__tab">
            typing_test.{LANGUAGE_EXTENSIONS[language]}
          </span>
          <span className="editor-window__timer">
            <span className="editor-window__timer-bar" style={{ width: `${timerPct}%` }} />
            <span className="editor-window__timer-label">{timeLeft}s</span>
          </span>
        </div>

        <div className="editor-window__progress-track">
          <div className="editor-window__progress-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <pre className="typing-area">
          {targetText.split('').map((char, i) => (
            <span key={i} className={`char char--${charStatuses[i]}`}>
              {char === '\n' ? '\u21B5\n' : char}
            </span>
          ))}
        </pre>
      </div>

      <input
        ref={inputRef}
        className="typing-test__hidden-input"
        value={typed}
        onChange={handleChange}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label={`Digita il codice in ${LANGUAGE_LABELS[language]}`}
      />
    </div>
  );
}
