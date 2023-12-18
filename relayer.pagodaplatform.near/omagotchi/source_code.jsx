const CHAIN_IDS = {
  BITKUB_TESTNET: 25925,
  ETH_JFIN: 3502,
};

const SUPPORT_CHAIN = [
  {
    chainIdNumber: CHAIN_IDS.BITKUB_TESTNET,
    chainName: "Bitkub Chain Testnet",
    chainId: "0x" + CHAIN_IDS.BITKUB_TESTNET.toString(16),
    rpcUrl: ["https://rpc-testnet.bitkubchain.io"],
    currencySymbol: "tKUB",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    chainIdNumber: CHAIN_IDS.ETH_JFIN,
    chainName: "JFIN Chain",
    chainId: "0x" + CHAIN_IDS.ETH_JFIN.toString(16),
    rpcUrl: ["https://rpc.testnet.jfinchain.com"],
    currencySymbol: "jfin",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
];

const CONTRACT_ADDRESS = "0xD2f7f5F32e0CEf1900E1Fe9e19fA71c9Fbb5B0a9";

const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "faucet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cards",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "enum MonsterLib.MonsterState",
        name: "state",
        type: "uint8",
      },
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "teenagerURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "adultURI",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "power",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
        ],
        internalType: "struct MonsterLib.Monster",
        name: "monster",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "exp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "feed",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "play",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "evolve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const MONSTER_STATE = {
  0: "Larva",
  1: "Teenager",
  2: "Adult",
};

const Container = styled.div`
  margin-top: 5px;
  width: 800px;
  height: 800px;
  outline: 5px solid rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const SelectContainer = styled.div`
  width: 80%;

  .mt-3 {
    margin-top: 3rem;
  }
`;

const FullContainer = styled.div`
  width: 100%;
`;

const StatContainer = styled.div`
  background-color: #ffffff;

  h3 {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 800;
  }

  p {
    font-size: 10px;
    line-height: 1;
    font-weight: 800;
  }
`;

const ActionButton = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 10px;
`;

const ActionContainer = styled.div`
  position: absolute;
  bottom: 50%;
  right: 55%;
`;

// State

const [walletAddress, setWalletAddress] = useState("");
const [chainId, setChainId] = useState("");
const [showLoader, setIsShowLoader] = useState(true);
const [isFauceting, setIsFauceting] = useState(false);
const [isError, setIsError] = useState(false);
const [nftOptions, setNftOptions] = useState([]);
const [selectedNft, setSelectedNft] = useState(null);
const [isFeeding, setIsFeeding] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const [isEvolving, setIsEvolving] = useState(false);

const disableActionButton = isFeeding || isPlaying || isEvolving;

function handleSetupSignerInfo() {
  const addressPromise = Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => address);

  const chainPromise = Ethers.provider()
    .getNetwork()
    .then((chain) => chain);

  Promise.all([chainPromise, addressPromise]).then(([chain, address]) => {
    setWalletAddress(address);
    setChainId(chain.chainId);
    setIsShowLoader(false);
  });
}

function isSupportChain(targetChainId) {
  return Object.values(CHAIN_IDS).includes(targetChainId);
}

function handleSwitchChain(chainId) {
  Ethers.send("wallet_switchEthereumChain", [{ chainId }]);
}

function getContract() {
  const signer = Ethers.provider().getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return contract;
}

function faucetNft() {
  setIsFauceting(true);
  const contract = getContract();
  contract
    .faucet()
    .then((tx) => {
      tx.wait()
        .catch((error) => {
          throw error;
        })
        .finally(() => setIsFauceting(false));
    })
    .catch((error) => {
      console.error(error);
      setIsError(true);
    });
}

function getNftOptions(totalNft, walletAddress) {
  const contract = getContract();
  const promises = [];

  for (let i = 0; i < totalNft; i++) {
    const promise = contract.callStatic
      .tokenOfOwnerByIndex(walletAddress, i)
      .then((tokenId) => tokenId.toNumber());
    promises.push(promise);
  }

  Promise.all(promises)
    .then((nftOptions) => {
      const options = nftOptions.map((option) => {
        const opt = getNftDetail(option).then(([stat, uri]) => {
          const detail = fetch(uri).body;
          return {
            label: `${detail.name} #${option}`,
            value: option,
          };
        });
        return opt;
      });
      return Promise.all(options);
    })
    .then((detailedOptions) => {
      setNftOptions(detailedOptions);
    })
    .catch((error) => {
      console.error("Error:", error);
      setIsError(true);
    })
    .finally(() => setIsShowLoader(false));
}

function getNftDetail(tokenId) {
  const contract = getContract();
  const statPromise = contract.cards(tokenId).then((cardDetails) => {
    const result = {
      tokenId: cardDetails[0].toNumber(),
      state: cardDetails[1],
      monster: {
        name: cardDetails[2][0],
        teenagerURI: cardDetails[2][1],
        adultURI: cardDetails[2][2],
        power: cardDetails[2][3].toNumber(),
        version: cardDetails[2][4],
      },
      exp: cardDetails[3].toNumber(),
    };
    return result;
  });

  const tokenUriPromise = contract.tokenURI(tokenId).then((tokenUri) => {
    return tokenUri;
  });

  return Promise.all([statPromise, tokenUriPromise]);
}

function onSelectNft(e) {
  if (!!e.target.value || !disableActionButton) {
    setIsShowLoader(true);
    getNftDetail(e.target.value)
      .then(([stat, uri]) => {
        const detail = fetch(uri).body;
        setSelectedNft({
          detail,
          stat,
        });
      })
      .catch((error) => {
        console.error(error);
        setIsError(error);
      })
      .finally(() => setIsShowLoader(false));
  }
}

function feedMonster() {
  if (disableActionButton) return;
  setIsFeeding(true);
  const contract = getContract();

  const amountToSendInEther = "0.01";
  const options = {
    value: ethers.utils.parseEther(amountToSendInEther),
  };

  contract
    .feed(selectedNft.stat.tokenId, options)
    .then((tx) => {
      tx.wait()
        .then(() => {
          getNftDetail(e.target.value)
            .then(([stat, uri]) => {
              const detail = fetch(uri).body;
              console.log("feeded");
              setSelectedNft({
                detail,
                stat,
              });
              setIsFeeding(false);
            })
            .catch((error) => {
              console.error(error);
              setIsError(true);
            });
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        });
    })
    .catch((error) => {
      console.error(error);
      setIsError(true);
    });
}

function playMonster() {
  if (disableActionButton) return;
  setIsPlaying(true);
  const contract = getContract();

  const amountToSendInEther = "0.01";
  const options = {
    value: ethers.utils.parseEther(amountToSendInEther),
  };

  contract
    .play(selectedNft.stat.tokenId, options)
    .then((tx) => {
      tx.wait()
        .then(() => {
          getNftDetail(e.target.value)
            .then(([stat, uri]) => {
              const detail = fetch(uri).body;
              console.log("feeded");
              setSelectedNft({
                detail,
                stat,
              });
              setIsPlaying(false);
            })
            .catch((error) => {
              console.error(error);
              setIsError(true);
            });
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        });
    })
    .catch((error) => {
      console.error(error);
      setIsError(true);
    });
}

function evolveMonster() {
  if (disableActionButton) return;
  setIsEvolving(true);
  const contract = getContract();

  const amountToSendInEther = "0.1";
  const options = {
    value: ethers.utils.parseEther(amountToSendInEther),
  };

  contract
    .evolve(selectedNft.stat.tokenId, options)
    .then((tx) => {
      tx.wait()
        .then(() => {
          getNftDetail(e.target.value)
            .then(([stat, uri]) => {
              const detail = fetch(uri).body;
              console.log("evolve");
              setSelectedNft({
                detail,
                stat,
              });
              setIsEvolving(false);
            })
            .catch((error) => {
              console.error(error);
              setIsError(true);
            });
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        });
    })
    .catch((error) => {
      console.error(error);
      setIsError(true);
    });
}

function backgroundSelector() {
  if (selectedNft.stat.state === 2) {
    return "arena";
  }

  const backgrounds = [
    "necromancer-lab",
    "city-square",
    "forest",
    "magical-forest",
  ];
  const randomNumber = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomNumber];
}

useEffect(() => {
  handleSetupSignerInfo();
}, []);

useEffect(() => {
  if (walletAddress && isSupportChain(chainId) && !isFauceting) {
    setIsShowLoader(true);
    const contract = getContract();
    contract
      .balanceOf(walletAddress)
      .then((balance) => {
        const totalNft = balance.toNumber();
        getNftOptions(totalNft, walletAddress);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsError(true);
      });
  }
}, [walletAddress, chainId, isFauceting]);

function Router() {
  if (isError) {
    return <p>Error</p>;
  }

  if (showLoader || isFauceting) {
    return <p>Loading...</p>;
  }

  if (!walletAddress) {
    return <Widget src="a3r0nz.near/widget/Omagotji-WalletConnectButton" />;
  }

  if (!isSupportChain(chainId)) {
    return (
      <>
        <p>You are on the wrong chain please switch to supported chain.</p>
        {SUPPORT_CHAIN.map((chain) => (
          <button onClick={() => handleSwitchChain(chain.chainId)}>
            Switch to {chain.chainName}
          </button>
        ))}
      </>
    );
  }

  if (!selectedNft) {
    return (
      <SelectContainer>
        <p>Select your nft to start</p>
        <Widget
          src="a3r0nz.near/widget/Omagotji-Select"
          props={{
            selectPlaceholder: "Select NFT",
            options: nftOptions,
            onChange: (e) => onSelectNft(e),
          }}
        />
        <p className="mt-3">Don’t have NFT ?</p>
        <div onClick={() => faucetNft()}>
          <Widget
            src="a3r0nz.near/widget/Omagotji-GeneralButton"
            props={{ label: "Faucet", color: "error" }}
          />
        </div>
      </SelectContainer>
    );
  }

  console.log(selectedNft);

  return (
    <>
      <GameContainer>
        <ActionContainer>
          {isFeeding && (
            <Widget
              src="a3r0nz.near/widget/Omagotji-ActionAnimation"
              props={{ action: "feed" }}
            />
          )}
          {isPlaying && (
            <Widget
              src="a3r0nz.near/widget/Omagotji-ActionAnimation"
              props={{ action: "play" }}
            />
          )}
        </ActionContainer>
        <Background>
          <Widget
            src="a3r0nz.near/widget/Omagotji-Scene"
            props={{ scene: backgroundSelector() }}
          />
        </Background>
        <FullContainer>
          <Widget
            src="a3r0nz.near/widget/Omagotji-Select"
            props={{
              selectPlaceholder: `${selectedNft.detail.name} #${selectedNft.stat.tokenId}`,
              options: nftOptions,
              onChange: (e) => onSelectNft(e),
            }}
          />
        </FullContainer>
        <img src={selectedNft.detail.image} width={200} height={200} />
        <FullContainer>
          <Widget
            src="a3r0nz.near/widget/Omagotji-Card"
            props={{
              children: (
                <StatContainer>
                  <h3>{selectedNft.detail.name}</h3>
                  <p>State: {MONSTER_STATE[selectedNft.stat.state]}</p>
                  <p>Monster EXP ({selectedNft.stat.exp}/100)</p>
                  <Widget
                    src="a3r0nz.near/widget/Omagotji-ProgressBar"
                    props={{ percent: selectedNft.stat.exp, height: 20 }}
                  />
                  <ActionButton>
                    <div onClick={() => feedMonster()}>
                      <Widget
                        src="a3r0nz.near/widget/Omagotji-GeneralButton"
                        props={{ label: "Feed Him", color: "primary" }}
                      />
                    </div>
                    <div onClick={() => playMonster()}>
                      <Widget
                        src="a3r0nz.near/widget/Omagotji-GeneralButton"
                        props={{ label: "Play with Him", color: "primary" }}
                      />
                    </div>
                    <div onClick={() => {}}>
                      <Widget
                        src="a3r0nz.near/widget/Omagotji-GeneralButton"
                        props={{ label: "Evolve", color: "primary" }}
                      />
                    </div>
                  </ActionButton>
                </StatContainer>
              ),
            }}
          />
        </FullContainer>
      </GameContainer>
    </>
  );
}

return (
  <Container>
    <Router />
  </Container>
);
