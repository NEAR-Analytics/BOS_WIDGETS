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
  BKC: "0xD8D21C24F8513E35bdC26832aD366ac2F4EE0d7F",
  J2O: "0x21559144afcD0C2E3Ba5D0A6e41c46276663983B",
};

const USDTAddress = {
  BKC: "0x90430340366FA3557BD7A5c919f2C41975eDb6B2",
  J2O: "0x88127f9a362b802D0D27c85583506bf4c648aa68",
};

const BillBOSCoreABI = fetch(
  "https://gist.githubusercontent.com/Chayanonc/1c7b2cf1559ed20b342f76846966cb65/raw/fa27150e36d18d43d6298c8dd27f8c8e852dde23/billbos-core.json"
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
    const amount = ethers.utils.parseUnits(String(state.stakeAmount), "ether");

    const coreAddress = BillBOSAddress[state.selectedChain];
    erc20Approve(coreAddress, amount);
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
          ethers.utils.parseUnits(String(state.stakeAmount), "ether")
        )
        .then((res) => {
          setTimeout(closeLoadingCreate, 7000);
        })
        .catch((error) => {
          setCreating(false);
        });
    });
  } else {
    const amount = ethers.utils.parseUnits(String(state.stakeAmount), "ether");

    const coreAddress = BillBOSAddress[state.selectedChain];
    erc20Approve(coreAddress, amount);
  }
};

const Modal = ({ isOpen, onClose }) => {};

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
