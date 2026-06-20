import { AppRoutes } from '@/routes/AppRoutes'
import SnackbarToast from '@/components/common/SnackbarToast'

export default function App() {
  return (
    <>
      <AppRoutes />
      <SnackbarToast />
    </>
  )
}
