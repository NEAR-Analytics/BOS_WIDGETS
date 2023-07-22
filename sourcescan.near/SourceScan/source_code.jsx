State.init({
  theme: "light",
  from_index: 0,
  limit: 10,
  contracts: null,
  pages: 1,
  search: "",
});

const getConfig = (network) => {
  switch (network) {
    case "mainnet":
      return {
        rpcUrl: "https://rpc.mainnet.near.org",
        contractId: "v1.sourcescan.near",
        apiHost: "https://sourcescan.2bb.dev",
      };
    case "testnet":
      return {
        rpcUrl: "https://rpc.testnet.near.org",
        contractId: "v5.sourcescan.testnet",
        apiHost: "https://sourcescan.2bb.dev",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
};
const config = getConfig(context.networkId);

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)};
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end; 
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const switchTheme = () => {
  State.update({
    theme: state.theme === "light" ? "dark" : "light",
  });
};

const handleSubmit = (value) => {
  console.log(value);
  State.update({ search: value });
  searchContracts();
};

const searchContracts = async () => {
  Near.asyncView(config.contractId, "search", {
    key: state.search,
    from_index: state.from_index,
    limit: state.limit,
  })
    .then((res) => {
      console.log(res);
      State.update({
        pages: res[1],
        contracts: res[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

if (!state.contracts) searchContracts();

const handleOptionsChange = (e) => {
  State.update({
    limit: parseInt(e.target.value),
  });
  searchContracts();
};

const handlePageChange = (x) => {
  State.update({
    selectedPage: x + 1,
    from_index: x * state.limit,
  });
  searchContracts();
};

return (
  <Container>
    <Stack>
      <Right>
        <button onClick={switchTheme}>{state.theme}</button>
      </Right>
      <Center>
        <HStack>
          <Widget
            src={"sourcescan.near/widget/SourceScan.Inputs.SearchBar"}
            props={{
              theme: state.theme,
              handleSubmit: handleSubmit,
              value: state.search,
            }}
          />
          <Widget
            src={"sourcescan.near/widget/SourceScan.Inputs.Limits"}
            props={{
              handleOptionsChange: handleOptionsChange,
              theme: state.theme,
            }}
          />
        </HStack>
      </Center>
      <Center>
        <Stack>
          <Widget
            src={"sourcescan.near/widget/SourceScan.Contracts.Table"}
            props={{
              theme: state.theme,
              contracts: state.contracts,
              rpcUrl: config.rpcUrl,
              apiHost: config.apiHost,
            }}
          />
          <Center>
            <Widget
              src={"sourcescan.near/widget/SourceScan.Inputs.Pagination"}
              props={{
                pages: state.pages,
                selectedPage: state.selectedPage,
                handlePageChange: handlePageChange,
              }}
            />
          </Center>
        </Stack>
      </Center>
    </Stack>
  </Container>
);
