import type { TestResult } from '../types';
import GlowButton from './GlowButton';
import InfoDot from './InfoDot';
import { useCountUp } from '../hooks/useCountUp';

interface ResultsScreenProps {
  result: TestResult;
  onRestart: () => void;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ResultsScreen({ result, onRestart }: ResultsScreenProps) {
  const animatedWpm = useCountUp(result.wpm);
  const animatedAccuracy = useCountUp(result.accuracy);
  const dashOffset = CIRCUMFERENCE * (1 - result.accuracy / 100);

  return (
    <div className="screen results-screen">
      <div className="editor-window editor-window--results">
        <div className="editor-window__tab-bar">
          <span className="traffic-lights">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </span>
          <span className="editor-window__tab">results.json</span>
        </div>

        <div className="results-screen__body">
          <div className="results-screen__hero">
            <div className="results-screen__wpm-block">
              <div className="results-screen__wpm-value">{animatedWpm}</div>
              <div className="results-screen__wpm-label">
                wpm
                <InfoDot text="Parole al minuto: (caratteri corretti / 5) diviso i minuti di durata del test." />
              </div>
            </div>

            <div className="accuracy-gauge">
              <svg viewBox="0 0 130 130" className="accuracy-ring">
                <circle
                  className="accuracy-ring__track"
                  cx="65"
                  cy="65"
                  r={RADIUS}
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  className="accuracy-ring__progress"
                  cx="65"
                  cy="65"
                  r={RADIUS}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="accuracy-gauge__center">
                <span className="accuracy-gauge__value">{animatedAccuracy}%</span>
                <span className="accuracy-gauge__caption">
                  precisione
                  <InfoDot text="Percentuale di caratteri digitati correttamente sul totale dei tasti premuti." />
                </span>
              </div>
            </div>
          </div>

          <div className="results-screen__stats-grid">
            <div className="stat-card">
              <span className="stat-card__value stat-card__value--orange">
                {result.errors}
              </span>
              <span className="stat-card__label">
                errori
                <InfoDot text="Numero di caratteri digitati in modo errato durante il test." />
              </span>
            </div>

            <div className="stat-card">
              <span className="stat-card__value stat-card__value--purple">
                {result.correctChars}
              </span>
              <span className="stat-card__label">
                caratteri corretti
                <InfoDot text="Totale di caratteri digitati in modo corretto." />
              </span>
            </div>

            <div className="stat-card">
              <span className="stat-card__value stat-card__value--yellow">
                {result.totalChars}
              </span>
              <span className="stat-card__label">
                tasti premuti
                <InfoDot text="Totale di caratteri digitati, corretti ed errati insieme." />
              </span>
            </div>

            <div className="stat-card">
              <span className="stat-card__value">{result.timeElapsedSeconds}s</span>
              <span className="stat-card__label">
                durata
                <InfoDot text="Tempo totale del test, dall'inizio del countdown alla fine dei 30 secondi." />
              </span>
            </div>
          </div>

          <GlowButton
            variant="primary"
            className="results-screen__home-btn"
            onClick={onRestart}
          >
            <span className="btn__prompt">$</span> torna alla home
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
