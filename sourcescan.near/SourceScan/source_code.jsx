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
        contractId: "v1.sourcescan.near",
      };
    case "testnet":
      return {
        contractId: "v5.sourcescan.testnet",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
};
const config = getConfig(context.networkId);

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)};
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  searchContracts(value);
};

const searchContracts = async (value) => {
  Near.asyncView(config.contractId, "search", {
    key: value,
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

if (!state.contracts) searchContracts(state.search);

return (
  <Container>
    <Stack>
      <Right>
        <button onClick={switchTheme}>{state.theme}</button>
      </Right>
      <Center>
        <Widget
          src={"sourcescan.near/widget/SourceScan.Inputs.SearchBar"}
          props={{
            theme: state.theme,
            handleSubmit: handleSubmit,
            value: state.search,
          }}
        />
      </Center>
      <Center>
        <Widget
          src={"sourcescan.near/widget/SourceScan.Contracts.Table"}
          props={{ theme: state.theme, contracts: state.contracts }}
        />
      </Center>
    </Stack>
  </Container>
);
