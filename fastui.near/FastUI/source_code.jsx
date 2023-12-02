State.init({
  selectedTab: props.tab || "buttons",
});

const Wrapper = styled.div`
  padding-bottom: 48px;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  border-right: 1px solid #eceef0;
  padding-right: 24px;
  overflow-y: auto;
  max-height: 1000px;
  position: sticky;
  top: 0; 
  @media (max-width: 1200px) {
    background: #f8f9fa;
    border: none;
    margin: 0;
    padding: 0;

    > * {
      flex: none;
      margin-bottom: 12px;
    }
  }
`;

const TabsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 23px;
  padding: 12px 0;
  position: relative;
  color: white;
  background-image: linear-gradient(90deg, rgba(251,136,255,1) 0%, rgba(252,176,69,1) 100%);
  border: #ffac32ff;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    background: #ffd83e;
    cursor: pointer;
    color:white;

  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    background: #ffd83e;
   
}
`;

const Select = styled.select`
  display: inline-flex;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 23px;
  padding: 12px 0;
  position: relative;
  color: black;
  background-image: linear-gradient(90deg, rgba(251,136,255,1) 0%, rgba(252,176,69,1) 100%);
  border: #ffac32ff;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    background: #ffd83e;
    cursor: pointer;
    color:black;

  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    background: #ffd83e;
   
}`;
const Option = styled.option`
  display: inline-flex;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 23px;
  padding: 12px 0;
  position: relative;
  color: black;
  background-image: linear-gradient(90deg, rgba(251,136,255,1) 0%, rgba(252,176,69,1) 100%);
  border: #ffac32ff;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    background: #ffd83e;
    cursor: pointer;
    color:black;

  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    background: #ffd83e;
   
}`;

const handleSelectChange = (event) => {
  const selectedTab = event.target.value;
  State.update({
    selectedTab: selectedTab,
  });
};

const handleTabClick = (tab) => {
  State.update({
    selectedTab: tab,
  });
};
return (
  <div class="container">
    <>
      <Widget src="marketplacebos.near/widget/FastUIHeader" />
    </>
    <div class="row">
      <div class="col-md-3">
        <Wrapper style={{ cursor: "pointer" }}>
          <Tabs>
            <Select onChange={handleSelectChange}>
              <Option value="buttons">Components</Option>
              <Option value="buttons">Buttons</Option>
              <Option value="checkboxes">Checkboxes</Option>
              <Option value="cards">Cards</Option>
              <Option value="toggleswitches">Toggles</Option>
              <Option value="inputs">Inputs</Option>
              <Option value="loaders">Loaders</Option>
              <Option value="forms">Forms</Option>
              <Option value="charts">Charts</Option>
              <Option value="patterns">Patterns</Option>
              <Option value="radiobuttons">Radios</Option>
              <Option value="fonts">Font Styles</Option>
            </Select>
            <Select onChange={handleSelectChange}>
              <Option value="someOption">BOS Games</Option>
              <Option value="tiktactoe">Tiktactoe</Option>
              <Option value="quiz">QuizGame</Option>
            </Select>
            <TabsButton
              onClick={() => handleTabClick("feedbacks")}
              selected={state.selectedTab === "feedbacks"}
            >
              <Title>Feedback Apps</Title>
            </TabsButton>
            <TabsButton
              onClick={() => handleTabClick("IPFS")}
              selected={state.selectedTab === "IPFS"}
            >
              <Title>IPFS uploads</Title>
            </TabsButton>

            <TabsButton
              onClick={() => handleTabClick("trending")}
              selected={state.selectedTab === "trending"}
            >
              <Title>Trending Post</Title>
            </TabsButton>
            <TabsButton
              onClick={() => handleTabClick("myfavorites")}
              selected={state.selectedTab === "myfavorites"}
            >
              <Title>My Favorites</Title>
            </TabsButton>
          </Tabs>
        </Wrapper>
      </div>
      <div class="col-md-9">
        {state.selectedTab === "buttons" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.ButtonPage1" />
          </>
        )}
        {state.selectedTab === "checkboxes" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.CheckBoxPage1" />
            <br />
            <br />
          </>
        )}
        {state.selectedTab === "toggleswitches" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.ToggleSwitchPage1" />
            <br />
            <br />
          </>
        )}
        {state.selectedTab === "cards" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.CardPage1" />

            <br />
            <br />
          </>
        )}
        {state.selectedTab === "loaders" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.LoaderPage1" />
            <br />
            <br />
          </>
        )}{" "}
        {state.selectedTab === "inputs" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.InputPage1" />
            <br />
            <br />
          </>
        )}{" "}
        {state.selectedTab === "radiobuttons" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.RadioButtonPage1" />
            <br />
            <br />
          </>
        )}
        {""}
        {state.selectedTab === "forms" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.FormPage1" />
            <br />
            <br />
          </>
        )}
        {""}
        {state.selectedTab === "charts" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.ChartPage1" />
            <br />
            <br />
          </>
        )}
        {""}
        {state.selectedTab === "feedbacks" && (
          <>
            <Widget src="marketplacebos.near/widget/Feedback.Widget.Index" />
            <br />
            <br />
          </>
        )}
        {state.selectedTab === "tiktactoe" && (
          <>
            <Widget src="marketplacebos.near/widget/BOSGame.TicTacToe.Box" />
            <br />
            <br />
          </>
        )}
        {state.selectedTab === "quiz" && (
          <>
            <Widget src="marketplacebos.near/widget/BOSGame.Quiz.Home" />
            <br />
            <br />
          </>
        )}
        {""}
        {state.selectedTab === "IPFS" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.IPFS" />
            <br />
            <br />
          </>
        )}
        {""}
        {""}
        {state.selectedTab === "patterns" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.PatternPage1" />
            <br />
            <br />
          </>
        )}
        {""}
        {state.selectedTab === "fonts" && (
          <>
            <Widget src="marketplacebos.near/widget/Page.FontPage1" />
            <br />
            <br />
          </>
        )}
        {""}
        {state.selectedTab === "trending" && (
          <>
            <Widget src="marketplacebos.near/widget/TrendingPost.ChartValue3" />
            <br />
            <br />
          </>
        )}
        {state.selectedTab === "myfavorites" && (
          <>
            {" "}
            <Widget src="marketplacebos.near/widget/Page.MyFavouritesPage" />
            <br />
            <br />
          </>
        )}
      </div>
    </div>
  </div>
);
