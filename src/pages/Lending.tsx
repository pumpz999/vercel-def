import React, { useState } from 'react'
import { useAccount } from 'wagmi'

const Lending: React.FC = () => {
  const { address, isConnected } = useAccount()
  const [selectedToken, setSelectedToken] = useState('ETH')
  const [lendAmount, setLendAmount] = useState('')

  const tokens = [
    { symbol: 'ETH', apy: 4.5 },
    { symbol: 'USDC', apy: 7.2 },
    { symbol: 'DAI', apy: 6.8 },
    { symbol: 'USDT', apy: 6.5 }
  ]

  const handleLend = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    // Lending logic would go here
    console.log('Lending', lendAmount, selectedToken)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
          Lending Platform
        </h2>

        {!isConnected ? (
          <div className="text-center text-gray-600">
            Connect your wallet to start lending
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Select Token</label>
              <div className="grid grid-cols-2 gap-4">
                {tokens.map(token => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token.symbol)}
                    className={`p-3 rounded-lg border ${
                      selectedToken === token.symbol 
                        ? 'bg-green-100 border-green-500' 
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    <div className="font-bold">{token.symbol}</div>
                    <div className="text-sm text-gray-600">APY: {token.apy}%</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Lending Amount</label>
              <input 
                type="number" 
                value={lendAmount}
                onChange={(e) => setLendAmount(e.target.value)}
                placeholder="Enter amount to lend"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <button 
              onClick={handleLend}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Lend Tokens
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

export default Lending
