import React from 'react'
import { useAccount } from 'wagmi'

const Portfolio: React.FC = () => {
  const { address, isConnected } = useAccount()

  const portfolioData = [
    { token: 'ETH', amount: 2.5, price: 1850, change: 3.2 },
    { token: 'USDC', amount: 5000, price: 1, change: 0.1 },
    { token: 'DAI', amount: 3200, price: 1, change: -0.5 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          Crypto Portfolio
        </h1>

        {!isConnected ? (
          <div className="text-center text-gray-600 bg-white p-8 rounded-xl shadow-lg">
            Connect your wallet to view your portfolio
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Wallet Overview</h2>
                <p className="text-gray-600">Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Token</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">24h Change</th>
                  <th className="p-3">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.map((item) => (
                  <tr key={item.token} className="border-b">
                    <td className="p-3 font-bold">{item.token}</td>
                    <td className="p-3">{item.amount}</td>
                    <td className="p-3">${item.price.toLocaleString()}</td>
                    <td className={`p-3 ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}%
                    </td>
                    <td className="p-3">${(item.amount * item.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-center">
              <div className="bg-purple-50 p-4 rounded-lg inline-block">
                <span className="text-xl font-bold text-purple-700">
                  Total Portfolio Value: $
                  {portfolioData.reduce((total, item) => total + (item.amount * item.price), 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Swap
