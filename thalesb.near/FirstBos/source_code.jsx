const CHAIN_ID = 1101;
const CHAIN_NAME = "Polygon zkEVM";
const CONNECT_PROPS = {
  // imgProps: {
  //   src: "https://ipfs.near.social/ipfs/bafkreifi7o6vdby32twf7hcunoc3sbnb34qlbkpu64tiru4qhjx27i77m4",
  //   style: {
  //     width: "252px",
  //     height: "220px",
  //     marginTop: "60px",
  //   },
  // },
  noAccountTips: "0vix Lending THALES",
  wrongNetworkTips: "To proceed, kindly switch to Polygon zkEVM Chain.",
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
};
const account = Ethers.send("eth_requestAccounts", [])[0];
if (!account) {
  return (
    <>
      I expect to see a wallet connect button here
      <Widget
        src="bluebiu.near/widget/0vix.LendingConntect"
        props={{
          ...CONNECT_PROPS,
          isWrongNetwork: false,
        }}
      />
    </>
  );
}
State.init({
  chainId: -1,
  type: props.tab === "borrow" ? 1 : 0, // 0 for supply, 1 for borrow
  showDialog: false,
  tableButtonClickData: null,
  updateData: true,
});
Ethers.provider()
  .getNetwork()
  .then(({ chainId }) => {
    State.update({ chainId });
  })
  .catch(() => {});

if (state.chainId !== CHAIN_ID) {
  return (
    <Widget
      src="bluebiu.near/widget/0vix.LendingConntect"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: true,
      }}
    />
  );
}
const MULTICALL_ADDRESS = "0x7f593DEdebE173CA12954164dc3db56131FCA0F7";
const UNITROLLER_ADDRESS = "0x6EA32f626e3A5c41547235ebBdf861526e11f482";
const ORACLE_ADDRESS = "0xBC81104207C160cFE48585cC8D753aD2c7031FF7";
const MARKETS = {
  "0x8903Dc1f4736D2FcB90C1497AebBABA133DaAC76": {
    underlyingToken: {
      address: "0xa2036f0538221a77A3937F1379699f44945018d0",
      decimals: 18,
      symbol: "MATIC",
    },
    decimals: 8,
    symbol: "oMATIC",
    address: "0x8903Dc1f4736D2FcB90C1497AebBABA133DaAC76",
    logo: "https://app.0vix.com/static/media/MATIC-logo.a9a2a3e9.svg",
    geckoId: "matic-network",
  },
  "0x68d9baA40394dA2e2c1ca05d30BF33F52823ee7B": {
    underlyingToken: {
      address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
      decimals: 6,
      symbol: "USDC",
    },
    decimals: 8,
    symbol: "oUSDC",
    address: "0x68d9baA40394dA2e2c1ca05d30BF33F52823ee7B",
    logo: "https://app.0vix.com/static/media/USDC-logo.817a96c8.svg",
    geckoId: "usd-coin",
  },
  "0xad41C77d99E282267C1492cdEFe528D7d5044253": {
    underlyingToken: {
      address: "0x1E4a5963aBFD975d8c9021ce480b42188849D41d",
      decimals: 6,
      symbol: "USDT",
    },
    decimals: 8,
    symbol: "oUSDT",
    address: "0xad41C77d99E282267C1492cdEFe528D7d5044253",
    logo: "https://app.0vix.com/static/media/USDT-logo.fcda5855.svg",
    geckoId: "tether",
  },
  "0xee1727f5074E747716637e1776B7F7C7133f16b1": {
    underlyingToken: {
      address: "native",
      decimals: 18,
      symbol: "ETH",
    },
    decimals: 8,
    symbol: "oETH",
    address: "0xee1727f5074E747716637e1776B7F7C7133f16b1",
    logo: "https://app.0vix.com/static/media/ETH-logo.0aebd865.svg",
    geckoId: "ethereum",
  },
  "0xbC59506A5Ce024B892776d4F7dd450B0FB3584A2": {
    underlyingToken: {
      address: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
      decimals: 18,
      symbol: "WETH",
    },
    decimals: 8,
    symbol: "oWETH",
    address: "0xbC59506A5Ce024B892776d4F7dd450B0FB3584A2",
    logo: "https://app.0vix.com/static/media/weth-logo.68e99309.png",
    geckoId: "ethereum",
  },
  "0x503deabad9641c5B4015041eEb0F1263E415715D": {
    underlyingToken: {
      address: "0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1",
      decimals: 8,
      symbol: "WBTC",
    },
    decimals: 8,
    symbol: "oWBTC",
    address: "0x503deabad9641c5B4015041eEb0F1263E415715D",
    logo: "https://app.0vix.com/static/media/WBTC-logo.01924833.svg",
    geckoId: "bitcoin",
  },
};

const Container = styled.div`
  width: 100%;
  max-width: 858px;
  margin: 0 auto;
  position: relative;
  height: 100%;
`;
const Spacer = styled.div`
  height: 10px;
`;

const handleTableButtonClick = (address, actionText) => {
  const record = state.data?.markets.find(
    (market) => market.address === address
  );
  State.update({
    tableButtonClickData: {
      record,
      actionText,
    },
    showDialog: true,
  });
};
return (
  <>
    {state.updateData && (
      <Widget src="bluebiu.near/widget/0vix.LendingSpinner" />
    )}
    <Container
      style={{
        overflow: state.updateData || state.showDialog ? "hidden" : "auto",
      }}
    >
      {state.updateData && (
        <Widget
          src="bluebiu.near/widget/0vix.LendingData"
          props={{
            markets: MARKETS,
            multicallAddress: MULTICALL_ADDRESS,
            unitrollerAddress: UNITROLLER_ADDRESS,
            oracleAddress: ORACLE_ADDRESS,
            update: state.updateData,
            account,
            onLoad: (data) => {
              console.log("update data", data);
              State.update({
                data,
                updateData: false,
                totalSupplyUsd: data.totalSupplyUsd,
                totalBorrowUsd: data.totalBorrowUsd,
              });
            },
          }}
        />
      )}
      {/* Total */}
      <Widget
        src="bluebiu.near/widget/0vix.LendingTotal"
        props={{
          totalSupply: state.totalSupplyUsd || 0,
          totalBorrow: state.totalBorrowUsd || 0,
        }}
      />
      {/* User Dash Panel */}
      <Widget
        src="bluebiu.near/widget/0vix.LendingDashPanel"
        props={{
          userSupply: state.data?.userTotalSupplyUsd,
          userBorrow: state.data?.userTotalBorrowUsd,
          accountLiquidity: state.data?.accountLiquidity,
          healthFactor: state.data?.healthFactor,
        }}
      />
      <Widget
        src="bluebiu.near/widget/0vix.LendingSwitcher"
        props={{
          onChange: (type) => {
            State.update({ type });
          },
          type: state.type,
        }}
      />
      {state.type === 0 && (
        <>
          <Widget
            src="bluebiu.near/widget/0vix.LendingSupplyingTable"
            props={{
              assets: state.data?.markets || [],
              onTableButtonClick: handleTableButtonClick,
            }}
          />
          <Spacer />
          <Widget
            src="bluebiu.near/widget/0vix.LendingSupplyMarketsTable"
            props={{
              assets: state.data?.markets || [],
              onTableButtonClick: handleTableButtonClick,
            }}
          />
        </>
      )}
      {state.type === 1 && (
        <>
          <Widget
            src="bluebiu.near/widget/0vix.LendingBorrowingTable"
            props={{
              assets: state.data?.markets || [],
              onTableButtonClick: handleTableButtonClick,
            }}
          />
          <Spacer />
          <Widget
            src="bluebiu.near/widget/0vix.LendingBorrowMarketsTable"
            props={{
              assets: state.data?.markets || [],
              onTableButtonClick: handleTableButtonClick,
            }}
          />
        </>
      )}
      {!state.updateData && (
        <Widget src="bluebiu.near/widget/0vix.LendingQuest" />
      )}
    </Container>
    <Widget
      src="bluebiu.near/widget/0vix.LendingDialog"
      props={{
        display: state.showDialog,
        data: state.tableButtonClickData,
        unitrollerAddress: UNITROLLER_ADDRESS,
        accountLiquidity: state.data?.accountLiquidity,
        userTotalBorrowUsd: state.data?.userTotalBorrowUsd,
        onClose: () => {
          State.update({
            showDialog: false,
          });
        },
        onSuccess: () => {
          State.update({
            updateData: true,
          });
        },
        onMessage: (params) => {
          State.update({
            message: params,
          });
        },
      }}
    />
    {state.message?.open && (
      <Widget
        src="bluebiu.near/widget/0vix.LendingMessage"
        props={{
          status: state.message.status,
          text: state.message.text,
          onClose: () => {
            State.update({
              message: { open: false },
            });
          },
        }}
      />
    )}
  </>
);
