import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@/app/store'
import { queryClient } from '@/lib/queryClient'

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}
