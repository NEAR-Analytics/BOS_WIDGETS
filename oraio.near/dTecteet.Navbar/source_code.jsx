const useThemeName = (light, dark) => {
  return state.theme.name === "light" ? light : dark;
};

const pages = [
  {
    label: "Blog",
    href: `#/`,
    target: "_self",
    icon: "sourcescan.near/widget/SourceScan.Common.Icons.DocsIcon",
  },
  {
    label: "Docs",
    href: `#/oraio.near/widget/dTecteet?page=docs`,
    target: "_self",
    icon: "sourcescan.near/widget/SourceScan.Common.Icons.DocsIcon",
  },
];

State.init({
  theme: props.theme || {
    name: "light",
    bg: "#e3e8ef",
    color: "#4c5566",
    border: "#748094",
  },
  ownerId: "sourcescan.near",
});

const Main = styled.div`
  padding-top: 6px;

  @media only screen and (max-width: 750px) {
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

  @media only screen and (max-width: 750px) {
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
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 40px;
  border: 1px solid transparent;
  color: ${state.theme.color};
  background-color: ${state.theme.bg};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${state.theme.hover.bg};
  }
`;

const NavButtonStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  left: 0;
  position: absolute;
  padding-left: 28px;
  padding-right: 28px;


`;

const ThemeChangerContainer = styled.div`
  position: absolute;
  right: 0;
  padding-left: 28px;
  padding-right: 28px;

  @media only screen and (max-width: 750px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;

  @media only screen and (max-width: 750px) {
    display: flex;
  }
`;

const Desktop = styled.div`
  display: flex;

  @media only screen and (max-width: 750px) {
    display: none;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  filter: ${useThemeName("invert(0)", "invert(1)")};
`;

return (
  <Main>
    <HStack>
      <LogoContainer>
        <Widget
          src="oraio.near/widget/dTecteet.Logo"
          props={{
            theme: state.theme,
          }}
        />
      </LogoContainer>
      <RStack>
        <Mobile>
          <a href="#/oraio.near/widget/dTecteet.index" target={"_self"}>
            <Logo
              src={
                "https://ipfs.io/ipfs/bafkreibfot4vz22olyjagjtr5qk7m4rpybwy3jb2x3bjfvjl5zzv3biluq"
              }
              width={"100px"}
            />
          </a>
        </Mobile>
        <HStack>
          <Desktop>
            <a href="#/oraio.near/widget/dTecteet.index" target={"_self"}>
              <Logo
                src={
                  "https://ipfs.io/ipfs/bafkreibfot4vz22olyjagjtr5qk7m4rpybwy3jb2x3bjfvjl5zzv3biluq"
                }
                width={"100px"}
              />
            </a>
          </Desktop>
          {pages.map((page, i) => {
            return page.href ? (
              <a key={i} href={page.href} target={page.target}>
                <NavButton>
                  <NavButtonStack>
                    <Widget
                      src={page.icon}
                      props={{ width: "18px", height: "18px" }}
                    />
                    {page.label}
                  </NavButtonStack>
                </NavButton>
              </a>
            ) : (
              <NavButton key={i}>
                <NavButtonStack>
                  <Widget
                    src={page.icon}
                    props={{ width: "18px", height: "18px" }}
                  />
                  {page.label}
                </NavButtonStack>
              </NavButton>
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
