const { defaultDapp, ...rest } = props;

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #56daff;
  --primary-color: #56daff;
  --border-color: #292c42;
  --supply-bg-color: rgba(86, 218, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #56daff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(86, 218, 255, 0.2);
  --withdraw-bg-hover-color: #56daff;
  --withdraw-border-color: #56daff;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #56daff;
  --switch-border-color: #3f577b;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
`;
const CHAIN_ID = 59144;
const CHAIN_NAME = "Linea";

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={{
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        multicallv2: "0xcA11bde05977b3631167028862bE2a173976CA11",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreihqshwscu7pagkjl2dwx3exjhfktuxuzjss6m6gjs6aicu3t3ns2m",
            style: {
              width: "437px",
              height: "310px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Linea Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Linea Chain.",
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        defaultDapp: defaultDapp || "LayerBank",
        dapps: {
          LayerBank: {
            name: "LayerBank",
            icon: "https://ipfs.near.social/ipfs/bafkreiecfhuuc6grbyfxfv4uzgaciofdug6sdqv7efruu4uwmzclfqmcs4",
            unitrollerAddress: "0x009a0b7C38B542208936F1179151CD08E2943833",
            oracleAddress: "0x4F5F443fEC450fD64Dce57CCacE8f5ad10b4028f",
            rateModelSlopeAddress: "0xC690549E0215192D1fFB527BB3ca4D4Ba638Cad2",
            distributionAddress: "0x5D06067f86946620C326713b846DdC8B97470957",
            data: "bluebiu.near/widget/Linea.Lending.LayerBankData",
            handlerClaim:
              "bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Linea.Lending.LayerBankHandlerCToken",
          },
          "mendi finance": {
            name: "mendi finance",
            icon: "https://ipfs.near.social/ipfs/bafkreidlvv5i7d44wtqtts6z7hcltylh2hv2ybjeluf4qklovf7fm6h7my",
            unitrollerAddress: "0x1b4d3b0421dDc1eB216D230Bc01527422Fb93103",
            oracleAddress: "0xe159031D368Bf07F803DA0E96ce747F3B44F1230",
            distributionAddress: "0x3b9B9364Bf69761d308145371c38D9b558013d40",
            data: "bluebiu.near/widget/Linea.Lending.MendiData",
            handlerClaim: "bluebiu.near/widget/Linea.Lending.MendiHandlerClaim",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
        },
        ...rest,
      }}
    />
  </Theme>
);
