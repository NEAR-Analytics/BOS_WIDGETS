const { defaultDapp } = props;

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #783bf0;
  --primary-color: #783bf0;
  --border-color: #292c42;
  --supply-bg-color: rgba(84, 101, 255, 0.2);
  --borrow-bg-color: rgba(199, 71, 171, 0.2);
  --supply-color: #5465ff;
  --borrow-color: #c747ab;
  --withdraw-bg-color: rgba(84, 101, 255, 0.2);
  --withdraw-bg-hover-color: #5465ff;
  --withdraw-border-color: #5465ff;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c747ab;
  --repay-border-color: #c747ab;
  --switch-color: #5465ff;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
`;

const CHAIN_ID = 137;
const CHAIN_NAME = "Polygon";

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={{
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        multicallv2: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreihcujrphf3k3zgfl4wdnxbz5btydas43uwdmvjgrs5mavbubvrpyq",
            style: {
              width: "282px",
              height: "222px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Polygon Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Polygon Chain.",
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        defaultDapp: defaultDapp || "0vix",
        dapps: {
          "0vix": {
            name: "0vix",
            icon: "https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4",
            unitrollerAddress: "0x8849f1a0cB6b5D6076aB150546EddEe193754F1C",
            oracleAddress: "0x1c312b14c129eabc4796b0165a2c470b659e5f01",
            data: "bluebiu.near/widget/Polygon.Lending.0vixData",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
          "C.R.E.A.M.": {
            name: "C.R.E.A.M.",
            icon: "https://ipfs.near.social/ipfs/bafkreihxqzhzavb7onnxjtin2y6s7pj3y4nxb6ul42cknregyykfu24ovm",
            unitrollerAddress: "0x20CA53E2395FA571798623F1cFBD11Fe2C114c24",
            oracleAddress: "0x812c0b2a2a0a74f6f6ed620fbd2b67fec7db2190",
            data: "bluebiu.near/widget/Polygon.Lending.CreamData",
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
