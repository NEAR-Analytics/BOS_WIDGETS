State.init({
  activeTab: 1,
});

const activeSwap = (_) => {
  State.update({
    activeTab: 1,
  });
};

const activeStake = (_) => {
  State.update({
    activeTab: 2,
  });
};

const TabWrapper = styled.div`
    display: flex;

    .actived {
        color: #0d6efd;
    }

    button {
        background-color: #fff;
        border: none;
    }
`;

const MyWalletInfo = styled.div`
    display: flex;
    flex-direction: column;

    .wallet-properties {
        display: flex;
        padding: 0;
    }

    .wallet-properties > li {
        display: block;
        padding: 10px;
    }
`;

const TokenWrapper = styled.div`
    display: flex;
`;

const QuantityFieldWrapper = styled.div`
    width: 100%;
    border: none;
    padding: 0;

    .token-quantity{
      width: 100%;
      text-align: end;
    }
`;

return (
  <>
    <h1>DEX</h1>
    <MyWalletInfo>
      <h2>내 자산정보</h2>
      <ul className="wallet-properties">
        <li>현금: ?원</li>
        <li>S토큰: ?개</li>
        <li>L토큰: ?개</li>
      </ul>
    </MyWalletInfo>
    <TabWrapper>
      <button
        className={state.activeTab === 1 ? "actived" : ""}
        onClick={activeSwap}
      >
        SWAP
      </button>
      <button
        className={state.activeTab === 2 ? "actived" : ""}
        onClick={activeStake}
      >
        Stake
      </button>
    </TabWrapper>
    <hr />
    {state.activeTab === 1 ? (
      <div>
        <TokenWrapper>
          <QuantityFieldWrapper>
            <input
              type="number"
              className="token-quantity"
              min={0}
              placeHolder={0}
            />
          </QuantityFieldWrapper>
          <select>
            <option>S토큰</option>
            <option>L토큰</option>
          </select>
        </TokenWrapper>
        <TokenWrapper>
          <QuantityFieldWrapper>
            <input
              type="number"
              className="token-quantity"
              min={0}
              value={0}
              disabled={true}
            />
          </QuantityFieldWrapper>
          <select disabled={true}>
            <option>S토큰</option>
            <option>L토큰</option>
          </select>
        </TokenWrapper>
        <button>스왑하기</button>
      </div>
    ) : (
      <div>
        <h2>스테이크 비율 21 : 10</h2>
        <QuantityFieldWrapper>
          <input
            className="token-quantity"
            type="number"
            min={0}
            placeHolder={0}
          />
        </QuantityFieldWrapper>
        <button>스테이크하기</button>
      </div>
    )}
  </>
);
