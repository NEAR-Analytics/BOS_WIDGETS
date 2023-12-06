const tabs = {
  area: "sbt-area",
  info: "sbt-info",
  search: "search-sbt",
  Explorer: "Explorer",
};

State.init({
  value: "acceleration",
  light: true,
  tab: "sbt-area",
});
const themeColor = state.light ? lightColors : darkColors;
const handelLight = () => {
  let bool = state.light;
  State.update({ light: !bool });
};
const setTab = (tab) => State.update({ tab });

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

return (
  <div
    style={{
      background: themeColor?.page_bg,
    }}
  >
    <div
      style={{
        background: themeColor.page_bg,
        zIndex: 1,
      }}
      className="sticky-top p-4"
    >
      <div>
        <Container>
          <ul className="tabContent">
            <li className="tab-item">
              <button
                className={`${state.tab === tabs.area ? "active" : ""}`}
                aria-current="page"
                onClick={() => setTab(tabs.area)}
              >
                Assets
              </button>
            </li>
            <li className="tab-item">
              <button
                className={`${state.tab === tabs.info ? "active" : ""}`}
                aria-current="page"
                onClick={() => setTab(tabs.info)}
              >
                NFT
              </button>
            </li>
            <li className="tab-item">
              <button
                className={`${state.tab === tabs.Explorer ? "active" : ""}`}
                aria-current="page"
                onClick={() => setTab(tabs.Explorer)}
              >
                Gallery
              </button>
            </li>
          </ul>
        </Container>
      </div>
    </div>
    <div>
      <div className="content">
        {state.tab === "sbt-area" && (
          <Widget
            src="lord1.near/widget/Explorer-Balance-USD"
            props={{ themeColor: themeColor }}
          />
        )}
        {state.tab === "sbt-info" && (
          <Widget
            src="lord1.near/widget/Explorer-Balance-NFT"
            props={{ themeColor: themeColor }}
          />
        )}
        {state.tab === "Explorer" && (
          <div
            className="rounded-4"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "2rem",
            }}
          >
            <Widget
              src="jibolaojo.near/widget/Collectibles"
              props={{ themeColor: themeColor }}
            />{" "}
          </div>
        )}
      </div>
    </div>
  </div>
);
