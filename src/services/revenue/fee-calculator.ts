import { ethers } from 'ethers'

export interface TransactionFee {
  serviceName: 'swap' | 'lending' | 'staking'
  baseRate: number
  dynamicRateFactors: {
    volumeThreshold: number
    discountRate: number
  }[]
}

export class TransactionFeeService {
  private static feeStructures: TransactionFee[] = [
    {
      serviceName: 'swap',
      baseRate: 0.3, // 0.3% base swap fee
      dynamicRateFactors: [
        { volumeThreshold: 10000, discountRate: 0.2 }, // 20% discount for high volume
        { volumeThreshold: 50000, discountRate: 0.1 }  // 10% discount for very high volume
      ]
    },
    {
      serviceName: 'lending',
      baseRate: 0.2, // 0.2% lending fee
      dynamicRateFactors: [
        { volumeThreshold: 5000, discountRate: 0.15 },
        { volumeThreshold: 25000, discountRate: 0.05 }
      ]
    },
    {
      serviceName: 'staking',
      baseRate: 0.1, // 0.1% staking fee
      dynamicRateFactors: [
        { volumeThreshold: 1000, discountRate: 0.05 }
      ]
    }
  ]

  // Calculate transaction fee
  static calculateFee(
    serviceName: string, 
    transactionAmount: ethers.BigNumber
  ): { fee: ethers.BigNumber, effectiveRate: number } {
    const serviceConfig = this.feeStructures.find(
      config => config.serviceName === serviceName
    )

    if (!serviceConfig) {
      throw new Error('Invalid service')
    }

    const amountNumber = parseFloat(ethers.utils.formatEther(transactionAmount))
    
    // Find applicable discount
    const dynamicDiscount = serviceConfig.dynamicRateFactors
      .filter(factor => amountNumber >= factor.volumeThreshold)
      .reduce((maxDiscount, factor) => 
        Math.max(maxDiscount, factor.discountRate), 
        0
      )

    const effectiveRate = serviceConfig.baseRate * (1 - dynamicDiscount)
    const fee = transactionAmount.mul(
      ethers.utils.parseEther(effectiveRate.toString())
    ).div(ethers.utils.parseEther('100'))

    return { 
      fee, 
      effectiveRate 
    }
  }

  // Update fee structure (admin only)
  static updateFeeStructure(
    serviceName: string, 
    newFeeConfig: Partial<TransactionFee>
  ) {
    const index = this.feeStructures.findIndex(
      config => config.serviceName === serviceName
    )

    if (index !== -1) {
      this.feeStructures[index] = {
        ...this.feeStructures[index],
        ...newFeeConfig
      }
    }
  }
}
