import React, { useState } from 'react';

interface InfoDotProps {
  text: string;
}

export default function InfoDot({ text }: InfoDotProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="info-dot-wrap">
      <button
        type="button"
        className="info-dot"
        aria-label="Maggiori informazioni su questa statistica"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
      >
        i
      </button>
      {open && (
        <span role="tooltip" className="info-dot__tooltip">
          {text}
        </span>
      )}
    </span>
  );
}
