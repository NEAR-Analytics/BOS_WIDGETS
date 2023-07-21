const dark = {
  bg: "#28282b",
  color: "#e6eaee",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
};

State.init({
  theme: "light",
});

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: ${state.theme === "light" ? light.color : dark.color};
  background-color: ${state.theme === "light" ? light.bg : dark.bg};
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
    <p>Hello World</p>
  </Container>
);
