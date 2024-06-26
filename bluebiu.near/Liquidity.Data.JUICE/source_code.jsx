
const {
  onLoad,
  dataList,
  multicall,
  multicallAddress,
  smartContractAddress
} = props

// const dataList = dataList
function updateDataList() {
  onLoad({
    dataList
  })
}
function handleGetTotalBaseDeposit() {
  const calls = []
  for (let i = 0; i < dataList.length; i++) {
    calls.push({
      address: dataList[i].strategyAddress,
      name: "getTotalBaseDeposit",
    })
  }
  multicall({
    abi: [{
      "inputs": [],
      "name": "getTotalBaseDeposit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }],
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  }).then(result => {
    for (let i = 0; i < dataList.length; i++) {
      dataList[i].pointList[0].value = Big(result[i][0] ? ethers.utils.formatUnits(result[i][0]) : 0).toString()
    }
    
    updateDataList("handleGetTotalBaseDeposit")
  })
}
function handleGetPositionValue() {
  const calls = []
  for (let i = 0; i < dataList.length; i++) {
    calls.push({
      address: dataList[i].strategyAddress,
      name: "getPositionValue",
      params: [smartContractAddress]
    })
  }
  console.log('=calls', calls)
  multicall({
    abi: [{
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getPositionValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }],
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  }).then(result => {
    for (let i = 0; i < dataList.length; i++) {
      dataList[i].positionValue = Big(result[i][0] ? ethers.utils.formatUnits(result[i][0]) : 0).toString()
    }
    console.log('=dataList', dataList)
    updateDataList("handleGetPositionValue")
  })
}
useEffect(() => {
  handleGetTotalBaseDeposit()
}, [])
useEffect(() => {
  smartContractAddress && handleGetPositionValue()
}, [smartContractAddress])