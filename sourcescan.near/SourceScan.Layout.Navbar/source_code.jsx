const pages = [
  {
    label: "SourceScan",
    href: props.app || "https://sourcescan.2bb.dev",
  },
  { label: "Contracts", href: null },
];

const useNetwork = (mainnet, testnet) => {
  return context.networkId === "mainnet" ? mainnet : testnet;
};

State.init({
  theme: props.theme || "light",
  ownerId: useNetwork("sourcescan.near", "sourcescan.testnet"),
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

const MainHStack = styled.div`
  width: 100%;
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const MiddleHStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const NavButton = styled.button`
  font-weight: 600;
  font-size: 18px;
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
  padding-left: 28px;
`;

const ThemeChangerContainer = styled.div`
  padding-right: 28px;
`;

const Logo = styled.img`
  cursor: pointer;
  filter: ${useTheme("invert(0)", "invert(1)")};
`;

return (
  <MainHStack>
    <NetworkSwitcherContainer>
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Inputs.NetworkSwitcher`}
        props={{
          theme: state.theme,
        }}
      />
    </NetworkSwitcherContainer>
    <MiddleHStack>
      <Logo
        src={
          "https://ipfs.io/ipfs/bafkreibfot4vz22olyjagjtr5qk7m4rpybwy3jb2x3bjfvjl5zzv3biluq"
        }
        width={"100px"}
      />
      {pages.map((page, i) => {
        return page.href ? (
          <a key={i} href={page.href} target={"_blank"}>
            <NavButton>{page.label}</NavButton>
          </a>
        ) : (
          <NavButton key={i}>{page.label}</NavButton>
        );
      })}
    </MiddleHStack>
    <ThemeChangerContainer>
      <Widget
        src={`${state.ownerId}/widget/SourceScan.Inputs.ThemeChanger`}
        props={{
          theme: state.theme,
          switchTheme: props.switchTheme,
        }}
      />
    </ThemeChangerContainer>
  </MainHStack>
);
