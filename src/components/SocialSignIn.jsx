import { Tooltip } from "./Tooltip"

export function SocialSignIn() {
  return (
    <div className="auth-support mt-7">
      <div className="grid grid-cols-2 gap-3">
        {["Google", "GitHub"].map((provider) => (
          <Tooltip key={provider} content="Coming soon">
            <button
              type="button"
              aria-disabled="true"
              aria-label={`Continue with ${provider}, coming soon`}
              className="flex w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-sm border border-border px-3 py-3 text-[12px] text-muted-foreground/75 transition-colors hover:border-primary/40 hover:bg-secondary/40 focus-visible:border-primary"
            >
              {provider === "Google" ? (
                <span
                  aria-hidden="true"
                  className="font-sans text-lg font-semibold leading-none"
                >
                  G
                </span>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-[17px] fill-current"
                >
                  <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222v3.293c0 .32.216.694.825.576C20.565 22.296 24 17.797 24 12.5 24 5.87 18.627.5 12 .5Z" />
                </svg>
              )}
              {provider}
            </button>
          </Tooltip>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        <span>or continue with email</span>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
    </div>
  )
}
