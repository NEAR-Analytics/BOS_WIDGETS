const pages = [
  {
    label: "SourceScan",
    href: "https://sourcescan.2bb.dev",
  },
  { label: "Contracts", href: null },
];

State.init({
  theme: props.theme || "light",
  ownerId:
    props.ownerId || context.network === "mainnet"
      ? "sourcescan.near"
      : "sourcescan.testnet",
});

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
  button: {
    bg: "#39393c",
  },
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
  button: {
    bg: "#eef2f6",
  },
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const NavButton = styled.button`
  border-radius: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid transparent;
  background-color: ${useTheme(light.bg, dark.bg)};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${useTheme(light.button.bg, dark.button.bg)}; 
  }
`;

const NetworkSwitcherContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
`;

const ThemeChangerContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
`;

return (
  <>
    <NetworkSwitcherContainer>
      <Widget
        src={`${props.ownerId}/widget/SourceScan.Inputs.NetworkSwitcher`}
        props={{
          theme: state.theme,
        }}
      />
    </NetworkSwitcherContainer>
    <HStack>
      {pages.map((page) => (
        <NavButton>{page.label}</NavButton>
      ))}
    </HStack>
    <ThemeChangerContainer>
      <Widget
        src={`${props.ownerId}/widget/SourceScan.Inputs.ThemeChanger`}
        props={{
          theme: state.theme,
          switchTheme: props.switchTheme,
        }}
      />
    </ThemeChangerContainer>
  </>
);
