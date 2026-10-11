import { useState } from "react"
import { SocialSignIn } from "../../components"
import {
  AuthField,
  PasswordField,
  AuthSubmit,
  AuthSwitch,
  AuthNotice,
} from "./AuthFields"

export default function SignIn() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div>
      <p className="auth-form-description text-[10px] font-medium tracking-[0.16em] text-muted-foreground">
        A THOUGHT, CONTINUED
      </p>
      <h1
        tabIndex={-1}
        className="auth-form-title mt-4 font-display text-[clamp(2.4rem,3.2vw,3.1rem)] leading-[1.08] focus:outline-none"
      >
        Welcome back.
      </h1>
      <p className="auth-form-description mt-4 max-w-[350px] text-[13px] leading-6 text-muted-foreground">
        Your courses, questions, and conversations.
        <br />
        Pick up right where your curiosity left off.
      </p>
      <SocialSignIn />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
        }}
        onChange={() => setSubmitted(false)}
        className="mt-8 space-y-5"
      >
        <AuthField
          id="signin-email"
          name="email"
          label="Email address"
          number="01"
          type="email"
          autoComplete="email"
          placeholder="you@university.edu"
          required
          maxLength={254}
        />
        <PasswordField
          id="signin-password"
          name="password"
          label="Password"
          number="02"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />
        <div className="pt-2">
          <AuthSubmit>Sign in</AuthSubmit>
        </div>
        {submitted && (
          <AuthNotice>
            Your form is ready. Sign-in needs a connected authentication
            service. You have not been signed in and your details have not been
            sent or stored.
          </AuthNotice>
        )}
      </form>
      <AuthSwitch />
    </div>
  )
}
