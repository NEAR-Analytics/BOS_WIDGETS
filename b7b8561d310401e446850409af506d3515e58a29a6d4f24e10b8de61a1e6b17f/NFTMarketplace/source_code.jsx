State.init({
  chainId: 1, // For Ethereum Mainnet, for instance
  baseUrl: "https://api.yourapp.com",
  safeAddress: "0x1234567890abcdef1234567890abcdef12345678",
  sender: "0x21Bf18c13D1Fa9A65212a4632dfE4A74eB5E3212",
  signature: "",
  hashMessage: "",
  selectedTransaction: null,
});

const [formData, setFormData] = useState({
  isSell: true,
  nftAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  tokenId: 1,
  tokenAddress: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  price: 40000000,
  expiry: 86400,
  nonce: 42,
});

const [signatures, setSignatures] = useState([]);

// จัดการกับการเปลี่ยนแปลงในฟอร์ม
const handleChange = (e) => {
  const { id, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [id]: value,
  }));
};

// connect account
if (state.sender === null) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  const checksummedAddr = ethers.utils.getAddress(accounts[0]);
  if (accounts.length) {
    State.update({ sender: checksummedAddr });

    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        if (chainIdData?.chainId == 1) {
          State.update({
            chainId: "mainnet",
          });
        } else if (chainIdData?.chainId == 5) {
          State.update({
            chainId: "goerli",
          });
        } else if (chainIdData?.chainId == 100) {
          State.update({
            chainId: "gnosis-chain",
          });
        } else if (chainIdData?.chainId == 96) {
          State.update({
            chainId: "kub-chain",
          });
        }
      });
  }
}

//EIP712
const domain = {
  name: "MyApp",
  version: "1.0",
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
};

const types = {
  Offer: [
    { name: "isSell", type: "bool" },
    { name: "nftAddress", type: "address" },
    { name: "tokenId", type: "uint256" },
    { name: "tokenAddress", type: "address" },
    { name: "price", type: "uint256" },
    { name: "expiry", type: "uint256" },
    { name: "nonce", type: "uint256" },
  ],
};

const createEIP712Message = (transaction) => {
  return {
    isSell: transaction.isSell,
    nftAddress: transaction.nftAddress,
    tokenId: transaction.tokenId,
    tokenAddress: transaction.tokenAddress,
    price: transaction.price,
    expiry: transaction.expiry,
    nonce: transaction.nonce,
  };
};

const updateSignature = (_signature) => {
  State.update({ signature: _signature });
};

const signTransaction = () => {
  console.log(formData);

  if (!formData.nftAddress || !formData.tokenId) {
    console.log("Some required fields are missing.");
    return;
  }

  const dataToSign = {
    isSell: formData.isSell,
    nftAddress: formData.nftAddress,
    tokenId: formData.tokenId,
    tokenAddress: formData.tokenAddress,
    price: formData.price,
    expiry: formData.expiry,
    nonce: formData.nonce,
  };

  // แปลงสตริงเป็น byte array
  const dataBytes = ethers.utils.toUtf8Bytes(dataToSign);
  // ทำ hash ข้อมูล
  const hashedData = ethers.utils.keccak256(dataBytes);

  // รับ signer จาก provider
  const signer = Ethers.provider().getSigner();

  signer
    .signMessage(ethers.utils.arrayify(hashedData))
    .then((signature) => {
      updateSignature(signature);
      console.log("Signature:", signature);
      setSignatures((prevSignatures) => [
        ...prevSignatures,
        { dataToSign, signature },
      ]);
    })
    .catch((error) => {
      console.error("Error signing data:", error);
    });
};

const signTransaction712 = () => {
  console.log(formData);

  if (!formData.nftAddress || !formData.tokenId) {
    console.log("Some required fields are missing.");
    return;
  }

  const dataToSign = {
    isSell: formData.isSell,
    nftAddress: formData.nftAddress,
    tokenId: formData.tokenId,
    tokenAddress: formData.tokenAddress,
    price: formData.price,
    expiry: formData.expiry,
    nonce: formData.nonce,
  };
  console.log("dataToSign", dataToSign);

  const message = createEIP712Message(dataToSign);
  console.log("message", message);
  const signer = Ethers.provider().getSigner();
  signer._signTypedData(domain, types, message).then((signature) => {
    updateSignature(signature);

    console.log("Signature:", signature);
  });
};

const styles = {
  div: {
    backgroundColor: "#f2f2f2",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    margin: "auto",
  },
  inputText: {
    width: "100%",
    padding: "10px",
    margin: "8px 10px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // หรือ 'center' ตามความต้องการ
    width: "100%", // หรือขนาดที่ต้องการ
  },
  column: {
    flex: "1", // ให้ทั้งสองคอลัมน์มีขนาดเท่ากัน
    padding: "5px", // หรือตามความต้องการ
    width: "50%",
    // สไตล์อื่นๆ ตามความต้องการ
  },
};

const Selection = styled.button`
    background: ${(props) => {
      console.log(
        "Current state in styled component:",
        props.tx,
        state.selectedTransaction
      );
      return state.selectedTransaction &&
        state.selectedTransaction.scenario === props.tx.scenario
        ? "palevioletred"
        : "white";
    }};

    color: ${(props) => {
      console.log(
        "Current state in styled component:",
        props.tx,
        state.selectedTransaction
      );
      return state.selectedTransaction &&
        state.selectedTransaction.scenario === props.tx.scenario
        ? "white"
        : "palevioletred";
    }};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 10px;
    text-align: left;
`;

return (
  <>
    <Web3Connect className="web3-connect" connectLabel="Connect Wallet" />
    <div className="container" style={styles.container}>
      <div className="column" style={styles.column}>
        <div style={styles.div}>
          <div>
            <label htmlFor="isSell">Transaction Type:</label>
            <select
              name="isSell"
              id="isSell"
              value={formData.isSell}
              onChange={handleChange}
            >
              <option value="true">Sell</option>
              <option value="false">Buy</option>
            </select>
          </div>
          <div>
            <label htmlFor="nftAddress">NFT Address:</label>
            <input
              type="text"
              name="nftAddress"
              id="nftAddress"
              value={formData.nftAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tokenId">Token ID:</label>
            <input
              type="number"
              name="tokenId"
              id="tokenId"
              value={formData.tokenId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tokenAddress">Token Address:</label>
            <input
              type="text"
              name="tokenAddress"
              id="tokenAddress"
              value={formData.tokenAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="expiry">Expiry:</label>
            <input
              type="number"
              name="expiry"
              id="expiry"
              value={formData.expiry}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="nonce">Nonce:</label>
            <input
              type="number"
              name="nonce"
              id="nonce"
              value={formData.nonce}
              onChange={handleChange}
            />
          </div>
          <div style={{ margin: 10, alignItems: "center" }}>
            <div style={{ wordWrap: "break-word", width: "100%" }}>
              signature : {state.signature}
            </div>
            <button
              onClick={() => signTransaction()}
              label="SignButton"
              style={{ margin: 10, alignItems: "center" }}
            >
              <span>Sign Selected Transaction</span>
            </button>
            <button
              onClick={() => signTransaction712()}
              label="SignButton"
              style={{ margin: 10 }}
            >
              <span>Sign Selected Transaction With EIP712</span>
            </button>
          </div>
        </div>
      </div>
      <div className="column" style={styles.column}>
        <div style={{ wordWrap: "break-word", width: "50%" }}>
          {signatures.map((item, index) => (
            <Selection>
              <div key={index} style={{ wordWrap: "break-word", width: "50%" }}>
                1<p>Signature: {item.signature}</p>
                <p>Data: {JSON.stringify(item.dataToSign)}</p>
              </div>
            </Selection>
          ))}
        </div>
      </div>
    </div>
  </>
);
