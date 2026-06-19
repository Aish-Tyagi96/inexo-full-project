import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/common/Footer'
import { Nav } from '@/components/common/Nav'

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
