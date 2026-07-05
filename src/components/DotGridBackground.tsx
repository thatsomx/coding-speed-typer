import React, { useEffect, useRef } from 'react';

/**
 * Griglia di pallini disegnata su canvas (performante anche con centinaia di punti).
 * I pallini vicini al cursore si ingrandiscono e si accendono di colore,
 * con un effetto a "onda" morbida che si attenua con la distanza.
 */
export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const GAP = 34;
    const BASE_RADIUS = 1.4;
    const MAX_RADIUS = 5;
    const INFLUENCE = 160;
    const DOT_COLOR = '#F7F7F7';

    let dots: { x: number; y: number }[] = [];
    let animationFrame: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      dots = [];
      const cols = Math.ceil(window.innerWidth / GAP) + 1;
      const rows = Math.ceil(window.innerHeight / GAP) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * GAP, y: r * GAP });
        }
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const { x: mx, y: my } = mouseRef.current;

      for (const dot of dots) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / INFLUENCE);
        const radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * proximity;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = DOT_COLOR;
        ctx.globalAlpha = 0.08 + proximity * 0.72;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (prefersReducedMotion) draw();
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
      if (prefersReducedMotion) draw();
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-grid-bg" aria-hidden="true" />;
}
