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

const ToKenWrapper = styled.div`
  display: flex;
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
    <button onClick={activePurchase}>구매</button>
    <button onClick={activeSale}>인출</button>
    <button onClick={activeStake}>스테이크</button>
    <hr />
    {state.activeTab === 1 ? (
      <>
        <ToKenWrapper>
          <input type="number" />
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
          <input type="number" />
          <select>
            <option>S토큰</option>
            <option>L토큰</option>
          </select>
        </ToKenWrapper>
        <button>인출하기</button>
      </>
    ) : (
      <div>
        <input type="number" />
        <button>스테이킹하기</button>
      </div>
    )}
  </>
);
