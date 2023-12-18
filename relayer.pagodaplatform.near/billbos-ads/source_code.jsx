const { btnName, btnClass, body, height, width, isOpenDefault } = props;
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
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

State.init({
  isOpenModal: isOpenDefault ? true : false,
  adsContent:
    '<Widget src="ribbinpo.near/widget/webpageOwnerAddress" props={{ walletAddres: ...}} />',
});

body = (
  <div className="flex flex-wrap justify-center w-full ">
    <div style={{ width: "482px" }}>
      <div>
        <p className="font-semibold text-lg">Get my Ads Component</p>
        <p className="tertiary-text text-sm">
          Give your teammates access to this presets and start collaborating in
          real time.
        </p>
      </div>
    </div>
    <div className="w-full h-px bg-gray-200 my-4 "></div>
    <div
      style={{ width: "482px", height: "280px" }}
      className="text-sm p-3 bg-gray-100 rounded-xl mt-2 relative"
    >
      <div
        className="absolute top-3 right-3 cursor-pointer z-10"
        onClick={() => {
          copyContent(state.adsContent);
        }}
      >
        <Widget
          src="mob.near/widget/CopyButton"
          props={{
            className: "bg-gray-100",
            text: state.adsContent,
            clipboardIcon: (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3757_2743)">
                  <path
                    d="M10.6654 0.666687H2.66536C1.93203 0.666687 1.33203 1.26669 1.33203 2.00002V11.3334H2.66536V2.00002H10.6654V0.666687ZM12.6654 3.33335H5.33203C4.5987 3.33335 3.9987 3.93335 3.9987 4.66669V14C3.9987 14.7334 4.5987 15.3334 5.33203 15.3334H12.6654C13.3987 15.3334 13.9987 14.7334 13.9987 14V4.66669C13.9987 3.93335 13.3987 3.33335 12.6654 3.33335ZM12.6654 14H5.33203V4.66669H12.6654V14Z"
                    fill="#C3C5C7"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3757_2743">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ),
          }}
        />
      </div>
      <div className="w-96">{state.adsContent}</div>
    </div>
  </div>
);

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <div
        style={{
          width: width || "484px",
          height: height || "484px",
        }}
        class="bg-white rounded-xl pt-4 relative"
      >
        <div class="absolute top-2 right-2" onClick={() => onClose()}>
          X
        </div>
        <div className="">{body || <div></div>}</div>
      </div>
    </ModalOverlay>
  );
};

const content = (
  <div>
    <button
      className={btnClass}
      onClick={() =>
        State.update({
          isOpenModal: true,
        })
      }
    >
      {btnName || "Open"}
    </button>
    <Modal
      isOpen={state.isOpenModal}
      onClose={() =>
        State.update({
          isOpenModal: false,
        })
      }
      children={modalBody}
    />
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
