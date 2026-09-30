import { BookOpen } from "lucide-react"

export default function Seal() {
  return (
    <div
      className="absolute -left-12 top-[49%] z-10 hidden size-[112px] -rotate-12 items-center justify-center rounded-full bg-accent shadow-sm lg:flex"
      aria-label="Grounded in your material"
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <path
            id="seal-circle"
            d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
          />
        </defs>
        <text fill="currentColor" fontSize="8.5" letterSpacing="2.3">
          <textPath href="#seal-circle" startOffset="1%">
            GROUNDED IN YOUR MATERIAL · ALWAYS ·{" "}
          </textPath>
        </text>
        <circle
          cx="60"
          cy="60"
          r="33"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.35"
        />
      </svg>
      <BookOpen size={27} strokeWidth={1.1} />
    </div>
  )
}
