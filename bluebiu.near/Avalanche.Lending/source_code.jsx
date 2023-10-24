const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #f44d4e;
  --primary-color: #e84142;
  --border-color: #292c42;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: #505260;
  --withdraw-bg-hover-color: rgba(255, 255, 255, 0.17);
  --withdraw-border-color: #e1e1e1;
  --repay-bg-color: rgba(202, 85, 85, 0.2);
  --repay-bg-hover-color: rgba(202, 85, 85, 0.2);
  --repay-border-color: #ca5555;
  --switch-color: #5baea9;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
`;
const CHAIN_ID = 43114;
const CHAIN_NAME = "Avalanche";

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
          noAccountTips: "Avalanche Lending Collection",
          wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        defaultDapp: "Benqi",
        dapps: {
          Benqi: {
            name: "Benqi",
            icon: "https://ipfs.near.social/ipfs/bafkreifgik7lollci7ejl72mlej2cdpvanjnyoiihu7pqpppqsa75thyem",
            unitrollerAddress: "0x486Af39519B4Dc9a7fCcd318217352830E8AD9b4",
            oracleAddress: "0x316ae55ec59e0beb2121c0e41d4bdef8bf66b32b",
            data: "bluebiu.near/widget/Avalanche.Lending.BenqiData",
            handlerClaim: "",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
          "Granary Finance": {
            name: "Granary Finance",
            icon: "https://ipfs.near.social/ipfs/bafkreihovftnvueysjuj7wansa74k3bgtfs4hkip4bgdvguh6nhehkvg5e",
            oracleAddress: "0x5A3423210536d930150080F699248EDeBC65E2B4",
            PoolAddressProvider: "0xEDc83309549e36f3c7FD8c2C5C54B4c8e5FA00FC",
            aaveProtocolDataProviderAddress:
              "0xed984A0E9c12Ee27602314191Fc4487A702bB83f",
            lendingPoolAddress: "0xB702cE183b4E1Faa574834715E5D4a6378D0eEd3",
            wethGateway: "0x29563f73De731Ae555093deb795ba4D1E584e42E",
            data: "bluebiu.near/widget/Avalanche.Lending.GranaryData",
            handlerCollateral:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantHandlerCollateral",
            type: "aave2",
            handlerCToken:
              "bluebiu.near/widget/Arbitrum.Lending.RadiantActionHandler",
          },
          "Iron Bank": {
            name: "Iron Bank",
            icon: "https://ipfs.near.social/ipfs/bafkreicxpqo6pqipzukb37tncclzlnztumqrjxqrdygk6hnexgd3y7wuru",
            unitrollerAddress: "0x2eE80614Ccbc5e28654324a66A396458Fa5cD7Cc",
            oracleAddress: "0x0980f2F0D2af35eF2c4521b2342D59db575303F7",
            data: "bluebiu.near/widget/Avalanche.Lending.IronBankData",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.IronBankHandlerCToken",
          },
        },
      }}
    />
  </Theme>
);
