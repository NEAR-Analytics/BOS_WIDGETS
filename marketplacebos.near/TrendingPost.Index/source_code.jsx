const props = {
  dataP: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 13, 12, 3, 1, 2, 32, 1, 32, 213, 21, 3,
    123, 21, 3, 123, 12, 12,
  ],
  backgroundcolorP: [
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
  ],
  borderColorP: [
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
  ],
  labelP: [
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
    "blue",
  ],
};

State.init({
  selectedTab: props.tab || "trendings",
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
  &:hover{
      color:white;
  }
`;

const Div = styled.div`
  background:  #365fa0ff
`;

const Tabs = styled.div`
  display: flex;
  background: white;
  flex-direction: column;
  height: auto;
  border-right: 1px solid #eceef0;
  padding-right: 24px;
  overflow-y: auto;
  max-height: 700px;
  position: sticky;
  top: 0; 
  @media (max-width: 1200px) {
    background: white;
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
  background: none;
  border: none !important;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color:white;
    background: #303030;
    cursor: pointer;

  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    background: black;
    background-size: 200% 100%, 200% 100%;
    background-position: 100% 0, 100% 0;

    animation: moveLines 3s linear infinite;

    @keyframes moveLines {
      0% {
        background-position: 200% 0, 200% 0;
      }
      100% {
        background-position: -200% 0, -200% 0;
      }
    }
}
`;
const handleTabClick = (tab) => {
  State.update({
    selectedTab: tab,
  });
};
return (
  <div class="container">
    <></>
    <div class="row">
      <div class="col-md-3">
        <Wrapper>
          <Tabs>
            <TabsButton
              onClick={() => handleTabClick("trendings")}
              selected={state.selectedTab === "trendings"}
            >
              <Title>
                <i class="bi bi-trophy"></i> Trending
              </Title>
            </TabsButton>
            <TabsButton
              onClick={() => handleTabClick("filter")}
              selected={state.selectedTab === "filter"}
            >
              <Title>
                <i class="bi bi-funnel"></i> Filters
              </Title>
            </TabsButton>
            <TabsButton
              onClick={() => handleTabClick("charts")}
              selected={state.selectedTab === "charts"}
            >
              <Title>
                <i class="bi bi-bar-chart"></i> Charts Data
              </Title>
            </TabsButton>
          </Tabs>
        </Wrapper>
      </div>
      <div class="col-md-9">
        {state.selectedTab === "trendings" && (
          <>
            <Widget
              src="marketplacebos.near/widget/TrendingPost.PostpostP"
              props={{ props }}
            />
            <br />
            <br />
          </>
        )}
        {state.selectedTab === "chartspost" && (
          <>
            <div>
              <Widget
                src="marketplacebos.near/widget/TrendingPost.ChartPost"
                props={props}
              />
            </div>
            <br />
          </>
        )}
        {state.selectedTab === "charts" && (
          <>
            <div>
              <Widget
                src="marketplacebos.near/widget/TrendingPost.TableTags"
                props={props}
              />
            </div>
            <br />
          </>
        )}
      </div>
    </div>
  </div>
);
