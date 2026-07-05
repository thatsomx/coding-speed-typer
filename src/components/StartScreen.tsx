import React, { useState } from 'react';
import type { Language, Duration } from '../types';
import { LANGUAGE_LABELS, DURATION_OPTIONS } from '../types';
import GlowButton from './GlowButton';

interface StartScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  duration: Duration;
  onDurationChange: (duration: Duration) => void;
  onStart: () => void;
  onHowToPlay: () => void;
}

const LANGUAGES = Object.keys(LANGUAGE_LABELS) as Language[];

export default function StartScreen({
  language,
  onLanguageChange,
  duration,
  onDurationChange,
  onStart,
  onHowToPlay,
}: StartScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="screen start-screen">
      <div className="start-screen__eyebrow">~/coding-speed-typer</div>

      <div className="hero-title-wrap">
        <h1 className="app-title">
          Coding Speed Typin<span className="blink-cursor">_</span>
        </h1>
      </div>
      <p className="start-screen__subtitle">
        Scrivi codice vero, il più velocemente possibile.
      </p>

      <div className="start-screen__actions">
        <GlowButton variant="primary" onClick={onStart}>
          <span className="btn__prompt">$</span> start
        </GlowButton>

        <div className="settings-row">
          <div className="lang-select">
            <GlowButton
              variant="secondary"
              className="settings-row__lang-btn"
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
            >
              <span className="btn__prompt">$</span>
              <span className="lang-select__current">{LANGUAGE_LABELS[language]}</span>
            </GlowButton>

            {menuOpen && (
              <ul className="lang-select__menu" role="listbox">
                {LANGUAGES.map((lang) => (
                  <li key={lang}>
                    <button
                      className={
                        'lang-select__option' +
                        (lang === language ? ' lang-select__option--active' : '')
                      }
                      role="option"
                      aria-selected={lang === language}
                      onClick={() => {
                        onLanguageChange(lang);
                        setMenuOpen(false);
                      }}
                    >
                      {LANGUAGE_LABELS[lang]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="duration-select" role="group" aria-label="Durata del test">
            {DURATION_OPTIONS.map((seconds) => (
              <button
                key={seconds}
                type="button"
                className={
                  'duration-select__option' +
                  (seconds === duration ? ' duration-select__option--active' : '')
                }
                aria-pressed={seconds === duration}
                onClick={() => onDurationChange(seconds)}
              >
                {seconds}s
              </button>
            ))}
          </div>
        </div>

        <GlowButton variant="secondary" onClick={onHowToPlay}>
          <span className="btn__prompt">$</span> how to play
        </GlowButton>
      </div>
    </div>
  );
}
