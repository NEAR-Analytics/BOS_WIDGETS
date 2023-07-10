const { widgetProvider, parent,selectedDao} = props;
const selectedTabColor = parent === 'NDC-Page'?"#FFD50D":'rgba(118, 0, 255, 0.5)'
const MenuIcon = <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false"
                      aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon">
  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
</svg>;
const tabs = props.tabs || [
  {
    value: "tab1",
    label: "data",
    selected: true,
    components: <>data content</>,
  },
  { value: "tab2", label: "time", components: <>time content</> },
];

State.init({
  selectedTab: tabs.find((t) => t.selected).value || tabs[0].value,
  isOpen: false
});

const tabSelect = (selectedTab) => {
  return () => {
    State.update({ selectedTab });
  };
};
const TabsContainer = styled.div`
  position: relative;
`;
const Tabs = styled.div`
    display:flex;
    justify-content:flex-end;
    @media screen and (max-width: 1150px) {
      display: ${props => props.isOpen? 'flex': 'none'};
      flex-direction: column;
      position: absolute;
      z-index: 1000;
      background: white;
      padding: 20px;
      width: 100%;
      box-shadow: rgba(68, 152, 224, 0.5) -6px 2px 24px;
      top: -45px;
    }

`;
const Content = styled.div`
  @media screen and (max-width: 1150px) {
    margin-top: 120px;
  }
`;
const TabButton = styled.button`
    background: ${(props) =>
      props.selected ? selectedTabColor : "transparent"} !important;
    border: none; 
    border-radius: 4px;
    margin: 0 10px;
    &:hover {
      background:rgba(255, 213, 13, 0.5);
    }
`;

const MenuIconWrapper = styled.span `
/*  position: absolute;*/

  svg {
    width: 30px;
    display: none;
  }
  @media screen and (max-width: 1150px) {
    display: block;
    svg {
      display: block;
    }
  }
`

const ButtonMenu = styled.button`
  background: transparent !important;
  position: absolute;
  z-index: 100000;
  top: -85px;
  svg {
    fill: grey;
  }
  @media screen and (max-width: 1150px) {
    top: -75px;
  }
`

let tabList = [];

tabs.forEach((tab) => {
  tabList.push(
    <TabButton
      onClick={tabSelect(tab.value)}
      selected={tab.value === state.selectedTab}
    >
      <a
        href={`#/${widgetProvider}/widget/${parent}?tab=${tab.value}&selected_dao=${selectedDao}`}
        style={{ color: "black" }}
      >
        {tab.label}
      </a>
    </TabButton>
  );
});

return (
  <TabsContainer>
    <MenuIconWrapper>
      <ButtonMenu onClick={() => State.update({isOpen: !state.isOpen})}>{MenuIcon}</ButtonMenu>
      <Tabs isOpen={state.isOpen}>{tabList}</Tabs>
    </MenuIconWrapper>
    <Content>
      {tabs.find((t) => t.value === state.selectedTab).components}
    </Content>
  </TabsContainer>
);
