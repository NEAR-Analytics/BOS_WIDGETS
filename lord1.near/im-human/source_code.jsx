const Container = styled.div`
  &&{text-align:center};
  .tabContent{
    display:inline-flex;
    align-items:center;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    padding:3px 4px;
    list-style-type:none;
    margin: 0 auto;
  }
  .tab-item .active{
    background: #304352;
  }
  .tab-item button{
    background-color:transparent;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    color:#fff;
    height:30px;
    padding:0 22px;
    border:none;
  }
`;

const tabs = {
  area: "sbt-area",
  info: "sbt-info",
  search: "search-sbt",
};

State.init({
  value: "acceleration",
  light: true,
  //   selectedTab="1",
  tab: "sbt-area",
});
const handelLight = () => {
  let bool = state.light;
  State.update({ light: !bool });
  console.log(bool);
};
const setTab = (tab) => State.update({ tab });

return (
  <div
    style={{
      background: `${state.light ? "rgb(241,242,245)" : "rgb(25,33,50)"}`,
    }}
  >
    <Widget
      src="lord1.near/widget/sidebar"
      props={{
        headerIcon:
          "https://yt3.googleusercontent.com/zkArEwljuLKjF7S1rbXoyQWW1VC8QzgVzrFP7KKqOypFtSv0cKgIXbfOBdIFO3ZoBD_wJJUyyw=s900-c-k-c0x00ffffff-no-rj",
        headerText: "Flipside",
        footerIcon:
          "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/house-solid.svg",
        footerText: "",
        headerLink: "test",
        footerLink: "test",
        links: [
          {
            text: "Home",
            link: "../../lord1.near/widget/home",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/windows.svg",
          },
          {
            text: "Dashboards",
            link: "../../lord1.near/widget/Flipside-Home-page",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/users-solid.svg",
          },
          {
            text: "Contracts",
            link: "../../leslug.near/widget/NearContractVisualizerV2",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/people-arrows-solid.svg",
          },
          {
            text: "Im human",
            link: "../../lord1.near/widget/im-human",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/1309168682.svg",
          },
          {
            text: "Tracker",
            link: "http://flipsidecrypto.xyz/",
            image:
              "https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/icons8-home.svg",
          },
        ],
        backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
        textcolor: "#fff",
      }}
    />
    <div style={{ marginLeft: "6rem" }}>
      <div
        style={{
          backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          padding: ".5rem",
          marginBottom: "1rem",
        }}
      >
        <Widget
          src="efiz.near/widget/marquee"
          props={{
            text: "Broaden your horizon with Flipside",
            fontFamily: "Arial",
            fontSize: "20px",
            backgroundColor: `${state.light ? "#d2cafa" : "rgb(49,62,89)"}`,
            height: "60px",
            width: "100%",
            textColor: "white",
          }}
        />

        <img
          onClick={handelLight}
          Width={30}
          src="https://raw.githubusercontent.com/lordking1234/blockchain-icon/main/lightmode.svg"
        />
      </div>
      <div>
        <div>
          <Container>
            <ul className="tabContent">
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.area ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.area)}
                >
                  SBT Area
                </button>
              </li>
              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.info ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.info)}
                >
                  SBT Info
                </button>
              </li>

              <li className="tab-item">
                <button
                  className={`${state.tab === tabs.search ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => setTab(tabs.search)}
                >
                  Search SBT
                </button>
              </li>
            </ul>
          </Container>
        </div>
        <div className="content">
          {state.tab === "sbt-area" && (
            <Widget src="lord1.near/widget/sbt-area" />
          )}
          {state.tab === "sbt-info" && (
            <Widget src="lord1.near/widget/sbt-info" />
          )}
          {state.tab === "search-sbt" && (
            <Widget src="lord1.near/widget/search-sbt" />
          )}
        </div>
      </div>
      <div style={{ width: "100%", height: "85px" }}></div>
      <Widget
        src="lord1.near/widget/footer"
        props={{
          beBackground: "#fff",
          titlenelowBackground: `${state.light ? "#806ce1" : "#806ce1"}`,
          titleBackground: `${state.light ? "#fff" : "#fff"}`,
          svgBackground: "#806ce1",
          fromBackground: `${state.light ? "#d2cafa" : "rgb(55,72,107)"}`,
          toBackground: `${state.light ? "#d2cafa" : "rgb(55,72,107)"}`,
          belowBackground: `${state.light ? "#806ce1" : "#d2cafa"}`,
        }}
      />
    </div>
  </div>
);
