import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import Navbar from './components/Navbar'

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'))
const Swap = React.lazy(() => import('./pages/Swap'))
const Lending = React.lazy(() => import('./pages/Lending'))
const Portfolio = React.lazy(() => import('./pages/Portfolio'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
})

const { chains, publicClient } = getDefaultWallets({
  appName: 'DeFi Platform',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
})

const config = createConfig({
  autoConnect: true,
  publicClient
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains}>
            <BrowserRouter>
              <div className="min-h-screen bg-defi-background">
                <Navbar />
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/swap" element={<Swap />} />
                    <Route path="/lending" element={<Lending />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                  </Routes>
                </Suspense>
              </div>
            </BrowserRouter>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
