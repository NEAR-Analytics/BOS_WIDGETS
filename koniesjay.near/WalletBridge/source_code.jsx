const [userId, setUserId] = useState(context.accountId);

const [networkName, setNetworkName] = useState(null);
const [chainId, setChainId] = useState(null);
const [accountId, setAccountId] = useState(null);
const [accounts, setAccounts] = useState(null);
const [accountDetails, setAccountDetails] = useState(null);

const handleString = (string) => {
  return string.slice(0, 6) + "..." + string.slice(-4);
};

const blockUrl = [
  {
    chainId: 11155111,
    blockUrl: "https://sepolia.etherscan.io/address/",
  },
  {
    chainId: 5,
    blockUrl: "https://goerli.etherscan.io/address/",
  },
  {
    chainId: 1,
    blockUrl: "https://etherscan.io/address/",
  },
  {
    chainId: 80001,
    blockUrl: "https://mumbai.polygonscan.com/address/",
  },
  {
    chainId: 137,
    blockUrl: "https://polygonscan.com/address/",
  },
  {
    chainId: 43114,
    blockUrl: "https://snowtrace.io/address/",
  },
];

const bb = {
  11155111: "https://sepolia.etherscan.io/address/",
  5: "https://goerli.etherscan.io/address/",
  1: "https://etherscan.io/address/",
  80001: "https://mumbai.polygonscan.com/address/",
  137: "https://polygonscan.com/address/",
  43114: "https://snowtrace.io/address/",
};

// sepolia 11155111, georli 5, ethereum 1, mumbai 80001, polygon 137, avalanche 43114

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
