import React from 'react'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

const FeatureCard: React.FC<{
  title: string, 
  description: string, 
  icon: React.ReactNode,
  link: string
}> = ({ title, description, icon, link }) => (
  <Link 
    to={link} 
    className="bg-white shadow-lg rounded-xl p-6 transform transition-all hover:scale-105 hover:shadow-xl"
  >
    <div className="flex items-center mb-4">
      <div className="mr-4 text-3xl text-defi-primary">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
)

const Home: React.FC = () => {
  const { address, isConnected } = useAccount()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            DeFi Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your all-in-one decentralized finance platform for trading, lending, and managing crypto assets.
          </p>
        </div>

        {isConnected ? (
          <div className="bg-white shadow-2xl rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}</h2>
                <p className="text-gray-600">Your wallet is connected and ready to explore DeFi</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Connect your wallet to access full platform features
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard 
            title="Swap" 
            description="Instantly swap tokens with low fees and minimal slippage"
            link="/swap"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
          />
          <FeatureCard 
            title="Lending" 
            description="Earn interest by lending your crypto assets securely"
            link="/lending"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <FeatureCard 
            title="Portfolio" 
            description="Track and manage your crypto investments"
            link="/portfolio"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powered by cutting-edge blockchain technology, our platform provides secure, 
            transparent, and efficient financial services without intermediaries.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
