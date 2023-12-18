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

// function updateNftDetail() {
//   return getNftDetail(selectedNft.stat.tokenId)
//     .then(([stat, uri]) => {
//       const detailInterval = setInterval(() => {
//         const detail = fetch(uri).body;
//         if (detail) {
//           setSelectedNft({
//             detail,
//             stat,
//           });
//           clearInterval(detailInterval);
//         }
//       }, 1000);
//     })
//     .catch((error) => {
//       console.error(error);
//       setIsError(true);
//     });
// }

function updateNftDetail() {
  return getNftDetail(selectedNft.stat.tokenId)
    .then(([stat, uri]) => {
      return new Promise((resolve) => {
        const detailInterval = setInterval(() => {
          const detail = fetch(uri).body;
          console.log({ detail });
          if (detail) {
            setSelectedNft({
              detail,
              stat,
            });
            clearInterval(detailInterval);
            resolve();
          }
        }, 1000);
      });
    })
    .catch((error) => {
      console.error(error);
      setIsError(true);
      throw error;
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
            selectPlaceholder: nftOptions?.length
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
