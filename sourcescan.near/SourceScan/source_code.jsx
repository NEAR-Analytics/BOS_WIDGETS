State.init({
  theme: "light",
});

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
  flex-direction: row;
  justify-content: flex-end; 
`;

const switchTheme = () => {
  State.update({
    theme: state.theme === "light" ? "dark" : "light",
  });
};

return (
  <Container>
    <Stack>
      <button onClick={switchTheme}>{state.theme}</button>
    </Stack>
    <Widget
      src="sourcescan.near/widget/SourceScan.Contracts.Table"
      props={{ theme: state.theme }}
    />
  </Container>
);
