export const PRODUCTION_CONFIG = {
  // Blockchain Configuration
  NETWORK: {
    chainId: 1, // Ethereum Mainnet
    name: 'Ethereum',
    rpcUrls: [
      'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      'https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'
    ]
  },
  
  // Smart Contract Addresses
  CONTRACTS: {
    SWAP_ROUTER: '0x...',  // Uniswap V2 Router
    LENDING_POOL: '0x...',  // AAVE Lending Pool
    STAKING_CONTRACT: '0x...'
  },
  
  // API Endpoints
  API: {
    BASE_URL: 'https://api.defiplatform.com/v1',
    PRICE_ORACLE: 'https://api.coingecko.com/api/v3',
    ANALYTICS: 'https://analytics.defiplatform.com'
  },
  
  // Security Configuration
  SECURITY: {
    MIN_TRANSACTION_AMOUNT: 0.01, // ETH
    MAX_TRANSACTION_AMOUNT: 100, // ETH
    RATE_LIMIT: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  },
  
  // Feature Flags
  FEATURES: {
    LENDING: true,
    SWAP: true,
    PORTFOLIO_TRACKING: true,
    STAKING: false // Coming soon
  }
}
