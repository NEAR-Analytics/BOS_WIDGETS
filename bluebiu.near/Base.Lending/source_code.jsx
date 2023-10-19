const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #004bfc;
  --primary-color: #004bfc;
  --border-color: #32496a;
  --supply-bg-color: rgba(78, 133, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #85abff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(0, 75, 252, 0.2);
  --withdraw-bg-hover-color: #004bfc;
  --withdraw-border-color: #004bfc;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #004bfc;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
`;
const CHAIN_ID = 8453;
const CHAIN_NAME = "Base";

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
            src: "https://ipfs.near.social/ipfs/bafkreigkxrlezj5i7jk3sfm4rmv2kui7oxz4skngjyiopl5rvbvvllnnja",
            style: {
              width: "404px",
              height: "220px",
              marginTop: "60px",
            },
          },
          noAccountTips: "Base Lending Collection",
          wrongNetworkTips: "To proceed, kindly switch to Base Chain.",
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        dapps: {
          Moonwell: {
            name: "Moonwell",
            icon: "https://ipfs.near.social/ipfs/bafkreih3un4tcbwp3tneicomraozegmftz45sfx4rtg3qyui67nfdrptei",
            unitrollerAddress: "0xfBb21d0380beE3312B33c4353c8936a0F13EF26C",
            oracleAddress: "0xEC942bE8A8114bFD0396A5052c36027f2cA6a9d0",
            rewardDistributorAddress:
              "0xe9005b078701e2A0948D2EaC43010D35870Ad9d2",
            data: "bluebiu.near/widget/Base.Lending.MoonwellData",
            handlerClaim:
              "bluebiu.near/widget/Base.Lending.MoonwellHandlerClaim",
            handlerCollateral:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCollateral",
            handlerCToken:
              "bluebiu.near/widget/Avalanche.Lending.BenqiHandlerCToken",
          },
          Sonne: {
            name: "Sonne",
            icon: "https://ipfs.near.social/ipfs/bafkreih3zbgnxv34qmlr62j5nq62uai6hsiykiyip3wgmfa7djewbwbdtq",
            unitrollerAddress: "0x1DB2466d9F5e10D7090E7152B68d62703a2245F0",
            oracleAddress: "0x3fb2ef203a051A5bF190fFBb2Fa510e78a5Bb103",
            data: "bluebiu.near/widget/Base.Lending.SonneData",
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
            data: "bluebiu.near/widget/Base.Lending.GranaryData",
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
