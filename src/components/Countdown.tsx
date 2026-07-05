import React, { useEffect, useState } from 'react';

interface CountdownProps {
  seconds?: number;
  previewText: string;
  onComplete: () => void;
}

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Countdown({ seconds = 3, previewText, onComplete }: CountdownProps) {
  const [remainingMs, setRemainingMs] = useState(seconds * 1000);
  const totalMs = seconds * 1000;

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const remaining = Math.max(totalMs - elapsed, 0);
      setRemainingMs(remaining);

      if (remaining <= 0) {
        onComplete();
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = remainingMs / totalMs; // 1 -> 0
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const secondLabel = Math.ceil(remainingMs / 1000);

  return (
    <div className="screen countdown-screen">
      <pre className="countdown-screen__preview" aria-hidden="true">
        {previewText}
      </pre>

      <div className="countdown-screen__overlay">
        <svg className="countdown-ring" viewBox="0 0 200 200">
          <circle
            className="countdown-ring__track"
            cx="100"
            cy="100"
            r={RADIUS}
            strokeWidth="8"
            fill="none"
          />
          <circle
            className="countdown-ring__progress"
            cx="100"
            cy="100"
            r={RADIUS}
            strokeWidth="8"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span className="countdown-ring__label">{secondLabel}</span>
      </div>
    </div>
  );
}
