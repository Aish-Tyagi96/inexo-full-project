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

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center text-[var(--color-copy)]">
      <div className="card-panel rounded-[2rem] px-8 py-6">
        <p className="eyebrow text-xs text-[var(--color-cyan)]">Booting Experience</p>
        <p className="mt-3 text-lg text-white">Loading the React 19 starter...</p>
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
