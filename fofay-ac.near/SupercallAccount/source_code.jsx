const Card = styled.div`
  position: relative;
  background-color: #fff;
  width: 410px;
  height: 200px;
  border-radius: 12px;
  border: 1px solid #E9EBED;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  border-radius: 12px;
  padding:16px
`;
const TextMain = styled.div`
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 20px;
color:#262930;
`;

const TextGray = styled.div`
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 20px;
color:#656973;
`;
const ButtonCreate = styled.div`
border-radius: 14px;
border: 1px dashed #C3C5C7;
background: #FFF;
font-size: 12px;
font-style: normal;
font-weight: 400;
cursor:pointer;
width: 70px;
height: 28px;
text-align:center;
padding: 5px 0;

`;

const chainListMockup = [
  {
    chainId: "1",
    name: "Ethereum Network",
    logoUrl: "https://assets.coincap.io/assets/icons/eth@2x.png",
  },
  {
    chainId: "56",
    name: "Binance Smart Chain",
    logoUrl: "https://assets.coincap.io/assets/icons/bnb@2x.png",
  },
  {
    chainId: "137",
    name: "Polygon Mumbai",
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
  },
];
const arrowDownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="7"
    viewBox="0 0 11 7"
    fill="none"
  >
    <path
      d="M1 1L5.14645 5.14645C5.34171 5.34171 5.65829 5.34171 5.85355 5.14645L10 1"
      stroke="#656973"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);
State.init({
  selectedToken: 0,
});

const signer = Ethers.send("eth_requestAccounts", [])[0];

if (ethers !== undefined && signer) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });

        const tokenList = fetch(
          `https://raw.githubusercontent.com/SainyTK/token-list/main/src/tokens/${chainIdData.chainId}.json`
        );

        if (!tokenList.error) {
          State.update({
            tokenList: JSON.parse(tokenList.body),
            isError: false,
          });
        } else {
          State.update({ tokenList: [], isError: true });
        }
      }
    });
}

if (!signer) {
  return <Web3Connect />;
}

const selectedToken = state.tokenList[state.selectedToken];
function handleSelect(index) {
  State.update({ selectedToken: index });

  if (typeof props.onChange === "function") {
    props.onChange(state.tokenList[state.selectedToken]);
  }
}

function readAddress(accountNumber) {
  const addr = Storage.get(
    `contractAddress:${accountNumber}`,
    "sainy.near/widget/SupercallDeployer"
  );
  return addr;
}

function handleAddAccount() {
  State.update({
    accountNumbers: [
      ...state.accountNumbers,
      state.accountNumbers.length.toString(),
    ],
  });
}

const formatWalletAddres = (wallet) => {
  return `${
    wallet.substring(0, 6) + "..." + wallet.substring(wallet.length - 4)
  }`.toLowerCase();
};
State.init({
  accountNumbers: [],
});
const createCard = (
  <Card>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: "pointer",
      }}
      onClick={handleAddAccount}
    >
      <div style={{ margin: "auto" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
        >
          <path
            d="M20.5 15V25M25.5 20H15.5M35.5 20C35.5 21.9698 35.112 23.9204 34.3582 25.7403C33.6044 27.5601 32.4995 29.2137 31.1066 30.6066C29.7137 31.9995 28.0601 33.1044 26.2403 33.8582C24.4204 34.612 22.4698 35 20.5 35C18.5302 35 16.5796 34.612 14.7597 33.8582C12.9399 33.1044 11.2863 31.9995 9.8934 30.6066C8.50052 29.2137 7.39563 27.5601 6.64181 25.7403C5.88799 23.9204 5.5 21.9698 5.5 20C5.5 16.0218 7.08035 12.2064 9.8934 9.3934C12.7064 6.58035 16.5218 5 20.5 5C24.4782 5 28.2936 6.58035 31.1066 9.3934C33.9196 12.2064 35.5 16.0218 35.5 20Z"
            stroke="#FF0420"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <TextMain>{"Create"}</TextMain>
      </div>
    </div>
  </Card>
);

const renderSelectToken = (id) => (
  <div style={{ width: "100%" }}>
    <div class="dropdown">
      <button
        // class="btn dropdown-toggle border"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: "100%",
          display: "flex",
          borderRadius: "8px",
          border: "1px solid #E9EBED",
          background: "#FFF",
          color: "#262930",
        }}
      >
        {selectedToken ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <img
                src={selectedToken.logoURI}
                width={24}
                height={24}
                className="rounded-full mx-1"
              />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {selectedToken.symbol}
              </span>
            </div>
            <div>{arrowDownIcon}</div>
          </div>
        ) : (
          <span>Select a token</span>
        )}
      </button>

      <ul
        class="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
        style={{
          width: "100%",
          border: "1px solid #E9EBED",
          background: "#FFF",
          color: "#262930",
          borderRadius: "8px",
          boxShadow: " 8px 8px 16px -4px rgba(16, 24, 40, 0.08)",
          padding: "0px 8px 0px 8px",
        }}
      >
        {state.tokenList &&
          state.tokenList.slice(0, 5).map((token, index) => (
            <li
              key={index}
              onClick={() => handleSelect(index)}
              style={{
                borderBottom:
                  index !== state.tokenList.length - 1 && "1px solid #E9EBED",
              }}
            >
              <div class="dropdown-item" href="#" style={{ padding: "14px" }}>
                <img
                  src={token.logoURI}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span
                  style={{ fontSize: "12px", fontWeight: 500, marginLeft: 1 }}
                >
                  {token.symbol}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  </div>
);
return (
  <div>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {chainListMockup.map((item) => (
        <Card style={{ position: "relative" }}>
          <div style={{ display: "flex" }}>
            <img
              src={item.logoUrl}
              width={24}
              height={24}
              className="rounded-full"
            />
            <TextMain style={{ margin: "auto 4px" }}>{item.name}</TextMain>
          </div>
          <ButtonCreate
            style={{ position: "absolute", top: "16px", right: "16px" }}
          >{`Create`}</ButtonCreate>
          <TextGray style={{ marginTop: "20px" }}>{`ADDRESS`}</TextGray>
          <TextMain>{formatWalletAddres(readAddress(0) || "")}</TextMain>
          <TextGray style={{ marginTop: "20px" }}>{`TOKEN HOLDINGS`}</TextGray>
          <div>{renderSelectToken(id)}</div>
        </Card>
      ))}
    </div>
  </div>
);
