import { useState } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { ArrowUpRight, Eye, EyeOff } from "lucide-react"
import { Alert } from "../../components"

export function AuthField({
  label,
  number,
  inputRef,
  id,
  className = "",
  ...props
}) {
  return (
    <div className={`auth-field group ${className}`}>
      <div className="mb-1 flex items-center gap-3">
        {number && (
          <span
            aria-hidden="true"
            className="text-[9px] font-normal text-muted-foreground"
          >
            {number}
          </span>
        )}
        <label htmlFor={id} className="text-[12px] font-medium">
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          {...props}
          id={id}
          ref={inputRef}
          className="w-full border-0 border-b border-border bg-transparent py-3 text-[14px] transition-colors placeholder:text-muted-foreground/65 focus:border-primary focus:outline-none"
        />
        <span
          aria-hidden="true"
          className="auth-field-line pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-primary opacity-30 transition-opacity group-focus-within:opacity-100"
        />
      </div>
    </div>
  )
}

export function PasswordField({
  label = "Password",
  number,
  hint,
  inputRef,
  id,
  className = "",
  ...props
}) {
  const [visible, setVisible] = useState(false)
  return (
    <div className={`auth-field group ${className}`}>
      <div className="mb-1 flex items-center gap-3">
        {number && (
          <span
            aria-hidden="true"
            className="text-[9px] font-normal text-muted-foreground"
          >
            {number}
          </span>
        )}
        <label htmlFor={id} className="text-[12px] font-medium">
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          {...props}
          id={id}
          ref={inputRef}
          type={visible ? "text" : "password"}
          aria-describedby={
            [hint ? `${id}-hint` : undefined, props["aria-describedby"]]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className="w-full border-0 border-b border-border bg-transparent py-3 pr-12 text-[14px] transition-colors placeholder:text-muted-foreground/65 focus:border-primary focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-muted-foreground transition-colors hover:text-primary"
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
        <span
          aria-hidden="true"
          className="auth-field-line pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-primary opacity-30 transition-opacity group-focus-within:opacity-100"
        />
      </div>
      {hint && (
        <p
          id={`${id}-hint`}
          className="mt-2 text-[10px] text-muted-foreground"
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export function AuthSubmit({ children }) {
  const context = useOutletContext()
  const transitioning = context?.transitioning ?? false
  return (
    <button
      type="submit"
      disabled={transitioning}
      className="auth-submit group flex w-full items-center justify-between border-b border-border py-3 text-[14px] font-medium text-primary transition-colors hover:border-primary disabled:cursor-wait disabled:opacity-70"
    >
      {children}
      <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-foreground">
        <ArrowUpRight
          size={17}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </button>
  )
}

export function AuthSwitch({ signUp = false }) {
  const context = useOutletContext()
  const transitioning = context?.transitioning ?? false
  return (
    <p className="auth-support mt-6 text-[12px] text-muted-foreground">
      {signUp ? "Already have an account?" : "New to Verity?"}{" "}
      <Link
        to={signUp ? "/sign-in" : "/sign-up"}
        onClick={(event) => {
          if (transitioning) event.preventDefault()
        }}
        aria-disabled={transitioning || undefined}
        className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
      >
        {signUp ? "Sign in" : "Create an account"}
      </Link>
    </p>
  )
}

export function AuthNotice({ children }) {
  return <Alert variant="info">{children}</Alert>
}
