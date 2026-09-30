import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Asterisk, ArrowUpRight, Menu, X } from "lucide-react"
import { navigation } from "../constants"

export default function Navbar({ active, navigate, onAuthClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (id) => {
    setMenuOpen(false)
    navigate(id)
  }

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[88px] max-w-[1600px] items-center justify-between gap-6 px-6 md:px-12 lg:px-16">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            handleNav("home")
          }}
          aria-label="Verity home"
          className="flex items-center gap-2.5"
        >
          <Asterisk size={31} strokeWidth={1.6} />
          <span className="font-display text-[37px] leading-none tracking-[-0.025em]">
            verity<span className="text-primary">.</span>
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex lg:gap-11"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault()
                handleNav(item.id)
              }}
              aria-current={active === item.id ? "location" : undefined}
              className="group relative py-3 text-[12px] font-medium"
            >
              {item.label}
              <span
                className={`absolute inset-x-0 bottom-1 h-px origin-left bg-primary transition-transform duration-300 ${
                  active === item.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onAuthClick("sign-in")}
            className="hidden py-2.5 text-xs font-medium text-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4 sm:block"
          >
            Sign in
          </button>
          <button
            onClick={() => onAuthClick("sign-up")}
            className="group hidden items-center gap-4 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-foreground sm:flex"
          >
            Sign up
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="p-2 lg:hidden"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <div className="reading-progress absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-primary" />

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <div className="flex flex-col px-6 py-6">
              {navigation.map((item) => (
                <a
                  href={`#${item.id}`}
                  key={item.id}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNav(item.id)
                  }}
                  className="flex items-center justify-between border-b border-border py-4 font-display text-3xl"
                >
                  {item.label}
                  <ArrowUpRight size={19} />
                </a>
              ))}
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onAuthClick("sign-in")
                  }}
                  className="flex-1 rounded-full border border-primary/40 px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onAuthClick("sign-up")
                  }}
                  className="flex flex-1 items-center justify-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground"
                >
                  Sign up
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
