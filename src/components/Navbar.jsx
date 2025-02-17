import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-defi-primary">
          DeFi Platform
        </Link>
        <div className="flex space-x-4 items-center">
          <Link to="/swap" className="hover:text-defi-primary">Swap</Link>
          <Link to="/lending" className="hover:text-defi-primary">Lending</Link>
          <Link to="/portfolio" className="hover:text-defi-primary">Portfolio</Link>
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}
