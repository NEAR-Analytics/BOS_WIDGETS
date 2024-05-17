const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
const partnerProgramUrl = "https://forms.gle/4M3fvw3LPiJSyffcA";
const nrc20DocHost = "https://docs.nrc-20.io/";

function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "safe-token.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: "safe-token.near",
        refFinance: "https://app.ref.finance/",
        minMintEvents: 1_000_000,
        minHolders: 1_000,
        neatDecimals: 8,
      };

    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);

function ftWrapperAddress(tick) {
  return tick.toLowerCase() + "." + config.ftWrapperFactory;
}

const Main = styled.div`
  width: 100%;
  min-height: 90vh;
  position: absolute;
  overflow: hidden;
  padding: 0 16px;
  color: white;
  @media (min-width: 640px) {
    padding: 0 40px;
  }
`;

const Spacer = styled.div``;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin: 40px 0;
`;

const NeatLink = styled.a`
  color: rgb(0, 214, 175);
  font-size: 18px;
  font-weight: 600;
  display: inline-block;
  text-decoration: underline;
`;

const NeatCommonLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
`;

const HeaderContainer = styled.div`
  padding: 18px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 56px;
  flex-flow: wrap;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const TabItem = styled("Link")`
  color: black;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  ${(props) => !props.selected && "opacity: 0.4;"}
  &:hover {
    color: white;
    text-decoration: none;
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

function getTab() {
  const tab = props.tab;
  if (["deploy", "utils"].includes(tab)) {
    return tab;
  } else {
    return "utils";
  }
}

const tab = getTab();

const css = fetch(
  "https://ipfs.near.social/ipfs/bafkreifxhygzwfq3iswguqjd5abc2y5cc6oj7zzcvzp7crlcpa2ew4ffnm"
).body;
if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}

const Theme = state.theme;

return (
  <Theme>
    <Main>
      <HeaderContainer>
        <TabContainer>
          <TabItem
            selected={tab === "deploy"}
            href={`/${config.ownerId}/widget/Main?tab=deploy`}
          >
            Deploy
          </TabItem>
          <TabItem
            selected={tab === "utils"}
            href={`/${config.ownerId}/widget/Main?tab=utils`}
          >
            Utils
          </TabItem>
        </TabContainer>
        <Spacer />
      </HeaderContainer>
      <BodyContainer>
        {tab === "deploy" && <Widget src={`${config.ownerId}/widget/Deploy`} />}
        {tab === "utils" && <Widget src={`${config.ownerId}/widget/Utils`} />}
      </BodyContainer>
    </Main>
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </Theme>
);
