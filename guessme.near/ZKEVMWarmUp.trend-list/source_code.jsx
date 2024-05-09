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

const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);

const trend_url = "/dapdap/api/action/get-special-action";

useEffect(() => {
  asyncFetch(trend_url, {
    headers: { Authorization: AccessKey },
  }).then((res) => {
    const resTrend = res.body;
    if (Number(resTrend.code) == 0) {
      resTrend.data[0].action_title = "Bridge 0.01 ETH to Polygon zkEVM";

      resTrend.data[0].action_amount = "0.01";

      resTrend.data[0].template = "ETH-Polygon zkEVM Bridge";

      resTrend.data[1].action_title = "Swap 0.01 ETH to USDC on QuickSwap";

      resTrend.data[1].action_amount = "0.01";

      resTrend.data[1].template = "Polygon zkEVM Dex";

      resTrend.data[2].action_title = "Supply 0.01 ETH on 0vix";

      resTrend.data[2].action_amount = "0.01";

      resTrend.data[2].template = "0vix Lending";

      resTrend.data[3].template = "Gamma";

      State.update({
        trendList: resTrend.data,
      });
    }
  });
}, []);

return (
  <CardListWrapper>
    {(state.trendList || []).map((item) => {
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
