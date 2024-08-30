const { curChain, CHAIN_LIST } = props;

const ArrowDone = (
  <svg
    width="11"
    height="7"
    viewBox="0 0 11 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" stroke-width="2" />
  </svg>
);

const CheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
    <path d="M1 4.11111L5.28571 8L13 1" stroke="#EBF479" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Overlay = styled.div`
  /* background-color: rgba(255, 255, 255, 0.1); */
  /* backdrop-filter: blur(10px); */
  position: fixed;
  z-index: 100;
  display: flex;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const ArrowWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  /* svg { */
  color: var(--button-border);

  .chain-name {
    color: var(--button-active-text-color);
  }
  /* } */
`;

const SelectChainWrapper = styled.div`
  /* border: 1px solid var(--border-color); */
  border-radius: 12px;
  padding: 8px 6px;
  width: 250px;
  position: absolute;
  z-index: 200;

  top: 28px;

  background: #1F2229;
  border: 1px solid #333648;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);

  .active {
    background: rgba(31, 35, 53, 0.5);
  }

  > div {
    cursor: pointer;
    display: flex;
    padding: 6px;
    margin: 4px 0px;
    :hover {
      background: rgba(31, 35, 53, 0.5);
    }

    padding-right: 8px;

    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: 8px;

    .chain-filed {
      display: flex;
      align-items: center;
      gap: 8px;
      .chain-icon {
        width: 22px;
        height: 22px;
        border-radius: 8px;
      }

      .chain-name {
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color: white;
      }
    }
  }

  .check-icon {
    display: none;
  }

  .active-check-icon {
    display: block;
    color: var(--border-color);
  }
`;

State.init({
  showList: false,
});

const handleSwitchChain = (chain) => {
  props.onSwitchChain?.({ chainId: `0x${chain.chain_id.toString(16)}` });
};

return (
  <Wrapper>
    <ArrowWrapper
      onClick={() => {
        if (!CHAIN_LIST || CHAIN_LIST.length === 0) return;
        State.update({
          showList: !state.showList,
        });
      }}
    >
      <div className="chain-name">{curChain.name}</div>
      {CHAIN_LIST?.length > 0 && ArrowDone}
    </ArrowWrapper>

    {state.showList && (
      <SelectChainWrapper>
        {CHAIN_LIST.map((chain, index) => {
          const { name, chain_id } = chain;

          const active = chain_id === curChain.chain_id;

          return (
            <div
              key={name + chain_id}
              className={` ${active ? "active" : ""}`}
              onClick={() => {
                handleSwitchChain(chain);
              }}
            >
              <div className="chain-filed">
                <img className="chain-icon" src={chain.logo} />

                <div className="chain-name">{name}</div>
              </div>

              <div
                className={` ${active ? "active-check-icon" : "check-icon"}`}
              >
                {CheckIcon}
              </div>
            </div>
          );
        })}
      </SelectChainWrapper>
    )}
    {state.showList && (
      <Overlay
        onClick={() => {
          State.update({
            showList: false,
          });
        }}
      />
    )}
  </Wrapper>
);
