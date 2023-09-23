const { token, onSelectToken } = props;

const ItemWrapper = styled.div`
  cursor: pointer;
  width: 100%;

  border-radius: 12px;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    cursor: pointer;

    .token-filed {
      display: flex;
      align-items: center;
      gap: 10px;
      .icon {
        border-radius: 100%;
        display: flex;
        width: 30px;
        height: 30px;
        border: 1px solid black;
      }
      .symbol {
      }
    }

    .balance {
    }

    .address {
    }
  }

  :hover {
    background-color: #ccc;
  }
`;

return (
  <>
    <ItemWrapper onClick={() => onSelectToken(token)}>
      <div className="item">
        <div className="token-filed">
          <img className="icon" src={token.icon} />
          <div className="symbol">{token.symbol}</div>
        </div>

        <div className="balance">{state.balance}</div>
      </div>
    </ItemWrapper>
    <Widget
      src="weige.near/widget/get-balance"
      props={{
        ...state,
        ...props,
        inputToken: token,
        onLoad: ({ balance }) => State.update({ balance }),
      }}
    />
  </>
);
