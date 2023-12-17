const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(12, 12, 12, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const StyledInput = styled.div`
  position: relative;
  width: 100%;
  input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    cursor: pointer;
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledSelect = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    cursor: pointer;
  }

  &:after {
    content: '⌄';
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const EndContent = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  transform: translateY(-50%);
`;

const NetworkImgList = {
  BKC: "https://www.bitkubnft.com/_next/image?url=https%3A%2F%2Fstatic.bitkubnext.com%2Fnft%2Fnft_stores%2Fbitkub-chain%2Fstore_profile.png&w=256&q=10",
  J2O: "https://img2.pic.in.th/pic/j2o.png",
};

State.init({
  isOpenModal: true,
  adsType: "REDIRECT",
  selectedChain: "BKC",
  chainImg: NetworkImgList.BKC,
  img: null,
});

const onOpen = () => {
  State.update({
    isOpenModal: true,
  });
};

const onClose = () => {
  State.update({
    isOpenModal: false,
  });
};

const onUpload = () => {};

const handleChangeType = (event) => {
  if (event.target.value) {
    State.update({
      adsType: event.target.value,
    });
  }
};

const handleChangeChain = (event) => {
  if (event.target.value) {
    State.update({
      selectedChain: event.target.value,
      chainImg: NetworkImgList[event.target.value],
    });
  }
};

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <div
        style={{
          width: "484px",
        }}
        class="bg-white rounded-xl pt-4"
      >
        <div class="flex flex-row justify-between items-start border-b pb-4 px-4 ">
          <p class="text-lg">Stake Ads</p>
          <svg
            class="cursor-pointer"
            onClick={() => onClose()}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="#808080"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            height: "400px",
          }}
          class="flex flex-col items-start pb-4 px-4 mt-4 overflow-scroll"
        >
          <p class="text-sm secondary-text">Amount</p>
          <StyledInput class="flex flex-row">
            <input type="number" class="w-full px-2 py-2 rounded-lg border" />
            <EndContent>
              <div class="h-full flex flex-row">
                <img
                  src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
                  alt="Icon"
                  class="w-5 h-5 rounded-full mt-3"
                />
                <p class="mt-3 ml-1">USDT</p>
              </div>
            </EndContent>
          </StyledInput>
        </div>
        <div class="grid grid-cols-2 gap-4 px-8 py-4">
          <button class="px-6 py-2 green-text border-1 border-green-300 rounded-lg">
            Cancel
          </button>
          <button class="px-6 py-2 text-white font-semibold brand-green rounded-lg">
            Create
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

const content = (
  <div>
    <button onClick={onOpen}>Open Modal</button>
    <Modal isOpen={state.isOpenModal} onClose={onClose} />
  </div>
);

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{
      children: content,
    }}
  />
);
