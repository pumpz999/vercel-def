import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

// Admin Dashboard Types
interface User {
  id: string
  walletAddress: string
  email?: string
  role: 'user' | 'admin'
  createdAt: Date
}

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalTransactions: number
  totalValueLocked: number
}

const Admin: React.FC = () => {
  const { address, isConnected } = useAccount()
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0,
    totalValueLocked: 0
  })

  // Simulated admin access check
  const isAdmin = address?.toLowerCase() === process.env.VITE_ADMIN_WALLET?.toLowerCase()

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      // Placeholder for actual API call
      setUsers([
        {
          id: '1',
          walletAddress: '0x1234...',
          email: 'user@example.com',
          role: 'user',
          createdAt: new Date()
        }
      ])

      setStats({
        totalUsers: 1000,
        activeUsers: 500,
        totalTransactions: 5000,
        totalValueLocked: 1500000
      })
    }

    if (isAdmin) {
      fetchDashboardData()
    }
  }, [isAdmin])

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
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {Object.entries(stats).map(([key, value]) => (
            <div 
              key={key} 
              className="bg-white shadow-md rounded-lg p-6 text-center"
            >
              <h3 className="text-gray-600 uppercase text-sm mb-2">
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </h3>
              <div className="text-3xl font-bold text-blue-600">
                {typeof value === 'number' 
                  ? value.toLocaleString() 
                  : value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">User Management</h2>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Wallet Address</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.walletAddress}</td>
                  <td className="p-3">{user.email || 'N/A'}</td>
                  <td className="p-3">
                    <span className={`
                      px-2 py-1 rounded text-xs
                      ${user.role === 'admin' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                      }
                    `}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin
