const widgetProvider = "frichard5.near";

const avenirFontFamily = fetch(
    "https://fonts.cdnfonts.com/css/avenir-lt-std"
).body;
const theme = {
    main: "#FFD50D",
    secondaryPink: "#F29BC0",
    secondaryBlue: "#4498E0",
};

const DashboardContainer = styled.div`
  * {
    font-family: 'avenir lt std';    
  }
  h2 {
    font-weight: 600;
    margin-left: 0px;
    font-size: 26px;
  }
  padding: 28px;
  ${avenirFontFamily}
  button {
    margin-left: 10px;
    color: black;
    background:rgba(118, 0, 255, 0.5);
    border: none;
    &:hover {
      background:rgba(118, 0, 255, 1);
      color: black;
    }
    &:active {
        background-color:rgba(118, 0, 255, 0.8);
        color: black !important;
    }
  }
  *.rejected {
      color:#ff5e03;
  }
  *.approved {
      color:#13a36e;
  }
  svg {
    &.approved-icon {
      height: 20px;
      fill:#13a36e;
    }
    &.rejected-icon {
      height: 20px;
      fill: #ff5e03;
    }
  }
 
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(81, 81, 81, 0.3);
    border-radius: 3px;
  }

  
  *::-webkit-scrollbar-thumb:hover {
    background: rgba(81, 81, 81, 0.5);
  }

  *::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

const WContainer = styled.div`
  width: 50%;
  @media screen and (max-width:600px) {
    width: 100%;
  };
`;

const DailyTransactions = (
    <Widget
        src={`${widgetProvider}/widget/NearDashboard.DailyTransactions`}
        props={{
        }}
    />
);

const ActiveAccounts = (
    <Widget
        src={`${widgetProvider}/widget/NearDashboard.ActiveAccounts`}
        props={{
        }}
    />
)

const NewAccounts = (
    <Widget
        src={`${widgetProvider}/widget/NearDashboard.NewAccounts`}
        props={{
        }}
    />
)

const ActiveContracts = (
    <Widget
        src={`${widgetProvider}/widget/NearDashboard.ActiveContracts`}
        props={{
        }}
    />
)


const WidgetContainer = styled.div`
  display: flex;
  @media screen and (max-width:600px) {
    flex-direction: column;
  }
`


return (
    <DashboardContainer theme={theme}>
        <WidgetContainer>
            <WContainer>{DailyTransactions}</WContainer>
            <WContainer>{ActiveAccounts}</WContainer>
        </WidgetContainer>
        <WidgetContainer>
            <WContainer>{NewAccounts}</WContainer>
            <WContainer>{ActiveContracts}</WContainer>
        </WidgetContainer>
    </DashboardContainer>
);