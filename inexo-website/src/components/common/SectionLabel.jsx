export function SectionLabel({ children, className = '', textClassName = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[10px] bg-brand-yellow px-7 py-2.5 ${className}`.trim()}
      style={{ transform: 'skewX(20deg)' }}
    >
      <span
        className={`section-label-text inline-flex ${textClassName}`.trim()}
        style={{ transform: 'skewX(-20deg)' }}
      >
        {children}
      </span>
    </span>
  )
}
