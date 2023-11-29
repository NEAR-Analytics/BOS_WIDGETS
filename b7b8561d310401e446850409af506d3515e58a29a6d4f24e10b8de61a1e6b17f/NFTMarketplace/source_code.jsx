State.init({
  chainId: 25925,
  chainName: "kub-chain testnet",
  baseUrl: "https://api.yourapp.com",
  marketplace2CompleteAddress: "0x2F32C5cad9357fB6F2c0775438C1589A020099f1",
  sender: 0x21bf18c13d1fa9a65212a4632dfe4a74eb5e3212,
  signature: null,
  hashMessage: null,
  selectedTransaction: null,
});

const [formData, setFormData] = useState({
  isSell: true,
  nftAddress: "0x431b3E0D8d9408DF3F90BfA5d893098e93Cdb372",
  tokenId: 1,
  tokenAddress: "0x520Ea5ad4d60602ae6f33EBBc99ea8F253655924",
  price: 40000000,
  expiry: Math.floor(Date.now() / 1000) + 86400,
  nonce: 1,
});

const [signatures, setSignatures] = useState([]);
const selectTransaction = (tx) => {
  State.update({ selectedTransaction: tx });
};

const handleChange = (e) => {
  const { id, value } = e.target;
  let finalValue = value;
  if (id === "isSell") {
    finalValue = value === "true";
  }
  setFormData((prevFormData) => ({
    ...prevFormData,
    [id]: finalValue,
  }));
};

const [nonceMapping, setNonceMapping] = useState({});

useEffect(() => {
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
              chainName: "mainnet",
            });
            State.update({
              chainId: 1,
            });
          } else if (chainIdData?.chainId == 5) {
            State.update({
              chainName: "goerli",
            });
            State.update({
              chainId: 5,
            });
          } else if (chainIdData?.chainId == 100) {
            State.update({
              chainName: "gnosis-chain",
            });
            State.update({
              chainId: 100,
            });
          } else if (chainIdData?.chainId == 96) {
            State.update({
              chainName: "kub-chain",
            });
            State.update({
              chainId: 96,
            });
          } else if (chainIdData?.chainId == 25925) {
            State.update({
              chainName: "kub-chain testnet",
            });
            State.update({
              chainId: 25925,
            });
          }
        });
    }
  }
}, [state.sender]);

//EIP712
const domain = {
  name: "MyApp",
  version: "1.0",
  chainId: state.chainId,
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
  const isNonceExist = signatures.some(
    (item) => item.dataToSign.nonce === dataToSign.nonce
  );

  if (!isSignatureExist && !isNonceExist) {
    setSignatures((prevSignatures) => [
      ...prevSignatures,
      { dataToSign, signature },
    ]);
  } else {
    console.log("Signature or Nonce already exists");
  }

  setFormData((prevFormData) => ({
    ...prevFormData,
    nonce: prevFormData.nonce + 1,
  }));
};

const createNonceFromSigner = (signer) => {
  const dataBytes = ethers.utils.toUtf8Bytes(signer);
  const nonceFromSigner = ethers.utils.keccak256(dataBytes);

  // ตรวจสอบและอัปเดต nonce สำหรับ signer นี้
  const existingNonce = nonceMapping[signer] || 0;
  const updatedNonce = existingNonce + 1;

  // อัปเดต mapping ด้วย nonce ใหม่
  setNonceMapping((prevMapping) => ({
    ...prevMapping,
    [signer]: updatedNonce,
  }));

  console.log(nonceFromSigner, updatedNonce);
  return nonceFromSigner;
};

const signTransaction = () => {
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

  const dataString = JSON.stringify(dataToSign);
  const dataBytes = ethers.utils.toUtf8Bytes(dataString);
  const hashedData = ethers.utils.keccak256(dataBytes);
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

const acceptOffer = (formData, signature) => {
  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "NFTSold",
      type: "event",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "isSell",
              type: "bool",
            },
            {
              internalType: "address",
              name: "nftAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "tokenAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "expiry",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
          ],
          internalType: "struct Marketplace2Complete.Offer",
          name: "_offer",
          type: "tuple",
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes",
        },
      ],
      name: "acceptOffer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_nonce",
          type: "uint256",
        },
      ],
      name: "cancelListing",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getChainId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "hash",
          type: "bytes32",
        },
      ],
      name: "getEthSignedMessageHash",
      outputs: [
        {
          internalType: "bytes32",
          name: "message",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "isSell",
              type: "bool",
            },
            {
              internalType: "address",
              name: "nftAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokenId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "tokenAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "expiry",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
          ],
          internalType: "struct Marketplace2Complete.Offer",
          name: "_offer",
          type: "tuple",
        },
      ],
      name: "getMessageHashEncode",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "usedNonce",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  console.log(abi);
  console.log(formData);

  const iface = new ethers.utils.Interface(abi);

  const encodedBalanceData = iface.encodeFunctionData("getMessageHashEncode", [
    formData,
  ]);

  // perform a call
  Ethers.provider()
    .call({
      to: "0x2F32C5cad9357fB6F2c0775438C1589A020099f1",
      data: encodedBalanceData,
    })
    .then((rawBalance) => {
      try {
        const result = iface.decodeFunctionResult(
          "getMessageHashEncode",
          rawBalance
        );
        console.log(result);
      } catch (error) {
        console.error("Error decoding data:", error);
      }
    });

  // create a contract instance
  const wEthContract = new ethers.Contract(
    "0x2F32C5cad9357fB6F2c0775438C1589A020099f1",
    abi,
    Ethers.provider().getSigner()
  );

  // perform a given method (withdraw in this case)

  console.log("result", result);
  wEthContract
    .acceptOffer(formData, signature, { gasLimit: 500000 })
    .then((transactionHash) => {
      console.log(transactionHash);
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
  select: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    backgroundColor: "white",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    margin: "1%",
  },
  column25: {
    flex: "0 0 25%",
    padding: "5px",
    width: "25%",
  },
  column75: {
    flex: "0 0 75%",
    padding: "5px",
    width: "75%",
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
    margin: 5px;
    margin-bottom : 0.5 px;
    padding: 5px;
    border: 2px solid #0d6efd;
    border-radius: 4px;
    text-align: left;
    width : 100%;
`;

return (
  <>
    <div style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a href="/" style={styles.navLink}>
            {state.chainName} {state.chainId}
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
              id="isSell"
              value={String(formData.isSell)}
              onChange={handleChange}
              style={styles.select}
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
      <div className="column75" style={styles.column75}>
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
                  Transaction Type:
                  {item.dataToSign.isSell ? "Sell" : "Buy"}
                </p>
                <p>NFT Address: {JSON.stringify(item.dataToSign.nftAddress)}</p>
                <p>Token ID: {JSON.stringify(item.dataToSign.tokenId)}</p>
                <p>
                  Token Address: {JSON.stringify(item.dataToSign.tokenAddress)}
                </p>
                <p>Price: {JSON.stringify(item.dataToSign.price)}</p>
                <p>Expiry: {JSON.stringify(item.dataToSign.expiry)}</p>
                <p>Nonce: {JSON.stringify(item.dataToSign.nonce)}</p>
                {state.selectedTransaction == item.signature ? (
                  <>
                    <button
                      onClick={() =>
                        acceptOffer(item.dataToSign, item.signature)
                      }
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
    <button
      onClick={() =>
        acceptOffer(
          formData,
          "0x76675cbbd6381174c95658ecfd49b400cdb14da27ab84aa1bc367c91f88cdf4f798a409ccd6defdfb7e73ce2d6dab1764e2da564b0dba98ba367e16a0fbb858c1c"
        )
      }
      label="SignButton"
      style={{ margin: 10 }}
    >
      <span> Accept Offer </span>
    </button>
  </>
);
