import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAccount, useProvider, useSigner } from 'wagmi'

export function useWeb3Contract(contractAddress: string, contractABI: any) {
  const { address } = useAccount()
  const provider = useProvider()
  const { data: signer } = useSigner()

  const [contract, setContract] = useState<ethers.Contract | null>(null)

  useEffect(() => {
    if (signer) {
      const contractInstance = new ethers.Contract(
        contractAddress, 
        contractABI, 
        signer
      )
      setContract(contractInstance)
    }
  }, [signer, contractAddress, contractABI])

  const executeContractMethod = async (
    methodName: string, 
    args: any[] = []
  ) => {
    if (!contract) {
      throw new Error('Contract not initialized')
    }

    try {
      const transaction = await contract[methodName](...args)
      const receipt = await transaction.wait()
      return receipt
    } catch (error) {
      console.error(`Error executing ${methodName}:`, error)
      throw error
    }
  }

  return { 
    contract, 
    executeContractMethod 
  }
}
