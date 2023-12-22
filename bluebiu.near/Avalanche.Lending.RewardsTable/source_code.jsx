const RewardsTable = styled.div`
  background-color: rgba(53, 55, 73, 0.2);
  margin-top: 10px;
  border-radius: 6px;
`;
const Title = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
`;

const NoReward = styled.div`
  margin: 28px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

State.init({
  loading: false,
  dapp: null,
  record: null,
});

const { dapps, onSuccess } = props;
return (
  <>
    <RewardsTable>
      <Title>Your Earns</Title>
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.YoursTable"
        props={{
          totalReverse: true,
          columns: [
            {
              type: "name",
              width: "30%",
              name: "Reward Asset",
            },
            {
              type: "total",
              key: "dailyReward",
              width: "25%",
              name: "Daily Rewards",
            },
            {
              type: "total",
              key: "unclaimed",
              width: "25%",
              name: "Unclaimed",
            },
            { type: "button", width: "20%" },
          ],
          emptyTips: (
            <NoReward>
              <div>You don't have unclaimed rewards</div>
              <div
                style={{
                  fontSize: "18px",
                }}
              >
                $0.00
              </div>
            </NoReward>
          ),

          data: props.data,
          buttons: [
            {
              text: "Claim",
              loading: (record) =>
                record.symbol === state.record.symbol && state.loading
                  ? true
                  : false,
            },
          ],
          onButtonClick: (record) => {
            State.update({
              dapp: dapps[record.dappName],
              market: record,
              loading: true,
            });
          },
        }}
      />
    </RewardsTable>
    {state.loading && state.dapp && (
      <Widget
        src={state.dapp.handlerClaim}
        props={{
          loading: state.loading,
          market: state.market,
          dapp: state.dapp,
          record: state.record,
          onSuccess: (res) => {
            State.update({ loading: false });
            onSuccess?.(state.dapp.name);
          },
          onError: (err) => {
            State.update({ loading: false });
          },
        }}
      />
    )}
  </>
);
