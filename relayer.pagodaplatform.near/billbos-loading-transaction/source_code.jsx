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

State.init({
  isOpenModal: true,
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
        <div class="flex flex-row justify-end pb-4 px-4 ">
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
        <div class="w-full flex flex-col items-center pb-4 px-4">
          <svg
            class="animate-spin"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.6395 5.60895C39.58 6.7434 42.2682 8.44592 44.5507 10.6193C46.8332 12.7927 48.6653 15.3943 49.9423 18.2757C51.2194 21.1571 51.9164 24.2619 51.9936 27.4126C52.0708 30.5634 51.5266 33.6985 50.3921 36.639C49.2577 39.5795 47.5552 42.2677 45.3818 44.5502C43.2084 46.8327 40.6068 48.6648 37.7253 49.9419C34.8439 51.2189 31.7392 51.9159 28.5884 51.9931C25.4377 52.0703 22.3025 51.5261 19.3621 50.3916C16.4216 49.2572 13.7333 47.5547 11.4508 45.3813C9.16833 43.2079 7.33625 40.6063 6.0592 37.7249C4.78215 34.8435 4.08514 31.7387 4.00797 28.588C3.9308 25.4372 4.47497 22.3021 5.60943 19.3616C6.74388 16.4211 8.44639 13.7329 10.6198 11.4504C12.7931 9.16786 15.3948 7.33578 18.2762 6.05873C21.1576 4.78168 24.2623 4.08467 27.4131 4.0075C30.5639 3.93032 33.699 4.4745 36.6395 5.60895L36.6395 5.60895Z"
              stroke="#D9D9D9"
              stroke-width="8"
            />
            <path
              d="M36.6395 5.60895C39.58 6.7434 42.2682 8.44592 44.5507 10.6193C46.8332 12.7927 48.6653 15.3943 49.9423 18.2757C51.2194 21.1571 51.9164 24.2619 51.9936 27.4126C52.0708 30.5634 51.5266 33.6985 50.3921 36.639C49.2577 39.5795 47.5552 42.2677 45.3818 44.5502C43.2084 46.8327 40.6068 48.6648 37.7253 49.9419C34.8439 51.2189 31.7392 51.9159 28.5884 51.9931C25.4377 52.0703 22.3025 51.5261 19.3621 50.3916"
              stroke="#00E3B4"
              stroke-width="8"
              stroke-linecap="round"
            />
          </svg>
          <p class="mt-4 font-semibold">{"You are now staking 100 USDT"}</p>
          <p class="tertiary-text text-sm">
            {"Staking 100 USDT. You will receive 100 USDT"}
          </p>
          <p class="mt-16 tertiary-text text-xs">
            {"Confirm this transaction in your wallet"}
          </p>
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
