import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { Asterisk, X, Eye, EyeOff, ArrowUpRight } from "lucide-react"
import Eyebrow from "./Eyebrow"

export default function AuthDialog({
  mode,
  onClose,
  onModeChange,
}) {
  const dialog = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState("")
  const isSignUp = mode === "sign-up"

  useEffect(() => {
    dialog.current?.showModal()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = oldOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialog}
      aria-labelledby="auth-title"
      aria-describedby="auth-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose()
      }}
      className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-[480px] overflow-y-auto rounded-lg bg-background p-0 text-foreground shadow-2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-9"
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-3xl">
            <Asterisk size={23} strokeWidth={1.4} />
            verity.
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account form"
            className="rounded-full p-2 transition-colors hover:bg-secondary"
          >
            <X size={19} />
          </button>
        </div>
        <Eyebrow className="mt-9 text-muted-foreground">
          YOUR PERSONAL STUDY SPACE
        </Eyebrow>
        <h2
          id="auth-title"
          className="mt-3 font-display text-[44px] leading-tight"
        >
          {isSignUp ? "A new chapter awaits." : "Welcome back."}
        </h2>
        <p
          id="auth-description"
          className="mt-3 text-sm leading-6 text-muted-foreground"
        >
          {isSignUp
            ? "Create your account for a clearer way to learn."
            : "Sign in to your courses, questions, and conversations."}
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setNotice(
              isSignUp
                ? "Your form is valid. Account creation needs a connected authentication service. No account has been created and your details have not been sent."
                : "Your form is valid. Sign-in needs a connected authentication service. You have not been signed in and your details have not been sent.",
            )
          }}
          onChange={() => setNotice("")}
          className="mt-7 space-y-5"
        >
          {isSignUp && (
            <div>
              <label
                htmlFor="auth-name"
                className="mb-2 block text-xs font-medium"
              >
                Full name
              </label>
              <input
                id="auth-name"
                name="name"
                autoComplete="name"
                autoFocus
                required
                maxLength={100}
                placeholder="Your full name"
                className="w-full rounded-sm border border-border bg-card px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="auth-email"
              className="mb-2 block text-xs font-medium"
            >
              Email address
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus={!isSignUp}
              required
              placeholder="you@university.edu"
              className="w-full rounded-sm border border-border bg-card px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="auth-password"
              className="mb-2 block text-xs font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                minLength={isSignUp ? 8 : undefined}
                aria-describedby={isSignUp ? "password-hint" : undefined}
                placeholder={
                  isSignUp ? "Create a password" : "Enter your password"
                }
                className="w-full rounded-sm border border-border bg-card py-3 pl-4 pr-12 text-sm transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-muted-foreground transition-colors hover:text-primary"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {isSignUp && (
              <p
                id="password-hint"
                className="mt-2 text-[11px] text-muted-foreground"
              >
                Use at least 8 characters.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="group flex w-full items-center justify-between rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground"
          >
            {isSignUp ? "Create account" : "Sign in"}
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
          {notice && (
            <p
              role="status"
              className="rounded-sm border border-border bg-secondary p-4 text-xs leading-6"
            >
              {notice}
            </p>
          )}
        </form>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-muted-foreground">
            {isSignUp ? "Already have an account?" : "New to Verity?"}
          </span>
          <button
            type="button"
            onClick={() => onModeChange(isSignUp ? "sign-in" : "sign-up")}
            className="font-medium underline underline-offset-4"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
        <p className="mt-7 border-t border-border pt-4 text-center text-[10px] leading-5 text-muted-foreground">
          Account-form preview. Authentication is not connected yet.
          <br />
          Use sample details; nothing is sent or stored.
        </p>
      </motion.div>
    </dialog>
  )
}
