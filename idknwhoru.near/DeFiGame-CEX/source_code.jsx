State.init({
  activeTab: 1,
  stakeValue: 0,
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

const activeDeposit = (_) => {
  State.update({
    activeTab: 3,
  });
};

const activeWithDraw = (_) => {
  State.update({
    activeTab: 4,
  });
};

const activeStake = (_) => {
  State.update({
    activeTab: 5,
  });
};

const stakeUp = (_) => {
  State.update({
    stakeValue: state.stakeValue + 20,
  });
};

const stakeDown = (_) => {
  if (state.stakeValue > 0) {
    State.update({
      stakeValue: state.stakeValue - 20,
    });
  }
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

const StakeButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  .stake-button {
    min-width: 115px;
    min-height: 40px;
    width: 5vw;
    background-color: #0d6efd;
    color: #fff;
    border: solid 1px #0d6efd;
    border-radius: 5px;
  }
`;

return (
  <>
    <h1>CEX</h1>
    <h2>CEX 정보</h2>
    <ul>
      <li>현재 S 토큰 가치: 1000 원</li>
      <li>현재 L 토큰 가치: ? 원</li>
      <li>S 토큰 출금 수수료: 2 원</li>
      <li>L 토큰 출금 수수료: 4 원</li>
      <li>Stake 이자: 20S 당 3S</li>
    </ul>
    <MyWalletInfo>
      <h2>내 자산정보</h2>
      <ul className="wallet-properties">
        <li>현금: ?원</li>
        <li>S토큰: ?개</li>
        <li>L토큰: ?개</li>
        <li>스테이크: ?개</li>
        <li>스테이크 이자: ?개</li>
      </ul>
    </MyWalletInfo>
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
        판매
      </button>
      <button
        className={state.activeTab === 3 ? "actived" : ""}
        onClick={activeDeposit}
      >
        입금
      </button>
      <button
        className={state.activeTab === 4 ? "actived" : ""}
        onClick={activeWithDraw}
      >
        출금
      </button>
      <button
        className={state.activeTab === 5 ? "actived" : ""}
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
        <button>판매하기</button>
      </>
    ) : state.activeTab === 3 ? (
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
        <button>입금하기</button>
      </>
    ) : state.activeTab === 4 ? (
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
        <button>출금하기</button>
      </>
    ) : (
      <>
        <QuantityFieldWrapper>
          <input
            type="number"
            className="token-quantity"
            min={0}
            placeHolder={0}
            value={state.stakeValue}
            disabled={true}
          />
        </QuantityFieldWrapper>
        <StakeButtonWrapper>
          <button className="stake-button" onClick={stakeUp}>
            UP
          </button>
          <button className="stake-button" onClick={stakeDown}>
            DOWN
          </button>
        </StakeButtonWrapper>
        <button>스테이킹하기</button>
        <button>언스테이크</button>
      </>
    )}
  </>
);
