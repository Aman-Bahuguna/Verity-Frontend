import { cloneElement, useId, useState } from "react"

export function Tooltip({ children, content }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <span
      className="relative block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      onClick={() => setOpen(true)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false)
          event.stopPropagation()
        }
      }}
    >
      {cloneElement(children, {
        "aria-describedby": [children.props["aria-describedby"], id]
          .filter(Boolean)
          .join(" "),
      })}
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-foreground px-3 py-2 text-[10px] tracking-[0.03em] text-background transition-[opacity,transform] duration-150 motion-reduce:transition-none ${
          open
            ? "translate-y-0 opacity-100"
            : "invisible translate-y-1 opacity-0"
        }`}
      >
        {content}
      </span>
    </span>
  )
}
