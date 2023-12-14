initState({
  viewNft: false,
  mintNft: false,
  img: null,
  name: null,
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
        if (state.chainId == 43113) {
          State.update({ viewNft: true });
        }
        if (state.chainId == 11155111) {
          State.update({ mintNft: true });
        }
      }
    });
}

// Support Only Avalance Fuji (Testnet) & Sepolia Ethereum (Testnet)
if (state.chainId !== 43113 && state.chainId !== 11155111) {
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

const nftAbi = fetch(
  "https://gist.githubusercontent.com/hoanganhlam/0fef79860e992cf3cabf7e8b8fb11ccf/raw/8175a9d95c6bb19e76c33b21c6131f1d45d1bc86/ABI-ERC721.json"
);
if (!nftAbi.ok) {
  return "nft not ok";
}

const ccipSender = fetch(
  "https://gist.githubusercontent.com/taforyou/810058bb7c7fc277f3e56a23a8534658/raw/efe0059806f3b6906704896a385a8eecbb9abd87/CCIPSender.abi.json"
);
if (!ccipSender.ok) {
  return "ccipSender not ok";
}

async function queryBalanceOf() {
  try {
    const contractAddress = "0xBF3d94450104487c25C2BEe4CA7E40eDD7caC73D"; // NFT Contract Address on Ethereum Sepolia
    const nftContract = new ethers.Contract(
      contractAddress,
      nftAbi.body,
      Ethers.provider().getSigner()
    );
    nftContract.balanceOf(signer).then((x) => {
      if (x._hex !== "0x00") {
        console.log("This wallet has some NFT"); // Hack
        nftContract.tokenURI(0).then((y) => {
          asyncFetch(y).then((response) => {
            // should check 200
            State.update({
              name: response.body.name,
              img: response.body.image,
            });
            console.log("name", response.body.name); // Hack
            console.log("img", response.body.image); // Hack
          });
        });
      } else {
        console.log("This wallet has no NFT");
      }
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
    ccip.mintNFT().then((x) => {
      console.log("result :=> x ", x); // My own wallet got 4 - 0x04
    });
  } catch (error) {
    console.error(error);
  }
}

return (
  <div>
    <button
      class="btn btn-success"
      onClick={queryBalanceOf}
      disabled={state.viewNft}
    >
      View NFT (Ethereum Sepolia)
    </button>
    <button
      class="btn btn-success"
      onClick={mintToken}
      disabled={state.mintNft}
    >
      Mint (Avalance Fuji)
    </button>
    <div className="mt-2">
      // Should display nft owned by current wallet
      <h3>{state.name}</h3>
      <img src={`${state.img}`} />
    </div>
  </div>
);
