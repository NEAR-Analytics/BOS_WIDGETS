const StyledContainer = styled.div`
  width: 1060px;
  margin: 20px auto 0px;
`;

const StyledHeader = styled.div`
  border-bottom: 1px solid #373a53;
  padding: 20px 0px 20px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 188px;
  font-family: Gantari;
  flex-grow: 1;
`;

const StyledLabel = styled.div`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledValue = styled.div`
  color: var(--primary);
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Empty = styled.div`
  padding-top: 90px;
  text-align: center;
  width: 100%;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  .link {
    margin-top: 11px;
  }
`;
const TabsList = styled("Tabs.List")`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 234px;
  height: 46px;
  background-color: var(--bg-1);
  border-radius: 10px;
  color: var(--white);
  padding: 0 5px;
  border: 1px solid #262836;
  .tab-head-item {
    flex: 1;
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 5px;
    color: var(--white);
    cursor: pointer;
  }
  .tab-head-item.active {
    background-color: var(--bg-2);
  }
`;
const Tokens = styled.div`
  padding-top: 28px;
  display: flex;
  gap: 17px;
  flex-wrap: wrap;
`;

State.init({
  currentTab: "IN_WALLET",
});

const { pools, handler, fees, dappLink, onSuccess } = props;

const unstaked = props.unstaked || [];
const staked = props.staked || [];
let totalDeposit = Big(0);
let totalFees = Big(0);

useEffect(() => {
  if (staked.length === 0) {
    State.update({
      totalFees: 0,
      totalDeposit: 0,
    });
  }
}, [staked]);

return (
  <StyledContainer>
    <Tabs.Root
      value={state.currentTab}
      onValueChange={(value) => {
        State.update({
          currentTab: value,
        });
      }}
    >
      <StyledHeader>
        <StyledHeaderLeft>
          <div>
            <StyledLabel>You Deposit</StyledLabel>
            <StyledValue>
              <Widget
                src="bluebiu.near/widget/Avalanche.Lending.Total"
                props={{
                  total: state.totalDeposit,
                  digit: 2,
                  unit: "$",
                }}
              />
            </StyledValue>
          </div>
          <div>
            <StyledLabel>Unclaimed Fees</StyledLabel>
            <StyledValue>
              <Widget
                src="bluebiu.near/widget/Avalanche.Lending.Total"
                props={{
                  total: state.totalFees,
                  digit: 2,
                  unit: "$",
                }}
              />
            </StyledValue>
          </div>
        </StyledHeaderLeft>

        <TabsList>
          <Tabs.Trigger value="IN_WALLET" asChild>
            <div
              className={`tab-head-item ${
                state.currentTab === "IN_WALLET" ? "active" : ""
              }`}
            >
              In Wallet
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger value="DEPOSITED" asChild>
            <div
              className={`tab-head-item ${
                state.currentTab === "DEPOSITED" ? "active" : ""
              }`}
            >
              Deposited
            </div>
          </Tabs.Trigger>
        </TabsList>
      </StyledHeader>
      <Tabs.Content value="IN_WALLET">
        <Tokens>
          {unstaked
            .filter((item) => pools[item.pool.id])
            .map((item) => {
              const pool = pools[item.pool.id];
              const _token0 = Big(
                ethers.utils.formatUnits(
                  item.token0Amount || 0,
                  item.token0.decimals
                )
              );
              const _token1 = Big(
                ethers.utils.formatUnits(
                  item.token1Amount || 0,
                  item.token1.decimals
                )
              );
              return (
                <Widget
                  key={item.id}
                  src="dapdapbos.near/widget/Staking.Hyperlock.TokenCard"
                  props={{
                    from: "in-wallet",
                    name: pool.name,
                    amount0: _token0,
                    amount1: _token1,
                    price0: pool.token0.price,
                    price1: pool.token1.price,
                    token0: pool.token0,
                    token1: pool.token1,
                    id: item.id,
                    fee: pool.fee,
                    active: false,
                    depositing: state[`deposit-${item.id}`],
                    onDeposit: () => {
                      State.update({
                        [`deposit-${item.id}`]: true,
                      });
                      handler({
                        pool: {
                          id: item.id,
                          name: pool.name,
                          amount0: _token0.toString(),
                          amount1: _token1.toString(),
                          token0: pool.token0,
                          token1: pool.token1,
                          price0: pool.token0.price,
                          price1: pool.token1.price,
                        },
                        method: "safeTransferFrom",
                        onSuccess: () => {
                          State.update({
                            [`deposit-${item.id}`]: false,
                          });
                          onSuccess();
                        },
                        onError: () => {
                          State.update({
                            [`deposit-${item.id}`]: false,
                          });
                        },
                      });
                    },
                  }}
                />
              );
            })}
        </Tokens>
      </Tabs.Content>
      <Tabs.Content value="DEPOSITED">
        <Tokens>
          {staked
            .filter((item) => pools[item.pool.id])
            .map((item, i) => {
              const pool = pools[item.pool.id];
              const _token0 = Big(
                ethers.utils.formatUnits(
                  item.token0Amount || 0,
                  item.token0.decimals
                )
              );
              const _token1 = Big(
                ethers.utils.formatUnits(
                  item.token1Amount || 0,
                  item.token1.decimals
                )
              );

              totalDeposit = totalDeposit
                .add(_token0.mul(pool.token0.price || 0))
                .add(_token1.mul(pool.token1.price || 0));

              const _fee0 = Big(
                ethers.utils.formatUnits(
                  fees[item.id].token0 || 0,
                  pool.token0.decimals
                )
              );
              const _fee1 = Big(
                ethers.utils.formatUnits(
                  fees[item.id].token1 || 0,
                  pool.token1.decimals
                )
              );

              totalFees = totalFees
                .add(_fee0.mul(pool.token0.price || 0))
                .add(_fee1.mul(pool.token1.price || 0));

              if (i === staked.length - 1) {
                State.update({
                  totalDeposit,
                  totalFees,
                });
              }
              return (
                <Widget
                  key={item.id}
                  src="dapdapbos.near/widget/Staking.Hyperlock.TokenCard"
                  props={{
                    from: "deposited",
                    name: pool.name,
                    amount0: _token0,
                    amount1: _token1,
                    price0: pool.token0.price,
                    price1: pool.token1.price,
                    token0: pool.token0,
                    token1: pool.token1,
                    id: item.id,
                    fee: pool.fee,
                    active: false,
                    claiming: state[`claim-${item.id}`],
                    withdrawing: state[`withdraw-${item.id}`],
                    feeAmount0: _fee0,
                    feeAmount1: _fee1,
                    onClaim: () => {
                      State.update({
                        [`claim-${item.id}`]: true,
                      });
                      handler({
                        pool: {
                          id: item.id,
                          name: pool.name,
                          amount0: _token0.toString(),
                          amount1: _token1.toString(),
                          token0: pool.token0,
                          token1: pool.token1,
                          price0: pool.token0.price,
                          price1: pool.token1.price,
                        },
                        method: "collect",
                        onSuccess: () => {
                          State.update({
                            [`claim-${item.id}`]: false,
                          });
                          onSuccess();
                        },
                        onError: () => {
                          State.update({
                            [`claim-${item.id}`]: false,
                          });
                        },
                      });
                    },
                    onWithdraw: () => {
                      State.update({
                        [`withdraw-${item.id}`]: true,
                      });
                      handler({
                        pool: {
                          id: item.id,
                          name: pool.name,
                          amount0: _token0.toString(),
                          amount1: _token1.toString(),
                          token0: pool.token0,
                          token1: pool.token1,
                          price0: pool.token0.price,
                          price1: pool.token1.price,
                        },
                        method: "withdraw",
                        onSuccess: () => {
                          State.update({
                            [`withdraw-${item.id}`]: false,
                          });
                          onSuccess();
                        },
                        onError: () => {
                          State.update({
                            [`withdraw-${item.id}`]: false,
                          });
                        },
                      });
                    },
                  }}
                />
              );
            })}
        </Tokens>
      </Tabs.Content>
    </Tabs.Root>
    {((state.currentTab === "IN_WALLET" && !unstaked.length) ||
      (state.currentTab === "DEPOSITED" && !staked.length)) && (
      <Empty>
        <div>No positions were found</div>
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
      </Empty>
    )}
  </StyledContainer>
);
