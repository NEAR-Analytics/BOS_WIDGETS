const { chains, curChain, onSwitchChain } = props;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: ${disabled ? "auto" : "pointer"};

  position: relative;

  .dropdown-pc {
    display: none;
    position: absolute;
    right: 0;
    top: 50px;
    min-width: 260px;

    background: #151718;
    padding: 20px 16px;
    border-radius: 10px;
    font-size: 12px;
    z-index: 1;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  }

  .network-img {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    transition: all 0.3s ease-in-out;
  }

  .dropdown-img {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    transition: all 0.3s ease-in-out;

    transform: rotate(${() => (state.showDropdown ? "0deg" : "180deg")});
  }
`;

const SwitchTitle = styled.div`
  color: white;

  font-size: 18px;
  margin-left: 8px;
`;

const DropdownMobile = styled.div`
  position: fixed;
  z-index: 9999;

  height: 80vh;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #151718;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px 12px;
  font-size: 12px;

  .dropdown-mobile-item {
    .dropdown-img {
      width: 32px;
      height: 32px;
    }
    font-size: 14px;
    display: flex;
    align-items: center;

    div {
      margin-left: 10px;
    }
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownIcon = styled.div`
  width: 24px;
`;

const toggleDropdown = disabled
  ? () => {}
  : () => State.update({ showDropdown: !state.showDropdown });

State.init({
  showDropdown: false,
});
const DropdownImage = () => (
  <DropdownIcon>
    <svg
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-1b6c8bu"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </svg>
  </DropdownIcon>
);
return (
  <SwitchContainer>
    <DropdownContainer onClick={toggleDropdown}>
      <img className="network-img" src={curChain.logo} />
      <SwitchTitle>{curChain.name}</SwitchTitle>
      <DropdownImage />
    </DropdownContainer>
    {state.showDropdown && (
      <div className="dropdown-pc">
        <div>Select Aave Market</div>
        {chains.map((item) => (
          <div
            className="dropdown-pc-item"
            onClick={() => {
              State.update({ showDropdown: false });
              onSwitchChain?.({ chainId: `0x${item.chain_id.toString(16)}` });
            }}
            key={item.chain_id}
          >
            <img className="network-img" src={item.logo} />
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    )}
  </SwitchContainer>
);
