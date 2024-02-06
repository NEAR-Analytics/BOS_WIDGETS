const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
const partnerProgramUrl = "https://forms.gle/4M3fvw3LPiJSyffcA";
const nrc20DocHost = "https://docs.nrc-20.io/";
function toLocaleString(source, decimals, rm) {
  if (typeof source === "string") {
    return toLocaleString(Number(source), decimals);
  } else if (typeof source === "number") {
    return decimals !== undefined
      ? source.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        })
      : source.toLocaleString();
  } else {
    // Big type
    return toLocaleString(
      decimals !== undefined
        ? Number(source.toFixed(decimals, rm))
        : source.toNumber(),
      decimals
    );
  }
}

function formatAmount(_balance, _decimal) {
  const balance = _balance ?? 0;
  const decimal = _decimal ?? 8;
  return toLocaleString(
    Big(balance).div(Big(10).pow(decimal)).toFixed(),
    decimal
  );
}

function formatDeployTime(blockTime) {
  const milliseconds = blockTime / 1000000;
  const date = new Date(milliseconds);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapperFactory: "nrc-20.near",
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
        minMintEvents: 1_000_000,
        minHolders: 1_000,
        neatDecimals: 8,
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat-test",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapperFactory: "nrc-20.testnet",
        ftWrapper: "neat.nrc-20.testnet",
        refFinance: "https://testnet.ref-finance.com/",
        minMintEvents: 10,
        minHolders: 5,
        neatDecimals: 8,
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);
const tx = {
  contractName: config.contractName,
  methodName: config.methodName,
  args: config.args,
  gas: GasPerTransaction,
};

function ftWrapperAddress(tick) {
  return tick.toLowerCase() + "." + config.ftWrapperFactory;
}

const Main = styled.div`
  width: 100%;
  min-height: 90vh;
  overflow: hidden;
  background: #101010;
  background-image: url(${ipfsPrefix}/bafkreiak6rio66kqjsobw25gtmy5a7fwwsa4hjn3d25a4tppfylbdepbjq);
  background-repeat: no-repeat;
  background-size: cover;
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
  justify-content: space-between;
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
  color: white;
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

const FormContainer = styled.div`
  max-width: 650px;
  width: 100%;
  background: #141414;
  border-radius: 4px;
  border: 1px solid #ffffff1a;
  display: flex;
  flex-direction: column;
  gap: 36px;

  padding: 16px;
  @media (min-width: 640px) {
    padding: 24px;
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 40px 0;
`;

const Notification = styled.div`
  position: absolute;
  right: 40px;
  top: 50px;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NRC20Link = styled.a`
  color: white;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const NotificationImg = () => {
  return (
    <img
      style={{ cursor: "pointer" }}
      onClick={() =>
        State.update({
          showNotification: false,
        })
      }
      src={`${ipfsPrefix}/bafkreifzxbehbqzwatzsilj4tmxh3r6rypdm2wiutud34rifx5oxkvdmea`}
      width={24}
      height={24}
    />
  );
};



function getTab() {
  const tab = props.tab;
  if (["transfer", "wrap", "indexer", "mint"].includes(tab)) {
    return tab;
  } else {
    return "transfer";
  }
}

const tab = getTab();

State.init({
  showNotification: true,
});

return (
  <Main>
    {state.showNotification && (
      <Notification>
        <FormContainer
          style={{
            gap: "20px",
            flexDirection: "row",
          }}
        >
          <NRC20Link href={`/${config.ownerId}/widget/NRC-20`} target="_blank">
            📣 NRC-20 Launchpad is Ready!!!
          </NRC20Link>
          <NotificationImg />
        </FormContainer>
      </Notification>
    )}
    <HeaderContainer>
      <a href={landingUrl} target="_blank">
        <Logo
          src={`${ipfsPrefix}/bafkreic65adpnynb7dthyyfjkfxgteij3qq45dmtfcp3knlroyo4nyj4qq`}
          alt="Logo"
        />
      </a>
      <TabContainer>
        <TabItem
          selected={tab === "transfer"}
          href={`/${config.ownerId}/widget/NEAT?tab=transfer`}
        >
          Transfer
        </TabItem>
        <TabItem
          selected={tab === "wrap"}
          href={`/${config.ownerId}/widget/NEAT?tab=wrap`}
        >
          Wrap
        </TabItem>
        <TabItem
          selected={tab === "indexer"}
          href={`/${config.ownerId}/widget/NEAT?tab=indexer`}
        >
          Indexer
        </TabItem>
        <TabItem
          selected={tab === "mint"}
          href={`/${config.ownerId}/widget/NEAT?tab=mint`}
        >
          Mint
        </TabItem>
      </TabContainer>
      <Spacer />
    </HeaderContainer>
    <BodyContainer>
      {tab === "mint" && <Widget src={`${config.ownerId}/widget/NEAT.Mint`} />}
      {tab === "indexer" && (
        <Widget src={`${config.ownerId}/widget/NEAT.Indexer`} />
      )}
      {tab === "transfer" && (
        <Widget src={`${config.ownerId}/widget/NEAT.Transfer`} />
      )}
      {tab === "wrap" && (
        <Widget src={`${config.ownerId}/widget/NEAT.WrapUnwrap`} />
      )}
    </BodyContainer>
    <FooterWrapper>
      <NeatCommonLink href={nrc20DocHost} target="_blank">
        NRC-20 Standard
      </NeatCommonLink>
      |
      <NeatCommonLink href={partnerProgramUrl} target="_blank">
        Partner Program
      </NeatCommonLink>
    </FooterWrapper>
  </Main>
);
