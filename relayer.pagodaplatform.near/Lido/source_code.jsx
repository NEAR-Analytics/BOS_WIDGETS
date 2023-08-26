if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 1) {
  return <p>Switch to Ethereum Mainnet</p>;
}

// FETCH LIDO ABI

const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
const tokenDecimals = 18;

const lidoAbi = [
  {
    constant: false,
    inputs: [{ name: "_validators", type: "uint256" }],
    name: "setValidatorsNumber",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "beaconValidators", type: "uint256" }],
    name: "BeaconValidatorsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "MevTxFeeReceived",
    type: "event",
  },
  {
    constant: false,
    inputs: [],
    name: "resume",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "stop",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "hasInitialized",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "STAKING_CONTROL_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_depositContract", type: "address" },
      { name: "_oracle", type: "address" },
      { name: "_operators", type: "address" },
      { name: "_treasury", type: "address" },
      { name: "_insuranceFund", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getInsuranceFund",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_ethAmount", type: "uint256" }],
    name: "getSharesByPooledEth",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "isStakingPaused",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_sender", type: "address" },
      { name: "_recipient", type: "address" },
      { name: "_amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOperators",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_script", type: "bytes" }],
    name: "getEVMScriptExecutor",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_maxStakeLimit", type: "uint256" },
      { name: "_stakeLimitIncreasePerBlock", type: "uint256" },
    ],
    name: "setStakingLimit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "RESUME_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getRecoveryVault",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "DEPOSIT_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "DEPOSIT_SIZE",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getTotalPooledEther",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PAUSE_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getTreasury",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "isStopped",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MANAGE_WITHDRAWAL_KEY",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getBufferedEther",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "receiveELRewards",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getELRewardsWithdrawalLimit",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "SIGNATURE_LENGTH",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getWithdrawalCredentials",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getCurrentStakeLimit",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_limitPoints", type: "uint16" }],
    name: "setELRewardsWithdrawalLimit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_beaconValidators", type: "uint256" },
      { name: "_beaconBalance", type: "uint256" },
    ],
    name: "handleOracleReport",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getStakeLimitFullInfo",
    outputs: [
      { name: "isStakingPaused", type: "bool" },
      { name: "isStakingLimitSet", type: "bool" },
      { name: "currentStakeLimit", type: "uint256" },
      { name: "maxStakeLimit", type: "uint256" },
      { name: "maxStakeLimitGrowthBlocks", type: "uint256" },
      { name: "prevStakeLimit", type: "uint256" },
      { name: "prevStakeBlockNumber", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "SET_EL_REWARDS_WITHDRAWAL_LIMIT_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getELRewardsVault",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "resumeStaking",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getFeeDistribution",
    outputs: [
      { name: "treasuryFeeBasisPoints", type: "uint16" },
      { name: "insuranceFeeBasisPoints", type: "uint16" },
      { name: "operatorsFeeBasisPoints", type: "uint16" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_sharesAmount", type: "uint256" }],
    name: "getPooledEthByShares",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_executionLayerRewardsVault", type: "address" }],
    name: "setELRewardsVault",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "token", type: "address" }],
    name: "allowRecoverability",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MANAGE_PROTOCOL_CONTRACTS_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "appId",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOracle",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getInitializationBlock",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_treasuryFeeBasisPoints", type: "uint16" },
      { name: "_insuranceFeeBasisPoints", type: "uint16" },
      { name: "_operatorsFeeBasisPoints", type: "uint16" },
    ],
    name: "setFeeDistribution",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_feeBasisPoints", type: "uint16" }],
    name: "setFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_recipient", type: "address" },
      { name: "_sharesAmount", type: "uint256" },
    ],
    name: "transferShares",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_maxDeposits", type: "uint256" }],
    name: "depositBufferedEther",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MANAGE_FEE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_token", type: "address" }],
    name: "transferToVault",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_sender", type: "address" },
      { name: "_role", type: "bytes32" },
      { name: "_params", type: "uint256[]" },
    ],
    name: "canPerform",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_referral", type: "address" }],
    name: "submit",
    outputs: [{ name: "", type: "uint256" }],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "WITHDRAWAL_CREDENTIALS_LENGTH",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getEVMScriptRegistry",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PUBKEY_LENGTH",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "SET_EL_REWARDS_VAULT_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_recipient", type: "address" },
      { name: "_amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getDepositContract",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getBeaconStat",
    outputs: [
      { name: "depositedValidators", type: "uint256" },
      { name: "beaconValidators", type: "uint256" },
      { name: "beaconBalance", type: "uint256" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "removeStakingLimit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "BURN_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getFee",
    outputs: [{ name: "feeBasisPoints", type: "uint16" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kernel",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getTotalShares",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "isPetrified",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_oracle", type: "address" },
      { name: "_treasury", type: "address" },
      { name: "_insuranceFund", type: "address" },
    ],
    name: "setProtocolContracts",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "_withdrawalCredentials", type: "bytes32" }],
    name: "setWithdrawalCredentials",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "STAKING_PAUSE_ROLE",
    outputs: [{ name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "depositBufferedEther",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_account", type: "address" },
      { name: "_sharesAmount", type: "uint256" },
    ],
    name: "burnShares",
    outputs: [{ name: "newTotalShares", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_account", type: "address" }],
    name: "sharesOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "pauseStaking",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getTotalELRewardsCollected",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "executor", type: "address" },
      { indexed: false, name: "script", type: "bytes" },
      { indexed: false, name: "input", type: "bytes" },
      { indexed: false, name: "returnData", type: "bytes" },
    ],
    name: "ScriptResult",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "vault", type: "address" },
      { indexed: true, name: "token", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
    ],
    name: "RecoverToVault",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "sharesValue", type: "uint256" },
    ],
    name: "TransferShares",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "account", type: "address" },
      { indexed: false, name: "preRebaseTokenAmount", type: "uint256" },
      { indexed: false, name: "postRebaseTokenAmount", type: "uint256" },
      { indexed: false, name: "sharesAmount", type: "uint256" },
    ],
    name: "SharesBurnt",
    type: "event",
  },
  { anonymous: false, inputs: [], name: "Stopped", type: "event" },
  { anonymous: false, inputs: [], name: "Resumed", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "owner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "StakingPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "StakingResumed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "maxStakeLimit", type: "uint256" },
      {
        indexed: false,
        name: "stakeLimitIncreasePerBlock",
        type: "uint256",
      },
    ],
    name: "StakingLimitSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "StakingLimitRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "oracle", type: "address" },
      { indexed: false, name: "treasury", type: "address" },
      { indexed: false, name: "insuranceFund", type: "address" },
    ],
    name: "ProtocolContactsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "feeBasisPoints", type: "uint16" }],
    name: "FeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "treasuryFeeBasisPoints", type: "uint16" },
      { indexed: false, name: "insuranceFeeBasisPoints", type: "uint16" },
      { indexed: false, name: "operatorsFeeBasisPoints", type: "uint16" },
    ],
    name: "FeeDistributionSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "ELRewardsReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "limitPoints", type: "uint256" }],
    name: "ELRewardsWithdrawalLimitSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "withdrawalCredentials", type: "bytes32" },
    ],
    name: "WithdrawalCredentialsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "executionLayerRewardsVault",
        type: "address",
      },
    ],
    name: "ELRewardsVaultSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "sender", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "referral", type: "address" },
    ],
    name: "Submitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "Unbuffered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "sender", type: "address" },
      { indexed: false, name: "tokenAmount", type: "uint256" },
      { indexed: false, name: "sentFromBuffer", type: "uint256" },
      { indexed: true, name: "pubkeyHash", type: "bytes32" },
      { indexed: false, name: "etherAmount", type: "uint256" },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "reportTimestamp", type: "uint256" },
      { indexed: false, name: "preCLBalance", type: "uint256" },
      { indexed: false, name: "postCLBalance", type: "uint256" },
      { indexed: false, name: "withdrawalsWithdrawn", type: "uint256" },
      {
        indexed: false,
        name: "executionLayerRewardsWithdrawn",
        type: "uint256",
      },
      { indexed: false, name: "postBufferedEther", type: "uint256" },
    ],
    name: "ETHDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "reportTimestamp", type: "uint256" },
      { indexed: false, name: "timeElapsed", type: "uint256" },
      { indexed: false, name: "preTotalShares", type: "uint256" },
      { indexed: false, name: "preTotalEther", type: "uint256" },
      { indexed: false, name: "postTotalShares", type: "uint256" },
      { indexed: false, name: "postTotalEther", type: "uint256" },
      { indexed: false, name: "sharesMintedAsFees", type: "uint256" },
    ],
    name: "TokenRebased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "WithdrawalsReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "reportTimestamp", type: "uint256" },
      { indexed: false, name: "preCLValidators", type: "uint256" },
      { indexed: false, name: "postCLValidators", type: "uint256" },
    ],
    name: "CLValidatorsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "lidoLocator", type: "address" }],
    name: "LidoLocatorSet",
    type: "event",
  },
];
// if (!lidoAbi.ok) {
//   return "Loading";
// }

const iface = new ethers.utils.Interface(lidoAbi);

// FETCH LIDO STAKING APR

if (state.lidoArp === undefined) {
  const apr = fetch(
    "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr"
  );
  if (!apr) return;
  State.update({ lidoArp: JSON.parse(apr?.body?.contents) ?? "..." });
}

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: lidoContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    lidoContract,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  erc20.submit(lidoContract, { value: amount }).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

// DETECT SENDER

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

//if (!state.sender)  return "Please login first";

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined && state.sender) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

// FETCH TX COST

if (state.txCost === undefined) {
  const gasEstimate = ethers.BigNumber.from(1875000);
  const gasPrice = ethers.BigNumber.from(1500000000);

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = ethers.utils.formatEther(gasCostInWei);

  let responseGql = fetch(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          bundle(id: "1" ) {
            ethPrice
          }
        }`,
      }),
    }
  );

  if (!responseGql) return "";

  const ethPriceInUsd = responseGql.body.data.bundle.ethPrice;

  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

  State.update({ txCost: `$${txCost.toFixed(2)}` });
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Stake Ether</div>
      <div class="SubHeader">Stake ETH and receive stETH while staking.</div>

      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to stake</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH
                  </span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span>{getSender()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="LidoSplitter" />
          </>
        )}
        <div
          class={
            state.sender ? "LidoFormBottomContainer" : "LidoFormTopContainer"
          }
        >
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Staked amount</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>
                {state.stakedBalance ?? (!state.sender ? "0" : "...")}
                &nbsp;stETH
              </span>
            </div>
          </div>
          <div class="LidoFormTopContainerRight">
            <div class="LidoAprContainer">
              <div class="LidoAprTitle">Lido APR</div>
              <div class="LidoAprValue">{state.lidoArp ?? "..."}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                opacity="0.6"
                d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"
              ></path>
              <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
              <path
                opacity="0.6"
                d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"
              ></path>
              <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
              <path
                opacity="0.2"
                d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"
              ></path>
              <path
                opacity="0.6"
                d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"
              ></path>
            </svg>
          </span>
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              disabled={!state.sender}
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strEther}
              onChange={(e) => State.update({ strEther: e.target.value })}
              placeholder="Amount"
            />
          </span>
          <span
            class="LidoStakeFormInputContainerSpan3"
            onClick={() => {
              State.update({
                strEther: (state.balance > 0.05
                  ? parseFloat(state.balance) - 0.05
                  : 0
                ).toFixed(2),
              });
            }}
          >
            <button
              class="LidoStakeFormInputContainerSpan3Content"
              disabled={!state.sender}
            >
              <span class="LidoStakeFormInputContainerSpan3Max">MAX</span>
            </button>
          </span>
        </div>
        {!!state.sender ? (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitEthers(state.strEther, state.sender)}
          >
            <span>Submit</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}

        <div class="LidoFooterContainer">
          {state.sender && (
            <div class="LidoFooterRaw">
              <div class="LidoFooterRawLeft">You will receive</div>
              <div class="LidoFooterRawRight">${state.strEther ?? 0} stETH</div>
            </div>
          )}
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Exchange rate</div>
            <div class="LidoFooterRawRight">1 ETH = 1 stETH</div>
          </div>
          {false && (
            <div class="LidoFooterRaw">
              <div class="LidoFooterRawLeft">Transaction cost</div>
              <div class="LidoFooterRawRight">{state.txCost}</div>
            </div>
          )}
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Reward fee</div>
            <div class="LidoFooterRawRight">10%</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
