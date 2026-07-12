import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from '@/components/common/SiteLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AllProductsPage = lazy(() => import('@/pages/AllProductsPage'))
const ProductCategories = lazy(() => import('@/pages/ProductCategories'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const SolutionsPage = lazy(() => import('@/pages/SolutionsPage'))
const NewsEventsPage = lazy(() => import('@/pages/NewsEventsPage'))
const CareersPage = lazy(() => import('@/pages/CareersPage'))
const ContactUsPage = lazy(() => import('@/pages/ContactUsPage'))

import logo from '@/assets/images/brand/inexo-logo.svg'

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center bg-[#120f12]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Outer glowing spinner */}
          <div className="h-20 w-20 animate-spin rounded-full border-2 border-[var(--color-cyan)] border-t-transparent opacity-80 shadow-[0_0_20px_rgba(135,213,255,0.2)]"></div>
          {/* Centered pulsing logo */}
          <img 
            src={logo} 
            alt="Inexo Logo" 
            className="absolute h-8 w-auto animate-pulse" 
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-cyan)]">Inexo</h3>
          <p className="text-xs text-[var(--color-copy)] opacity-70">Loading experience...</p>
        </div>
      </div>
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:categorySlug" element={<ProductCategories />} />
          <Route path="/products/:categorySlug/:subCategorySlug" element={<ProductsPage />} />
          <Route path="/product/:productSlug" element={<ProductDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
