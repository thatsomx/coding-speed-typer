import type { Duration } from '../types';

interface HowToPlayModalProps {
  duration: Duration;
  onClose: () => void;
}

export default function HowToPlayModal({ duration, onClose }: HowToPlayModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-to-play-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__tab-bar">
          <span className="modal__tab">how_to_play.md</span>
          <button className="modal__close" onClick={onClose} aria-label="Chiudi">
            ×
          </button>
        </div>

        <div className="modal__body">
          <h2 id="how-to-play-title">Come si gioca</h2>
          <ol className="modal__steps">
            <li>Scegli il linguaggio di programmazione.</li>
            <li>Scegli la durata del test (30, 45, 60 o 120 secondi).</li>
            <li>Premi <strong>start</strong>: partirà un conto alla rovescia di 3 secondi.</li>
            <li>Riscrivi esattamente le righe di codice che appaiono a schermo.</li>
            <li>
              Gli errori verranno evidenziati in{' '}
              <strong className="modal__highlight-red">rosso</strong>.
            </li>
            <li>Hai <strong>{duration} secondi</strong>: alla fine vedrai WPM, precisione ed errori.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
