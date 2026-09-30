import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

export default function Action({
  children,
  onClick,
  light = false,
  className = "",
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  return (
    <motion.button
      onClick={onClick}
      animate={position}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onMouseMove={(event) => {
        if (reduce) return
        const box = event.currentTarget.getBoundingClientRect()
        setPosition({
          x: (event.clientX - box.left - box.width / 2) * 0.08,
          y: (event.clientY - box.top - box.height / 2) * 0.1,
        })
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      className={`group inline-flex items-center justify-between gap-8 rounded-full py-4 pl-7 pr-5 text-[13px] font-medium transition-colors ${
        light
          ? "bg-accent text-foreground hover:bg-background"
          : "bg-primary text-primary-foreground hover:bg-foreground"
      } ${className}`}
    >
      {children}
      <ArrowUpRight
        size={18}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </motion.button>
  )
}
