import { useEffect, useRef, useState } from "react"
import { InlineError, SocialSignIn } from "../../components"
import {
  AuthField,
  PasswordField,
  AuthSubmit,
  AuthSwitch,
  AuthNotice,
} from "./AuthFields"

export default function SignUp() {
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const confirmationInput = useRef(null)
  const mismatch = confirmation.length > 0 && confirmation !== password

  useEffect(() => {
    confirmationInput.current?.setCustomValidity(
      mismatch ? "Your passwords do not match." : "",
    )
  }, [mismatch])

  return (
    <div>
      <p className="auth-form-description text-[10px] font-medium tracking-[0.16em] text-muted-foreground">
        JOIN THE CONVERSATION
      </p>
      <h1
        tabIndex={-1}
        className="auth-form-title mt-4 font-display text-[clamp(2.4rem,3.2vw,3.1rem)] leading-[1.08] focus:outline-none"
      >
        Create your account.
      </h1>
      <p className="auth-form-description mt-4 max-w-[350px] text-[13px] leading-6 text-muted-foreground">
        Your own space for course material, thoughtful questions, and answers
        you can trust.
      </p>
      <SocialSignIn />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
        }}
        onChange={() => setSubmitted(false)}
        className="mt-7 space-y-4"
      >
        <AuthField
          id="signup-name"
          name="name"
          label="Full name"
          number="01"
          autoComplete="name"
          placeholder="Your full name"
          required
          maxLength={100}
        />
        <AuthField
          id="signup-email"
          name="email"
          label="Email address"
          number="02"
          type="email"
          autoComplete="email"
          placeholder="you@university.edu"
          required
          maxLength={254}
        />
        <PasswordField
          id="signup-password"
          name="password"
          label="Password"
          number="03"
          autoComplete="new-password"
          placeholder="Create a password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          hint="At least 8 characters. A longer password is even better."
        />
        <PasswordField
          id="signup-confirmation"
          name="confirmation"
          label="Confirm password"
          number="04"
          autoComplete="new-password"
          placeholder="Enter your password again"
          required
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          inputRef={confirmationInput}
          aria-invalid={mismatch || undefined}
          aria-describedby={mismatch ? "password-mismatch" : undefined}
        />
        {mismatch && (
          <InlineError id="password-mismatch">
            Your passwords don't match yet.
          </InlineError>
        )}
        <div className="pt-1">
          <AuthSubmit>Create account</AuthSubmit>
        </div>
        {submitted && (
          <AuthNotice>
            Your form is ready. Account creation needs a connected
            authentication service, so no account has been created. Your details
            have not been sent or stored.
          </AuthNotice>
        )}
      </form>
      <AuthSwitch signUp />
    </div>
  )
}
