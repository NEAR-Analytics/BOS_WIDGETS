const isOpenStake = props.isOpenStake;
const onCloseStake = props.onCloseStake;

const coreContractAddress =
  props.coreContractAddress || "0xD8D21C24F8513E35bdC26832aD366ac2F4EE0d7F";
const adsId = props.adsId || "1";

const USDTAddress = {
  BKC: "0x90430340366FA3557BD7A5c919f2C41975eDb6B2",
  J2O: "0x88127f9a362b802D0D27c85583506bf4c648aa68",
};
const ERC20ABI = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!ERC20ABI.ok) {
  return "Loading";
}
const IERC20 = new ethers.utils.Interface(ERC20ABI.body);
const [isAllowance, setIsAllowance] = useState(false);

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

const EndContent = styled.div`
  position: absolute;
  top: 22px;
  right: 10px;
  transform: translateY(-50%);
`;

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/Chayanonc/1c7b2cf1559ed20b342f76846966cb65/raw/fa27150e36d18d43d6298c8dd27f8c8e852dde23/billbos-core.json"
);

if (!BillBOSCoreABI.ok) {
  return "Loading";
}
const IBillBOSCore = new ethers.utils.Interface(BillBOSCoreABI.body);

State.init({
  isOpenLoadingModal: false,
  isFinish: false,
  boostAmount: "0",
  setIsAllowance: false,
  selectedChain: "BKC",
  sender: undefined,
  allowanceTotal: "0",
});

const onMax = () => {};

const closeLoadingBoost = () => {
  State.update({
    isFinish: true,
  });
};

const handleBoost = () => {
  console.log("boostAmount", state.boostAmount);
  console.log("isAllowance", isAllowance);
  const amount = ethers.utils.parseUnits(String(state.boostAmount), "ether");
  if (isAllowance) {
    State.update({
      isOpenLoadingModal: true,
      isFinish: false,
    });
    const billbosProvider = new ethers.Contract(
      coreContractAddress,
      IBillBOSCore,
      Ethers.provider().getSigner()
    );

    billbosProvider
      .boost(adsId, amount)
      .then((res) => {
        setTimeout(closeLoadingBoost, 10000);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log(
      "USDTAddress[state.selectedChain]",
      USDTAddress[state.selectedChain]
    );
    const erc20Provider = new ethers.Contract(
      USDTAddress[state.selectedChain],
      IERC20,
      Ethers.provider().getSigner()
    );
    erc20Provider
      .approve(coreContractAddress, amount)
      .then((res) => {
        setTimeout(() => setIsAllowance(true), 10000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const provider = Ethers.provider();

if (state.sender == undefined && provider) {
  provider
    .getSigner()
    ?.getAddress()
    ?.then((address) => {
      State.update({ sender: address });
    });
}

const handleChangeAmount = (event) => {
  checkAllowance().then((allowance) => {
    const allow = ethers.utils.formatEther("" + allowance);
    if (Number(allow) < Number(state.boostAmount)) {
      setIsAllowance(false);
    } else {
      setIsAllowance(true);
    }
    State.update({ allowanceTotal: allowance });
  });
  State.update({ boostAmount: event.target.value });
};

const checkAllowance = () => {
  const encodedData = IERC20.encodeFunctionData("allowance", [
    state.sender,
    coreContractAddress,
  ]);
  return new Promise((resolve, reject) => {
    Ethers.provider()
      .call({
        to: USDTAddress[state.selectedChain],
        data: encodedData,
      })
      .then((rawRes) => {
        const resData = IERC20.decodeFunctionResult("allowance", rawRes);
        console.log({ resData });
        const resAllowance = Number(resData);
        resolve(resAllowance);
      })
      .catch((error) => {
        resolve(0);
      });
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
        <div class="flex flex-row justify-between items-start border-b pb-4 px-4 ">
          <p class="text-lg">{"Stake Ads"}</p>
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
        <div class="flex flex-col items-start pb-4 px-4 mt-4">
          <p class="text-sm secondary-text mb-2">Amount</p>
          <StyledInput class="flex flex-row">
            <input
              onChange={(e) => handleChangeAmount(e)}
              type="number"
              class="w-full px-3 py-2 rounded-lg border"
            />
            <EndContent>
              <div class="h-full flex flex-row items-center">
                <img
                  src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
                  alt="Icon"
                  class="w-5 h-5 rounded-full"
                />
                <p class="ml-1 text-sm">USDT</p>
              </div>
            </EndContent>
          </StyledInput>
          <div class="bg-green-50 flex flex-row justify-between mt-4 px-2 py-3 rounded-lg">
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.6875 8C0.6875 3.96125 3.96125 0.6875 8 0.6875C12.0387 0.6875 15.3125 3.96125 15.3125 8C15.3125 12.0387 12.0387 15.3125 8 15.3125C3.96125 15.3125 0.6875 12.0387 0.6875 8ZM7.217 6.9185C8.0765 6.48875 9.04475 7.26575 8.8115 8.198L8.27975 10.325L8.31125 10.31C8.44341 10.2519 8.59285 10.2468 8.72864 10.2959C8.86444 10.3449 8.97618 10.4443 9.04074 10.5734C9.1053 10.7025 9.11775 10.8515 9.07549 10.9896C9.03324 11.1276 8.93953 11.2441 8.81375 11.315L8.78375 11.3315C7.9235 11.7612 6.95525 10.9843 7.1885 10.052L7.721 7.925L7.6895 7.94C7.62315 7.97687 7.55003 7.99994 7.47453 8.0078C7.39904 8.01567 7.32273 8.00817 7.25021 7.98576C7.17769 7.96336 7.11045 7.9265 7.05255 7.87743C6.99464 7.82835 6.94727 7.76806 6.91329 7.70019C6.8793 7.63232 6.8594 7.55827 6.85479 7.4825C6.85018 7.40674 6.86095 7.33083 6.88645 7.25933C6.91195 7.18784 6.95166 7.12225 7.00319 7.06651C7.05471 7.01077 7.11698 6.96604 7.18625 6.935L7.217 6.9185ZM8 5.75C8.14918 5.75 8.29226 5.69074 8.39775 5.58525C8.50324 5.47976 8.5625 5.33668 8.5625 5.1875C8.5625 5.03832 8.50324 4.89524 8.39775 4.78975C8.29226 4.68426 8.14918 4.625 8 4.625C7.85082 4.625 7.70774 4.68426 7.60225 4.78975C7.49676 4.89524 7.4375 5.03832 7.4375 5.1875C7.4375 5.33668 7.49676 5.47976 7.60225 5.58525C7.70774 5.69074 7.85082 5.75 8 5.75Z"
                fill="#00C8A0"
              />
            </svg>
            <p class="text-sm w-11/12">{`Staking does not diminish your USDT balance. Both your 
            USDT and earned rewards can be reclaimed based on the 
            applicable conversion ratio at stake.`}</p>
          </div>
        </div>
        <div class="w-full px-8 pt-2 pb-4">
          <button
            onClick={handleBoost}
            class="px-6 py-2 text-white font-semibold brand-green rounded-lg w-full"
          >
            {isAllowance ? "Stake now" : approving ? "Loading..." : "Approve"}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

return (
  <>
    <Widget
      src="porx-dev.near/widget/billbos-css"
      props={{
        children: <Modal isOpen={isOpenStake} onClose={onCloseStake} />,
      }}
    />
    <Widget
      src="jimmy-ez.near/widget/billbos-loading-transaction"
      props={{
        isOpenModal: state.isOpenLoadingModal,
        onCloseModal: () => {
          State.update({ isOpenLoadingModal: false });
        },
        isLoading: !state.isFinish,
        topic: `You are now staking ${state.boostAmount} USDT`,
        detail: `Staking ${state.boostAmount} USDT. You will receive ${state.boostAmount} USDT`,
      }}
    />
  </>
);
