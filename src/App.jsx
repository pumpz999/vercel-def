import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Swap from './pages/Swap'
import Lending from './pages/Lending'
import Portfolio from './pages/Portfolio'

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
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <BrowserRouter>
          <div className="min-h-screen bg-defi-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/swap" element={<Swap />} />
              <Route path="/lending" element={<Lending />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
