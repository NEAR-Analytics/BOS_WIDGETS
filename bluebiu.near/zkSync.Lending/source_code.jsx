const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #3b6bdc;
  --primary-color: #3b6bdc;
  --border-color: #292c42;
  --supply-bg-color: rgba(78, 133, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #85abff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(59, 107, 220, 0.2);
  --withdraw-bg-hover-color: #3b6bdc;
  --withdraw-border-color: #3b6bdc;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #3b6bdc;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
`;
const CHAIN_ID = 324;
const CHAIN_NAME = "zkSync";

return (
  <Theme>
    <Widget
      src="bluebiu.near/widget/Avalanche.Lending.Collection"
      props={{
        chainId: CHAIN_ID,
        chainName: CHAIN_NAME,
        multicallv2: "0x1ADC6Ac76c6d35cED013cA0513919f7f53586fAf",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreifaf3lxmrla2dgdug5fjbl535tuxj4xg23q2x3nlwe6u3e63anqym",
            style: {
              width: "174px",
              height: "213px",
              marginTop: "80px",
            },
          },
          noAccountTips: "zkSync Swap Collection",
          wrongNetworkTips: "To proceed, kindly switch to zkSync Chain.",
          chainId: CHAIN_ID,
          chainName: CHAIN_NAME,
        },
        dapps: {
          Reactorfusion: {
            name: "Reactorfusion",
            icon: "https://ipfs.near.social/ipfs/bafkreidyqr2ytwxudwgj4xwuux67l6k2ulmkvmhrsh2egk65iye2yzyexy",
            unitrollerAddress: "0x23848c28Af1C3AA7B999fA57e6b6E8599C17F3f2",
            oracleAddress: "0x9919f167326AE0f6251dB2fF05F6F70eC6e0c6c2",
            data: "bluebiu.near/widget/zkSync.Lending.ReactorfusionData",
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
