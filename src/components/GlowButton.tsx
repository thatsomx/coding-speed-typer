import React from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function GlowButton({
  variant = 'secondary',
  className = '',
  children,
  onMouseMove,
  ...rest
}: GlowButtonProps) {
  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--glow-x', `${x}%`);
    e.currentTarget.style.setProperty('--glow-y', `${y}%`);
    onMouseMove?.(e);
  }

  return (
    <button
      className={`btn btn--${variant} ${className}`.trim()}
      onMouseMove={handleMouseMove}
      {...rest}
    >
      <span className="btn__glow" aria-hidden="true" />
      <span className="btn__content">{children}</span>
    </button>
  );
}
