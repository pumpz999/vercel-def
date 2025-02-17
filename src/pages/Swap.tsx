import React, { useState } from 'react'
import { useAccount } from 'wagmi'

const Swap: React.FC = () => {
  const { address, isConnected } = useAccount()
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('USDC')
  const [amount, setAmount] = useState('')

  const tokens = ['ETH', 'USDC', 'DAI', 'USDT', 'WBTC']

  const handleSwap = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    // Swap logic would go here
    console.log('Swapping', amount, fromToken, 'to', toToken)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Token Swap
        </h2>

        {!isConnected ? (
          <div className="text-center text-gray-600">
            Connect your wallet to start swapping
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">From</label>
              <div className="flex">
                <select 
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="w-1/3 p-2 border rounded-l-lg"
                >
                  {tokens.map(token => (
                    <option key={token} value={token}>{token}</option>
                  ))}
                </select>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-2/3 p-2 border-y border-r rounded-r-lg"
                />
              </div>
            </div>

            <div className="text-center my-4">
              <button className="bg-gray-200 rounded-full p-2">
                ↓
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">To</label>
              <select 
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                {tokens.map(token => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleSwap}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Swap Tokens
            </button>

            <div className="mt-4 text-center text-gray-600">
              Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Swap
