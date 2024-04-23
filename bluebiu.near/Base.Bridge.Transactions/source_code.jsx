const Transactions = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AmountWrapper = styled.div`
  font-size: 18px;
`;
const TxAmount = styled.span`
  font-weight: 700;
  color: var(--chain-name-color);
`;
const Title = styled.span`
  font-weight: 500;
  color: #979abe;
`;
const RefreshWrapper = styled.div`
  display: flex;
  gap: 4px;
  color: #979abe;
`;
const RefreshText = styled.div`
  text-decoration: underline;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const ArrowIcon = styled.div`
  transform: rotate(180deg);
`;
const Body = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

const txs = Object.values(props.txs || {});
const onDelete = props.onDelete;

if (props.chainId === -1) return <div />;
const filteredTxs = txs.filter(
  (tx) => tx.fromChainId === props.chainId || tx.toChainId === props.chainId
);
// let count = 0;

State.init({
  count: 0
})


return (
  <Transactions>
    <Header>
      <AmountWrapper>
        <TxAmount>{filteredTxs.length}</TxAmount>
        <Title>Pending transactions</Title>
      </AmountWrapper>
      <RefreshWrapper
        onClick={() => {
          State.update({
            update: Date.now(),
            count: 0
          });
        }}
      >
        <RefreshText>
          {" "}
          {(filteredTxs.length > 0 && state.count !== filteredTxs.length) && (
            <Widget
              src="bluebiu.near/widget/0vix.LendingLoadingIcon"
              props={{
                size: 16,
              }}
            />
          )}
          Refresh
        </RefreshText>
        <ArrowIcon>
          <Widget
            src="bluebiu.near/widget/Arbitrum.Swap.ArrowIcon"
            props={{ size: 12 }}
          />
        </ArrowIcon>
      </RefreshWrapper>
    </Header>
    <Body>
      {filteredTxs.map((tx) => (
        <Widget
          src="bluebiu.near/widget/Base.Bridge.Transaction"
          key={tx.hash}
          props={{
            tx,
            onDelete,
            update: state.update,
            getTxStatus: props.getTxStatus,
            onUpdate: () => {
              State.update({
                count: state.count + 1
              })
            },
          }}
        />
      ))}
    </Body>
  </Transactions>
);
