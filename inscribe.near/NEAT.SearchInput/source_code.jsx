const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.mainnet.near.org",
        indexerUrl: "https://inscription-indexer-a16497da251b.herokuapp.com/v1",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.testnet.near.org",
        indexerUrl: "https://inscription-indexer-a16497da251b.herokuapp.com/v1",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
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



const SearchInputContainer = styled.div`
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  gap: 4px;
  background: #ffffff0d;
  transition: all 0.3s ease-in-out;

  &:focus-within {
    color: #ffffff0d;
    background: #ffffff14;
  }
`;

const SearchImg = styled.img`
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  font-weight: 600;
  border: none;
  background: transparent;
  outline: none;
  color: white;
  &::placeholder {
    color: #ffffff59;
  }
`;

const { value, setValue } = props;
return (
  <SearchInputContainer>
    <SearchImg
      src={`${ipfsPrefix}/bafkreih5hkojsnvueri63sn42e5zff4dcabzi7grctluyurmh5u3yw7gaa`}
    />
    <SearchInput
      placeholder="Search ID/NO."
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
    />
  </SearchInputContainer>
);
