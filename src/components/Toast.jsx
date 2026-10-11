import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { AnimatePresence, motion } from "motion/react"
import { Alert } from "./Alert"

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const nextId = useRef(0)
  const dismiss = useCallback(
    (id) => setItems((current) => current.filter((item) => item.id !== id)),
    [],
  )
  const toast = useCallback((options) => {
    const id = ++nextId.current
    setItems((current) => [...current.slice(-2), { ...options, id }])
    return id
  }, [])
  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <section
        aria-label="Notifications"
        className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-3"
      >
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <ToastMessage key={item.id} item={item} dismiss={dismiss} />
          ))}
        </AnimatePresence>
      </section>
    </ToastContext.Provider>
  )
}

function ToastMessage({ item, dismiss }) {
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const duration = item.duration ?? 6000
    if (paused || duration <= 0) return
    const timer = window.setTimeout(() => dismiss(item.id), duration)
    return () => window.clearTimeout(timer)
  }, [item, dismiss, paused])
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="pointer-events-auto border border-border bg-background p-4 shadow-lg"
    >
      <Alert
        title={item.title}
        variant={item.variant}
        onDismiss={() => dismiss(item.id)}
      >
        {item.message}
      </Alert>
    </motion.div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used inside ToastProvider")
  return context
}
