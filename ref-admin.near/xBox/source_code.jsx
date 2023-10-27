const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .headTab {
    width: 100%;
    display: flex;
    margin-bottom: 40px;

    @media (max-width: 770px) {
      margin-bottom: 20px;
    }
  }
`;

const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const { hideBanner } = props;

const Wrap = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;
const SummaryWrapper = styled.div`
  margin-bottom: ${!!hideBanner ? "50px" : ""};
`;
const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  color: #ffffff;
  font-weight: 700;
  margin: 0;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
    display: none;
  }
`;

const { tabName } = state;
State.init({
  tabName: "stake", // stake | unstake,
  nearBalance: "",
});

const updateTabName = (tabName) =>
  State.update({
    tabName,
  });

return (
  <Container>
    <div class="headTab">
      <Title>Staking</Title>
      <Tab>
        <Widget
          src={`ref-admin.near/widget/LiNEAR.Tab`}
          props={{
            updateTabName,
            tabName: tabName,
          }}
        ></Widget>
      </Tab>
    </div>
    <Wrap>
      <Widget
        src="ref-admin.near/widget/LiNEAR"
        props={{
          updateTabName,
          tabName: tabName,
        }}
      ></Widget>
      <Widget
        src="ref-admin.near/widget/XREF"
        props={{
          updateTabName,
          tabName: tabName,
        }}
      ></Widget>
      <Widget
        src="ref-admin.near/widget/NearX"
        props={{
          tabName,
        }}
      ></Widget>
    </Wrap>
  </Container>
);
