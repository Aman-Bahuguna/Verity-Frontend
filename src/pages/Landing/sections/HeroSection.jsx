import { motion, useReducedMotion } from "motion/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  BookOpen,
  ShieldCheck,
  Asterisk,
} from "lucide-react"
import Action from "../components/Action"
import Seal from "../components/Seal"

export default function HeroSection({ onStartAsking, navigate }) {
  const reduce = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col px-6 pt-[112px] md:px-12 lg:h-svh lg:min-h-0 lg:px-16 lg:pt-[105px]"
    >
      <div className="mx-auto grid w-full max-w-[1472px] flex-1 items-center gap-12 py-10 md:grid-cols-[1.08fr_1fr] md:gap-14 lg:gap-20 lg:py-3">
        <div className="relative z-10">
          <h1 className="font-display text-[clamp(3rem,15vw,4.6rem)] leading-[0.94] tracking-[-0.025em] md:text-[clamp(4.1rem,min(7.7vw,12svh),8rem)]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">Your</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-line block">textbooks.</span>
            </span>
            <span className="block overflow-hidden pb-3">
              <span className="hero-line block italic text-primary">
                Answered.
              </span>
            </span>
          </h1>
          <p className="hero-detail mt-6 max-w-[340px] text-[14px] leading-[1.85] text-muted-foreground lg:mt-4">
            Ask in your own words. Get clear answers from your actual course
            material—with the exact page and section cited.
          </p>
          <div className="hero-detail mt-8 flex flex-wrap items-center gap-7 lg:mt-6">
            <Action onClick={onStartAsking}>Start asking</Action>
            <a
              href="#how-it-works"
              onClick={(event) => {
                event.preventDefault()
                navigate("how-it-works")
              }}
              className="group flex items-center gap-2 border-b border-border py-2 text-xs font-medium"
            >
              See how it works
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
          <div className="hero-detail mt-6 flex items-center gap-2 text-[10px] tracking-[0.035em] text-muted-foreground lg:mt-4">
            <ShieldCheck size={13} strokeWidth={1.5} />
            Your material. Your knowledge. Always grounded.
          </div>
        </div>

        <div className="relative mb-12 w-full md:mb-0">
          <div className="hero-photo relative h-[440px] w-full overflow-hidden rounded-t-[160px] md:h-[min(62svh,610px)] md:rounded-t-[220px] lg:h-[min(62svh,610px,calc(100svh-300px))]">
            <img
              src="/images/textbooks-study-desk.jpg"
              alt="Academic textbooks, an open book, handwritten study notes, and highlighters arranged on a study desk"
              data-parallax="true"
              className="h-[116%] w-full object-cover object-[center_55%] brightness-95"
              fetchPriority="high"
              onLoad={() => ScrollTrigger.refresh()}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
            <div className="absolute bottom-9 right-7 hidden text-right text-background xl:block">
              <p className="text-[9px] tracking-[0.1em]">
                ROOTED IN REAL KNOWLEDGE.
              </p>
            </div>
          </div>

          <Seal />

          <motion.button
            whileHover={reduce ? {} : { rotate: 0, y: -5 }}
            onClick={onStartAsking}
            className="answer-note absolute -bottom-9 -left-3 w-[84%] rotate-[-3deg] border border-border/60 bg-card p-5 text-left shadow-[0_12px_45px_-15px_rgba(24,40,66,0.25)] md:-left-12 md:w-[90%] lg:-left-14 lg:max-w-[420px]"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[9px] font-medium tracking-widest text-muted-foreground">
                A QUESTION WORTH ASKING
              </span>
              <ArrowUpRight size={14} />
            </div>
            <p className="mt-3 font-display text-[21px] leading-tight">
              "What is the time complexity of merge sort?"
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[9px]">
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} />
                Data Structures · Ch. 3, p. 47
              </span>
              <span className="flex items-center gap-1 text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                SOURCE VERIFIED
              </span>
            </div>
          </motion.button>
          <p className="mt-3 text-right text-[9px] tracking-[0.11em] text-muted-foreground">
            01 — A NEW CHAPTER IN LEARNING
          </p>
        </div>
      </div>

      <div className="hero-detail mx-auto mb-7 grid w-full max-w-[1472px] grid-cols-3 items-center gap-4 border-t border-border pt-6 lg:grid-cols-[1.35fr_1fr_1fr_1fr_auto]">
        <div className="hidden items-center gap-4 lg:flex">
          <Asterisk size={32} strokeWidth={1} />
          <p className="text-[9px] leading-5 tracking-[0.12em]">
            GOOD QUESTIONS DESERVE
            <br />
            GROUNDED ANSWERS.
          </p>
        </div>
        {[
          { value: "85%+", label: "TARGET GROUNDEDNESS" },
          { value: "< 5s", label: "AVERAGE RESPONSE" },
          { value: "3", label: "SUPPORTED FORMATS" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="lg:border-l lg:border-border lg:pl-8"
          >
            <p className="font-display text-[33px] leading-none">
              {stat.value}
            </p>
            <p className="mt-2 text-[8px] tracking-[0.1em] text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
        <button
          onClick={() => navigate("features")}
          aria-label="Scroll to why Verity"
          className="hidden size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary lg:flex"
        >
          <ArrowDown size={16} />
        </button>
      </div>
    </section>
  )
}
