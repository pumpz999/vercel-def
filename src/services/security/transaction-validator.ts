import { BigNumber, ethers } from 'ethers'
import { PRODUCTION_CONFIG } from '../config/production'

export class TransactionValidator {
  // Validate Transaction Amount
  static validateTransactionAmount(amount: number): boolean {
    return (
      amount >= PRODUCTION_CONFIG.SECURITY.MIN_TRANSACTION_AMOUNT &&
      amount <= PRODUCTION_CONFIG.SECURITY.MAX_TRANSACTION_AMOUNT
    )
  }

  // Estimate Gas
  static async estimateGas(
    provider: ethers.providers.Provider, 
    transaction: ethers.Transaction
  ): Promise<BigNumber> {
    try {
      return await provider.estimateGas(transaction)
    } catch (error) {
      console.error('Gas Estimation Error', error)
      throw new Error('Unable to estimate gas')
    }
  }

  // Check Sufficient Balance
  static async checkSufficientBalance(
    provider: ethers.providers.Provider, 
    address: string, 
    amount: ethers.BigNumber
  ): Promise<boolean> {
    try {
      const balance = await provider.getBalance(address)
      return balance.gte(amount)
    } catch (error) {
      console.error('Balance Check Error', error)
      return false
    }
  }

  // Validate Transaction
  static async validateTransaction(
    provider: ethers.providers.Provider,
    signer: ethers.Signer,
    transaction: ethers.Transaction
  ): Promise<boolean> {
    try {
      // Validate amount
      if (!this.validateTransactionAmount(
        parseFloat(ethers.utils.formatEther(transaction.value || 0))
      )) {
        throw new Error('Transaction amount out of allowed range')
      }

      // Estimate gas
      const gasEstimate = await this.estimateGas(provider, transaction)

      // Check balance
      const signerAddress = await signer.getAddress()
      const sufficientBalance = await this.checkSufficientBalance(
        provider, 
        signerAddress, 
        transaction.value?.add(gasEstimate.mul(transaction.gasPrice || 0)) || ethers.BigNumber.from(0)
      )

      if (!sufficientBalance) {
        throw new Error('Insufficient balance for transaction')
      }

      return true
    } catch (error) {
      console.error('Transaction Validation Error', error)
      return false
    }
  }
}
