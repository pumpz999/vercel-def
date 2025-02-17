import { ethers } from 'hardhat'
import { PlatformFeeManager } from '../typechain-types'

async function initializeAdminPanel() {
  // Get deployer account
  const [deployer] = await ethers.getSigners()

  // Deploy PlatformFeeManager
  const PlatformFeeManagerFactory = await ethers.getContractFactory('PlatformFeeManager')
  const platformFeeManager = await PlatformFeeManagerFactory.deploy() as PlatformFeeManager

  // Initial Configuration
  await platformFeeManager.initialize(
    // Treasury Wallet
    deployer.address,
    // Development Fund Wallet
    deployer.address,
    // Staking Rewards Wallet
    deployer.address
  )

  // Set Initial Service Fees
  await platformFeeManager.updateServiceFees({
    swapFee: 30,           // 0.3%
    lendingFee: 20,        // 0.2%
    stakingFee: 10,        // 0.1%
    bridgingFee: 50,       // 0.5%
    liquidityProvisionFee: 15 // 0.15%
  })

  // Set Initial Revenue Allocation
  await platformFeeManager.updateRevenueAllocation({
    treasuryWallet: deployer.address,
    developmentFund: deployer.address,
    stakingRewards: deployer.address,
    treasuryShare: 50,     // 50%
    developmentShare: 30,  // 30%
    stakingRewardsShare: 20 // 20%
  })

  console.log('Admin Panel Initialized Successfully')
  console.log('Platform Fee Manager Address:', platformFeeManager.address)
}

initializeAdminPanel()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
