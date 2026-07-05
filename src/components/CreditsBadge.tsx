import React from 'react';

/**
 * Piccolo riquadro credits fisso in basso a destra, visibile su ogni schermata.
 */
export default function CreditsBadge() {
  return (
    <a
      href="https://github.com/thatsomx"
      target="_blank"
      rel="noopener noreferrer"
      className="credits-badge"
    >
      <span className="credits-badge__label">built by</span>
      <span className="credits-badge__handle">@thatsomx</span>
    </a>
  );
}
