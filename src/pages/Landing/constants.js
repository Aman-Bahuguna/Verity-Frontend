import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import {
  Upload,
  Search,
  ShieldCheck,
} from "lucide-react"

gsap.registerPlugin(ScrollToPlugin)

export const navigation = [
  { id: "features", label: "Why Verity" },
  { id: "how-it-works", label: "How it works" },
  { id: "philosophy", label: "Our philosophy" },
]

export const features = [
  {
    title: "Answers with a paper trail.",
    label: "Source citations",
    text: "Every answer cites the exact document, chapter, and page. Follow the citation straight back to the original text. No wondering where it came from.",
  },
  {
    title: "Meaning, not just matching words.",
    label: "Semantic vector search",
    text: "Your question is matched against passages in your course material using semantic similarity—not keyword guessing. Find what you mean, even when you don't know how to phrase it.",
  },
  {
    title: "Grounded. Verified. Trustworthy.",
    label: "Grounded answers",
    text: "If your material doesn't support an answer, Verity says so. No hallucinations. No filler. Just knowledge grounded in the sources you trust.",
  },
  {
    title: "Keep the conversation going.",
    label: "Conversational follow-ups",
    text: "Ask follow-up questions naturally. Verity remembers the context so you don't have to repeat yourself. Understanding is a conversation, not a single search.",
  },
  {
    title: "Your course, beautifully organised.",
    label: "Document management",
    text: "Faculty upload PDFs, slides, and documents by subject. The system parses, chunks, and indexes them automatically. Your documents stay yours, with auth-gated access.",
  },
  {
    title: "Built to grow with you.",
    label: "Modular RAG architecture",
    text: "Swap the language model, embedding model, or vector database independently. A clean, modular foundation that stays adaptable and upgradeable.",
  },
]

export const steps = [
  {
    title: "Bring your material.",
    text: "Upload your textbooks, lecture notes, and slides. Verity parses, organises, and indexes your course material.",
    icon: Upload,
  },
  {
    title: "Follow your curiosity.",
    text: "Ask a question in your own words. Semantic search finds the relevant passages across your indexed material.",
    icon: Search,
  },
  {
    title: "Find your understanding.",
    text: "Get a clear, grounded answer with citations and verification. Go to the exact page, then keep the conversation going.",
    icon: ShieldCheck,
  },
]

export const sampleAnswer =
  "Merge sort has a time complexity of O(n log n) in all cases. It divides the array in half recursively, then merges the sorted halves at each level."

export function goTo(id) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.getElementById(id)?.scrollIntoView()
  } else {
    gsap.to(window, {
      duration: 1.3,
      scrollTo: { y: `#${id}`, offsetY: 0, autoKill: true },
      ease: "power3.inOut",
    })
  }
}
