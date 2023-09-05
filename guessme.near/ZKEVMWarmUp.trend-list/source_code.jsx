const CardListWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isMyQuest ? "18px" : "32px")};
  flex-wrap: wrap;
  @media (max-width: 900px) {
    display: grid;
    width: 100%;
  }
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];

const trend_url = "https://bos-api.delink.one/get-special-action";

let trendList = [];

const resTrend = JSON.parse(fetch(trend_url).body);

if (Number(resTrend.code) == 0) {
  trendList = resTrend.data;
}

return (
  <CardListWrapper>
    {(trendList || []).map((item) => {
      return (
        <Widget
          src="guessme.near/widget/ZKEVMWarmUp.trend-card"
          props={{
            item,
          }}
        />
      );
    })}
  </CardListWrapper>
);
