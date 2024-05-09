const CHAIN_IDS = {
  BITKUB_TESTNET: 25925,
  ETH_JFIN_TESTNET: 3502,
};

const SUPPORT_CHAIN = [
  {
    chainIdNumber: CHAIN_IDS.BITKUB_TESTNET,
    chainName: "Bitkub Chain",
    chainId: "0x" + CHAIN_IDS.BITKUB_TESTNET.toString(16),
    rpcUrls: ["https://rpc-testnet.bitkubchain.io"],
    currencySymbol: "tKUB",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
  },
  {
    chainIdNumber: CHAIN_IDS.ETH_JFIN_TESTNET,
    chainName: "JFIN Chain",
    chainId: "0x" + CHAIN_IDS.ETH_JFIN_TESTNET.toString(16),
    rpcUrls: ["https://rpc.testnet.jfinchain.com"],
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
  /* padding: 10px; */
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
  padding: 10px;
`;

const CardContainer = styled.div`
  width: 100%;
  padding: 10px;
  padding-right: 16px;
`;

const StatContainer = styled.div`
  background-color: #ffffff;
  height: 190px;

  h3 {
    font-size: 20px;
    line-height: 1.5;
    font-weight: 800;
  }

  p {
    font-size: 14px;
    line-height: 1;
    font-weight: 800;
  }
`;

const ActionButton = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 16px;
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
const [background, setBackground] = useState("necromancer-lab");

const disableActionButton = isFeeding || isPlaying || isEvolving;

function handleSetupSignerInfo() {
  try {
    const provider = Ethers.provider();
    if (provider) {
      const addressPromise = provider
        ?.getSigner()
        ?.getAddress()
        .then((address) => address);

      const chainPromise = provider?.getNetwork().then((chain) => chain);

      Promise.all([chainPromise, addressPromise]).then(([chain, address]) => {
        setWalletAddress(address);
        setChainId(chain.chainId);
      });
    }
  } catch (error) {
    setIsError(true);
    console.error(error);
  } finally {
    setIsShowLoader(false);
  }
}

function isSupportChain(targetChainId) {
  return Object.values(CHAIN_IDS).includes(targetChainId);
}

function handleSwitchChain(chain) {
  // Ethers.send("wallet_switchEthereumChain", [{ chainId: chain.chainId }]);

  const param = {
    chainId: chain.chainId,
    chainName: chain.chainName,
    rpcUrls: chain.rpcUrls,
    nativeCurrency: chain.nativeCurrency,
  };
  Ethers.send("wallet_addEthereumChain", [param]);
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
      setIsFauceting(false);
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
            label: `${detail?.name || "Monster Nft"} #${option}`,
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

function updateNftDetail() {
  return getNftDetail(selectedNft.stat.tokenId)
    .then(([stat, uri]) => {
      setTimeout(() => {
        const detail = fetch(uri).body;

        return setSelectedNft({
          detail,
          stat,
        });
      }, 1000);
    })

    .catch((error) => {
      console.error(error);
      setIsError(true);
    });
}

function onSelectNft(e) {
  if (!!e.target.value || !disableActionButton) {
    setIsShowLoader(true);
    handleSetBackground();
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

  const fee = "0.01";
  const options = {
    value: ethers.utils.parseUnits(fee, "ether"),
  };

  contract
    .feed(selectedNft.stat.tokenId, options)
    .then((tx) => {
      tx.wait()
        .then(() => updateNftDetail().then(() => setIsFeeding(false)))
        .catch((error) => {
          console.error(error);
          setIsError(true);
        });
    })
    .catch((error) => {
      console.error(error);
      setIsFeeding(false);
    });
}

function playMonster() {
  if (disableActionButton) return;
  setIsPlaying(true);
  const contract = getContract();

  const fee = "0.01";
  const options = {
    value: ethers.utils.parseUnits(fee, "ether"),
  };

  contract
    .play(selectedNft.stat.tokenId, options)
    .then((tx) => {
      tx.wait()
        .then(() => {
          updateNftDetail().then(() => setIsPlaying(false));
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        });
    })
    .catch((error) => {
      console.error(error);
      setIsPlaying(false);
    });
}

function evolveMonster() {
  if (disableActionButton) return;
  setIsEvolving(true);
  handleSetBackground();
  const contract = getContract();

  contract
    .evolve(selectedNft.stat.tokenId)
    .then((tx) => {
      tx.wait()
        .then(() => {
          updateNftDetail().then(() => setIsEvolving(false));
        })
        .catch((error) => {
          console.error(error);
          setIsError(true);
        });
    })
    .catch((error) => {
      console.error(error);
      setIsEvolving(false);
    });
}

function handleSetBackground() {
  let bg = "";

  if (selectedNft.stat.state === 2) {
    bg = "arena";
  }

  const backgrounds = [
    "necromancer-lab",
    "city-square",
    "forest",
    "magical-forest",
    "arena",
  ];
  const randomNumber = Math.floor(Math.random() * backgrounds.length);
  bg = backgrounds[randomNumber];

  setBackground(bg);
}

useEffect(() => {
  handleSetupSignerInfo();
}, []);

useEffect(() => {
  if (walletAddress && isSupportChain(chainId) && !isFauceting && !isEvolving) {
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
}, [walletAddress, chainId, isFauceting, isEvolving]);

function Router() {
  if (isError) {
    return <p style={{ color: "red", fontWeight: 800 }}>Error</p>;
  }

  if (showLoader || isFauceting || isEvolving) {
    return (
      <img src="data:image/png;base64,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" />
    );
  }

  if (!walletAddress) {
    return <Widget src="a3r0nz.near/widget/Omagotji-WalletConnectButton" />;
  }

  if (!isSupportChain(chainId)) {
    return (
      <>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARuSURBVHgB7Z1NaFRXGIbftCm0i4RYWgs1MZEu2tJCZ1Go0DSdLmqXprjrot7b2XQXoXQpjrSrltJ252aYi4qCIJitLtQYRNFFFiKIyDhMjKjg+IuC0Xi+RMGfc2Ymk3uZd/R94CyS794w9zwzN9/5zrlngM6RuLZA2sroEG9AUCEhZEgIGRJChoSQ0Yt0ybk23sqBhULhi6GhITBSq9VypVKp2OLhB1ybASkRWkwtkyRZYKVcLi8nRY6QIrplkSEhZEgIGRJChoSQ0YP2WPD9MooiuAzFf0btZ2D+CrqS3g+AoZ3eUBzHcBlj6Mxl968+IWRICBkSQoaEkCEhZDQqLuaetJewbMrHt19/Atw56I3h0R10LY/uBq9r8ZoD5SyXffkDS8VIb0GyUVpWdG2bL+Dqb/4z7EVf+wevFe/9BvRt8IZ6eoLdux1L/fsSumWRISFkSAgZEkKGhJDR3py6FQp9dHNq2y7XdwA3diMt2hPSrVXbLLAxirWUSHvVyXPcuDWPH3/1L8iYiNdi/PvVYOToyTqK/1/wxsp/fYaRwXeQFRkLeYAjJ657Y9GmD8FKZfZe8HVnjQnxzigVCoXc6Oho4LS9EM0JTdZNT09vLJVKw76YCYl8AVvEFqpZoSIhrRDqv2q1GqwTKu0lQ0LIkBAyJIQMCSEjPA6p73LZ1HE04rufTredr0e/n1lsjahMfZP6IOyiG2OsGzuGdml2bn79uzi858ulHyo/+A+qXwier08IGRJChoSQISFkSAgZK6r2bnYV2/xXq4JxK7//V656Y+MbViP3aR8aMdD/FtLG/mZx4qOGx8ycvY0Dh656Y1t+GcZAX7jbhtesLCtckZBmJXRLMYNC3FzI5g6U4Af6e7GtiZBk/1xQyES0NtP5EN2yyJAQMiSEDAkhQ0LIkBAyJISMTJcBWb5emRrzxmw8wIqNkfKB1z0y+DayJPNeyfoCssDeLJ16w/C+TR1b/jyHmzfnkSbW0f9u/RisUAuZPHh1sfySJnYbZRaif+pkSAgZEkKGhJDR8X/qNollzccIbIIq3Sxr2F3yxdn73lgn092ndFyITQTFgfVZ5133jeB9pEl1dh7rxqa8seTvzzsyafYsumWRISFkSAgZEkKGhJAhIWRICBk2Dkl8gdrl+7lk/5x/RzniZ8yZsAV3PlzfBneUMyGxL1Dad6nomoSsgDj8QNIktKNcdyAhZEgIGRJChoSQISFkSAgZEkKGhJDRaO/38Gb8m9Z4t0rLr1+17ClQWwh35GTdGzv8xyxw6yHSpKf/TeS3Dnpj9gDrcp8ftPLI0RP1QOxSHDitrc34G+H/Diono+zmpdPC9hXJYuWi7aGSFlYeCdWsoO+g6n4khAwJIUNCyJAQMtrNskJECGzM/CIMqwRDWNYUN9nt7hkstU2QEvqEkCEhZEgIGRJChoSQkfbzIVYw297KgcdO1Te6OlUOhNTmFtdNTbZ4+AxeERIsFSkZW0upexbolkWGhJAhIWRICBkSQsZjVpQJlLJuMF4AAAAASUVORK5CYII=" />
        <h5 style={{ margin: 20, fontWeight: 800 }}>
          You are on the wrong chain please switch to supported chain.
        </h5>
        {SUPPORT_CHAIN.map((chain) => (
          <div
            onClick={() => handleSwitchChain(chain)}
            style={{ marginBottom: 16 }}
          >
            <Widget
              src="a3r0nz.near/widget/Omagotji-GeneralButton"
              props={{
                label: `Switch to ${chain.chainName}`,
                color: "primary",
              }}
            />
          </div>
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
            selectPlaceholder: nftOptions.length
              ? "Select NFT"
              : "You don't have Nft yet.",
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

  const exp = selectedNft.stat.exp / 1000;
  const canEvolve = exp >= 100 && selectedNft.stat.state < 2;

  const monsterName = () => {
    return selectedNft?.detail?.name || selectedNft?.stat?.monster?.name;
  };

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
            props={{ scene: background }}
          />
        </Background>
        <FullContainer>
          <Widget
            src="a3r0nz.near/widget/Omagotji-Select"
            props={{
              selectPlaceholder: `${monsterName()} #${
                selectedNft.stat.tokenId
              }`,
              options: nftOptions,
              onChange: (e) => onSelectNft(e),
            }}
          />
        </FullContainer>
        <img src={selectedNft.detail.image} width={250} height={250} />
        <CardContainer>
          <Widget
            src="a3r0nz.near/widget/Omagotji-Card"
            props={{
              children: (
                <StatContainer>
                  <h3>{monsterName()}</h3>
                  <p>State: {MONSTER_STATE[selectedNft.stat.state]}</p>
                  <p>Monster EXP ({exp}/100)</p>
                  <Widget
                    src="a3r0nz.near/widget/Omagotji-ProgressBar"
                    props={{ percent: exp, height: 22 }}
                  />
                  <ActionButton>
                    <div onClick={() => feedMonster()}>
                      <Widget
                        src="a3r0nz.near/widget/Omagotji-GeneralButton"
                        props={{
                          label: "Feed Him",
                          color: disableActionButton ? "disabled" : "primary",
                        }}
                      />
                    </div>
                    <div onClick={() => playMonster()}>
                      <Widget
                        src="a3r0nz.near/widget/Omagotji-GeneralButton"
                        props={{
                          label: "Play with Him",
                          color: disableActionButton ? "disabled" : "primary",
                        }}
                      />
                    </div>
                    <div onClick={() => canEvolve && evolveMonster()}>
                      <Widget
                        src="a3r0nz.near/widget/Omagotji-GeneralButton"
                        props={{
                          label: "Evolve",
                          color:
                            canEvolve && !disableActionButton
                              ? "primary"
                              : "disabled",
                        }}
                      />
                    </div>
                  </ActionButton>
                </StatContainer>
              ),
            }}
          />
        </CardContainer>
      </GameContainer>
    </>
  );
}

return (
  <Container>
    <Router />
  </Container>
);
