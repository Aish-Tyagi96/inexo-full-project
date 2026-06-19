export function Container({ children, className = '' }) {
  const classes = ['site-container', className].filter(Boolean).join(' ')

  return <div className={classes}>{children}</div>
}
