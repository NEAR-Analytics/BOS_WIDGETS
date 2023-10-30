const { defaultDapp } = props;

const Theme = styled.div`
  --button-text-color: #ffffff;
  --button-color: #04795b;
  --primary-color: #04795b;
  --border-color: #292c42;
  --supply-bg-color: rgba(4, 121, 91, 0.2);
  --borrow-bg-color: rgba(217, 71, 124, 0.2);
  --supply-color: #00c391;
  --borrow-color: #ff6767;
  --withdraw-bg-color: rgba(4, 121, 91, 0.2);
  --withdraw-bg-hover-color: rgba(4, 121, 91, 1);
  --withdraw-border-color: rgba(4, 121, 91, 1);
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: rgba(217, 71, 124, 1);
  --repay-border-color: rgba(217, 71, 124, 1);
  --switch-color: #04795b;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
`;
const CHAIN_ID = 100;
const CHAIN_NAME = "Gnosis";

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
            src: "https://ipfs.near.social/ipfs/bafkreigekiurmengyh5sgxt6bnjcyzgpf24nbluna4mry6ztfufregkvlm",
            style: {
              width: "140px",
              height: "210px",
              marginTop: "60px",
            },
          },
          noAccountTips: `${CHAIN_NAME} Lending Collection`,
          wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        defaultDapp: defaultDapp || "Agave",
        dapps: {
          Agave: {
            name: "Agave",
            icon: "https://ipfs.near.social/ipfs/bafkreidnjva6lfgk24dzwhxrw2kuzegoochsczau5bqtmudhyyxvmcampq",
            oracleAddress: "0x062B9D1D3F5357Ef399948067E93B81F4B85db7a",
            PoolAddressProvider: "0x3673C22153E363B1da69732c4E0aA71872Bbb87F",
            aaveProtocolDataProviderAddress:
              "0xe6729389dea76d47b5bcb0ba5c080821c3b51329",
            lendingPoolAddress: "0x5E15d5E33d318dCEd84Bfe3F4EACe07909bE6d9c",
            wethGateway: "0x36A644cC38Ae257136EEca5919800f364d73FeFC",
            data: "bluebiu.near/widget/Gnosis.Lending.AgaveData",
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
