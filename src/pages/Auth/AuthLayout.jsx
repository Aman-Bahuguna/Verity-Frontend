import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { gsap } from "gsap"
import { ArrowLeft, Asterisk, ArrowUpRight, BookOpen } from "lucide-react"

export default function AuthLayout() {
  const root = useRef(null)
  const animation = useRef(null)
  const previousPath = useRef(null)
  const location = useLocation()
  const isSignIn = location.pathname === "/sign-in" || location.pathname === "/login"
  const [transitioning, setTransitioning] = useState(false)
  const storyLines = isSignIn
    ? ["Pick up the", "thread of a", "good idea."]
    : ["Curiosity is", "a good place", "to begin."]

  useLayoutEffect(() => {
    const element = root.current
    if (!element) return
    const words = element.querySelectorAll(".auth-word")
    const digit = element.querySelector(".auth-chapter-digit")
    const headings = element.querySelectorAll(
      ".auth-form-title, .auth-form-description",
    )
    const fields = element.querySelectorAll(".auth-field")
    const lines = element.querySelectorAll(".auth-field-line")
    const support = element.querySelectorAll(
      ".auth-submit, .auth-support, .auth-story-note",
    )
    const ink = element.querySelector(".auth-ink-path")
    const changed =
      previousPath.current !== null &&
      previousPath.current !== location.pathname
    previousPath.current = location.pathname
    animation.current?.kill()
    window.scrollTo(0, 0)
    document.title = `${isSignIn ? "Sign in" : "Sign up"} · Verity`
    const finish = () => {
      setTransitioning(false)
      if (changed)
        element.querySelector("h1")?.focus({ preventScroll: true })
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduced.matches) {
      gsap.set([...words, ...headings, ...fields, ...lines, ...support], {
        clearProps: "transform,opacity,visibility",
      })
      if (digit) gsap.set(digit, { clearProps: "transform" })
      if (ink) gsap.set(ink, { strokeDashoffset: 0 })
      finish()
      return
    }
    setTransitioning(true)
    const timeline = gsap.timeline({ onComplete: finish })
    timeline.fromTo(
      words,
      { yPercent: 112, rotation: 2 },
      {
        yPercent: 0,
        rotation: 0,
        duration: 0.75,
        stagger: 0.055,
        ease: "power3.out",
      },
      0,
    )
    if (digit)
      timeline.fromTo(
        digit,
        { yPercent: isSignIn ? 110 : -110 },
        { yPercent: 0, duration: 0.8, ease: "power3.inOut" },
        0,
      )
    timeline
      .fromTo(
        headings,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.18,
      )
      .fromTo(
        fields,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.3,
      )
      .fromTo(
        lines,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.65, stagger: 0.07, ease: "power2.inOut" },
        0.38,
      )
      .fromTo(
        support,
        { autoAlpha: 0, y: 6 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
        },
        0.7,
      )
    if (ink) {
      const length = typeof ink.getTotalLength === "function" ? ink.getTotalLength() : 340
      timeline.fromTo(
        ink,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
        0.38,
      )
    }
    animation.current = timeline
    function reduceMotion() {
      if (reduced.matches) timeline.progress(1).kill()
    }
    reduced.addEventListener("change", reduceMotion)
    return () => {
      timeline.kill()
      reduced.removeEventListener("change", reduceMotion)
    }
  }, [location.pathname, isSignIn])

  useEffect(
    () => () => {
      document.title = "Verity · Academic Study Space"
    },
    [],
  )

  return (
    <div
      ref={root}
      className="flex min-h-svh flex-col overflow-x-clip bg-background px-6 text-foreground sm:px-12 xl:px-16"
    >
      <a
        href="#account-form"
        className="fixed left-4 top-4 z-50 -translate-y-24 bg-primary px-5 py-3 text-primary-foreground focus:translate-y-0"
      >
        Skip to account form
      </a>
      <header className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 border-b border-border py-6 lg:py-8">
        <Link
          to="/"
          aria-label="Verity home"
          className="inline-flex items-center gap-2.5"
        >
          <Asterisk size={27} strokeWidth={1.35} />
          <span className="font-display text-[34px] leading-none">verity.</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-9">
          <Link
            to="/"
            className="group hidden items-center gap-2 text-[11px] text-muted-foreground transition-colors hover:text-primary md:flex"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Verity
          </Link>
          <nav
            aria-label="Account pages"
            className="flex gap-5 text-[11px] sm:gap-6"
          >
            {[
              { path: "/sign-up", label: "Sign up" },
              { path: "/sign-in", label: "Sign in" },
            ].map((item) => {
              const active =
                location.pathname === item.path ||
                (item.path === "/sign-in" && location.pathname === "/login") ||
                (item.path === "/sign-up" && location.pathname === "/signup")
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(event) => {
                    if (transitioning) event.preventDefault()
                  }}
                  aria-current={active ? "page" : undefined}
                  aria-disabled={transitioning || undefined}
                  className={`relative py-2 transition-colors ${
                    active
                      ? "font-medium text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-px bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-[1200px] flex-1 gap-12 py-10 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-14 xl:gap-28">
        <aside
          aria-label="The Verity notebook"
          className="relative hidden flex-col justify-between lg:flex"
        >
          <div>
            <div className="flex items-center gap-5">
              <div
                aria-hidden="true"
                className="flex h-[72px] overflow-hidden font-display text-[70px] leading-none text-primary"
              >
                <span>0</span>
                <span className="auth-chapter-digit block">
                  {isSignIn ? "2" : "1"}
                </span>
              </div>
              <div className="border-l border-border pl-5">
                <p className="text-[9px] font-medium tracking-[0.16em] text-muted-foreground">
                  THE VERITY NOTEBOOK
                </p>
                <p className="mt-2 text-[12px]">
                  {isSignIn
                    ? "A thought, continued."
                    : "A fresh page for your ideas."}
                </p>
              </div>
            </div>
            <h2
              className="mt-7 font-display text-[clamp(3rem,min(5vw,8.2svh),5.5rem)] leading-[1.03] tracking-[-0.012em]"
              aria-label={storyLines.join(" ")}
            >
              {storyLines.map((line, index) => (
                <span
                  key={`${location.pathname}-${index}`}
                  className="block overflow-hidden pb-1"
                  aria-hidden="true"
                >
                  {line.split(" ").map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      className={`auth-word mr-[0.22em] inline-block last:mr-0 ${
                        index === 2 ? "italic text-primary" : ""
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <svg
              viewBox="0 0 340 30"
              className="mt-1 h-7 w-[70%] max-w-[340px] text-primary"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="auth-ink-path"
                d="M 3 20 C 68 8, 169 8, 325 12 M 56 26 C 148 16, 240 17, 337 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <p className="auth-story-note mt-8 max-w-[400px] text-[13px] leading-7 text-muted-foreground">
              {isSignIn
                ? "Return to the ideas you've been working through. Your coursework is the starting point. Your curiosity takes it from there."
                : "A place for your textbooks, lecture notes, and the questions in between. Study in your own words. Understand at your own pace."}
            </p>
          </div>
          <div className="auth-story-note mt-8 flex items-start gap-5 border-t border-border pt-6">
            <BookOpen
              size={23}
              strokeWidth={1.2}
              className="mt-1 shrink-0 text-primary"
            />
            <div>
              <p className="text-[9px] tracking-[0.13em] text-muted-foreground">
                THE IDEA BEHIND VERITY
              </p>
              <p className="mt-3 max-w-[420px] font-display text-[22px] leading-[1.4]">
                Every answer should bring you closer to{" "}
                <span className="italic text-primary">your understanding.</span>
              </p>
              <p className="mt-3 text-[10px] text-muted-foreground">
                Your material. Your knowledge. Always grounded.
              </p>
            </div>
          </div>
        </aside>

        <section
          id="account-form"
          aria-label={
            isSignIn ? "Sign in to Verity" : "Create your Verity account"
          }
          className="mx-auto w-full max-w-[410px] lg:min-h-[590px]"
        >
          <Outlet context={{ transitioning }} />
        </section>
      </main>
      <footer className="mx-auto flex w-full max-w-[1360px] flex-col justify-between gap-3 border-t border-border py-5 text-[10px] leading-5 text-muted-foreground sm:flex-row sm:items-center">
        <span className="flex items-center gap-2">
          Made for curious minds.
          <ArrowUpRight size={12} />
        </span>
        <p className="max-w-[430px] sm:text-right">
          Authentication preview. Use sample details.
          <br className="sm:hidden" /> No details are sent or stored.
        </p>
      </footer>
    </div>
  )
}
