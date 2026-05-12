import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
