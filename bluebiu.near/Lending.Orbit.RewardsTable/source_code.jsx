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

const { dapps, toast, account, onSuccess, supplies } = props;

const columns = [
  {
    // type: "name",
    key: "pool",
    width: "30%",
    name: "Pools",
  },
  {
    // type: "total",
    key: "reward",
    width: "25%",
    name: "$ORBIT PER MONTH",
  },
  // {
  //   type: "total",
  //   key: "unclaimed",
  //   width: "25%",
  //   name: "Unclaimed",
  // },
  { type: "button", width: "45%" },
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
                record.pool === state.market.pool && state.loading
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
          supplies,
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
