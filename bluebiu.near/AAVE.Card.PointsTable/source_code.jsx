const RewardsTable = styled.div`
  background-color: rgba(53, 55, 73, 0.2);
  margin-top: 20px;
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
});

const {
  data,
  dapps,
  toast,
  account,
  onSuccess,
  markets,
  rewardAddress,
  formatNumber,
  config,
  prices,
  theme,
} = props;

const TokenAsset = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const TokenIcon = styled.img`
  width: 28px;
`;
const TokenAmount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function formatPoints(point) {
  if (isNaN(Number(point))) return 0;
  if (Number(point) === 0) return 0;
  return Number(point).toFixed(4);
}

return (
  <>
    <RewardsTable>
      <Title>Your Blast Points</Title>

      {data && data.length ? (
        <Widget
          src={`${config.ownerId}/widget/AAVE.Card.CardsTable`}
          props={{
            config,
            headers: ["Assets", "Blast Points", "Gold points"],
            data: data.map((row, index) => {
              return [
                <TokenAsset>
                  {row.icon ? <TokenIcon src={row.icon} /> : null}
                  {`${row.symbol}`}
                </TokenAsset>,
                <TokenAmount>
                  <span>{formatPoints(row.blastPoint)}</span>
                </TokenAmount>,
                <TokenAmount>
                  <span>{formatPoints(row.blastGold)}</span>
                </TokenAmount>,
              ];
            }),
          }}
        />
      ) : (
        <NoReward>
          <div>You don't have points</div>
        </NoReward>
      )}
    </RewardsTable>
  </>
);
