export default function Eyebrow({
  children,
  number,
  className = "",
}) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-medium tracking-[0.16em] uppercase ${className}`}
    >
      {number && <span className="opacity-60">{number} /</span>}
      {children}
    </div>
  )
}
