import React, { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

// Comprehensive Admin Dashboard
const AdminBenefitsDashboard: React.FC = () => {
  const { address } = useAccount()
  const [dashboardData, setDashboardData] = useState({
    platformMetrics: {
      totalValueLocked: 1250000,
      dailyTransactionVolume: 500000,
      platformRevenue: {
        total: 25000,
        byService: {
          swap: 10000,
          lending: 12000,
          staking: 3000
        }
      }
    },
    userMetrics: {
      totalUsers: 5420,
      activeUsers: 2100,
      newUserAcquisition: 350
    },
    complianceMetrics: {
      kycCompletedUsers: 3200,
      suspiciousTransactions: 12,
      riskScore: 'Low'
    }
  })

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Admin Benefits Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Platform Revenue Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Platform Revenue</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600">Total Value Locked</p>
              <p className="text-3xl font-bold text-green-600">
                ${dashboardData.platformMetrics.totalValueLocked.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Daily Transaction Volume</p>
              <p className="text-xl font-bold">
                ${dashboardData.platformMetrics.dailyTransactionVolume.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Platform Revenue Breakdown</p>
              {Object.entries(dashboardData.platformMetrics.platformRevenue.byService).map(([service, revenue]) => (
                <div key={service} className="flex justify-between">
                  <span className="capitalize">{service}</span>
                  <span>${revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Metrics Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">User Metrics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Total Users</p>
              <p className="text-3xl font-bold">
                {dashboardData.userMetrics.totalUsers}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Active Users</p>
              <p className="text-xl font-bold text-blue-600">
                {dashboardData.userMetrics.activeUsers}
              </p>
            </div>
            <div>
              <p className="text-gray-600">New User Acquisition</p>
              <p className="text-xl font-bold text-green-600">
                +{dashboardData.userMetrics.newUserAcquisition}
              </p>
            </div>
          </div>
        </div>

        {/* Compliance & Risk Management */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Compliance Metrics</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">KYC Completed Users</p>
              <p className="text-3xl font-bold">
                {dashboardData.complianceMetrics.kycCompletedUsers}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Suspicious Transactions</p>
              <p className="text-xl font-bold text-red-600">
                {dashboardData.complianceMetrics.suspiciousTransactions}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Overall Risk Score</p>
              <p className="text-xl font-bold text-green-600">
                {dashboardData.complianceMetrics.riskScore}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBenefitsDashboard
