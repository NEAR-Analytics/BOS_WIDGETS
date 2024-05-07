const {
  tokens,
  token0,
  token1,
  price0,
  price1,
  name,
  dappLink,
  handler,
  from,
  onSuccess,
} = props;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0px 20px 20px;
  min-height: 172px;
  box-sizing: border-box;

  .button {
    width: 246px;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledEmpty = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 11px;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

return (
  <StyledContainer>
    {tokens?.map((token) => (
      <Widget
        src="dapdapbos.near/widget/Staking.Hyperlock.TokenCard"
        key={token.id + Math.random()}
        props={{
          price0,
          price1,
          name,
          id: token.id,
          from: "pool",
          active: state.id === token.id,
          token1,
          token0,
          amount0: ethers.utils.formatUnits(
            token.token0Amount || 0,
            token0.decimals
          ),
          amount1: ethers.utils.formatUnits(
            token.token1Amount || 0,
            token1.decimals
          ),
          onCardClick: () => {
            State.update({
              ...token,
            });
          },
        }}
      />
    ))}
    {!!tokens.length && (
      <StyledButtons>
        {from === "stake" && (
          <a
            className="button ghost"
            style={{ borderStyle: "dashed", lineHeight: "46px" }}
            href={dappLink}
            target="_blank"
          >
            + Create new position
          </a>
        )}
        <button
          className="button primary"
          disabled={state.loading || !state.id}
          onClick={() => {
            if (state.loading || !state.id) return;
            State.update({
              loading: true,
            });

            handler({
              pool: {
                id: state.id,
                name,
                amount0: ethers.utils
                  .formatUnits(state.token0Amount || 0, token0.decimals)
                  .toString(),
                amount1: ethers.utils
                  .formatUnits(state.token1Amount || 0, token1.decimals)
                  .toString(),
                token0,
                token1,
                price0,
                price1,
              },
              method: from === "stake" ? "safeTransferFrom" : "withdraw",
              onSuccess: () => {
                State.update({
                  loading: false,
                });
                onSuccess();
              },
              onError: () => {
                State.update({
                  loading: false,
                });
              },
            });
          }}
        >
          {state.loading ? (
            <Widget
              src="bluebiu.near/widget/0vix.LendingLoadingIcon"
              props={{
                size: 16,
              }}
            />
          ) : from === "stake" ? (
            "Stake"
          ) : (
            "Withdraw"
          )}
        </button>
      </StyledButtons>
    )}

    {!tokens.length && (
      <StyledEmpty>
        <div>
          {from === "stake"
            ? "You have no LP tokens in your wallet for this token pair"
            : "You have no LP tokens staked for this token pair"}
        </div>
        {from === "stake" && (
          <div className="link">
            <a className="link-text" href={dappLink} target="_blank">
              Create new position on Thruster
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="8"
              viewBox="0 0 5 8"
              fill="none"
            >
              <path
                d="M1 1L4 4L1 7"
                stroke="currentColor"
                stroke-linecap="round"
              />
            </svg>
          </div>
        )}
      </StyledEmpty>
    )}
  </StyledContainer>
);
