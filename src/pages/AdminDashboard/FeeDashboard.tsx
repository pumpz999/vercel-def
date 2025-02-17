import React, { useState, useEffect } from 'react'
import { useFeeCapture } from '../../hooks/useFeeCapture'
import { useAccount } from 'wagmi'

const FeeDashboard: React.FC = () => {
  const { getTotalFeesCollected } = useFeeCapture()
  const { address } = useAccount()

  const [feeTotals, setFeeTotals] = useState({
    totalSwapFees: 0,
    totalLendingFees: 0,
    totalStakingFees: 0,
    totalBridgingFees: 0,
    totalLiquidityFees: 0
  })

  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    const fetchFeeTotals = async () => {
      try {
        const collectedFees = await getTotalFeesCollected()
        setFeeTotals(collectedFees)

        // Calculate total revenue
        const total = Object.values(collectedFees).reduce(
          (sum, fee) => sum + Number(fee), 
          0
        )
        setTotalRevenue(total)
      } catch (error) {
        console.error('Fee totals retrieval failed', error)
      }
    }

    fetchFeeTotals()
  }, [getTotalFeesCollected])

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Platform Fee Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Total Revenue</h2>
          <p className="text-4xl font-bold text-green-600">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Fee Breakdown */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Fee Collection Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(feeTotals).map(([service, amount]) => (
              <div 
                key={service} 
                className="bg-gray-50 p-4 rounded-lg"
              >
                <p className="text-gray-600 capitalize">
                  {service.replace('total', '').replace('Fees', ' Fees')}
                </p>
                <p className="text-xl font-bold">
                  ${Number(amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeeDashboard</boltArtifact>

Comprehensive Fee Ecosystem Benefits:

🚀 For Admins:
- Transparent fee tracking
- Real-time revenue insights
- Configurable fee structures
- Multi-service fee collection

💰 Revenue Streams:
1. Swap Service Fees
2. Lending Service Fees
3. Staking Service Fees
4. Bridging Fees
5. Liquidity Provision Fees

🔒 Security Features:
- Upgradeable contract design
- Owner-controlled configurations
- Transparent fee distribution
- Comprehensive event logging

Implementation Strategy:
1. Deploy Fee Manager Contract
2. Integrate with Platform Services
3. Configure Revenue Allocation
4. Implement Frontend Tracking

Would you like me to elaborate on any specific aspect of the fee capture ecosystem?