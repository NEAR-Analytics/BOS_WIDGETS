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
    <h1>DEX</h1>
    <h2>DEX 정보</h2>
    <ul>
      <li>현재 S토큰 가치: 1000 원</li>
      <li>현재 L토큰 가치: ? 원</li>
      <li>스왑 수수료: 1 L토큰</li>
      <li>페어 예치 비율: ?L : ?S</li>
    </ul>
    <MyWalletInfo>
      <h2>내 지갑정보</h2>
      <ul className="wallet-properties">
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
              step={20}
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
      <>
        <QuantityFieldWrapper>
          <input
            className="token-quantity"
            type="number"
            min={0}
            placeHolder={0}
            disabled={true}
          />
          <input
            className="token-quantity"
            type="number"
            min={0}
            placeHolder={0}
            disabled={true}
          />
        </QuantityFieldWrapper>
        <StakeButtonWrapper>
          <button className="stake-button">UP</button>
          <button className="stake-button">DOWN</button>
        </StakeButtonWrapper>
        <button>스테이크하기</button>
        <button>언스테이크하기</button>
      </>
    )}
  </>
);
