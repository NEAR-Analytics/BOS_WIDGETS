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

const { dapps, toast, account, onSuccess } = props;

const columns =
  Object.keys(dapps)[0] === "Valas Finance"
    ? [
        {
          type: "name",
          width: "30%",
          name: "Reward Asset",
        },
        {
          type: "total",
          key: "rewards",
          width: "25%",
          name: "Rewards",
        },
        { type: "button", width: "20%" },
      ]
    : [
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
      ];
return (
  <>
    <RewardsTable>
      <Title>Your Earns</Title>
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.YoursTable"
        props={{
          totalReverse: true,
          columns,
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
            const toastId = toast?.loading({
              title: `Claiming rewards...`,
            });
            State.update({
              dapp: dapps[record.dappName],
              market: record,
              loading: true,
              toastId,
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
          record: state.market,
          account,
          onSuccess: (res) => {
            toast?.dismiss(state.toastId);
            State.update({ loading: false });
            toast?.success({ title: "Claimed successfully!" });
            onSuccess?.(state.dapp.name);
          },
          onError: (err) => {
            toast?.dismiss(state.toastId);
            State.update({ loading: false });
            toast?.fail({
              title: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : `Claimed faily!`,
              chainId,
            });
          },
        }}
      />
    )}
  </>
);
