import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { goTo } from "./constants"
import Navbar from "./sections/Navbar"
import HeroSection from "./sections/HeroSection"
import FeaturesSection from "./sections/FeaturesSection"
import HowItWorksSection from "./sections/HowItWorksSection"
import PhilosophySection from "./sections/PhilosophySection"
import FooterSection from "./sections/FooterSection"
import StudyDialog from "./components/StudyDialog"
import AuthDialog from "./components/AuthDialog"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Landing() {
  const root = useRef(null)
  const [active, setActive] = useState("")
  const [studyOpen, setStudyOpen] = useState(false)
  const [authMode, setAuthMode] = useState(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".site-nav", { y: -30, opacity: 0, duration: 0.8 })
          .from(
            ".hero-line",
            { yPercent: 110, rotate: 3, duration: 1.15, stagger: 0.12 },
            "-=0.5",
          )
          .from(
            ".hero-detail",
            { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 },
            "-=0.65",
          )
          .from(
            ".hero-photo",
            { clipPath: "inset(100% 0 0 0)", duration: 1.4 },
            0.4,
          )
          .from(
            ".answer-note",
            { y: 40, rotate: -5, opacity: 0, duration: 1 },
            1.2,
          )

        gsap.utils
          .toArray("section, footer")
          .forEach((section) => {
            const elements = section.querySelectorAll("[data-reveal]")
            if (!elements.length) return
            gsap.from(elements, {
              y: 45,
              opacity: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 65%", once: true },
            })
          })

        gsap.utils
          .toArray("[data-parallax]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { yPercent: -7 },
              {
                yPercent: 7,
                ease: "none",
                scrollTrigger: {
                  trigger: element.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.5,
                },
              },
            )
          })

        gsap.from(".footer-word", {
          yPercent: 75,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: "#begin",
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1.3,
          },
        })
      })

      gsap.to(".reading-progress", {
        scaleX: 1,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      })
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener("load", refresh)

    return () => {
      context.revert()
      window.removeEventListener("load", refresh)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        }),
      { threshold: 0.35 },
    )

    document
      .querySelectorAll("section[id], footer[id]")
      .forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  function navigate(id) {
    goTo(id)
  }

  return (
    <div ref={root} className="overflow-x-clip bg-background">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-primary p-4 text-primary-foreground focus:translate-y-0"
      >
        Skip to content
      </a>

      <Navbar
        active={active}
        navigate={navigate}
        onAuthClick={(mode) => setAuthMode(mode)}
      />

      <main id="main">
        <HeroSection
          onStartAsking={() => setStudyOpen(true)}
          navigate={navigate}
        />
        <FeaturesSection />
        <HowItWorksSection onOpenStudy={() => setStudyOpen(true)} />
        <PhilosophySection />
      </main>

      <FooterSection
        onStartAsking={() => setStudyOpen(true)}
        navigate={navigate}
      />

      {studyOpen && <StudyDialog onClose={() => setStudyOpen(false)} />}

      {authMode && (
        <AuthDialog
          key={authMode}
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onModeChange={setAuthMode}
        />
      )}
    </div>
  )
}
