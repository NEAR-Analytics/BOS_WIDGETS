const { config, sender, curToken, onClose, hidden, selectedDex } = props;

const title = "Select a token";
const network = config.MAINTLE_NAME;
const assets = config.tokens;

State.init({
  searchBy: "",
});

const Modal = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1;
  color: rgb(90, 90, 90);
`;

const ModalContainer = styled.div`
  width: 425px;
  border-radius: 12px;
  background: linear-gradient(0deg, #181a27, #181a27),
    linear-gradient(0deg, #332c4b, #332c4b);

  color: white;
  padding-top: 16px;
  z-index: 999;
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 8px;
  border: 1px solid #2c4a4b;

  padding: 20px 30px;

  @media (max-width: 900px) {
    width: 90%;
  }
`;

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0.4;
`;

const ModalDialog = styled.div`
  padding: 20px;
  z-index: 3;
  background-color: white;
  border-radius: 20px;
  width: 40%;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const CloseButton = styled.div`
  border: 0;
  color: white;

  cursor: pointer;
`;

const containsSearchBy = (assetData) => {
  return (
    !assetData ||
    state.searchBy === "" ||
    assetData?.symbol.toLowerCase().includes(state.searchBy.toLowerCase())
  );
};

const assetList = assets
  .filter(
    (token) => token.onDexes.includes(selectedDex) && containsSearchBy(token)
  )
  .map((token) => {
    return (
      <Widget
        src="bluebiu.near/widget/Mantle.TokenItem"
        props={{
          currency: token,
          onClick: () => {
            if (props.onClick) {
              props.onClick(token);
            }
          },
          selectedTokenAddress: curToken.address,
          config,
        }}
      />
    );
  });

const inputOnChange = (e) => {
  State.update({
    searchBy: e.target.value,
  });
};

const Input = styled.input`
  appearance: none;
  outline: none;
  width: 100%;
  background: none;
  border: none;
  color: rgb(115, 129, 139);
  padding: 8px 0px 8px 4px;

  ::placeholder {
    color: #7e8a93;
  }
`;

const body = (
  <div
    class="asset-search-container"
    style={{
      borderBottom: "1px solid #332c4b",
    }}
  >
    <Input
      class="asset-search-input"
      placeholder="Search name" //  or paste address
      onChange={inputOnChange}
      value={state.searchBy}
    />
  </div>
);

if (hidden) {
  return <div />;
}

return (
  <Modal>
    <ModalContainer>
      <ModalHeader>
        <div class="asset-list-header">{title}</div>
        <CloseButton onClick={onClose}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 5L5.5 15M5.5 5L15.5 15"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </CloseButton>
      </ModalHeader>
      <div>
        {body}
        <div class="asset-list-scroll">
          <div class="asset-list-container">{assetList}</div>
        </div>
      </div>
    </ModalContainer>
  </Modal>
);
