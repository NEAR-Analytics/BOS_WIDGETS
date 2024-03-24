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
  margin: 0 auto;
  padding-bottom: 28px;
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

const {
  data,
  dapps,
  toast,
  account,
  onSuccess,
  markets,
  rewardAddress,
  config,
} = props;

const columns = [
  {
    type: "name",
    width: "30%",
    name: "Reward Asset",
  },
  {
    type: "total",
    key: "unclaimed",
    width: "25%",
    name: "Rewards",
  },
  { type: "button", width: "20%" },
];

return (
  <>
    <RewardsTable>
      <Title>Your Earns</Title>

      {data && data.length ? (
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.CardsTable`}
          props={{
            config,
            headers: ["Reward Asset", "Rewards", ""],
            data: data.map((row) => {
              return [
                `${row.symbol}`,
                <div>
                  {" "}
                  {row.unclaimed ? Number(row.unclaimed).toFixed(2) : "-"}
                </div>,
                <Widget
                  src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
                  props={{
                    config,
                    theme,
                    loading:
                      row.symbol === state.dapp.symbol && state.loading
                        ? true
                        : false,
                    children: "Claim",
                    onClick: (record) => {
                      const toastId = toast?.loading({
                        title: `Claiming rewards...`,
                      });

                      State.update({
                        dapp: dapps,
                        loading: true,
                        toastId,
                      });
                    },
                  }}
                />,
              ];
            }),
          }}
        />
      ) : (
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
      )}
    </RewardsTable>
    {state.loading && state.dapp && (
      <Widget
        src={dapps.handlerClaim}
        props={{
          markets,
          rewardAddress,
          loading: state.loading,
          account,
          onSuccess: (res) => {
            toast?.dismiss(state.toastId);
            State.update({ loading: false });
            toast?.success({ title: "Claimed successfully!" });
            onSuccess?.();
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
