const userId = context.accountId;

const [networkName, setNetworkName] = useState(null);
const [chainId, setChainId] = useState(null);
const [accountId, setAccountId] = useState(null);
const [accounts, setAccounts] = useState(null);
const [accountDetails, setAccountDetails] = useState(null);

const handleString = (string) => {
  return string.slice(0, 6) + "..." + string.slice(-4);
};

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
                {item.accountId == accountId ? "Connected" : "Not Connected"}
              </h6>
            </div>
            <hr />
          </div>
        ))}
    </div>
    {networkName ? <div></div> : <Web3Connect />}
  </div>
);
