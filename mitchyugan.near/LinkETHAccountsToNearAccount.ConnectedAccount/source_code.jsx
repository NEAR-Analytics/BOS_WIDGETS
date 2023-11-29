const ConnectedAccount = styled.div`
  width: 90%;
`;

const Header = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin: auto;
margin-bottom: 70px;

h1{
  font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: 100%; 
}
p{
  color: #7C7C7C;
margin:'Inter' sans-serif;
font-size: 19px;
font-style: normal;
font-weight: 400;
}

.welcome{

    .welcomeNearId{
      color: #000;
  
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    }
    }

    p{
      color: #7C7C7C;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    }
`;

const Chain = styled.div`
display:  flex;
align-items: center;
gap: 12px;
 border: 1px solid rgba(0, 0, 0, 0.22);
  padding: 10px 25px;
  gap: 24px;
  border-radius: 12px;
 p{
  margin: 0;
  font-size: 36px;
font-style: normal;
font-weight: 600;
 }

 .chainsimages{
  width: 30px;
 }
`;

const Accounts = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    p{
        margin-bottom: 0;
    }
`;

const Account = styled.div`
    display: flex;
    flex-direction : column;
    padding: 30.5px 24px;
    justify-content: center;
    align-items: flex-start;
    width: 777px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.22);

    .accountHeader{
        width: 92%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        align-items: center;

        h4{
            color: #000;
            font-size: 36px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }

        p{
            color: #1C1B1B;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 120%;
        }
    }

    .accountId{
        color: #1C1B1B;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 120%;
    }

    .explorerBtn{
      margin-top: 20px;
      display: flex;
      padding: 10px 28px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      background: none;
      color: #0d6efd;
      border: 1px solid #0d6efd;
    }

    .explorerBtn:hover{
      background: #0d6efd;
      color: white;
    }
`;

const Status = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .disconnectedImg{
        opacity: 20%;
    }
`;

const userId = context.accountId;

const [networkName, setNetworkName] = useState(null);
const [chainId, setChainId] = useState(null);
const [accountId, setAccountId] = useState(null);
const [accounts, setAccounts] = useState(null);
const [accountDetails, setAccountDetails] = useState(null);

// Shorten String
// const handleString = (string) => {
//   return string.slice(0, 6) + "..." + string.slice(-4);
// };

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
      "https://i.ibb.co/nPZWrs4/gnosislogo.png",
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
  <ConnectedAccount>
    <Header>
      <div class="welcome">
        <h2 class="welcomeNearId">Welcome {context.accountId}</h2>
        <p>Here's your onchain activity history</p>
      </div>
      <div>
        {bb[`${chainId}`] == undefined ? (
          <Chain>
            <img class="chainsimages" src="https://i.ibb.co/G5BdF6F/notsupportedimg.png" />
            <h4>Chain Not Supported</h4>
          </Chain>
        ) : (
          <Chain>
            <img class="chainsimages"
              src={bb[`${chainId}`].image}
              alt="matic-logo-1"
              border="0"
            />
            <h3>{bb[`${chainId}`].name}</h3>
          </Chain>
        )}
      </div>
    </Header>
    <Accounts>
      {accounts &&
        accounts.map((item, index) => (
          <div key={index}>
            <Account>
              <div class="accountHeader">
                <h4>Account{index + 1}</h4>
                <Status>
                  {item.accountId == accountId ? (
                    <img src="https://i.ibb.co/RypQPsn/Group-3.png" />
                  ) : (
                    <img
                      class="disconnectedImg"
                      src="https://i.ibb.co/RypQPsn/Group-3.png"
                    />
                  )}
                  <p>
                    {item.accountId == accountId
                      ? "Connected"
                      : "Not Connected"}
                  </p>
                </Status>
              </div>
              <h6 class="accountId">
                <strong>Account ID: </strong> {item.accountId}
              </h6>
              {bb[`${chainId}`] && (
                <a class="explorerBtn" href={bb[`${chainId}`].blockUrl + item.accountId}>
                  Explorer URL
                </a>
              )}
            </Account>
          </div>
        ))}
    </Accounts>
  </ConnectedAccount>
);

//   <h6>
//     <strong>Account ID: </strong> {handleString(item.accountId)}
//   </h6>
