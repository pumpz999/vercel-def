import { useState, useCallback } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { FeeCaptureService } from '../services/fee-capture/feeCaptureService'
import { ethers } from 'ethers'

export function useFeeCapture() {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [feeCaptureService, setFeeCaptureService] = useState<FeeCaptureService | null>(null)

  // Initialize Fee Capture Service
  const initializeService = useCallback(() => {
    if (signer) {
      const service = new FeeCaptureService(signer)
      setFeeCaptureService(service)
    }
  }, [signer])

  // Collect Fee for a Service
  const collectServiceFee = useCallback(async (
    token: string, 
    amount: number, 
    serviceType: string
  ) => {
    if (!feeCaptureService || !address) {
      throw new Error('Fee capture service not initialized')
    }

    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18)

    return await feeCaptureService.collectServiceFee(
      address, 
      token, 
      amountInWei, 
      serviceType
    )
  }, [feeCaptureService, address])

  // Get Total Fees Collected
  const getTotalFeesCollected = useCallback(async () => {
    if (!feeCaptureService) {
      throw new Error('Fee capture service not initialized')
    }

    return await feeCaptureService.getTotalFeesCollected()
  }, [feeCaptureService])

  return {
    initializeService,
    collectServiceFee,
    getTotalFeesCollected
  }
}
