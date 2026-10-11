import { CircleCheck, CircleAlert, Info, TriangleAlert, X } from "lucide-react"

const variants = {
  info: { icon: Info, color: "border-primary/40 text-primary" },
  success: {
    icon: CircleCheck,
    color: "border-emerald-700/50 text-emerald-800",
  },
  warning: { icon: TriangleAlert, color: "border-amber-700/50 text-amber-900" },
  error: { icon: CircleAlert, color: "border-rose-700/50 text-rose-800" },
}

export function Alert({
  variant = "info",
  title,
  children,
  onDismiss,
  className = "",
}) {
  const { icon: Icon, color } = variants[variant] || variants.info
  return (
    <div
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      aria-atomic="true"
      className={`flex items-start gap-3 border-l-2 py-2 pl-4 text-[12px] leading-6 ${color} ${className}`}
    >
      <Icon aria-hidden="true" size={17} className="mt-1 shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <p className="font-medium">{title}</p>}
        <div className="text-foreground">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss message"
          className="rounded-sm p-2 transition-colors hover:bg-secondary"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export function InlineError({ id, children, className = "" }) {
  return (
    <p
      id={id}
      role="alert"
      className={`flex items-start gap-2 text-[11px] leading-5 text-rose-800 ${className}`}
    >
      <CircleAlert size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}
