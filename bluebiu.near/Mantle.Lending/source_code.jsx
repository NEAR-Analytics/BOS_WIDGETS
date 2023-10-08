const Theme = styled.div`
  --button-text-color: #0f1126;
  --button-color: #00ffe0;
  --primary-color: #13a69d;
  --border-color: #292c42;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: rgba(19, 166, 157, 0.2);
  --withdraw-bg-hover-color: rgba(19, 166, 157, 1);
  --withdraw-border-color: rgba(19, 166, 157, 1);
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: rgba(217, 71, 124, 1);
  --repay-border-color: rgba(217, 71, 124, 1);
  --switch-color: #5baea9;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
`;
const CHAIN_ID = 5000;
const CHAIN_NAME = "Mantle";

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={{
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        multicallv2: "0x072aD7f291AED59E7C4974EbdcF73B79DAC89051",
        connectProps: {
          imgProps: {
            src: "",
            style: {
              width: "283px",
              height: "187px",
              marginTop: "60px",
            },
          },
          noAccountTips: `${CHAIN_NAME} Lending Collection`,
          wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        dapps: {
          Lendle: {
            name: "Lendle",
            icon: "https://ipfs.near.social/ipfs/bafkreibh3m63rrgsbl3ihtugfaqj7vbwxni6sefjbsen5nuyqexy4opepi",
            oracleAddress: "0x870c9692Ab04944C86ec6FEeF63F261226506EfC",
            PoolAddressProvider: "0xAb94Bedd21ae3411eB2698945dfCab1D5C19C3d4",
            aaveProtocolDataProviderAddress:
              "0x552b9e4bae485C4B7F540777d7D25614CdB84773",
            lendingPoolAddress: "0xCFa5aE7c2CE8Fadc6426C1ff872cA45378Fb7cF3",
            wethGateway: "0xEc831f8710C6286a91a348928600157f07aC55c2",
            data: "bluebiu.near/widget/Mantle.Lending.LendleData",
            incentiveController: "0x79e2fd1c484EB9EE45001A98Ce31F28918F27C41",
            handlerClaim:
              "bluebiu.near/widget/Mantle.Lending.LendleClaimHandler",
            handlerCollateral:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantHandlerCollateral",
            type: "aave2",
            handlerCToken:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantActionHandler",
          },
        },
      }}
    />
  </Theme>
);
