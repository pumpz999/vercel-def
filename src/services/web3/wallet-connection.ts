import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

class WalletConnectionService {
  private static instance: WalletConnectionService
  
  // Supported Chains
  private supportedChainIds = [1, 137, 56] // Ethereum, Polygon, BSC

  // Connectors
  public injected = new InjectedConnector({
    supportedChainIds: this.supportedChainIds
  })

  public walletConnect = new WalletConnectConnector({
    rpc: {
      1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      137: 'https://polygon-rpc.com',
      56: 'https://bsc-dataseed.binance.org/'
    },
    qrcode: true,
    pollingInterval: 12000
  })

  // Singleton Pattern
  public static getInstance(): WalletConnectionService {
    if (!WalletConnectionService.instance) {
      WalletConnectionService.instance = new WalletConnectionService()
    }
    return WalletConnectionService.instance
  }

  // Connect Wallet
  async connectWallet(connector: any) {
    try {
      const connection = await connector.activate()
      const provider = new Web3Provider(connection.provider)
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      return {
        provider,
        signer,
        address
      }
    } catch (error) {
      console.error('Wallet Connection Error', error)
      throw error
    }
  }

  // Disconnect Wallet
  async disconnectWallet(connector: any) {
    try {
      await connector.deactivate()
    } catch (error) {
      console.error('Wallet Disconnection Error', error)
    }
  }

  // Validate Network
  async validateNetwork(requiredChainId: number) {
    try {
      const provider = new Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      
      if (network.chainId !== requiredChainId) {
        await this.switchNetwork(requiredChainId)
      }
    } catch (error) {
      console.error('Network Validation Error', error)
      throw error
    }
  }

  // Switch Network
  async switchNetwork(chainId: number) {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      })
    } catch (switchError: any) {
      // If network not added, prompt to add
      if (switchError.code === 4902) {
        await this.addNetwork(chainId)
      }
    }
  }

  // Add Network
  async addNetwork(chainId: number) {
    const networkConfig = {
      1: {
        chainName: 'Ethereum Mainnet',
        rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
      },
      // Add other network configurations
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig[chainId]]
      })
    } catch (error) {
      console.error('Add Network Error', error)
    }
  }
}
