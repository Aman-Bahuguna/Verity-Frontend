import { Asterisk, ArrowUpRight } from "lucide-react"
import Action from "../components/Action"
import Eyebrow from "../components/Eyebrow"
import { navigation } from "../constants"

export default function FooterSection({ onStartAsking, navigate }) {
  return (
    <footer
      id="begin"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-6 pt-32 md:px-12 lg:h-svh lg:min-h-0 lg:px-16 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1472px]">
        <div className="flex items-center justify-between">
          <Eyebrow number="05">YOUR NEXT CHAPTER</Eyebrow>
          <Asterisk
            data-reveal="true"
            size={42}
            strokeWidth={1}
            className="hidden sm:block"
          />
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <h2
            data-reveal="true"
            className="font-display text-[clamp(3.4rem,12vw,5rem)] leading-[1.02] lg:text-[clamp(3.8rem,min(6.8vw,11svh),7rem)]"
          >
            A better answer.
            <br />
            <span className="italic">A brighter mind.</span>
          </h2>
          <div data-reveal="true" className="pb-2">
            <p className="mb-6 max-w-[260px] text-[13px] leading-7 text-muted-foreground">
              Join the future of academic search.
              <br />
              Ask your textbooks. Get grounded,
              <br />
              cited answers. Every time.
            </p>
            <Action onClick={onStartAsking}>
              Let's get started
            </Action>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-[1472px] lg:mt-8">
        <div className="overflow-hidden border-b border-border">
          <div
            aria-hidden="true"
            className="footer-word -mb-[0.09em] font-display text-[clamp(9rem,min(26vw,39svh),26rem)] leading-[0.85] tracking-[-0.045em]"
          >
            verity<span className="text-primary">.</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 pt-6 text-[10px] text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Verity. Made for curious minds.
          </span>
          <div className="flex gap-6">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  navigate(item.id)
                }}
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => navigate("home")}
            className="group flex items-center gap-2"
          >
            Back to the beginning
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
