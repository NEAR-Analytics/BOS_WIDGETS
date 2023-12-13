initState({
  toggleAmount: false,
  txHash: "",
  tokenDecimals: 18,
  fromTokenAmount: 0,
  status: 0,
});

const signer = Ethers.send("eth_requestAccounts", [])[0]; // current wallet

if (state.error) {
  return (
    <div>
      Dear user, we regret to inform you that we have received an error callback
      from the API. Our team is currently investigating the issue and working on
      resolving it as soon as possible. We apologize for any inconvenience this
      may have caused and thank you for your patience while we work to address
      the problem.
    </div>
  );
}

if (!signer) {
  return (
    <div>
      <h3>Please connect your wallet</h3>
      <Web3Connect />
    </div>
  );
}

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

// Support Only Avalance Fuji (Testnet) & Sepolia Ethereum (Testnet)
if (
  state.chainId !== 43113 &&
  state.chainId !== 11155111 &&
  state.chainId !== 10
) {
  return (
    <div>
      <h3>
        Wrong Network - We currently support the Avalance Fuji (Testnet) and
        Sepolia (Testnet) exclusively. Kindly confirm that you are connected to
        the intended network before proceeding.
      </h3>
    </div>
  );
}

const oneInchAbi = fetch(
  "https://gist.githubusercontent.com/miguelmota/2759896a63d2e528bee86b2f8bb67e3b/raw/789317fa43d1bf346b4ef0b17b61c59db84486c7/ERC721.json"
);
if (!oneInchAbi.ok) {
  return "1inch not ok";
}

const ccipSender = fetch(
  "https://gist.githubusercontent.com/taforyou/810058bb7c7fc277f3e56a23a8534658/raw/efe0059806f3b6906704896a385a8eecbb9abd87/CCIPSender.abi.json"
);
if (!ccipSender.ok) {
  return "ccipSender not ok";
}

async function queryBalanceOf() {
  try {
    const contractAddress = "0x51E5426eDE4e2d4c2586371372313B5782387222"; // Apetimisim
    const oneInch = new ethers.Contract(
      contractAddress,
      oneInchAbi.body,
      Ethers.provider().getSigner()
    );
    oneInch.balanceOf(signer).then((x) => {
      console.log("result :=> x ", x); // My own wallet got 4 - 0x04
    });
  } catch (error) {
    console.error(error);
  }
}

async function mintToken() {
  try {
    const contractAddress = "0xd0FD63f94811d9Fd8f147f22bd94AbF21c1d0445"; // Avalance Fuji sender
    const ccip = new ethers.Contract(
      contractAddress,
      ccipSender.body,
      Ethers.provider().getSigner()
    );
    // Ethers.provider()
    //   .getFeeData()
    //   .then((x) => {
    //     console.log("fee Data :", x);
    //   });
    // Ethers.provider()
    //   .getGasPrice()
    //   .then((x) => {
    //     console.log("x ", x);
    //   });
    // Ethers.provider().getGasPrice()
    // const gasLimit = ethers.utils.hexlify(1000000); // Example gas limit
    // const gasPrice = ethers.utils.parseUnits("10", "gwei"); // Example gas price
    ccip
      // .mintNFT({
      //   gasPrice: "0x59682f00",
      //   maxFeePerGas: "0x0bfda3a300",
      //   maxPriorityFeePerGas: "0x59682f00",
      // })
      .mintNFT()
      // .mintNFT({ gasPrice: "0x59682f00" })
      // .mintNFT({ gasLimit: "0x826299e00" })
      .then((x) => {
        console.log("result :=> x ", x); // My own wallet got 4 - 0x04
      });
    // ccip.owner().then((x) => {
    //   console.log("result :=> x ", x); // My own wallet got 4 - 0x04
    // });
  } catch (error) {
    console.error(error);
  }
}

return (
  <div>
    <button class="btn btn-success" onClick={queryBalanceOf} disabled={false}>
      QueryBalance of
    </button>
    <button class="btn btn-success" onClick={mintToken} disabled={false}>
      Mint
    </button>
  </div>
);
