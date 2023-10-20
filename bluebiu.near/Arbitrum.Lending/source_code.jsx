const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #33549c;
  --primary-color: #33549c;
  --border-color: #292c42;
  --supply-bg-color: rgba(80, 123, 217, 0.2);
  --borrow-bg-color: rgba(202, 85, 176, 0.2);
  --supply-color: #85abff;
  --borrow-color: #ff8ee6;
  --withdraw-bg-hover-color: #33549c;
  --withdraw-bg-color: rgba(51, 84, 156, 0.5);
  --withdraw-border-color: #33549c;
  --repay-bg-color: rgba(202, 85, 176, 0.2);
  --repay-bg-hover-color: #ca55b0;
  --repay-border-color: #ca55b0;
  --switch-color: #33549c;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
`;

const CHAIN_ID = 42161;
const CHAIN_NAME = "Arbitrum";
return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={{
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        multicallv2: "0x99D73e5d83148FA2b41248059061f91703Cf0516",
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
        defaultDapp: "Radiant",
        dapps: {
          Radiant: {
            name: "Radiant",
            icon: "https://ipfs.near.social/ipfs/bafkreigbuxe2ernc4xqtnepturk55k3rnqzs3tikqfzdpptky7i6cwypfu",
            unitrollerAddress: "0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4",
            oracleAddress: "0xC0cE5De939aaD880b0bdDcf9aB5750a53EDa454b",
            PoolAddressProvider: "0x091d52CacE1edc5527C99cDCFA6937C1635330E4",
            uiPoolDataProviderAddress:
              "0xed1eF2fAE2385c221F0e054f982E974bc7Dc08Ce",
            walletBalanceProvider: "0xE36D523Ad4feBAa09B9Bc043999252f96375C621",
            aaveProtocolDataProviderAddress:
              "0x596B0cc4c5094507C50b579a662FE7e7b094A2cC",
            lendingPoolAddress: "0xF4B1486DD74D07706052A33d31d7c0AAFD0659E1",
            wethGateway: "0xBb5cA40b2F7aF3B1ff5dbce0E9cC78F8BFa817CE",
            incentiveController: "0xebC85d44cefb1293707b11f707bd3CEc34B4D5fA",
            type: "aave2",
            data: "bluebiu.near/widget/Arbitrum.Lending.RadiantData",
            handlerCollateral:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantHandlerCollateral",
            handlerClaim:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantClaimHandler",
            handlerCToken:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantActionHandler",
          },
          "Granary Finance": {
            name: "Granary Finance",
            icon: "https://ipfs.near.social/ipfs/bafkreihovftnvueysjuj7wansa74k3bgtfs4hkip4bgdvguh6nhehkvg5e",
            oracleAddress: "0xe12e084FC4550387cB2b252b5F289BA38b755354",
            PoolAddressProvider: "0x642cc899652B068D1bED786c4B060Ec1027D1563",
            aaveProtocolDataProviderAddress:
              "0x96bCFB86F1bFf315c13e00D850e2FAeA93CcD3e7",
            lendingPoolAddress: "0x102442A3BA1e441043154Bc0B8A2e2FB5E0F94A7",
            wethGateway: "0x3CC0a623f1aFFab5D5514A453965cE8C80B45549",
            data: "bluebiu.near/widget/Arbitrum.Lending.GranaryData",
            handlerCollateral:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantHandlerCollateral",
            type: "aave2",
            handlerCToken:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantActionHandler",
          },
          "C.R.E.A.M.": {
            name: "C.R.E.A.M.",
            icon: "https://ipfs.near.social/ipfs/bafkreihxqzhzavb7onnxjtin2y6s7pj3y4nxb6ul42cknregyykfu24ovm",
            unitrollerAddress: "0xbadaC56c9aca307079e8B8FC699987AAc89813ee",
            oracleAddress: "0xE82225bA6BeD28406912522F01C7102DD9f07e78",
            data: "bluebiu.near/widget/Arbitrum.Lending.CreamData",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
        },
      }}
    />
  </Theme>
);
