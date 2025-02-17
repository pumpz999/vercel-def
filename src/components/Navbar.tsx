import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link, useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/swap', label: 'Swap' },
    { path: '/lending', label: 'Lending' },
    { path: '/portfolio', label: 'Portfolio' }
  ]

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          DeFi Platform
        </Link>
        <div className="flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`
                text-md font-medium transition-colors duration-300
                ${location.pathname === item.path 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'}
              `}
            >
              {item.label}
            </Link>
          ))}
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
