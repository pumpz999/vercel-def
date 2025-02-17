import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

// Configuration Types
interface NetworkConfig {
  chainId: number
  name: string
  rpcUrls: string[]
  blockExplorer?: string
}

interface FeatureFlags {
  swap: boolean
  lending: boolean
  staking: boolean
  portfolio: boolean
}

interface SecuritySettings {
  minTransactionAmount: number
  maxTransactionAmount: number
  rateLimitWindowMs: number
  maxRequestsPerWindow: number
}

interface ContractAddresses {
  swapRouter: string
  lendingPool: string
  stakingContract: string
}

const AdminDashboard: React.FC = () => {
  const { address, isConnected } = useAccount()
  
  // State for different configuration sections
  const [networkConfigs, setNetworkConfigs] = useState<NetworkConfig[]>([
    {
      chainId: 1,
      name: 'Ethereum Mainnet',
      rpcUrls: [
        'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
        'https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'
      ],
      blockExplorer: 'https://etherscan.io'
    }
  ])

  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({
    swap: true,
    lending: true,
    staking: false,
    portfolio: true
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    minTransactionAmount: 0.01,
    maxTransactionAmount: 100,
    rateLimitWindowMs: 15 * 60 * 1000,
    maxRequestsPerWindow: 100
  })

  const [contractAddresses, setContractAddresses] = useState<ContractAddresses>({
    swapRouter: '0x...',
    lendingPool: '0x...',
    stakingContract: '0x...'
  })

  // Admin access check
  const isAdmin = address?.toLowerCase() === process.env.VITE_ADMIN_WALLET?.toLowerCase()

  // Save configuration
  const saveConfiguration = () => {
    try {
      // In a real-world scenario, this would call an API to update backend configuration
      localStorage.setItem('networkConfigs', JSON.stringify(networkConfigs))
      localStorage.setItem('featureFlags', JSON.stringify(featureFlags))
      localStorage.setItem('securitySettings', JSON.stringify(securitySettings))
      localStorage.setItem('contractAddresses', JSON.stringify(contractAddresses))
      
      alert('Configuration saved successfully!')
    } catch (error) {
      console.error('Configuration save error', error)
      alert('Failed to save configuration')
    }
  }

  // Add new network configuration
  const addNetworkConfig = () => {
    setNetworkConfigs([
      ...networkConfigs,
      {
        chainId: networkConfigs.length + 1,
        name: 'New Network',
        rpcUrls: [],
        blockExplorer: ''
      }
    ])
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please connect your wallet</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-red-500">
            Only authorized administrators can access this dashboard
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Admin Configuration Panel
        </h1>

        {/* Network Configurations */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Network Configurations</h2>
          {networkConfigs.map((config, index) => (
            <div key={config.chainId} className="mb-4 p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Chain ID
                  </label>
                  <input
                    type="number"
                    value={config.chainId}
                    onChange={(e) => {
                      const newConfigs = [...networkConfigs]
                      newConfigs[index].chainId = parseInt(e.target.value)
                      setNetworkConfigs(newConfigs)
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Network Name
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => {
                      const newConfigs = [...networkConfigs]
                      newConfigs[index].name = e.target.value
                      setNetworkConfigs(newConfigs)
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  RPC URLs (comma-separated)
                </label>
                <input
                  type="text"
                  value={config.rpcUrls.join(',')}
                  onChange={(e) => {
                    const newConfigs = [...networkConfigs]
                    newConfigs[index].rpcUrls = e.target.value.split(',')
                    setNetworkConfigs(newConfigs)
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addNetworkConfig}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Network Configuration
          </button>
        </div>

        {/* Feature Flags */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Feature Flags</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(featureFlags).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setFeatureFlags({
                    ...featureFlags,
                    [key]: !value
                  })}
                  className="mr-2"
                />
                <label>{key.charAt(0).toUpperCase() + key.slice(1)} Feature</label>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Min Transaction Amount
              </label>
              <input
                type="number"
                value={securitySettings.minTransactionAmount}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  minTransactionAmount: parseFloat(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Transaction Amount
              </label>
              <input
                type="number"
                value={securitySettings.maxTransactionAmount}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  maxTransactionAmount: parseFloat(e.target.value)
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Contract Addresses */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Contract Addresses</h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(contractAddresses).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setContractAddresses({
                    ...contractAddresses,
                    [key]: e.target.value
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Configuration */}
        <div className="text-center">
          <button
            onClick={saveConfiguration}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
