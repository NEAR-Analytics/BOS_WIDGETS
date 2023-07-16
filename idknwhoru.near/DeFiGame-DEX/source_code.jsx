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

return (
  <>
    <h1>DEX</h1>
    <button onClick={activeSwap}>SWAP</button>
    <button onClick={activeStake}>Stake</button>
    <hr />
    {state.activeTab === 1 ? (
      <div>
        <h2>스왑 탭</h2>
        <input type="number" />
        <select>
          <option>S토큰</option>
          <option>L토큰</option>
        </select>
        <input type="number" />
        <select>
          <option>S토큰</option>
          <option>L토큰</option>
        </select>
        <button>스왑하기</button>
      </div>
    ) : (
      <div>
        <h2>스테이크</h2>
        <h3>스테이크 비율</h3>
        <input type="number" />
        <button>스테이킹하기</button>
      </div>
    )}
  </>
);
