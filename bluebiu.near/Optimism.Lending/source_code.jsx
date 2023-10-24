const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #ea3431;
  --primary-color: #ea3431;
  --border-color: #32496a;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: #505260;
  --withdraw-bg-hover-color: rgba(255, 255, 255, 0.17);
  --withdraw-border-color: #e1e1e1;
  --repay-bg-color: #4a2b37;
  --repay-bg-hover-color: rgba(202, 85, 85, 0.2);
  --repay-border-color: #ca5555;
  --switch-color: #ea3431;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #7c7f96;
`;
const CHAIN_ID = 10;
const CHAIN_NAME = "Optimism";

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={{
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        multicallv2: "0xD9bfE9979e9CA4b2fe84bA5d4Cf963bBcB376974",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/",
            style: {
              width: "282px",
              height: "167px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Optimism Lending Collection",
          wrongNetworkTips: "To proceed, kindly switch to Optimism Chain.",
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        defaultDapp: "Sonne",
        dapps: {
          Sonne: {
            name: "Sonne",
            icon: "https://ipfs.near.social/ipfs/bafkreih3zbgnxv34qmlr62j5nq62uai6hsiykiyip3wgmfa7djewbwbdtq",
            unitrollerAddress: "0x60CF091cD3f50420d50fD7f707414d0DF4751C58",
            oracleAddress: "0x91579f47f7826471C08B0008eE9C778aaB2989fD",
            data: "bluebiu.near/widget/Optimism.Lending.SonneData",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
          "Iron Bank": {
            name: "Iron Bank",
            icon: "https://ipfs.near.social/ipfs/bafkreicxpqo6pqipzukb37tncclzlnztumqrjxqrdygk6hnexgd3y7wuru",
            unitrollerAddress: "0xE0B57FEEd45e7D908f2d0DaCd26F113Cf26715BF",
            oracleAddress: "0x17C6768F438F1C67A70889dCFfE49C665CcfE769",
            data: "bluebiu.near/widget/Optimism.Lending.IronBankData",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
          "Granary Finance": {
            name: "Granary Finance",
            icon: "https://ipfs.near.social/ipfs/bafkreihovftnvueysjuj7wansa74k3bgtfs4hkip4bgdvguh6nhehkvg5e",
            oracleAddress: "0x9aEeFef549323511E027D70562f0C7EdcDEB294C",
            PoolAddressProvider: "0xdDE5dC81e40799750B92079723Da2acAF9e1C6D6",
            aaveProtocolDataProviderAddress:
              "0x9546F673eF71Ff666ae66d01Fd6E7C6Dae5a9995",
            lendingPoolAddress: "0x8FD4aF47E4E63d1D2D45582c3286b4BD9Bb95DfE",
            wethGateway: "0x6e20E155819f0ee08d1291b0b9889b0e011b8224",
            data: "bluebiu.near/widget/Optimism.Lending.GranaryData",
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
