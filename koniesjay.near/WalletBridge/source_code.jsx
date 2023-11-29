const [userId, setUserId] = useState(context.accountId);

const [networkName, setNetworkName] = useState(null);
const [chainId, setChainId] = useState(null);
const [accountId, setAccountId] = useState(null);
const [accounts, setAccounts] = useState(null);
const [accountDetails, setAccountDetails] = useState(null);

const handleString = (string) => {
  return string.slice(0, 6) + "..." + string.slice(-4);
};

const bb = {
  11155111: {
    name: "Sepolia",
    image:
      "https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png",
    blockUrl: "https://sepolia.etherscan.io/address/",
  },
  5: {
    name: "Goerli",
    image:
      "https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png",
    blockUrl: "https://goerli.etherscan.io/address/",
  },
  1: {
    name: "Ethereum",
    image:
      "https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo-thumbnail.png",
    blockUrl: "https://etherscan.io/address/",
  },
  80001: {
    name: "Mumbai",
    image:
      "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
    blockUrl: "https://mumbai.polygonscan.com/address/",
  },
  137: {
    name: "Polygon",
    image:
      "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
    blockUrl: "https://polygonscan.com/address/",
  },
  43114: {
    name: "Avalanche",
    image: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
    blockUrl: "https://snowtrace.io/address/",
  },
  59144: {
    name: "Linea",
    image:
      "https://images.ctfassets.net/6g6hg01fg28j/2XZ3qN4qlcorV9RJPxwBlO/b15c5985cc31dded61273bbec7f5f696/Infura_Linea-Hero-Image.svg",
    blockUrl: "https://lineascan.build/address/",
  },
  1313161554: {
    name: "Aurora",
    image: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    blockUrl: "https://explorer.aurora.dev/address/",
  },
  100: {
    name: "Gnosis",
    image:
      "https://w7.pngwing.com/pngs/327/711/png-transparent-gnosis-hd-logo.png",
    blockUrl: "https://gnosisscan.io/address/",
  },
  324: {
    name: "Zsync",
    image: "https://lite.zksync.io/images/logo-no-letters.svg",
    blockUrl: "https://explorer.zksync.io/address/",
  },
  42161: {
    name: "Arbitrum",
    image:
      "https://strapi.mewapi.io/uploads/large_arbitrum_shield_3f24102a28.png",
    blockUrl: "https://arbiscan.io/address/",
  },
  56: {
    name: "BNB",
    image:
      "https://seeklogo.com/images/B/binance-coin-bnb-logo-97F9D55608-seeklogo.com.png",
    blockUrl: "https://bscscan.com/address/",
  },
};

// sepolia 11155111, georli 5, ethereum 1, mumbai 80001, polygon 137, avalanche 43114 aurora 1313161554 arbitrum zsync

console.log(bb["1115511"]);

useEffect(() => {
  setUserId(userId);
}, [context.accountId]);

useEffect(() => {
  setAccounts(JSON.parse(Storage.get(`${userId}`)));
});

useEffect(() => {
  if (networkName) {
    if (!accounts) {
      setAccountDetails([
        {
          accountId,
          accountDetails: [
            { networkName, chainId, accountId, status: "Connected" },
          ],
        },
      ]);
      Storage.set(
        `${userId}`,
        JSON.stringify([
          {
            accountId,
            accountDetails: [
              { networkName, chainId, accountId, status: "Connected" },
            ],
          },
        ])
      );
    }
    if (accounts) {
      let accountExist = false;
      for (let i = 0; i < accounts.length; i++) {
        if (accountId == accounts[i].accountId) {
          accountExist = true;
          const cA = accounts[i].accountDetails;
          if (cA.length < 1) {
            cA = [{ networkName, chainId, accountId, status: "Connected" }];
            accounts[i].accountDetails = cA;
          } else {
            let chainExist = false;
            for (let j = 0; j < accounts[i].accountDetails.length; j++) {
              if (networkName == accounts[i].accountDetails[j].networkName) {
                chainExist = true;
                accounts[i].accountDetails[j].status = "Connected";
                setAccountDetails(accounts[i].accountDetails);
                Storage.set(`${userId}`, JSON.stringify(accounts));
              } else if (networkName != accounts[i].networkName) {
                accounts[i].accountDetails[j].status = "Disconnected";
                setAccountDetails(accounts[i].accountDetails);
                Storage.set(`${userId}`, JSON.stringify(accounts));
              }
            }
            if (!chainExist) {
              cA = [
                ...cA,
                { networkName, chainId, accountId, status: "Connected" },
              ];
              accounts[i].accountDetails = cA;
              setAccountDetails(accounts[i].accountDetails);
              Storage.set(`${userId}`, JSON.stringify(accounts));
            }
          }
        }
      }
      if (!accountExist) {
        setAccountDetails([
          {
            accountId,
            accountDetails: [
              { networkName, chainId, accountId, status: "Connected" },
            ],
          },
        ]);
        Storage.set(
          `${userId}`,
          JSON.stringify([
            ...accounts,
            {
              accountId,
              accountDetails: [
                { networkName, chainId, accountId, status: "Connected" },
              ],
            },
          ])
        );
      }
    }
  }
}, [networkName, chainId, accountId, accountDetails]);

useEffect(() => {
  if (Ethers.provider()) {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        setNetworkName(chainIdData.name);
      });

    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        setChainId(chainIdData.chainId);
      });

    Ethers.provider()
      .getSigner()
      .getAddress()
      .then((data) => {
        setAccountId(data);
      });
  }
}, []);

return (
  <div>
    {userId ? (
      <div>
        {" "}
        <h3>Hello {userId}</h3>
        <div>
          <p>Here are all the accounts you've Interracted with:</p>
          {accounts &&
            accounts.map((item, index) => (
              <div key={index}>
                <div>
                  <h4>#{index + 1}</h4>
                  <h6>
                    <strong>Account ID: </strong> {handleString(item.accountId)}
                  </h6>
                  <h6>
                    <strong>Status: </strong>
                    {item.accountId == accountId
                      ? "Connected"
                      : "Not Connected"}
                  </h6>
                  <h6>
                    <strong>Explorer Url: </strong>
                    {bb[`${chainId}`] ? (
                      <a href={bb[`${chainId}`] + item.accountId}>Click Here</a>
                    ) : (
                      "Not Found"
                    )}
                  </h6>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    ) : (
      <h1>Sign In your NEAR profile</h1>
    )}
    {networkName ? <div></div> : <Web3Connect />}
  </div>
);
