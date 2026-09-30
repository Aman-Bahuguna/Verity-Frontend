import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * AnimatedGridPattern
 *
 * Props:
 *  width        — cell width  (default 45)
 *  height       — cell height (default 45)
 *  numSquares   — # of auto-flashing squares (default 45)
 *  maxOpacity   — peak opacity of an auto-flash square (default 0.4)
 *  duration     — seconds per flash cycle (default 3.5)
 *  repeatDelay  — stagger offset between squares (default 0.8)
 *  className    — extra classes forwarded to the <svg>
 *
 * Hover interaction:
 *  - Listens to window mousemove so hovering ANYWHERE in the hero section
 *    (including over text/buttons) seamlessly lights up the grid cell under the cursor
 *  - Primary cell lights up in Pale Oak / Lavender glow
 *  - 8 surrounding neighbour cells form a soft secondary glow ring
 */
export function AnimatedGridPattern({
  width = 45,
  height = 45,
  numSquares = 45,
  maxOpacity = 0.4,
  duration = 3.5,
  repeatDelay = 0.8,
  className = "",
}) {
  const id = useId();
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  /* ── 1. Measure SVG container ───────────────── */
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setDimensions({ width: el.clientWidth, height: el.clientHeight })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cols       = Math.ceil(dimensions.width  / width)  + 1;
  const rows       = Math.ceil(dimensions.height / height) + 1;
  const totalCells = cols * rows;

  /* ── 2. Auto-flashing squares ───────────────── */
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    if (!totalCells) return;
    setSquares(
      Array.from({ length: numSquares }, () => Math.floor(Math.random() * totalCells))
    );
  }, [totalCells, numSquares]);

  const handleAnimEnd = useCallback((idx) => {
    setSquares((prev) => {
      const next = [...prev];
      next[idx] = Math.floor(Math.random() * totalCells);
      return next;
    });
  }, [totalCells]);

  /* ── 3. Global Mouse Hover Ripple Tracking ──── */
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const col = Math.floor((e.clientX - rect.left) / width);
        const row = Math.floor((e.clientY - rect.top)  / height);
        setHoveredCell({ col, row });
      } else {
        setHoveredCell(null);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [width, height]);

  /* Neighbours: the 8 cells surrounding the hovered cell */
  const neighbours = hoveredCell
    ? [
        [-1, -1], [0, -1], [1, -1],
        [-1,  0],           [1,  0],
        [-1,  1], [0,  1], [1,  1],
      ].map(([dc, dr]) => ({ col: hoveredCell.col + dc, row: hoveredCell.row + dr }))
    : [];

  /* ── 4. Render ──────────────────────────────── */
  return (
    <svg
      ref={svgRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <defs>
        {/* Grid-line pattern */}
        <pattern
          id={`${id}-grid`}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="var(--color-border-bright)"
            strokeOpacity={0.65}
            strokeWidth={1}
          />
        </pattern>

        {/* Glow filter for the hovered cell */}
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Grid lines ── */}
      <rect width="100%" height="100%" fill={`url(#${id}-grid)`} />

      {/* ── Auto-flash squares ── */}
      {squares.map((cellIndex, i) => {
        const col = cellIndex % cols;
        const row = Math.floor(cellIndex / cols);
        return (
          <rect
            key={`flash-${i}-${cellIndex}`}
            x={col * width}
            y={row * height}
            width={width}
            height={height}
            fill="var(--color-accent-warm)"
            opacity={0}
            onAnimationEnd={() => handleAnimEnd(i)}
            style={{
              animation: `agp-flash ${duration}s ${(repeatDelay * i) % (duration * 2)}s ease-in-out forwards`,
              "--agp-max": maxOpacity,
            }}
          />
        );
      })}

      {/* ── Hover: neighbour ring (soft Dusk Blue secondary glow) ── */}
      {neighbours.map(({ col, row }, i) => (
        <rect
          key={`nb-${i}-${col}-${row}`}
          x={col * width}
          y={row * height}
          width={width}
          height={height}
          fill="var(--color-primary-light)"
          className="agp-neighbour"
        />
      ))}

      {/* ── Hover: primary cell (bright Pale Oak / Lavender glow) ── */}
      {hoveredCell && (
        <rect
          x={hoveredCell.col * width}
          y={hoveredCell.row * height}
          width={width}
          height={height}
          fill="var(--color-accent-warm)"
          filter={`url(#${id}-glow)`}
          className="agp-hover-cell"
        />
      )}

      <style>{`
        /* Auto-flash animation */
        @keyframes agp-flash {
          0%   { opacity: 0; }
          45%  { opacity: var(--agp-max, 0.4); }
          100% { opacity: 0; }
        }

        /* Hovered primary cell */
        .agp-hover-cell {
          opacity: 0.85;
          transition: opacity 60ms ease-out;
        }

        /* Neighbour ring */
        .agp-neighbour {
          opacity: 0.35;
          transition: opacity 120ms ease-out;
        }
      `}</style>
    </svg>
  );
}
