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
    props.ownerId || context.networkId === "mainnet"
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
  width: 100%;
  padding-top: 20px;
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
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${useTheme(light.button.bg, dark.button.bg)}; 
  }
`;

const NetworkSwitcherContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 20px;
`;

const ThemeChangerContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
`;

const Logo = styled.img`
  cursor: pointer;
  filter: ${useTheme("invert(0)", "invert(1)")};
`;

return (
  <>
    <NetworkSwitcherContainer>
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Inputs.NetworkSwitcher`}
        props={{
          theme: state.theme,
        }}
      />
    </NetworkSwitcherContainer>
    <HStack>
      <Logo
        src={
          "https://ipfs.io/ipfs/bafkreibfot4vz22olyjagjtr5qk7m4rpybwy3jb2x3bjfvjl5zzv3biluq"
        }
        width={"100px"}
      />
      {pages.map((page) => (
        <NavButton>{page.label}</NavButton>
      ))}
    </HStack>
    <ThemeChangerContainer>
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Inputs.ThemeChanger`}
        props={{
          theme: state.theme,
          switchTheme: props.switchTheme,
        }}
      />
    </ThemeChangerContainer>
  </>
);
