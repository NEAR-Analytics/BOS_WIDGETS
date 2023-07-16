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

const TokenWrapper = styled.div`
    display: flex;

    .token-quantity {
        width: 100%;
        text-align: end;
    }
`;

return (
  <>
    <h1>DEX</h1>
    <div>
      <h2>내 자산정보</h2>
      <ul>
        <li>현금: ?원</li>
        <li>S토큰: ?개</li>
        <li>L토큰: ?개</li>
      </ul>
    </div>
    <button onClick={activeSwap}>SWAP</button>
    <button onClick={activeStake}>Stake</button>
    <hr />
    {state.activeTab === 1 ? (
      <div>
        <TokenWrapper>
          <input type="number" className="token-quantity" min={0} value={0} />
          <select>
            <option>S토큰</option>
            <option>L토큰</option>
          </select>
        </TokenWrapper>
        <TokenWrapper>
          <input
            type="number"
            className="token-quantity"
            min={0}
            value={0}
            disabled={true}
          />
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
        <input type="number" />
        <button>스테이킹하기</button>
      </div>
    )}
  </>
);
