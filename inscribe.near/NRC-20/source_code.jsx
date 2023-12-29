const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
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
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
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
        ftWrapper: "neat.nrc-20.testnet",
        refFinance: "https://testnet.ref-finance.com/",
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

const FooterContent = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-decoration: underline;

  margin-bottom: 40px;
`;



function getTab() {
  const tab = props.tab;
  if (
    ["mint", "transfer", "deploy", "nrc-20", "my-inscriptions"].includes(tab)
  ) {
    return tab;
  } else {
    return "nrc-20";
  }
}

const tab = getTab();
const tickParam = props.tick ? `&tick=${props.tick}` : "";
return (
  <Main>
    <HeaderContainer>
      <a href={landingUrl} target="_blank">
        <Logo
          src={`${ipfsPrefix}/bafkreic65adpnynb7dthyyfjkfxgteij3qq45dmtfcp3knlroyo4nyj4qq`}
          alt="Logo"
        />
      </a>
      <TabContainer>
        <TabItem
          selected={tab === "nrc-20"}
          href={`/${config.ownerId}/widget/NRC-20`}
        >
          NRC-20
        </TabItem>
        <TabItem
          selected={tab === "mint"}
          href={`/${config.ownerId}/widget/NRC-20?tab=mint${tickParam}`}
        >
          Mint
        </TabItem>
        <TabItem
          selected={tab === "transfer"}
          href={`/${config.ownerId}/widget/NRC-20?tab=transfer${tickParam}`}
        >
          Transfer
        </TabItem>
        <TabItem
          selected={tab === "deploy"}
          href={`/${config.ownerId}/widget/NRC-20?tab=deploy`}
        >
          Deploy
        </TabItem>
        <TabItem
          selected={tab === "my-inscriptions"}
          href={`/${config.ownerId}/widget/NRC-20?tab=my-inscriptions`}
        >
          My Inscriptions
        </TabItem>
      </TabContainer>
      <Spacer />
    </HeaderContainer>
    <BodyContainer>
      {tab === "nrc-20" && (
        <Widget
          src={`${config.ownerId}/widget/NRC-20.NRC-20`}
          props={{ tick: props.tick }}
        />
      )}
      {tab === "mint" && (
        <Widget
          src={`${config.ownerId}/widget/NRC-20.Mint`}
          props={{
            tick: props.tick,
          }}
        />
      )}
      {tab === "transfer" && (
        <Widget
          src={`${config.ownerId}/widget/NRC-20.Transfer`}
          props={{
            tick: props.tick,
          }}
        />
      )}
      {tab === "deploy" && (
        <Widget src={`${config.ownerId}/widget/NRC-20.Deploy`} />
      )}
      {tab === "my-inscriptions" && (
        <Widget src={`${config.ownerId}/widget/NRC-20.MyInscriptions`} />
      )}
    </BodyContainer>
    <FooterContent href="https://docs.nrc-20.io/" target="_blank">
      NRC-20 Standard Documentation
    </FooterContent>
  </Main>
);
