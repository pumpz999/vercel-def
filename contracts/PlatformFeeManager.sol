// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PlatformFeeManager is Initializable, OwnableUpgradeable {
    // Fee Structures for Different Services
    struct ServiceFee {
        uint256 swapFee;           // Swap service fee percentage
        uint256 lendingFee;        // Lending service fee percentage
        uint256 stakingFee;        // Staking service fee percentage
        uint256 bridgingFee;       // Cross-chain bridging fee
        uint256 liquidityProvisionFee; // Liquidity provision fee
    }

    // Revenue Sharing Configuration
    struct RevenueAllocation {
        address treasuryWallet;    // Platform treasury
        address developmentFund;   // Ongoing development
        address stakingRewards;    // Staking rewards pool
        uint256 treasuryShare;     // Percentage for treasury
        uint256 developmentShare;  // Percentage for development
        uint256 stakingRewardsShare; // Percentage for staking rewards
    }

    // Total Collected Fees
    struct FeeTotals {
        uint256 totalSwapFees;
        uint256 totalLendingFees;
        uint256 totalStakingFees;
        uint256 totalBridgingFees;
        uint256 totalLiquidityFees;
    }

    // Events for Fee Collection and Distribution
    event FeeCollected(
        address indexed user, 
        address indexed token, 
        uint256 amount, 
        string serviceType
    );
    event FeeDistributed(
        address indexed recipient, 
        uint256 amount, 
        string allocationPurpose
    );

    // Mappings for Fee Tracking
    mapping(address => uint256) public userTotalFeePaid;
    mapping(string => uint256) public serviceTotalFeesCollected;

    // Configuration Variables
    ServiceFee public serviceFees;
    RevenueAllocation public revenueAllocation;
    FeeTotals public feeTotals;

    // Supported Tokens for Fee Payment
    mapping(address => bool) public supportedFeeTokens;

    // Initialization Function
    function initialize(
        address _treasuryWallet,
        address _developmentFund,
        address _stakingRewards
    ) public initializer {
        __Ownable_init();

        // Default Fee Configurations
        serviceFees = ServiceFee({
            swapFee: 30,           // 0.3%
            lendingFee: 20,        // 0.2%
            stakingFee: 10,        // 0.1%
            bridgingFee: 50,       // 0.5%
            liquidityProvisionFee: 15 // 0.15%
        });

        revenueAllocation = RevenueAllocation({
            treasuryWallet: _treasuryWallet,
            developmentFund: _developmentFund,
            stakingRewards: _stakingRewards,
            treasuryShare: 50,     // 50%
            developmentShare: 30,  // 30%
            stakingRewardsShare: 20 // 20%
        });
    }

    // Collect Fees for Different Services
    function collectServiceFee(
        address _user, 
        address _token, 
        uint256 _amount, 
        string memory _serviceType
    ) external returns (uint256 feeAmount) {
        require(_amount > 0, "Invalid transaction amount");
        
        uint256 feePercentage = _getFeePercentageForService(_serviceType);
        feeAmount = (_amount * feePercentage) / 10000; // Base 10000 for 0.01% precision

        // Transfer fee to contract
        IERC20(_token).transferFrom(msg.sender, address(this), feeAmount);

        // Update tracking
        userTotalFeePaid[_user] += feeAmount;
        serviceTotalFeesCollected[_serviceType] += feeAmount;

        // Update fee totals based on service
        _updateFeeTotals(_serviceType, feeAmount);

        emit FeeCollected(_user, _token, feeAmount, _serviceType);

        return feeAmount;
    }

    // Distribute Collected Fees
    function distributeFees() external {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No fees to distribute");

        // Treasury Distribution
        uint256 treasuryAmount = (contractBalance * revenueAllocation.treasuryShare) / 100;
        _safeTransfer(revenueAllocation.treasuryWallet, treasuryAmount);

        // Development Fund Distribution
        uint256 developmentAmount = (contractBalance * revenueAllocation.developmentShare) / 100;
        _safeTransfer(revenueAllocation.developmentFund, developmentAmount);

        // Staking Rewards Distribution
        uint256 stakingRewardsAmount = (contractBalance * revenueAllocation.stakingRewardsShare) / 100;
        _safeTransfer(revenueAllocation.stakingRewards, stakingRewardsAmount);

        emit FeeDistributed(revenueAllocation.treasuryWallet, treasuryAmount, "Treasury");
        emit FeeDistributed(revenueAllocation.developmentFund, developmentAmount, "Development");
        emit FeeDistributed(revenueAllocation.stakingRewards, stakingRewardsAmount, "Staking Rewards");
    }

    // Internal: Get Fee Percentage for Service
    function _getFeePercentageForService(string memory _serviceType) 
        internal 
        view 
        returns (uint256) 
    {
        if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("swap"))) {
            return serviceFees.swapFee;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("lending"))) {
            return serviceFees.lendingFee;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("staking"))) {
            return serviceFees.stakingFee;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("bridging"))) {
            return serviceFees.bridgingFee;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("liquidity"))) {
            return serviceFees.liquidityProvisionFee;
        }
        return 0;
    }

    // Internal: Update Fee Totals
    function _updateFeeTotals(string memory _serviceType, uint256 _feeAmount) 
        internal 
    {
        if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("swap"))) {
            feeTotals.totalSwapFees += _feeAmount;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("lending"))) {
            feeTotals.totalLendingFees += _feeAmount;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("staking"))) {
            feeTotals.totalStakingFees += _feeAmount;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("bridging"))) {
            feeTotals.totalBridgingFees += _feeAmount;
        } else if (keccak256(abi.encodePacked(_serviceType)) == keccak256(abi.encodePacked("liquidity"))) {
            feeTotals.totalLiquidityFees += _feeAmount;
        }
    }

    // Safe Transfer Internal Function
    function _safeTransfer(address _recipient, uint256 _amount) internal {
        (bool success, ) = _recipient.call{value: _amount}("");
        require(success, "Transfer failed");
    }

    // Admin Functions for Fee Configuration
    function updateServiceFees(ServiceFee memory _newFees) external onlyOwner {
        serviceFees = _newFees;
    }

    function updateRevenueAllocation(RevenueAllocation memory _newAllocation) external onlyOwner {
        revenueAllocation = _newAllocation;
    }

    // View Functions for Transparency
    function getTotalFeesCollected() external view returns (FeeTotals memory) {
        return feeTotals;
    }

    function getUserTotalFeePaid(address _user) external view returns (uint256) {
        return userTotalFeePaid[_user];
    }
}</boltArtifact>

Comprehensive Fee Capture Ecosystem:

🔍 Key Features:
1. Multi-Service Fee Collection
   - Swap fees
   - Lending fees
   - Staking fees
   - Bridging fees
   - Liquidity provision fees

2. Flexible Revenue Allocation
   - Treasury wallet
   - Development fund
   - Staking rewards pool
   - Configurable revenue sharing percentages

3. Advanced Tracking Mechanisms
   - User-level fee tracking
   - Service-level fee collection
   - Transparent fee distribution

4. Governance and Flexibility
   - Owner-controlled fee configurations
   - Dynamic fee percentage adjustments
   - Comprehensive event logging

Frontend Integration:

<boltArtifact id="fee-capture-frontend" title="Fee Capture Frontend Integration">
  <boltAction type="file" filePath="src/services/fee-capture/feeCaptureService.ts">import { ethers } from 'ethers'
import { 
  PlatformFeeManagerABI, 
  PLATFORM_FEE_MANAGER_ADDRESS 
} from '../contracts/feeManagerConfig'

export class FeeCaptureService {
  private contract: ethers.Contract

  constructor(signer: ethers.Signer) {
    this.contract = new ethers.Contract(
      PLATFORM_FEE_MANAGER_ADDRESS, 
      PlatformFeeManagerABI, 
      signer
    )
  }

  // Collect Fee for a Service
  async collectServiceFee(
    user: string, 
    token: string, 
    amount: ethers.BigNumber, 
    serviceType: string
  ) {
    try {
      const tx = await this.contract.collectServiceFee(
        user, 
        token, 
        amount, 
        serviceType
      )
      return await tx.wait()
    } catch (error) {
      console.error('Fee Collection Error:', error)
      throw error
    }
  }

  // Get Total Fees Collected
  async getTotalFeesCollected() {
    try {
      return await this.contract.getTotalFeesCollected()
    } catch (error) {
      console.error('Fee Collection Retrieval Error:', error)
      throw error
    }
  }

  // Get User Total Fees Paid
  async getUserTotalFeePaid(userAddress: string) {
    try {
      return await this.contract.getUserTotalFeePaid(userAddress)
    } catch (error) {
      console.error('User Fee Retrieval Error:', error)
      throw error
    }
  }
}
