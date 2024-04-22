const accountId = context.accountId;
if (!accountId) {
  return <h1>Please connect your wallet!</h1>;
}
let { src } = props;

const contract = "checks.integrations.near";
const NADABOT_CONTRACT = "v1.nadabot.near";

const [verificationItems, setVerificationItems] = useState([
  {
    title: "Verify Account is Older than 1 year",
    status: false,
    endpoint: "/account-age",
    viewMethod: "is_one_year_old",
    changeMethod: "update_contract_age",
  },
  {
    title: "Verify Account is Older than 6 months",
    status: false,
    endpoint: "/account-age",
    viewMethod: "six_month_old",
    changeMethod: "update_contract_age",
  },
  {
    title: "Verify Account is Older than 2 year",
    status: false,
    endpoint: "/account-age",
    viewMethod: "is_two_year_old",
    changeMethod: "update_contract_age",
  },
  {
    title: "Verify Account has connected to more than 5 contracts",
    status: false,
    endpoint: "/connected-contracts",
    viewMethod: "connected_to_5_contracts",
    changeMethod: "update_access_key",
  },
]);

const [selectedIndex, setSelectedIndex] = useState(src || null);

const wrapper = styled.div`
  font-family: sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f2f2f2;
`;

// VerificationCard
const VerificationCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  ${({ selected }) =>
    selected &&
    `
      background-color: blue;
    `}
  button {
    display: block;
    background-color: #337ab7;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease-in-out;
  }

    & + button { /* Spacing between buttons */
      margin-top: 10px;
    }

    &:hover {
      ${({ selected }) =>
        !selected &&
        `
      background-color: #2a69a5;
    `}
      position: relative;
      transform: scale(0.95);
    }
`;

// VerificationTitle
const VerificationTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

// VerificationStatus
const VerificationStatus = styled.div`
  font-size: 14px;
  color: red;
`;

// VerificationButton
const VerificationButton = styled.button`
  background-color: #337ab7;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2a69a5;
  }
`;

const [verifications, setVerifications] = useState({
  accountAge: null, // null, true, or false
  contracts: null,
  balance: null,
  lensHandle: null,
});

const handleVerify = async (index) => {
  const base_url = "https://api.nearbadger.vercel.app/sign";

  let action = verificationItems[index];
  asyncFetch(`${base_url}${action.endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accountId }),
  })
    .then((response) => {
      let res = response.body.signature;
      const verificationTx = {
        contractName: contract,
        methodName: action.changeMethod,
        args: {
          signature: res.signature,
          account_info: res.accountInfo,
          max_block_height: res.expirationBlockHeight,
        },
        gas: "300000000000000",
        deposti: "10000000000000000000000",
      };
      const nadabotVerifyTx = {
        contractName: NADABOT_CONTRACT,
        methodName: "add_stamp",
        args: {
          provider_id: `checks.integrations.near:${action.viewMethod}`,
        },
        gas: 300000000000000,
        deposit: 0.02 * Math.pow(10, 24),
      };
      Near.call([verificationTx, nadabotVerifyTx]);
    })
    .catch((err) => console.log(err));
};
const handleSelection = (index, fromQ) => {
  if (selectedIndex !== index || fromQ) {
    const newItems = [...verificationItems];
    const selectedItem = newItems.splice(index, 1)[0]; // Remove selected item
    console.log("opium", selectedItem);
    newItems.unshift(selectedItem); // Add selected item to the front
    setVerificationItems(newItems);
    console.log("updated?", newItems, verificationItems);
    setSelectedIndex(0);
  }
};
const isCardSelected = selectedIndex !== null;

useEffect(() => {
  Promise.all(
    verificationItems.map((item, index) =>
      Near.asyncView(contract, item.viewMethod, {
        account_id: accountId,
      }).then((result) => {
        const newItems = [...verificationItems];
        newItems[index].status = result;
        return newItems[index];
      })
    )
  ).then((newItemsArray) => {
    const mergedItems = newItemsArray.flat();
    setVerificationItems(mergedItems);
    if (src !== null) {
      handleSelection(src, true);
    }
  });
}, [src]);

return (
  <wrapper>
    <h2>Available Stamp Verifications</h2>
    {verificationItems.map((item, index) => (
      <VerificationCard
        key={index}
        selected={selectedIndex === index}
        onClick={() => setSelectedIndex(index)}
      >
        <VerificationTitle
          style={{ color: selectedIndex === index ? "#fff" : "" }}
        >
          {item.title}
        </VerificationTitle>
        <VerificationStatus verified={true}></VerificationStatus>
        <button
          style={{ backgroundColor: item.status ? "green" : "" }}
          verified={true}
          disabled={item.status || (isCardSelected && selectedIndex !== index)}
          onClick={() => handleVerify(index)}
        >
          {item.status ? "Verified!" : "verify info"}
        </button>
      </VerificationCard>
    ))}
  </wrapper>
);
