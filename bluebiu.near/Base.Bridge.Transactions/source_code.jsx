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
  color: var(--label-color);
`;
const RefreshWrapper = styled.div`
  display: flex;
  gap: 4px;
  color: var(--label-color);
`;
const RefreshText = styled.div`
  text-decoration: underline;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
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

return (
  <Transactions>
    <Header>
      <AmountWrapper>
        <TxAmount>{txs.length}</TxAmount>
        <Title>Pending transactions</Title>
      </AmountWrapper>
      <RefreshWrapper
        onClick={() => {
          State.update({
            update: Date.now(),
          });
        }}
      >
        <RefreshText>Refresh</RefreshText>
        <ArrowIcon>
          <Widget
            src="bluebiu.near/widget/Arbitrum.Swap.ArrowIcon"
            props={{ size: 12 }}
          />
        </ArrowIcon>
      </RefreshWrapper>
    </Header>
    <Body>
      {txs
        ?.filter(
          (tx) =>
            tx.fromChainId === props.chainId || tx.toChainId === props.chainId
        )
        .map((tx) => (
          <Widget
            src="bluebiu.near/widget/Base.Bridge.Transaction"
            key={tx.hash}
            props={{
              tx,
              onDelete,
              update: state.update,
            }}
          />
        ))}
    </Body>
  </Transactions>
);
