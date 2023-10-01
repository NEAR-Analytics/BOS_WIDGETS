const Theme = styled.div`
  --button-text-color: #000;
  --button-color: #f3ba2f;
  --primary-color: #f3ba2f;
  --border-color: #32496a;
  --supply-bg-color: rgba(217, 159, 71, 0.2);
  --borrow-bg-color: rgba(217, 71, 124, 0.2);
  --supply-color: #f3ba2f;
  --borrow-color: #d9477c;
  --withdraw-bg-color: rgba(243, 186, 47, 0.2);
  --withdraw-bg-hover-color: #f3ba2f;
  --withdraw-border-color: #f3ba2f;
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: #d9477c;
  --repay-border-color: #d9477c;
  --switch-color: #f3ba2f;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
`;
const CHAIN_ID = 56;
const CHAIN_NAME = "BSC";

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={{
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        multicallv2: "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreiajfajinsydy3ewmc3elgnpahc3n3v4cophn6ip5bzr3ym7ypn5vm",
            style: {
              width: "282px",
              height: "167px",
              marginTop: "80px",
            },
          },
          noAccountTips: "BSC Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to BSC Chain.",
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        dapps: {
          Venus: {
            name: "Venus",
            icon: "https://ipfs.near.social/ipfs/bafkreiejzp4eub7pxuwgzlxmudwlodlnwnqqfk5qhqp7oqj3cmsy7wuzjm",
            unitrollerAddress: "0xfD36E2c2a6789Db23113685031d7F16329158384",
            oracleAddress: "0x6592b5DE802159F3E74B2486b091D11a8256ab8A",
            data: "bluebiu.near/widget/Bsc.Lending.VenusData",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
          "C.R.E.A.M.": {
            name: "C.R.E.A.M.",
            icon: "https://ipfs.near.social/ipfs/bafkreihxqzhzavb7onnxjtin2y6s7pj3y4nxb6ul42cknregyykfu24ovm",
            unitrollerAddress: "0x589de0f0ccf905477646599bb3e5c622c84cc0ba",
            oracleAddress: "0xa82958C9f2Ff63f6D2DC7d8Ee22AE69fD0819477",
            data: "bluebiu.near/widget/Bsc.Lending.CreamData",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },

          Radiant: {
            name: "Radiant",
            icon: "https://ipfs.near.social/ipfs/bafkreiazgdy53hbpwgvvrrxjl4kslcxcjoedrdjpj2ysiq47jyvf2xlxcq",
            unitrollerAddress: "0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4",
            oracleAddress: "0x0BB5c1Bc173b207cBf47CDf013617087776F3782",
            PoolAddressProvider: "0x63764769dA006395515c3f8afF9c91A809eF6607",
            uiPoolDataProviderAddress:
              "0xB9F4de07b2869a66B51670dA562D7964Aa065691",
            walletBalanceProvider: "0xa04a72E1D93a327d54262E5D1Ccba99de6b8891B",
            aaveProtocolDataProviderAddress:
              "0x2f9D57E97C3DFED8676e605BC504a48E0c5917E9",
            lendingPoolAddress: "0xd50Cf00b6e600Dd036Ba8eF475677d816d6c4281",
            wethGateway: "0x8a226b70dcEB9656Eb75545424400128fCEF9d9e",
            data: "bluebiu.near/widget/Bsc.Lending.RadiantData",
            handlerCollateral:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantHandlerCollateral",
            type: "aave2",
            handlerCToken:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantActionHandler",
          },

          "Granary Finance": {
            name: "Granary Finance",
            icon: "https://ipfs.near.social/ipfs/bafkreihovftnvueysjuj7wansa74k3bgtfs4hkip4bgdvguh6nhehkvg5e",
            oracleAddress: "0x417cA1091Fa4C329cEe19452851dff46902440a5",
            PoolAddressProvider: "0x12c26138b666360AB2B7A1B149dF9Cf6642CDfBf",
            aaveProtocolDataProviderAddress:
              "0x7Fb479624ca336bA8f2dc66439F8683330eE2880",
            lendingPoolAddress: "0x7171054f8d148Fe1097948923C91A6596fC29032",
            wethGateway: "0x9df4Ac62F9E435DbCD85E06c990a7f0ea32739a9",
            data: "bluebiu.near/widget/Bsc.Lending.GranaryData",
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
