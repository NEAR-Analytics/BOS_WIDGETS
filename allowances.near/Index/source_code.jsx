const networks = {
  1: {
    name: "Ethereum Mainnet",
    url: "https://eth.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://eth.blockscout.com/address/%address%",
  },
  5: {
    name: "Ethereum Goerli",
    url: "https://eth-goerli.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://eth-goerli.blockscout.com/address/%address%",
  },
  11155111: {
    name: "Ethereum Sepolia",
    url: "https://eth-sepolia.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://eth-sepolia.blockscout.com/address/%address%",
  },
  137: {
    name: "Polygon",
    url: "https://polygon.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://polygon.blockscout.com/address/%address%",
  },
  61: {
    name: "Ethereum Classic",
    url: "https://etc.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://etc.blockscout.com/address/%address%",
  },
  100: {
    name: "Gnosis",
    url: "https://gnosis.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://gnosis.blockscout.com/address/%address%",
  },
  10: {
    name: "Optimism",
    url: "https://optimism.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://optimism.blockscout.com/address/%address%",
  },
  420: {
    name: "Optimism Goerli",
    url: "https://optimism-goerli.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://optimism-goerli.blockscout.com/address/%address%",
  },
  245022934: {
    name: "Neon",
    url: "https://neon.blockscout.com/api?module=account&action=txlist&address=%sender%",
    explorer: "https://neon.blockscout.com/address/%address%",
  },
};

// Load ERC20 ABI JSON
const erc20Abi = fetch(
  "https://ipfs.near.social/ipfs/bafkreifgw34kutqcnusv4yyv7gjscshc5jhrzw7up7pdabsuoxfhlnckrq"
);

// Load ERC721 ABI JSON
const erc721Abi = fetch(
  "https://ipfs.near.social/ipfs/bafkreid6rp5rf2xagdejznvvv5hoz7wtuupcvehrxkrznrdckkj7onuije"
);
if (!erc20Abi.ok || !erc721Abi.ok) {
  return "Loading";
}

// Create contract interface
const ifaceERC20 = new ethers.utils.Interface(erc20Abi.body);
const ifaceERC721 = new ethers.utils.Interface(erc721Abi.body);

const approvalHash = "0x095ea7b3";
const unlimitedAllowance =
  "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const etherProviderEnabled = !!Ethers?.provider();

const dataLoadedFor = () => `${state.chainId}_${state.sender}`;

const setContractName = (contractAddress, value) => {
  const prevContractNames = state.contractNames ?? {};
  prevContractNames[contractAddress] = value;
  State.update({
    contractNames: prevContractNames,
  });
};

const getAllowanceKey = (tokenContractId, spenderContractId) =>
  `${tokenContractId}_${spenderContractId}`;

const loadContractName = (contractAddress) => {
  if (!contractAddress) return;

  const alreadyLoaded = Object.keys(state.contractNames ?? {}).some(
    (address) => address == contractAddress
  );

  if (!alreadyLoaded) {
    Ethers.provider()
      .call({
        to: contractAddress,
        data: ifaceERC20.encodeFunctionData("name", []),
      })
      .then((rawResponse) => {
        setContractName(
          contractAddress,
          ifaceERC20.decodeFunctionResult("name", rawResponse)
        );
      })
      .catch(() => {
        setContractName(contractAddress, contractAddress);
      });

    State.update({ contractNames });
  }
};

const getDataUrl = (sender) => {
  return networks[state.chainId ?? 1].url.replace("%sender%", sender);
};

const getExporerUrl = (address) => {
  return networks[state.chainId ?? 1].explorer.replace("%address%", address);
};

if (etherProviderEnabled) {
  Ethers.provider()
    .send("eth_chainId", [])
    .then((chainId) => {
      chainId = parseInt(chainId, 16);
      if (state.chainId !== chainId) {
        console.log("Set chainId", chainId);
        State.update({ chainId });
      }
    });

  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length && state.sender !== accounts[0]) {
        console.log("Set sender", accounts[0]);
        State.update({ sender: accounts[0] });
      }
    });

  useEffect(() => {
    if (state.dataLoadedFor != dataLoadedFor()) {
      const dataUrl = getDataUrl(state.sender);
      console.log("Loading tx data", dataUrl);

      State.update({
        dataLoadedFor: dataLoadedFor(),
      });

      asyncFetch(dataUrl).then((fetchData) => {
        const txData = fetchData.body;
        if (txData.status === "1") {
          State.update({
            txData: txData.result,
            allowances: undefined,
            contracts: undefined,
          });
        } else {
          console.log("Service unavailable", txData.status);
        }
      });
    }
  }, [state.chainId, state.sender, state.dataLoadedFor]);

  if (state.txData && state.allowances === undefined) {
    const approvals = state.txData
      .filter((tx) => tx.input.startsWith(approvalHash))
      .sort((a, b) => {
        if (a.blockNumber < b.blockNumber) return -1;
        if (a.blockNumber > b.blockNumber) return 1;
        return 0;
      });

    const allowancesObject = approvals.reduce((allowances, tx) => {
      let allowance;
      const allowanceUnEdited = tx.input.substring(74);
      if (allowanceUnEdited.includes(unlimitedAllowance)) {
        allowance = "unlimited";
      } else {
        allowance = "some";
      }
      const tokenContractId = ethers.utils.getAddress(tx.to);
      const spenderContractId = ethers.utils.getAddress(
        "0x" + tx.input.substring(34, 74)
      );

      const allowanceKey = getAllowanceKey(tokenContractId, spenderContractId);

      if (parseInt(allowanceUnEdited, 16) !== 0) {
        allowances[allowanceKey] = {
          tokenContractId,
          spenderContractId,
          allowance,
          allowanceUnEdited,
        };
      } else {
        delete allowances[allowanceKey];
      }

      return allowances;
    }, {});

    State.update({ allowances: allowancesObject });
  }
}

const isERC721 = (contractAddress, allowanceUnEdited) => {
  return Ethers.provider()
    .call({
      to: contractAddress,
      data: ifaceERC721.encodeFunctionData("ownerOf", [
        parseInt(allowanceUnEdited, 16),
      ]),
    })
    .then((rawResponse) => {
      console.log(
        "ownerOf",
        ifaceERC20.decodeFunctionResult("ownerOf", rawResponse)
      );
      return true;
    })
    .catch(() => {
      return false;
    });
};

const revoke = (contractAddress, spenderAddress, allowanceUnEdited) => {
  if (!contractAddress || !spenderAddress) {
    return;
  }

  isERC721(contractAddress, allowanceUnEdited).then((is721) => {
    if (is721) {
      //revoke erc721 by nulling the address
      const contract = new ethers.Contract(
        contractAddress,
        ifaceERC721,
        Ethers.provider().getSigner()
      );

      contract
        .approve(0, allowanceUnEdited)
        .then((tx) => {
          console.log("erc721 tx", tx);
        })
        .catch((ex) => {
          console.log("Failed", ex);
        });
    } else {
      // revoke erc20 by nulling approval amount
      const contract = new ethers.Contract(
        contractAddress,
        ifaceERC20,
        Ethers.provider().getSigner()
      );

      contract
        .approve(spenderAddress, 0)
        .then((tx) => {
          console.log("erc20 tx", tx);
        })
        .catch((ex) => {
          console.log("Failed", ex);
        });
    }
  });
};

useEffect(() => {
  Object.keys(state.allowances ?? {}).map((contractId) => {
    loadContractName(state.allowances[contractId].tokenContractId);
    loadContractName(state.allowances[contractId].spenderContractId);
  });
}, [state.allowances]);

const columnStyles = [
  "col-md-3 col-sm-12 text-truncate",
  "col-md-5 col-sm-12 text-truncate",
  "col-md-2 col-sm-12",
  "col-md-2 col-sm-12",
];

const Theme = styled.div`
    .header {
        font-weight: bold;
    }
`;

const styleAllowance = (allowance) => {
  if (allowance == "some") {
    return <span class="badge bg-info">Some</span>;
  } else if (allowance == "unlimited") {
    return <span class="badge bg-primary">Unlimited</span>;
  } else return allowance;
};

const switchNetwork = (chainId) => {
  if (etherProviderEnabled && chainId) {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: ethers.utils.hexValue(chainId) },
    ]);
  }
};

return (
  <Theme>
    <div className="container">
      <div className="row">
        <h2 class="card-title pt-3">Find & revoke token allowances</h2>
        <h6 class="card-subtitle mb-3 text-muted">
          This tool scans your EVM-Compatible Blockchain transactions to
          identify approval transactions, which you can then revoke
        </h6>

        {!state.sender && (
          <div class="mb-3">
            <Web3Connect connectLabel="Connect Web3 Wallet to continue" />
          </div>
        )}

        {etherProviderEnabled && (
          <div class="input-group mb-2">
            <span class="input-group-text">
              Current chain: {networks[state.chainId].name}
            </span>
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Switch chain
            </button>
            <ul class="dropdown-menu">
              {Object.keys(networks ?? {}).map((networkId) => (
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={(e) => switchNetwork(Number(networkId))}
                  >
                    {networks[networkId].name}
                  </a>
                </li>
              ))}
            </ul>

            <button
              class="btn btn-outline-secondary"
              onClick={() => {
                State.update({
                  allowances: undefined,
                  dataLoadedFor: undefined,
                });
              }}
            >
              Refresh
            </button>
          </div>
        )}

        <div class="card p-0 mt-3">
          <div class="card-header ps-0 pe-0">
            <div class="container ps-2 pe-2">
              <div class="row ps-2">
                <div class={`header ${columnStyles[0]}`}>Token</div>
                <div class={`header ${columnStyles[1]}`}>Spender</div>
                <div class={`header ${columnStyles[2]}`}>Allowance</div>
                <div class={`header ${columnStyles[3]}`}>Action</div>
              </div>
            </div>
          </div>

          <div class="overflow-hidden">
            {!etherProviderEnabled && (
              <div class="container ps-2 pe-2">
                <div class="row p-2">
                  <div class="col col-12 text-center">
                    Connect Web3 Wallet to view your transactions
                  </div>
                </div>
              </div>
            )}
            {(state.allowances == undefined || state.allowances.length == 0) &&
              etherProviderEnabled && (
                <div class="container ps-2 pe-2">
                  <div class="row p-2">
                    <div class="col col-12 text-center">No data</div>
                  </div>
                </div>
              )}
            {Object.keys(state.allowances ?? {}).map((allowanceKey) => {
              const item = state.allowances[allowanceKey];
              return (
                <div class="container ps-2 pe-2">
                  <div class="row border-bottom ps-2 pt-1 pb-1 align-items-center">
                    <div class={columnStyles[0]}>
                      <a
                        href={getExporerUrl(item.tokenContractId)}
                        class="text-dark"
                        target="_blank"
                      >
                        {state.contractNames[item.tokenContractId]}
                      </a>
                    </div>
                    <div class={columnStyles[1]}>
                      <a
                        href={getExporerUrl(item.spenderContractId)}
                        class="text-dark"
                        target="_blank"
                      >
                        {state.contractNames[item.spenderContractId]}
                      </a>
                    </div>
                    <div class={columnStyles[2]}>
                      {styleAllowance(item.allowance)}
                    </div>
                    <div class={columnStyles[3]}>
                      <button
                        class="btn btn-outline-primary btn-sm"
                        disabled={!state.sender}
                        onClick={() =>
                          revoke(
                            item.tokenContractId,
                            item.spenderContractId,
                            item.allowanceUnEdited
                          )
                        }
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {state.sender && (
          <div class="pt-5">
            <Web3Connect />
            <div class="pt-2 text-secondary">
              <pre>Current account: {state.sender}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  </Theme>
);
