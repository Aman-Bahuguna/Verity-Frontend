import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import {
  X,
  FileText,
  Check,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Upload,
  Send,
} from "lucide-react"
import Eyebrow from "./Eyebrow"
import { sampleAnswer } from "../constants"

export default function StudyDialog({ onClose }) {
  const dialog = useRef(null)
  const input = useRef(null)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState(null)
  const [asked, setAsked] = useState("")
  const [files, setFiles] = useState([])
  const [citation, setCitation] = useState(false)
  const [error, setError] = useState("")
  const isExample = /merge|complexity|sort/i.test(asked)

  useEffect(() => {
    dialog.current?.showModal()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = oldOverflow
    }
  }, [])

  function ask(value) {
    if (!value.trim()) return
    setAsked(value.trim())
    setAnswer(
      /merge|complexity|sort/i.test(value)
        ? sampleAnswer
        : "This interactive preview only contains a sample passage about merge sort. Try asking about its time complexity. Answers from your own uploaded material need a connected document-indexing service.",
    )
    setQuestion("")
    setCitation(false)
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="study-title"
      aria-describedby="study-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose()
      }}
      className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg bg-background p-0 text-foreground shadow-2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-6 sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>THE VERITY STUDY DESK</Eyebrow>
            <h2 id="study-title" className="mt-4 font-display text-5xl">
              A good question starts here.
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close study preview"
            className="rounded-full p-2 transition-colors hover:bg-secondary"
          >
            <X size={20} />
          </button>
        </div>
        <p
          id="study-description"
          className="mt-4 text-sm leading-relaxed text-muted-foreground"
        >
          Explore a grounded answer using our sample course material. This is an
          interactive preview, not a live AI service.
        </p>
        <div className="mt-7 flex items-center gap-3 border border-border bg-card p-4">
          <FileText size={23} strokeWidth={1.4} />
          <div className="flex-1">
            <p className="text-sm font-medium">Data Structures & Algorithms</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sample course material · Chapter 3 · Page 47
            </p>
          </div>
          <Check size={17} />
        </div>
        <button
          onClick={() => ask("What is the time complexity of merge sort?")}
          className="mt-4 flex w-full items-center justify-between gap-3 rounded-sm border border-border px-4 py-3 text-left text-xs transition-colors hover:bg-secondary"
        >
          Try: What is the time complexity of merge sort?
          <ArrowUpRight size={16} />
        </button>
        <div aria-live="polite">
          {answer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={asked}
              className="mt-6"
            >
              <p className="ml-8 rounded-sm bg-secondary p-4 text-sm">
                {asked}
              </p>
              <div className="mt-3 border-l-2 border-primary py-2 pl-4">
                <p className="text-sm leading-7">{answer}</p>
                {isExample && (
                  <button
                    onClick={() => setCitation(!citation)}
                    aria-expanded={citation}
                    className="mt-3 flex items-center gap-2 text-xs font-medium underline underline-offset-4"
                  >
                    <BookOpen size={14} />
                    Ch. 3, p. 47 · View source
                    <ChevronDown size={13} />
                  </button>
                )}
                {citation && (
                  <div className="mt-4 bg-card p-4">
                    <Eyebrow>Sample source excerpt</Eyebrow>
                    <p className="mt-3 font-display text-xl leading-relaxed">
                      "At each level of recursion, merging takes O(n) time. The
                      array can be divided log n times, giving a total running
                      time of O(n log n)."
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            ask(question)
          }}
          className="mt-6 flex items-center gap-2 border-b border-primary py-3"
        >
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            autoFocus
            aria-label="Ask a study question"
            placeholder="What would you like to understand?"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"
          />
          <button
            disabled={!question.trim()}
            aria-label="Send question"
            className="rounded-full bg-primary p-3 text-primary-foreground disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => input.current?.click()}
            className="flex items-center gap-2 text-xs hover:underline"
          >
            <Upload size={14} />
            Add your material
          </button>
          <span className="text-[10px] tracking-widest text-muted-foreground">
            PDF / PPTX / DOCX
          </span>
        </div>
        <input
          ref={input}
          type="file"
          multiple
          accept=".pdf,.pptx,.docx"
          className="hidden"
          onChange={(event) => {
            const selected = Array.from(event.target.files || [])
            const valid = selected.filter(
              (file) =>
                /\.(pdf|pptx|docx)$/i.test(file.name) &&
                file.size <= 20 * 1024 * 1024,
            )
            setFiles((previous) => [
              ...new Set([...previous, ...valid.map((file) => file.name)]),
            ])
            setError(
              valid.length !== selected.length
                ? "Use PDF, PPTX, or DOCX files up to 20 MB each."
                : "",
            )
          }}
        />
        {error && (
          <p role="alert" className="mt-3 text-xs text-terracotta">
            {error}
          </p>
        )}
        {files.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex flex-wrap gap-2">
              {files.map((file) => (
                <span
                  key={file}
                  className="inline-flex max-w-full items-center gap-2 bg-secondary px-3 py-2 text-xs"
                >
                  <span className="truncate">{file}</span>
                  <button
                    aria-label={`Remove ${file}`}
                    onClick={() =>
                      setFiles(files.filter((name) => name !== file))
                    }
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Selected locally only. Files are not uploaded or indexed in this
              preview. The answer above uses the sample material.
            </p>
          </div>
        )}
      </motion.div>
    </dialog>
  )
}
