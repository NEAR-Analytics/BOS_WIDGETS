const pages = [
  {
    label: "SourceScan",
    href: props.app || "https://sourcescan.2bb.dev",
    target: "_blank",
  },
  {
    label: "Contracts",
    href: `#/${state.ownerId}/widget/SourceScan`,
    target: "_self",
  },
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

const Main = styled.div`
  padding-top: 6px;

  @media only screen and (max-width: 600px) {
    padding-top: 22px;
  }
`;

const RStack = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const HStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 25px;
  justify-content: center;
  align-items: center;
`;

const NavButton = styled.button`
  font-weight: 600;
  font-size: 18px;
  width: 140px;
  height: 40px;
  border-radius: 40px;
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
  padding-right: 28px;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const ThemeChangerContainer = styled.div`
  padding-left: 28px;
  padding-right: 28px;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  filter: ${useTheme("invert(0)", "invert(1)")};

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const MobileLogo = styled.img`
  display: none;
  cursor: pointer;
  filter: ${useTheme("invert(0)", "invert(1)")};

  @media only screen and (max-width: 600px) {
    display: flex;
  }
`;

return (
  <Main>
    <HStack>
      <NetworkSwitcherContainer>
        <Widget
          src={`${state.ownerId}/widget/SourceScan.Inputs.NetworkSwitcher`}
          props={{
            theme: state.theme,
          }}
        />
      </NetworkSwitcherContainer>
      <RStack>
        <MobileLogo
          src={
            "https://ipfs.io/ipfs/bafkreibfot4vz22olyjagjtr5qk7m4rpybwy3jb2x3bjfvjl5zzv3biluq"
          }
          width={"100px"}
        />
        <HStack>
          <Logo
            src={
              "https://ipfs.io/ipfs/bafkreibfot4vz22olyjagjtr5qk7m4rpybwy3jb2x3bjfvjl5zzv3biluq"
            }
            width={"100px"}
          />
          {pages.map((page, i) => {
            return page.href ? (
              <a key={i} href={page.href} target={page.target}>
                <NavButton>{page.label}</NavButton>
              </a>
            ) : (
              <NavButton key={i}>{page.label}</NavButton>
            );
          })}
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
      </RStack>
    </HStack>
  </Main>
);
