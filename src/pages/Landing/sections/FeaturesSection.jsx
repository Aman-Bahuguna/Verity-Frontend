import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ShieldCheck, Minus, Plus } from "lucide-react"
import Eyebrow from "../components/Eyebrow"
import { features } from "../constants"

export default function FeaturesSection() {
  const [openFeature, setOpenFeature] = useState(0)
  const reduce = useReducedMotion()

  return (
    <section
      id="features"
      className="dark flex min-h-svh flex-col justify-center bg-background px-6 py-28 text-foreground md:px-12 lg:h-svh lg:min-h-0 lg:px-16 lg:pt-28 lg:pb-12"
    >
      <div className="mx-auto grid w-full max-w-[1472px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <div>
          <Eyebrow number="02" className="text-accent">
            WHY VERITY
          </Eyebrow>
          <h2
            data-reveal="true"
            className="mt-10 font-display text-[clamp(2.8rem,11vw,4rem)] leading-[1.03] lg:text-[clamp(3.2rem,min(4.8vw,8svh),5.5rem)]"
          >
            Less searching.
            <br />
            More <span className="italic text-accent">understanding.</span>
          </h2>
          <p
            data-reveal="true"
            className="mt-8 max-w-[345px] text-sm leading-7 text-muted-foreground"
          >
            Built for trustworthy academic answers. Not the whole
            internet—just the knowledge that matters to your course.
          </p>
          <div data-reveal="true" className="mt-12 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full border border-border">
              <ShieldCheck size={21} strokeWidth={1.2} />
            </div>
            <div>
              <p className="text-xs">Confidence comes from the source.</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Verified knowledge. No guesswork.
              </p>
            </div>
          </div>
        </div>

        <div data-reveal="true" className="border-t border-border">
          {features.map((feature, index) => (
            <div key={feature.title} className="border-b border-border">
              <button
                onClick={() =>
                  setOpenFeature(openFeature === index ? -1 : index)
                }
                aria-expanded={openFeature === index}
                aria-controls={`feature-${index}`}
                className="group flex w-full items-center gap-5 py-5 text-left lg:py-4"
              >
                <span className="self-start pt-1 text-[10px] text-muted-foreground">
                  0{index + 1}
                </span>
                <span
                  className={`flex-1 font-display text-[25px] transition-colors group-hover:text-accent ${
                    openFeature === index ? "text-accent" : ""
                  }`}
                >
                  {feature.title}
                </span>
                {openFeature === index ? (
                  <Minus size={16} strokeWidth={1.2} />
                ) : (
                  <Plus size={16} strokeWidth={1.2} />
                )}
              </button>
              <AnimatePresence initial={false}>
                {openFeature === index && (
                  <motion.div
                    id={`feature-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-9 pr-6">
                      <p className="text-[9px] tracking-[0.14em] text-accent uppercase">
                        {feature.label}
                      </p>
                      <p className="mt-3 max-w-md text-[13px] leading-7 text-muted-foreground">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div
        data-reveal="true"
        className="mx-auto mt-16 flex w-full max-w-[1472px] items-center justify-between border-t border-border pt-5 text-[9px] tracking-widest text-muted-foreground lg:mt-10"
      >
        <span>DESIGNED FOR DEEPER THINKING</span>
        <span>NOT JUST FASTER ANSWERS</span>
      </div>
    </section>
  )
}
