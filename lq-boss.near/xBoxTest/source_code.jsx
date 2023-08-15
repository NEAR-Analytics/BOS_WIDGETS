const Container = styled.div`
  .headTab{
    width:100%;
    display:flex;
    margin-bottom:40px;
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
  flex-wrap:wrap;
`;
const SummaryWrapper = styled.div`
  margin-bottom: ${!!hideBanner ? "50px" : ""};
`;
const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  color: #FFFFFF;
  font-weight: 700;
  margin:0;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
  }
`;
console.log("hideBanner", !!hideBanner);
return (
  <Container>
    <div class="headTab">
      <Title>Staking</Title>
      <Tab>
        <Widget
          src={`lq-boss.near/widget/LiNEAR.TabTest`}
          props={{
            updateTabName: props.updateTabName,
            tabName: "unstake",
          }}
        ></Widget>
      </Tab>
    </div>
    <Wrap>
      <Widget
        src="lq-boss.near/widget/LiNEARTest"
        props={{
          tabName: "stake",
        }}
      ></Widget>
      <Widget
        src="lq-boss.near/widget/XREFTest"
        props={{
          tabName: "stake",
        }}
      ></Widget>
      <Widget src="lq-boss.near/widget/NearX.StakeTest"></Widget>
    </Wrap>
  </Container>
);
