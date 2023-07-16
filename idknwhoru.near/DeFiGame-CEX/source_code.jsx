State.init({
  activeTab: 1,
});

const activePurchase = (_) => {
  State.update({
    activeTab: 1,
  });
};

const activeSale = (_) => {
  State.update({
    activeTab: 2,
  });
};

const activeStake = (_) => {
  State.update({
    activeTab: 3,
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

const ToKenWrapper = styled.div`
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
    <h1>CEX</h1>
    <div>
      <h2>내 자산정보</h2>
      <ul>
        <li>현금: ?원</li>
        <li>S토큰: ?개</li>
        <li>L토큰: ?개</li>
      </ul>
    </div>
    <TabWrapper>
      <button
        className={state.activeTab === 1 ? "actived" : ""}
        onClick={activePurchase}
      >
        구매
      </button>
      <button
        className={state.activeTab === 2 ? "actived" : ""}
        onClick={activeSale}
      >
        인출
      </button>
      <button
        className={state.activeTab === 3 ? "actived" : ""}
        onClick={activeStake}
      >
        스테이크
      </button>
    </TabWrapper>
    <hr />
    {state.activeTab === 1 ? (
      <>
        <ToKenWrapper>
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
        </ToKenWrapper>
        <button>구매하기</button>
      </>
    ) : state.activeTab === 2 ? (
      <>
        <ToKenWrapper>
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
        </ToKenWrapper>
        <button>인출하기</button>
      </>
    ) : (
      <div>
        <QuantityFieldWrapper>
          <input
            type="number"
            className="token-quantity"
            min={0}
            placeHolder={0}
          />
        </QuantityFieldWrapper>
        <button>스테이킹하기</button>
      </div>
    )}
  </>
);
