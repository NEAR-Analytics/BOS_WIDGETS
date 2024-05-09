const pills = [
  { id: "tokenswap", title: "Swap" },
  { id: "liquidity", title: "Liquidity" },
];

const pillsLiquidity = [
  { id: "portfolio", title: "Portfolio" },
  { id: "addLiq", title: "Add liquidity" },
  { id: "creaPool", title: "Create pool" },
];

State.init({
  tabSelected: "tokenswap",
  tabSelectedLiq: "portfolio",
});

/* TODO added Wrapper container to reset font-family styles */
const Wrapper = styled.div`
* {
  font-family: 'system-ui','Inter', 'Space Grotesk' !important;
}
`;

const PillButtonActive = styled.div`
font-weight: 700;
background-color: #8D8DFD;
color: white;
border-radius: 10px;
margin: 0 10px 0 10px;
cursor: pointer;
padding: 7px 0 7px 0;
  }
`;

const PillButton = styled.div`
font-weight: 700;
cursor: pointer;
background-color: #1B1B18;
color: white;
padding-bottom: 5px;
border-radius: 10px;
margin: 0 10px 0 10px;
padding: 7px 0 7px 0;
  }
`;

return (
  <Wrapper>
    <div
      style={{
        display: "flex",
        "justify-content": "center",
      }}
    >
      <Widget src="miraclx.near/widget/FontAwesome" props={{ dep: true }} />

      <label style={{ "font-weight": "700", "font-size": "35px" }}>
        Maverick Protocol
        <svg
          width="43"
          height="43"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.0017 2.07213e-07C10.7473 -0.00172294 0.00172335 10.7438 2.07213e-07 23.9983C-0.00172294 37.2527 10.7438 47.9983 23.9983 48C37.2527 48.0017 47.9983 37.2562 48 24.0017C48 24 48 24 48 23.9983C47.9983 10.7455 37.2545 0.00172335 24.0017 2.07213e-07Z"
            fill="#780EFF"
          ></path>
          <path
            d="M23.7284 28.0735V22.6842L9.20605 30.2458H36.165V15.1226L23.7284 28.0735Z"
            fill="white"
          ></path>
        </svg>
      </label>
    </div>
    <br />
    <ul
      className="nav nav-pills nav-fill mb-4"
      id="pills-tab2"
      role="tablist2"
      style={{ "margin-top": "15px" }}
    >
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          {state.tabSelected == id ? (
            <PillButtonActive
              onClick={() => {
                State.update({ tabSelected: id });
              }}
            >
              {title}
            </PillButtonActive>
          ) : (
            <PillButton
              onClick={() => {
                State.update({ tabSelected: id });
              }}
            >
              {title}
            </PillButton>
          )}
        </li>
      ))}
    </ul>
    <div
      className="tab-content"
      id="pills-tabContent"
      style={{ display: "flex", "justify-content": "center" }}
    >
      {state.tabSelected == "tokenswap" ? (
        <Widget src="owa-is-bos.near/widget/Maverick-Swap" />
      ) : (
        <div>
          <ul
            className="nav nav-pills nav-fill mb-4"
            id="pills-tab2"
            role="tablist2"
            style={{ "margin-top": "15px" }}
          >
            {pillsLiquidity.map(({ id, title }, i) => (
              <li className="nav-item" role="presentation" key={i}>
                {state.tabSelectedLiq == id ? (
                  <PillButtonActive
                    onClick={() => {
                      State.update({ tabSelectedLiq: id });
                    }}
                  >
                    {title}
                  </PillButtonActive>
                ) : (
                  <PillButton
                    onClick={() => {
                      State.update({ tabSelectedLiq: id });
                    }}
                  >
                    {title}
                  </PillButton>
                )}
              </li>
            ))}
          </ul>
          <div
            className="tab-content"
            id="pills-tabContent"
            style={{ display: "flex", "justify-content": "center" }}
          >
            {state.tabSelectedLiq == "portfolio" ? (
              <Widget src="owa-is-bos.near/widget/Maverick-LP-Portfolio" />
            ) : state.tabSelectedLiq == "addLiq" ? (
              <Widget src="owa-is-bos.near/widget/Maverick-LP-Addition" />
            ) : (
              <Widget src="owa-is-bos.near/widget/Maverick-LP-NewPool" />
            )}
          </div>
        </div>
      )}
    </div>
  </Wrapper>
);
