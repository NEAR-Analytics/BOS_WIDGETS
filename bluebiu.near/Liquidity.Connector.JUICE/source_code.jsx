const StyledJuiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledCategoryContainer = styled.div`
  margin-top: 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1000px;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(22, 24, 29, 0.00) 0%, #373A53 50%, rgba(22, 24, 29, 0.00) 100%);
  }
`
const StyledCategory = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 46px;
  cursor: pointer;

  color: #979ABE;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  &.active {
    color: #FFF;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: #FFF;
    }
  }
`
const StyledSymbolButtonList = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`
const StyledSymbolButton = styled.div`
  padding: 8px 24px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &.active {
    border-color: #373A53;
    background-color: #32364B;
    color: #FFF;
  }
`

const {
  toast,
  account,
  prices,
  chainId,
  multicall,
  multicallAddress,
  windowOpen,
  addAction,
  dexConfig,
  connectProps,
  isChainSupported,
  curChain,
  onSwitchChain,
  switchingChain
} = props


if (!account || !isChainSupported) {
  return (
    <Widget
      src="bluebiu.near/widget/Swap.ChainWarnigBox"
      props={{
        chain: curChain,
        onSwitchChain: onSwitchChain,
        switchingChain: switchingChain,
        theme: dexConfig.theme?.button,
      }}
    />
  );
}
const sender = ethers.utils.getAddress(account);
const {
  ICON_MAP,
  SYMBOL_LIST,
  POOLS_MAPPING,
  SYMBOL_NAME_MAPPING,
} = dexConfig

State.init({
  categoryList: [
    "Vaults",
    "Borrowers",
    "Positions"
  ],
  categoryIndex: 0,
  symbolIndex: 0,
  checkedVault: null,
  smartContractAddress: "",
  isCreatedAccount: false,
  showDialog: false,
  createSubAccountLoading: false
})
const {
  checkedVault,
  categoryList,
  categoryIndex,
  symbolIndex,
  isCreatedAccount,
  smartContractAddress,
} = state

const {
  vaults,
  PROXY_ADDRESS,
  LENDING_POOL_ADDRESS,
  SYMBOL_ADDRESS
} = POOLS_MAPPING[symbolIndex]

function handleGetSubAccount() {
  const abi = [{
    "inputs": [
      {
        "internalType": "address",
        "name": "owner_",
        "type": "address"
      }
    ],
    "name": "getAccount",
    "outputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },]
  const contract = new ethers.Contract(
    ethers.utils.getAddress(PROXY_ADDRESS),
    abi,
    Ethers.provider()
  );
  contract.getAccount(sender)
    .then((result) => {
      State.update({
        smartContractAddress: result
      })
      handleQueryIsCreatedAccount(result)
    })
    .catch(error => {
      console.log('=error', error)
    });
}
function handleQueryIsCreatedAccount(smartAddress) {
  const abi = [{
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isCreatedAccount",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]
  const contract = new ethers.Contract(
    ethers.utils.getAddress(PROXY_ADDRESS),
    abi,
    Ethers.provider()
  );

  contract.isCreatedAccount(smartAddress).then((result) => {
    State.update({
      isCreatedAccount: result
    })
  });
}
function handleRefresh() {
  handleGetSubAccount()
}
function handleCreateSubAccount() {
  State.update({
    createSubAccountLoading: true
  })
  const abi = [{
    "inputs": [],
    "name": "createAccount",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "account",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }]
  const contract = new ethers.Contract(
    ethers.utils.getAddress(PROXY_ADDRESS),
    abi,
    Ethers.provider().getSigner()
  );
  contract
    .createAccount()
    .then(tx => tx.wait())
    .then(() => {
      State.update({
        createSubAccountLoading: false
      })
      handleRefresh()
    })
    .catch(error => {
      State.update({
        createSubAccountLoading: false
      })
    });
}
function handleOpenWrap() {
  State.update({
    showDialog: true
  })
}
function handleCloseWrap() {
  State.update({
    showDialog: false
  })
}
function handleManage(vault) {
  State.update({
    categoryIndex: 0,
    checkedVault: vault,
  })
}
useEffect(() => {
  sender && handleGetSubAccount()
}, [sender, symbolIndex])


return (
  <StyledJuiceContainer>
    <StyledSymbolButtonList>
      {
        SYMBOL_LIST.map((symbol, index) => (
          <StyledSymbolButton
            key={index}
            className={index === symbolIndex ? "active" : ""}
            onClick={() => {
              State.update({
                symbolIndex: index,
                checkedVault: null
              })
            }}
          >{symbol}</StyledSymbolButton>
        ))
      }
    </StyledSymbolButtonList>
    <StyledCategoryContainer>
      {
        categoryList.map((category, index) => (
          <StyledCategory
            key={index}
            className={categoryIndex === index ? "active" : ""}
            onClick={() => {
              State.update({
                categoryIndex: index
              })
            }}
          >{category}</StyledCategory>
        ))
      }

    </StyledCategoryContainer>
    {
      smartContractAddress ? (
        <>
          {
            vaults && (
              <Widget
                key={'Data.JUICE' + symbolIndex}
                src={"bluebiu.near/widget/Liquidity.Data.JUICE"}
                props={{
                  dataList: vaults,
                  multicall,
                  multicallAddress,
                  smartContractAddress,
                  onLoad: ({
                    dataList,
                  }) => {
                    State.update({
                      vaults: dataList,
                      loading: false
                    })
                  }
                }}
              />
            )
          }
          {
            categoryIndex === 0 && checkedVault && (
              <Widget
                src={"bluebiu.near/widget/Liquidity.Bridge.JUICE.VaultDetail"}
                key={'VaultDetail' + symbolIndex}
                props={{
                  toast,
                  sender,
                  chainId,
                  addAction,
                  windowOpen,
                  isCreatedAccount,
                  multicall,
                  multicallAddress,
                  checkedVault,
                  ICON_MAP,
                  PROXY_ADDRESS,
                  SYMBOL_ADDRESS,
                  SYMBOL_NAME_MAPPING,
                  smartContractAddress,
                  onChangeCategoryIndex: (categoryIndex) => {
                    State.update({
                      categoryIndex
                    })
                  },
                  onBack: () => {
                    State.update({
                      checkedVault: null
                    })
                  }
                }}
              />
            )
          }
          {
            categoryIndex === 0 && !checkedVault && (
              <Widget
                src={"bluebiu.near/widget/Liquidity.Bridge.JUICE.Vaults"}
                key={'Vaults' + symbolIndex}
                props={{
                  vaults,
                  prices,
                  onCheckedVaultChange: (vault) => {
                    State.update({
                      checkedVault: vault
                    })
                  }
                }}
              />
            )
          }
          {
            categoryIndex === 1 && (
              <Widget
                src={"bluebiu.near/widget/Liquidity.Bridge.JUICE.Borrowers"}
                key={'Borrowers' + symbolIndex}
                props={{
                  toast,
                  prices,
                  sender,
                  ICON_MAP,
                  addAction,
                  isCreatedAccount,
                  multicall,
                  symbolIndex,
                  multicallAddress,
                  PROXY_ADDRESS,
                  smartContractAddress,
                  SYMBOL_ADDRESS,
                  SYMBOL_NAME_MAPPING,
                  LENDING_POOL_ADDRESS,
                  createSubAccountLoading,
                  onCreateSubAccount: handleCreateSubAccount,
                  onOpenWrap: handleOpenWrap
                }}
              />
            )
          }
          {
            categoryIndex === 2 && (
              <Widget
                src={"bluebiu.near/widget/Liquidity.Bridge.JUICE.Positions"}
                key={'Positions' + symbolIndex}
                props={{
                  sender,
                  vaults,
                  prices,
                  // symbol: SymbolMapping[symbolIndex][1],
                  symbolIndex,
                  PROXY_ADDRESS,
                  SYMBOL_NAME_MAPPING,
                  multicall,
                  multicallAddress,
                  smartContractAddress,
                  onManage: handleManage
                }}
              />
            )
          }
        </>
      ) : (
        <Widget src="bluebiu.near/widget/0vix.LendingSpinner" />
      )
    }
    {
      state.showDialog && (
        <Widget
          src={"bluebiu.near/widget/Liquidity.Bridge.JUICE.Dialog"}
          props={{
            toast,
            sender,
            chainId,
            addAction,
            SYMBOL_ADDRESS,
            onCloseWrap: handleCloseWrap
          }}
        />
      )
    }
  </StyledJuiceContainer>
)