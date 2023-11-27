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

const selectTransaction = (tx) => {
  State.update({ selectedTransaction: tx });
};

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

const updateSignature = (signature, dataToSign) => {
  State.update({ signature: signature });
  const isSignatureExist = signatures.some(
    (item) => item.signature === signature
  );
  if (!isSignatureExist) {
    setSignatures((prevSignatures) => [
      ...prevSignatures,
      { dataToSign, signature },
    ]);
  } else {
    console.log("Signature already exists");
  }
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
  console.log("dataToSign", dataToSign);
  const dataString = JSON.stringify(dataToSign); // แปลง object เป็น string

  // แปลงสตริงเป็น byte array
  const dataBytes = ethers.utils.toUtf8Bytes(dataString);
  // ทำ hash ข้อมูล
  const hashedData = ethers.utils.keccak256(dataBytes);

  // รับ signer จาก provider
  const signer = Ethers.provider().getSigner();

  signer
    .signMessage(ethers.utils.arrayify(hashedData))
    .then((signature) => {
      updateSignature(signature, dataToSign);
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

  const message = createEIP712Message(dataToSign);
  console.log("message", message);
  const signer = Ethers.provider().getSigner();
  signer._signTypedData(domain, types, message).then((signature) => {
    updateSignature(signature, dataToSign);

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
  column25: {
    flex: "0 0 25%", // คอลัมน์นี้จะมีขนาดคงที่ 25%
    padding: "5px",
    width: "25%", // กำหนดความกว้าง 25%
  },
  column75: {
    flex: "0 0 75%", // คอลัมน์นี้จะมีขนาดคงที่ 75%
    padding: "5px",
    width: "75%", // กำหนดความกว้าง 75%
  },
  navbar: {
    backgroundColor: "#000",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 10px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.2em",
  },
};

const Selection = styled.button`
    font-size: 1em;
    margin: 0.1em;
    padding: 0.5em 0.3em;
    border: 2px solid palevioletred;
    border-radius: 5px;
    text-align: left;
    width : 100%
`;

return (
  <>
    <div style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a href="/" style={styles.navLink}>
            Home
          </a>
        </li>
      </ul>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Web3Connect className="web3-connect" connectLabel="Connect Wallet" />
        </li>
      </ul>
    </div>

    <div className="container" style={styles.container}>
      <div className="column25" style={styles.column}>
        <div style={styles.div}>
          <div>
            <label htmlFor="isSell">Transaction Type:</label>
            <select
              name="isSell"
              id="isSell"
              value={formData.isSell}
              onChange={handleChange}
            >
              <option value={true}>Sell</option>
              <option value={false}>Buy</option>
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
      <div className="column75" style={styles.column}>
        <div style={{ wordWrap: "break-word" }}>
          {signatures.map((item, index) => (
            <Selection>
              <div
                key={index}
                style={{ wordWrap: "break-word" }}
                onClick={() => selectTransaction(item.signature)}
              >
                <p>Signature: {item.signature.slice(0, 30)}...</p>
                <p>
                  Transaction Type: {JSON.stringify(item.dataToSign.isSell)}
                </p>
                {state.selectedTransaction == item.signature ? (
                  <>
                    <button
                      onClick={() => alert()}
                      label="SignButton"
                      style={{ margin: 10 }}
                    >
                      <span> Accept Offer </span>
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Selection>
          ))}
        </div>
      </div>
    </div>
  </>
);
