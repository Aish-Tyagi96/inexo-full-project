import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '@/assets/images/brand/inexo-logo.svg'
import { Container } from '@/components/common/Container'

const navItems = [
  { label: 'Products', path: '/products' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'News & Events', path: '/news-events' },
  { label: 'Contact us', path: '/contact-us' },
  { label: 'Careers', path: '/careers' },
]

const isPathActive = (itemPath, currentPath) => {
  if (!currentPath) return false
  if (itemPath === '/products') {
    return currentPath.startsWith('/products') || currentPath.startsWith('/product')
  }
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navListRef = useRef(null)
  const linkRefs = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const [hoveredPath, setHoveredPath] = useState(null)

  const targetPath = hoveredPath || pathname

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = navItems.find((item) => (
        item.path && targetPath && isPathActive(item.path, targetPath)
      ))

      if (!activeItem?.path || !navListRef.current) {
        setIndicatorStyle((current) => ({ ...current, opacity: 0 }))
        return
      }

      const activeLink = linkRefs.current[activeItem.path]

      if (!activeLink) {
        setIndicatorStyle((current) => ({ ...current, opacity: 0 }))
        return
      }

      const navRect = navListRef.current.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)

    if (document.fonts) {
      document.fonts.ready.then(updateIndicator)
    }

    const timer = setTimeout(updateIndicator, 150)

    return () => {
      window.removeEventListener('resize', updateIndicator)
      clearTimeout(timer)
    }
  }, [targetPath])

  return (
    <header className="relative z-50 border-b border-[#d8d8d8] bg-[#f5f5f5]">
      <Container className="flex h-[82px] items-center justify-between gap-6 sm:h-[96px] lg:h-[126px]">
        <Link aria-label="Inexo Home" className="shrink-0" to="/">
          <img alt="Inexo logo" className="h-[64px] w-[64px] object-contain sm:h-[78px] sm:w-[78px] lg:h-[104px] lg:w-[104px]" src={logo} />
        </Link>

        <nav aria-label="Primary navigation" className="hidden flex-1 justify-center md:flex">
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[10px] h-[6px] rounded-full bg-[#FFB400] transition-[left,width,opacity] duration-300 ease-in-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />
            <ul 
              className="flex items-center gap-[28px] md:gap-[34px] lg:gap-[45px] xl:gap-[56px] 2xl:gap-[76px]" 
              ref={navListRef}
              onMouseLeave={() => setHoveredPath(null)}
            >
            {navItems.map((item) => (
              <li key={item.label}>
                {item.path ? (
                  <NavLink
                    className={({ isActive }) => {
                      const active = isActive || isPathActive(item.path, pathname)
                      return `nav-menu-item-text relative inline-flex h-[82px] items-center transition-[color,opacity] duration-200 hover:opacity-70 sm:h-[96px] lg:h-[126px] ${
                        active ? 'text-brand-blue is-active' : ''
                      }`
                    }}
                    ref={(element) => {
                      linkRefs.current[item.path] = element
                    }}
                    to={item.path}
                    onMouseEnter={() => setHoveredPath(item.path)}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <a className="nav-menu-item-text transition-opacity duration-200 hover:opacity-70" href="#">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            </ul>
          </div>
        </nav>

        <button
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          className="relative w-6 h-6 md:hidden focus:outline-none"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          <span
            className={`absolute top-1 left-0 block w-full h-0.5 bg-[#1f1f1f] transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`absolute top-1/2 left-0 block w-full h-0.5 bg-[#1f1f1f] -translate-y-1/2 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute bottom-1 left-0 block w-full h-0.5 bg-[#1f1f1f] transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </Container>

      <div
        className={`absolute inset-x-0 top-full md:hidden transition-opacity duration-300 ease-in-out ${
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className={`origin-top overflow-hidden border-t border-[#dddddd] bg-[#f8f8f8] shadow-[0_18px_40px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out ${
          menuOpen ? 'scale-y-100' : 'scale-y-0'
        }`}>
          <Container className="py-4">
            <ul className="flex flex-col gap-3 text-lg text-[#1f1f1f]">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.path ? (
                    <NavLink
                      className={({ isActive }) => {
                        const active = isActive || isPathActive(item.path, pathname)
                        return `block rounded-[10px] px-2 py-2 font-medium transition-colors duration-200 ${
                          active ? 'bg-white text-brand-blue' : 'hover:bg-white/80'
                        }`
                      }}
                      onClick={() => setMenuOpen(false)}
                      to={item.path}
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <a className="block rounded-[10px] px-2 py-2 font-medium transition-colors duration-200 hover:bg-white/80" href="#" onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </div>
    </header>
  )
}