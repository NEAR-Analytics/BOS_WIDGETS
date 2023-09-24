State.init({
  orders: [],
  amount: "0.001",
});

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";

const chains = {
  421613: {
    name: "Arbitrum",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=026",
  },
  534353: { name: "Scroll Network" },
  84531: {
    name: "Base Network",
    logo: "https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.webp",
  },
  5000: {
    name: "Mantle Network",
    logo: "https://cryptologos.cc/logos/mantle-mnt-logo.svg?v=026",
  },
};

const Button = styled.button`
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #255ff4;
  padding: 16px;
  width: 250px;
  border-radius: 32px;
  border: none;
  text-align: center;
  font-weight: bold;
  transition: 0.2s all;
  height: 64px;
  &:hover {
    color: #fff;
    text-decoration: none;
    background-color: rgb(107 148 255);
  }
`;

const Container = styled.div`
    * {
      font-family:  -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    display: flex;
    margin: 48px auto;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    gap: 16px;

    button {
      width: 100%;
    }

    input {
      height: 56px;
    }
`;

const AmountButton = styled(Button)`
  box-shadow: 0 0 0 0 #fff;
  height: 48px;
  &.active {
    box-shadow: 0 0 0 4px #fff;
  }
`;

const Info = styled.div`
  padding: 12px;
  border: 1px solid #6c757d88;
  color: #ccc;
  border-radius: 12px;
  margin-top: -8px;

`;

const Transaction = styled.div`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  position: relative;
  cursor: pointer;
  transition: 0.2s box-shadow;
  p { margin: 0; }
  margin-bottom: 12px;

  &:hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  }
`;

const CONTRACT = "0xbeC6a3A108552e6ea9f3aa609847eBF4135bBE71";
const tokenAddress = "0x8c9e6c40d3402480ACE624730524fACC5482798c";
const erc20abi = ["function approve(address _spender, uint _value)"];

const PaymentRequest =
  "(address payable requester, uint256 amount, bytes32 zelleEmailHash, address payable executor)";

const abi = [
  "function createPaymentRequest(uint256 amount, bytes32 _zelleEmailHash) external returns (uint256)",
  `function getPaymentRequestsByIds(uint256[] memory requestIds) external view returns (${PaymentRequest}[] memory)`,
  "function reservePayment(uint256 requestId) payable",
  "function confirmPayment(uint256 requestId, uint256 transactionId)",
  "event PaymentReserved(uint256 requestId, address indexed reserver)",
];

const signer = Ethers.provider().getSigner();
const erc20 = new ethers.Contract(tokenAddress, erc20abi, signer);
const peer2peer = new ethers.Contract(CONTRACT, abi, signer);
const daiDecimal = 18;

const fetchOrders = () => {
  const ids = new Array(50).fill(0).map((_, i) => (i + 1).toString());
  console.log("ids", ids);
  peer2peer.getPaymentRequestsByIds(ids).then((data) => {
    data = data.map((t, index) => ({
      id: ids[index],
      requester: t[0],
      amount: ethers.utils.formatEther(t[1], daiDecimal),
      zelleHash: t[2],
      executor: t[3],
    }));

    State.update({
      orders: data.filter((t) => t.amount > 0),
    });
  });
};

//2

fetchOrders();

const handleCreate = () => {
  State.update({ loading: true });
  const emailHash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(state.amount));
  const amount = ethers.utils.parseUnits(state.amount.toString(), daiDecimal);

  console.log(emailHash);

  erc20.approve(CONTRACT, amount).then((tx) => {
    tx.wait().then(() => {
      peer2peer.createPaymentRequest(amount, emailHash).then((tx) => {
        tx.wait().then((result) => {
          State.update({ loading: false });
          fetchOrders();
        });
      });
    });
  });
};

const handleBuy = (order) => {
  peer2peer
    .reservePayment(order.id, {
      value: ethers.utils.parseEther("0.01"),
    })
    .then((tx) => {
      tx.wait().then(() => {
        Storage.privateSet("activeOrder", order);
        State.update({ activeOrder: order });
      });
    });
};

if (state.activeOrder) {
  return (
    <Widget
      src="azbang.near/widget/peer2peerMakeOrder"
      props={{ order: state.activeOrder.id, public_token: props.public_token }}
    />
  );
}

console.log(state.orders);

//3

return (
  <Container>
    <div style={{ display: "flex", gap: 12 }}>
      {["0.001", "50", "100"].map((amount) => (
        <AmountButton
          className={amount == state.amount && "active"}
          onClick={() => State.update({ amount })}
        >
          {amount} DAI
        </AmountButton>
      ))}
    </div>

    <input
      value={state.email}
      placeholder="Enter your Zelle email"
      onChange={(e) => State.update({ email: e.target.value })}
    />

    <Info>
      Make sure that you indicate the email that is linked to your Zelle
      account, at this address validators verify the payment from the buyer
    </Info>

    <Button onClick={() => handleCreate()}>
      {state.loading ? (
        <Widget
          src="azbang.near/widget/dots-spinner"
          props={{
            style: {
              height: 32,
              display: "flex",
              alignItems: "center",
              margin: "auto",
            },
          }}
        />
      ) : (
        "Sell DAI"
      )}
    </Button>

    <div style={{ marginTop: 24 }}>
      <h4 style={{ marginBottom: 16 }}>Active orders</h4>
      {state.orders.map((order) => {
        const isRequester =
          order.requester.toLowerCase() === sender.toLowerCase();
        const isExecuter =
          order.executor.toLowerCase() === sender.toLowerCase();
        if (!isRequester && !isExecuter) return null;

        return (
          <Transaction>
            <div style={{ flex: 1 }}>
              <p>
                {isRequester
                  ? "Your order, you SELL"
                  : `You BUY from ${order.requester.slice(
                      0,
                      6
                    )}...${order.requester.slice(-6)}`}
              </p>
              <p>{order.amount} DAI</p>
            </div>
            <Button
              onClick={() => State.update({ activeOrder: order })}
              style={{ height: 48, width: 100 }}
            >
              Chat
            </Button>
          </Transaction>
        );
      })}
    </div>

    <div style={{ marginTop: 24 }}>
      <h4 style={{ marginBottom: 16 }}>Buy DAI</h4>
      {state.orders
        .filter(
          (t) =>
            t.executor === "0x0000000000000000000000000000000000000000" &&
            t.requester.toLowerCase() !== sender.toLowerCase()
        )
        .map((order) => (
          <Transaction>
            <div style={{ flex: 1 }}>
              <p>
                {order.requester.slice(0, 8)}...{order.requester.slice(-8)}
              </p>
              <p>{order.amount} DAI</p>
            </div>
            <Button
              onClick={() => handleBuy(order)}
              style={{ height: 48, width: 100 }}
            >
              Buy
            </Button>
          </Transaction>
        ))}
    </div>

    {props.p && (
      <div
        style={{
          position: "fixed",
          display: "flex",
          alignItems: "center",
          bottom: 16,
          flexDirection: "column",
          right: 16,
          gap: 8,
        }}
      >
        <p style={{ margin: 0, textAlign: "center" }}>
          Powered with <br /> <b>{chains[props.p].name}</b>
        </p>
        {chains[props.p].name === "Scroll Network" ? (
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1nxs1l5 e1de0imv0"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="M20.7734 15.8086V2.51961C20.7557 1.40767 19.8909 0.512695 18.8055 0.512695H5.26835C2.34737 0.557896 0 3.00778 0 6.00911C0 7.02161 0.264742 7.88946 0.670679 8.64884C1.01484 9.28165 1.55315 9.8783 2.08263 10.3213C2.23265 10.4478 2.16206 10.3936 2.62094 10.6829C3.25632 11.0806 3.97994 11.2795 3.97994 11.2795L3.97112 19.2258C3.98877 19.6055 4.02407 19.9671 4.12114 20.3016C4.42118 21.4226 5.1801 22.2814 6.2126 22.6972C6.64501 22.869 7.13037 22.9865 7.65103 22.9956L18.4613 23.0317C20.6145 23.0317 22.3618 21.2418 22.3618 19.0269C22.3706 17.7161 21.7353 16.5409 20.7734 15.8086Z"
              fill="#FFEEDA"
            ></path>
            <path
              d="M21.038 19.1264C20.9939 20.5457 19.8555 21.6847 18.4612 21.6847L11.022 21.6576C11.6132 20.9525 11.975 20.0394 11.975 19.045C11.975 17.4811 11.0661 16.4053 11.0661 16.4053H18.47C19.8908 16.4053 21.0468 17.5895 21.0468 19.045L21.038 19.1264Z"
              fill="#EBC28E"
            ></path>
            <path
              d="M2.78861 9.20034C1.93261 8.36864 1.33253 7.29286 1.33253 6.0182V5.8826C1.40313 3.70392 3.15042 1.95013 5.27718 1.88685H18.8143C19.1673 1.90493 19.4497 2.15806 19.4497 2.5287V14.2628C19.7585 14.3171 19.9085 14.3623 20.2086 14.4708C20.4469 14.5612 20.7734 14.751 20.7734 14.751V2.5287C20.7557 1.41676 19.8909 0.52179 18.8055 0.52179H5.26835C2.34737 0.56699 0 3.01687 0 6.0182C0 7.76295 0.776576 9.25458 2.04733 10.3032C2.13558 10.3756 2.215 10.466 2.44445 10.466C2.84156 10.466 3.12395 10.1405 3.1063 9.78795C3.09747 9.48962 2.97393 9.38114 2.78861 9.20034Z"
              fill="#101010"
            ></path>
            <path
              d="M18.4613 15.0312H7.8452C7.1304 15.0402 6.55679 15.6279 6.55679 16.3601V17.924C6.57444 18.6473 7.17453 19.262 7.88933 19.262H8.67472V17.924H7.88933V16.3963C7.88933 16.3963 8.08347 16.3963 8.32174 16.3963C9.66309 16.3963 10.6515 17.6709 10.6515 19.036C10.6515 20.2474 9.57484 21.7932 7.7746 21.6667C6.17733 21.5582 5.31251 20.1027 5.31251 19.036V5.78312C5.31251 5.18647 4.83598 4.6983 4.25355 4.6983H3.19458V6.05433H3.97998V19.045C3.93586 21.6848 5.81552 23.0137 7.7746 23.0137L18.4702 23.0498C20.6234 23.0498 22.3707 21.2599 22.3707 19.045C22.3707 16.8302 20.6146 15.0312 18.4613 15.0312ZM21.0381 19.1264C20.994 20.5457 19.8556 21.6848 18.4613 21.6848L11.0221 21.6576C11.6134 20.9525 11.9752 20.0394 11.9752 19.045C11.9752 17.4811 11.0662 16.4053 11.0662 16.4053H18.4702C19.8909 16.4053 21.047 17.5896 21.047 19.045L21.0381 19.1264Z"
              fill="#101010"
            ></path>
            <path
              d="M15.6019 6.29859H7.5979V4.94257H15.6019C15.9637 4.94257 16.2638 5.24089 16.2638 5.62058C16.2638 5.99122 15.9726 6.29859 15.6019 6.29859Z"
              fill="#101010"
            ></path>
            <path
              d="M15.6019 12.6807H7.5979V11.3246H15.6019C15.9637 11.3246 16.2638 11.623 16.2638 12.0027C16.2638 12.3733 15.9726 12.6807 15.6019 12.6807Z"
              fill="#101010"
            ></path>
            <path
              d="M17.0139 9.48963H7.5979V8.13361H17.005C17.3669 8.13361 17.6669 8.43193 17.6669 8.81162C17.6757 9.18226 17.3757 9.48963 17.0139 9.48963Z"
              fill="#101010"
            ></path>
          </svg>
        ) : (
          <img width={100} src={chains[props.p].logo} />
        )}
      </div>
    )}
  </Container>
);
