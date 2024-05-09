const isOpenModal = props.isOpenModal;
const onCloseModal = props.onCloseModal;
const isLoading = props.isLoading;

const topic = props.topic;
const detail = props.detail;

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
          {isLoading == true ? (
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
          ) : (
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.375 34C6.375 18.7425 18.7425 6.375 34 6.375C49.2575 6.375 61.625 18.7425 61.625 34C61.625 49.2575 49.2575 61.625 34 61.625C18.7425 61.625 6.375 49.2575 6.375 34ZM44.2283 28.8603C44.3983 28.6338 44.5213 28.3756 44.5901 28.1009C44.6589 27.8261 44.6721 27.5404 44.6288 27.2605C44.5856 26.9806 44.4869 26.7122 44.3384 26.471C44.19 26.2298 43.9948 26.0207 43.7644 25.856C43.534 25.6913 43.273 25.5744 42.9967 25.512C42.7204 25.4496 42.4345 25.4431 42.1557 25.4928C41.8769 25.5425 41.6108 25.6475 41.3731 25.8015C41.1354 25.9555 40.931 26.1555 40.7717 26.3897L31.603 39.2247L27.0017 34.6233C26.5988 34.248 26.066 34.0436 25.5155 34.0533C24.965 34.063 24.4397 34.2861 24.0504 34.6754C23.6611 35.0647 23.438 35.59 23.4283 36.1405C23.4186 36.691 23.623 37.2238 23.9983 37.6267L30.3733 44.0017C30.5915 44.2196 30.8544 44.3875 31.144 44.4937C31.4335 44.5998 31.7427 44.6417 32.05 44.6163C32.3573 44.591 32.6555 44.499 32.9237 44.3469C33.1919 44.1948 33.4238 43.9861 33.6033 43.7353L44.2283 28.8603Z"
                fill="#00E3B4"
              />
            </svg>
          )}

          <p class="mt-4 font-semibold">{topic}</p>
          <p class="tertiary-text text-sm">{detail}</p>
          {isLoading == true ? (
            <p class="mt-16 tertiary-text text-xs">
              {"Confirm this transaction in your wallet"}
            </p>
          ) : (
            <p class="mt-16 green-text text-xs">{"View on Etherscan"}</p>
          )}
        </div>
      </div>
    </ModalOverlay>
  );
};

return (
  <Widget
    src="porx-dev.near/widget/billbos-css"
    props={{
      children: <Modal isOpen={isOpenModal} onClose={onCloseModal} />,
    }}
  />
);
