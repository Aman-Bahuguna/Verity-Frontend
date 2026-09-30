import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  ArrowUpRight,
  Asterisk,
  FileText,
  Upload,
  CornerDownLeft,
  ShieldCheck,
  BookOpen,
} from "lucide-react"
import Eyebrow from "../components/Eyebrow"
import { steps } from "../constants"

export default function HowItWorksSection({ onOpenStudy }) {
  const [step, setStep] = useState(0)
  const reduce = useReducedMotion()

  return (
    <section
      id="how-it-works"
      className="flex min-h-svh flex-col justify-center bg-secondary px-6 py-28 md:px-12 lg:h-svh lg:min-h-0 lg:px-16 lg:pt-28 lg:pb-12"
    >
      <div className="mx-auto w-full max-w-[1472px]">
        <Eyebrow number="03">HOW IT WORKS</Eyebrow>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
          <h2
            data-reveal="true"
            className="font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-[1.04] lg:text-[clamp(3.3rem,min(5.3vw,8svh),6rem)]"
          >
            From a question
            <br />
            to an <span className="italic">understanding.</span>
          </h2>
          <p
            data-reveal="true"
            className="max-w-[260px] pb-2 text-[13px] leading-6 text-muted-foreground"
          >
            Three simple steps. Your own material.
            <br />A clearer way forward.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:mt-8 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div
            data-reveal="true"
            role="tablist"
            aria-orientation="vertical"
            aria-label="How Verity works"
            className="border-t border-border"
          >
            {steps.map((item, index) => (
              <button
                role="tab"
                aria-selected={step === index}
                aria-controls="step-preview"
                id={`step-tab-${index}`}
                tabIndex={step === index ? 0 : -1}
                key={item.title}
                onClick={() => setStep(index)}
                onKeyDown={(event) => {
                  if (
                    [
                      "ArrowDown",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowLeft",
                      "Home",
                      "End",
                    ].includes(event.key)
                  ) {
                    event.preventDefault()
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : (index +
                              (["ArrowUp", "ArrowLeft"].includes(event.key)
                                ? 2
                                : 1)) %
                            3
                    setStep(next)
                    document.getElementById(`step-tab-${next}`)?.focus()
                  }
                }}
                className="group flex w-full gap-6 border-b border-border py-6 text-left"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors ${
                    step === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  0{index + 1}
                </span>
                <div className="flex-1">
                  <h3
                    className={`font-display text-[29px] transition-colors ${
                      step === index
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <AnimatePresence initial={false}>
                    {step === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 max-w-[340px] overflow-hidden text-[13px] leading-6 text-muted-foreground"
                      >
                        {item.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <ArrowUpRight
                  size={17}
                  className={`mt-3 transition-transform ${
                    step === index ? "rotate-45" : "opacity-30"
                  }`}
                />
              </button>
            ))}
          </div>

          <div data-reveal="true" className="relative px-2 pb-4 pt-3 sm:px-7">
            <div className="absolute inset-4 rotate-[-4deg] border border-primary/15 bg-background/40" />
            <div className="absolute inset-4 rotate-[3deg] border border-primary/15 bg-background/70" />
            <div
              id="step-preview"
              role="tabpanel"
              aria-labelledby={`step-tab-${step}`}
              className="relative min-h-[360px] border border-border bg-card p-6 shadow-[0_16px_40px_-25px_rgba(24,40,66,0.2)] sm:p-9 lg:p-7"
            >
              <div className="flex items-center justify-between border-b border-border pb-5">
                <span className="flex items-center gap-2 font-display text-xl">
                  <Asterisk size={17} />
                  The study desk
                </span>
                <span className="text-[9px] tracking-widest text-muted-foreground">
                  0{step + 1} / 03
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pt-6"
                >
                  {step === 0 ? (
                    <>
                      <div className="flex items-center justify-center gap-3 py-4">
                        {["PDF", "PPTX", "DOCX"].map((format) => (
                          <div
                            key={format}
                            className="flex h-24 w-20 flex-col items-center justify-center gap-3 border border-border bg-background"
                          >
                            <FileText size={25} strokeWidth={1} />
                            <span className="text-[9px] tracking-widest">
                              {format}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={onOpenStudy}
                        className="mt-4 flex w-full flex-col items-center gap-3 border border-dashed border-primary/35 bg-secondary/40 p-5 transition-colors hover:bg-secondary"
                      >
                        <Upload size={19} strokeWidth={1.2} />
                        <span className="text-xs">
                          A whole course. One place.
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                          Try adding your material ↗
                        </span>
                      </button>
                    </>
                  ) : step === 1 ? (
                    <>
                      <p className="text-[10px] tracking-widest text-muted-foreground">
                        START WITH WHAT YOU WONDER
                      </p>
                      <p className="mt-7 font-display text-[31px] leading-[1.2]">
                        What is the time complexity
                        <br />
                        of merge sort?
                      </p>
                      <div className="mt-8 flex items-center gap-2 text-[10px] text-primary">
                        <span className="size-1.5 rounded-full bg-primary" />
                        Searching your course material
                      </div>
                      <button
                        onClick={() => setStep(2)}
                        className="mt-6 flex w-full items-center justify-between border-t border-border pt-4 text-xs"
                      >
                        See the grounded answer
                        <CornerDownLeft size={17} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center gap-2 text-[9px] tracking-widest text-primary">
                        <ShieldCheck size={14} />
                        GROUNDED IN YOUR MATERIAL
                      </div>
                      <p className="font-display text-[23px] leading-[1.4]">
                        Merge sort takes{" "}
                        <span className="bg-accent/60 px-1">
                          O(n log n)
                        </span>{" "}
                        time in all cases. It divides the array in half
                        recursively and merges at each level.
                      </p>
                      <button
                        onClick={onOpenStudy}
                        className="mt-6 flex w-full items-center justify-between border-t border-border pt-4 text-[11px]"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen size={14} />
                          Data Structures · Ch. 3, p. 47
                        </span>
                        <ArrowUpRight size={15} />
                      </button>
                      <p className="mt-4 text-[9px] text-muted-foreground">
                        Illustrative answer from sample material
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
