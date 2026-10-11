import { useEffect, useId, useRef } from "react"
import { X } from "lucide-react"
import { motion } from "motion/react"

let openDialogs = 0
let previousOverflow = ""

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className = "",
}) {
  const ref = useRef(null)
  const id = useId()
  useEffect(() => {
    if (!open) return
    const dialog = ref.current
    if (!dialog) return
    const focused = document.activeElement
    dialog.showModal()
    if (openDialogs++ === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
    }
    return () => {
      dialog.close()
      if (--openDialogs === 0) document.body.style.overflow = previousOverflow
      if (focused?.isConnected) focused.focus({ preventScroll: true })
    }
  }, [open])
  if (!open) return null
  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className={`fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-sm border border-border bg-background p-0 text-foreground ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="p-6 sm:p-9"
      >
        <div className="flex items-start justify-between gap-5">
          <h2
            id={`${id}-title`}
            className="font-display text-3xl leading-tight sm:text-4xl"
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 transition-colors hover:bg-secondary"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        {description && (
          <p
            id={`${id}-description`}
            className="mt-4 text-[13px] leading-6 text-muted-foreground"
          >
            {description}
          </p>
        )}
        <div className="mt-6">{children}</div>
      </motion.div>
    </dialog>
  )
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  pending = false,
  destructive = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!pending) onClose()
      }}
      title={title}
      description={description}
    >
      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <button
          type="button"
          autoFocus
          disabled={pending}
          onClick={onClose}
          className="rounded-sm px-4 py-3 text-xs transition-colors hover:bg-secondary disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={pending}
          aria-busy={pending}
          onClick={onConfirm}
          className={`rounded-sm px-5 py-3 text-xs text-white transition-opacity hover:opacity-85 disabled:opacity-50 ${
            destructive ? "bg-rose-800" : "bg-primary"
          }`}
        >
          {pending ? "Please wait…" : confirmLabel}
        </button>
      </div>
    </Dialog>
  )
}
