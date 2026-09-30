import { ScrollTrigger } from "gsap/ScrollTrigger"
import Eyebrow from "../components/Eyebrow"

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="relative grid min-h-svh overflow-hidden bg-terracotta text-background lg:h-svh lg:min-h-0 lg:grid-cols-[1.3fr_0.7fr]"
    >
      <div className="relative z-10 flex flex-col justify-center px-6 py-28 md:px-12 lg:pt-28 lg:pb-12 lg:pl-16 lg:pr-20">
        <Eyebrow number="04" className="text-background/80">
          OUR PHILOSOPHY
        </Eyebrow>
        <div
          data-reveal="true"
          className="mt-8 font-display text-[100px] leading-[0.6] text-accent"
        >
          "
        </div>
        <blockquote
          data-reveal="true"
          className="mt-5 max-w-[750px] font-display text-[clamp(2.5rem,4.1vw,4.8rem)] leading-[1.15] lg:text-[clamp(2.4rem,min(4.1vw,5.8svh),4.8rem)]"
        >
          The answer in front of you is backed by a{" "}
          <span className="italic text-accent">real page</span> in a real
          document. And you should always be able to see that at a glance.
        </blockquote>
        <div data-reveal="true" className="mt-10 flex items-center gap-4 lg:mt-8">
          <span className="h-px w-8 bg-background/50" />
          <p className="text-[9px] tracking-[0.17em]">
            THE VERITY DESIGN VISION
          </p>
        </div>
        <p
          data-reveal="true"
          className="mt-12 max-w-[365px] text-[13px] leading-7 text-background/85 lg:mt-8"
        >
          Because the best kind of technology doesn't do the thinking for
          you. It gives your curiosity somewhere trustworthy to go.
        </p>
      </div>

      <div className="relative hidden h-full overflow-hidden lg:block">
        <img
          src="/images/annotated-course-notes.jpg"
          alt="Handwritten mathematics course notes with highlighted equations and a student annotating the page"
          loading="lazy"
          data-parallax="true"
          onLoad={() => ScrollTrigger.refresh()}
          className="h-[116%] w-full object-cover object-[40%_center] brightness-90"
        />
        <div className="absolute inset-0 bg-terracotta/10 mix-blend-multiply" />
        <p className="absolute bottom-9 right-9 text-[9px] tracking-[0.15em] text-white">
          KNOWLEDGE, IN GOOD HANDS.
        </p>
      </div>
    </section>
  )
}
