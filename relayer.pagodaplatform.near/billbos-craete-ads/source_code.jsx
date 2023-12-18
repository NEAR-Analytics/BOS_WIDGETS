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

const StartContent = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const CustomUpload = styled.div`
  .btn {
    font-size: 11px;
    height: 28px;
    border-radius: 8px;
    background-color: #F7F9F9;
    color: black;
    border: solid 1px #D0D5DD;
  }

  .btn-outline-primary {
    --bs-btn-active-color: black;
    --bs-btn-active-bg: #F0F0F0;
    --bs-btn-active-border-color: #D0D5DD;
  }
`;

const NetworkImgList = {
  BKC: "https://www.bitkubnft.com/_next/image?url=https%3A%2F%2Fstatic.bitkubnext.com%2Fnft%2Fnft_stores%2Fbitkub-chain%2Fstore_profile.png&w=256&q=10",
  J2O: "https://img2.pic.in.th/pic/j2o.png",
};

const BillBOSAddress = {
  BKC: "0x8995e9741A2b9c7f1Bb982d08c360F2951a23c24",
  J2O: "0x9d8b5e3C762167a409Db7f11a38b17dE9192E136",
};

const USDTAddress = {
  BKC: "0x90430340366FA3557BD7A5c919f2C41975eDb6B2",
  J2O: "0x88127f9a362b802D0D27c85583506bf4c648aa68",
};

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/jimmy-ez/0344bb9cce14ced6c6e7f89d7d1654ce/raw/e7dd9962a90819f71de155b1f68f276eed07790a/BillBOSCoreABIV3.json"
);
if (!BillBOSCoreABI.ok) {
  return "Loading";
}
const IBillBOSCore = new ethers.utils.Interface(BillBOSCoreABI.body);

const ERC20ABI = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!ERC20ABI.ok) {
  return "Loading";
}
const IERC20 = new ethers.utils.Interface(ERC20ABI.body);

State.init({
  isOpenModal: false,
  adsType: "REDIRECT",
  selectedChain: "BKC",
  chainImg: NetworkImgList.BKC,
  img: null,
  sender: undefined,
  adsName: undefined,
  newTabLink: undefined,
  componentId: undefined,
  stakeAmount: "0",
});

const [approving, setApproving] = useState(false);
const [creating, setCreating] = useState(false);
const [isAllowance, setIsAllowance] = useState(false);

if (state.sender == undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        State.update({ sender: accounts[0] });
      }
    });
}

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

const checkAllowance = () => {
  const encodedData = IERC20.encodeFunctionData("allowance", [
    state.sender,
    BillBOSAddress[state.selectedChain],
  ]);
  return new Promise((resolve, reject) => {
    Ethers.provider()
      .call({
        to: USDTAddress[state.selectedChain],
        data: encodedData,
      })
      .then((rawRes) => {
        const resData = IERC20.decodeFunctionResult("allowance", rawRes);
        const resAllowance = Number(resData);
        resolve(resAllowance);
      })
      .catch((error) => {
        resolve(0);
      });
  });
};

const isApproval = async () => {
  checkAllowance().then((allowance) => {
    const amount = Number(
      ethers.utils.parseUnits(String(state.stakeAmount), "ether")
    );
    if (allowance < amount) {
      setIsAllowance(false);
    } else {
      setIsAllowance(true);
    }
  });
};
isApproval();

const erc20Approve = async (to, amount) => {
  setApproving(true);
  const erc20Provider = new ethers.Contract(
    USDTAddress[state.selectedChain],
    IERC20,
    Ethers.provider().getSigner()
  );
  erc20Provider
    .approve(to, amount)
    .then((res) => {
      setTimeout(closeLoadingApprove, 10000);
    })
    .catch((error) => {
      setApproving(false);
    });
};

const closeLoadingApprove = () => {
  setApproving(false);
};

const closeLoadingCreate = () => {
  setCreating(false);
};

const handleApprove = async () => {
  try {
    const amount = Number(
      ethers.utils.parseUnits(String(state.stakeAmount), "ether")
    );
    const coreAddress = BillBOSAddress[state.selectedChain];
    erc20Approve(coreAddress, amount.toString());
  } catch {
    resolve(false);
  }
};

const handleCreateAds = async () => {
  if (isAllowance) {
    setCreating(true);
    checkAllowance().then((allowance) => {
      const amount = Number(
        ethers.utils.parseUnits(String(state.stakeAmount), "ether")
      );
      const coreAddress = BillBOSAddress[state.selectedChain];
      if (allowance < amount) {
        erc20Approve(coreAddress, amount.toString());
      }
      const billbosProvider = new ethers.Contract(
        BillBOSAddress[state.selectedChain],
        IBillBOSCore,
        Ethers.provider().getSigner()
      );
      billbosProvider
        .createAds(
          {
            name: state.adsName ?? "",
            imageCID: state.img.cid ?? "",
            newTabLink: state.newTabLink ?? "",
            widgetLink: state.componentId ?? "",
            isInteractive: state.adsType == "REDIRECT" ? false : true,
          },
          amount.toString()
        )
        .then((res) => {
          setTimeout(closeLoadingCreate, 7000);
        })
        .catch((error) => {
          setCreating(false);
        });
    });
  } else {
    const amount = Number(
      ethers.utils.parseUnits(String(state.stakeAmount), "ether")
    );
    const coreAddress = BillBOSAddress[state.selectedChain];
    erc20Approve(coreAddress, amount.toString());
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
          <div class="flex flex-col">
            <p class="text-lg">Create Ads</p>
            <p class="text-sm tertiary-text">
              {"Unlock the power of onchain data for Web3 Ads"}
            </p>
          </div>
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
          class="flex flex-col justify-between items-start pb-4 px-4 mt-4 overflow-scroll"
        >
          <p class="text-sm secondary-text">Ads Name</p>
          <StyledInput>
            <input
              onChange={(e) =>
                State.update({
                  adsName: e.target.value,
                })
              }
              class="w-full border px-2 py-2 rounded-lg"
            />
          </StyledInput>
          <p class="text-sm secondary-text mt-4">Ads Type</p>
          <StyledSelect>
            <select
              class="w-full border px-2 py-2 mt-2 rounded-lg"
              id="adsType"
              name="adsType"
              onChange={(e) => handleChangeType(e)}
            >
              <option value="REDIRECT">URL Redirect</option>
              <option value="INTERACTIVE">Interactive Ads</option>
            </select>
          </StyledSelect>
          {state.adsType == "REDIRECT" && (
            <>
              <p class="text-sm secondary-text mt-4">URL</p>
              <StyledInput>
                <input
                  onChange={(e) => State.update({ newTabLink: e.target.value })}
                  class="w-full border px-2 py-2 rounded-lg"
                />
              </StyledInput>
            </>
          )}
          {state.adsType == "INTERACTIVE" && (
            <>
              <p class="text-sm secondary-text mt-4">Component ID</p>
              <StyledInput>
                <input
                  onChange={(e) =>
                    State.update({ componentId: e.target.value })
                  }
                  class="w-full border px-2 py-2 rounded-lg"
                />
              </StyledInput>
            </>
          )}
          {state.adsType == "REDIRECT" && (
            <>
              <p class="text-sm secondary-text mt-4">Image Ads</p>
              <div class="border flex flex-row justify-between rounded-lg py-2 px-2 w-full cursor-pointer">
                {state.img ? (
                  <>
                    <p class="text-sm py-1 truncate w-3/4">
                      {state.img.cid ?? "Loading..."}
                    </p>
                    <p
                      onClick={() => {
                        State.update({
                          img: null,
                        });
                      }}
                      class="tertiary-text cursor-pointer"
                    >
                      x
                    </p>
                  </>
                ) : (
                  <>
                    <p class="text-sm tertiary-text py-1">
                      {"No File Choosen"}
                    </p>
                    <CustomUpload>
                      <IpfsImageUpload class="bg-red-200" image={state.img} />
                    </CustomUpload>
                  </>
                )}
              </div>
              <p class="text-xs tertiary-text py-1">
                {"JPG, PNG or GIF format, 5MB max file, use a 728x90."}
              </p>
            </>
          )}
          <p class="text-sm secondary-text mt-4">Network</p>
          <StyledSelect>
            <StartContent>
              <img
                src={state.chainImg}
                alt="Icon"
                class="w-6 h-6 rounded-full mt-2"
              />
            </StartContent>
            <select
              class="w-full border pl-10 py-2 mt-2 rounded-lg"
              id="network"
              name="network"
              onChange={(e) => handleChangeChain(e)}
            >
              <option value="BKC">Bitkub Chain</option>
              <option value="J2O">J2O Taro</option>
            </select>
          </StyledSelect>
          <p class="text-sm secondary-text mt-4">Token</p>
          <StyledSelect>
            <StartContent>
              <img
                src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png"
                alt="Icon"
                class="w-6 h-6 rounded-full mt-2"
              />
            </StartContent>
            <select
              class="w-full border pl-10 py-2 mt-2 rounded-lg"
              id="network"
              name="network"
            >
              <option value="USDT">USDT</option>
            </select>
          </StyledSelect>
          <p class="text-sm secondary-text mt-4">Amount</p>
          <StyledInput>
            <input
              value={stakeAmount}
              onChange={(e) => State.update({ stakeAmount: e.target.value })}
              type="number"
              class="w-full border px-2 py-2 rounded-lg"
            />
          </StyledInput>
        </div>
        <div class="grid grid-cols-2 gap-4 px-8 py-4">
          <button
            onClick={() => onClose()}
            class="px-6 py-2 green-text border-1 border-green-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => handleCreateAds()}
            class="px-6 py-2 text-white font-semibold brand-green rounded-lg"
          >
            {isAllowance ? "Create" : approving ? "Loading..." : "Approve"}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

const content = (
  <div>
    <button
      class="brand-green px-4 py-2 rounded-xl text-white font-semibold"
      onClick={onOpen}
    >
      {"+ Create Ads"}
    </button>
    <Modal isOpen={state.isOpenModal} onClose={onClose} />
  </div>
);

return (
  <Widget
    src="chayanonc-ph.near/widget/billbos-css"
    props={{
      children: content,
    }}
  />
);
