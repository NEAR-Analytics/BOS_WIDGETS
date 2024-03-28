const Row = styled.div`
  display: flex;
  padding: 4px 0px;
  &:not(:first-child) {
    border-bottom: 1px solid var(--input-border-color);
  }
`;
const TokenWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 30%;
`;
const TokenLogo = styled.img`
  width: 26px;
  height: 26px;
`;
const TokenAmount = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const Amount = styled.div`
  color: var(--chain-name-color);
`;
const Value = styled.div`
  color: var(--thirdary-text-color);
`;
const Chains = styled.div`
  display: flex;
  gap: 6px;
  color: var(--swap-icon-color);
  align-items: center;
  width: 25%;
`;
const ChainLogo = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 6px;
`;
const TimeWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  width: 20%;
`;
const Time = styled.span`
  color: var(--thirdary-text-color);
`;
const Tx = styled.a`
  color: var(--tx-button-color);
  text-decoration: underline;
  cursor: pointer;
`;
const Hander = styled.span`
  font-size: 14px;
  font-weight: 400;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HandlerProcessingText = styled.div`
  color: var(--processing-color);
`;
const HandlerSuccess = styled.div`
  color: var(--success-color);
`;

const { tx, onDelete, update, onUpdate } = props;

const getStargateStatus = () => {
  State.update({
    loading: true,
  });
  if (
    (tx.fromChainId === 1 && tx.toChainId === 324) || (tx.fromChainId === 324 && tx.toChainId === 1)
    || (tx.fromChainId === 1 && tx.toChainId === 534352) || (tx.fromChainId === 534352 && tx.toChainId === 1)
    ) {
    asyncFetch(`https://api.orbiter.finance/sdk/transaction/cross-chain/${tx.hash}`)
    .then(res => {
      if (res.body.status === 'success') {
        State.update({
          status: 'success',
          loading: false,
        });
        onUpdate();
        onDelete(tx.hash);
      }
    }).catch(e => {
      State.update({
        loading: false,
      });
    })
  } else {
    asyncFetch(`https://api-mainnet.layerzero-scan.com/tx/${tx.hash}`)
    .then((res) => {
      const result = res.body || {};
      const status =
        result.messages[0].status === "DELIVERED" ? "success" : "pending";
      State.update({
        status,
        loading: false,
      });
      onUpdate();
      if (status === "success") {
        onDelete(tx.hash);
      }
    })
    .catch((err) => {
      State.update({
        loading: false,
      });
    });
  }
  
};

useEffect(() => {
  getStargateStatus();
}, [update]);

return (
  <Row>
    <TokenWrapper>
      <TokenLogo src={tx.tokenLogo} />
      <TokenAmount>
        <Amount>
          {tx.amount} {tx.symbol}
        </Amount>
        <Value>
          $
          <Widget
            src="bluebiu.near/widget/Base.Bridge.Value"
            props={{
              price: tx.price,
              amount: tx.amount,
            }}
          />
        </Value>
      </TokenAmount>
    </TokenWrapper>
    <Chains>
      <ChainLogo src={tx.fromLogo} />
      <Widget src="bluebiu.near/widget/Base.Bridge.SwapRightIcon" />
      <ChainLogo src={tx.toLogo} />
    </Chains>
    <TimeWrapper>
      <Time>
        <Widget
          src="bluebiu.near/widget/Base.Bridge.FormateTxDate"
          props={{
            date: tx.time,
          }}
        />
      </Time>
      <Tx href={tx.link} target="_blank">
        Tx
      </Tx>
    </TimeWrapper>
    <Hander>
      {state.loading ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : state.status === "success" ? (
        <HandlerSuccess>
          <Widget src="bluebiu.near/widget/Base.Bridge.CheckedIcon" />
          <span>Complete</span>
        </HandlerSuccess>
      ) : state.status === "pending" ? (
        <HandlerProcessingText>Processing</HandlerProcessingText>
      ) : (
        ""
      )}
      {/* <Widget src="bluebiu.near/widget/Base.Bridge.TransactionButton" /> */}
    </Hander>
  </Row>
);
