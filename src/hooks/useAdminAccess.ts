import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

export const useAdminAccess = () => {
  const { address, isConnected } = useAccount()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if connected wallet is admin
    const checkAdminAccess = () => {
      const adminWallets = [
        process.env.VITE_ADMIN_WALLET?.toLowerCase(),
        // Add additional admin wallets here
      ]

      if (isConnected && address) {
        setIsAdmin(
          adminWallets.includes(address.toLowerCase())
        )
      } else {
        setIsAdmin(false)
      }
    }

    checkAdminAccess()
  }, [address, isConnected])

  return { isAdmin }
}
