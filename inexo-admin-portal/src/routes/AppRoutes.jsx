import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const AuthUsersPage = lazy(() => import('@/pages/AuthUsersPage'))
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const MediaFormsPage = lazy(() => import('@/pages/MediaFormsPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const NewsEventsPage = lazy(() => import('@/pages/NewsEventsPage'))

function RouteLoader() {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <CircularProgress />
    </Stack>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route element={<Navigate replace to="/dashboard" />} index />
            <Route element={<DashboardPage />} path="/dashboard" />
            <Route element={<AuthUsersPage />} path="/auth-users" />
            <Route element={<CatalogPage />} path="/catalog" />
            <Route element={<NewsEventsPage />} path="/news-events" />
            <Route element={<MediaFormsPage />} path="/media-forms" />
            <Route element={<SettingsPage />} path="/settings" />
          </Route>
        </Route>
        <Route element={<Navigate replace to="/dashboard" />} path="*" />
      </Routes>
    </Suspense>
  )
}
