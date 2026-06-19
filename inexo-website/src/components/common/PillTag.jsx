import React from 'react'

export function PillTag({ children, as = 'h1', className = '', ...props }) {
  const Tag = as
  return (
    <Tag className={["pill-tag", className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Tag>
  )
}

export default PillTag
