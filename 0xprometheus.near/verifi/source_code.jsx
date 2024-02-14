const accountId = context.accountId;
if (!accountId) {
  return <h1>Please connect your wallet!</h1>;
}
let { src } = props;

let contract = "beta-v2.integrations.near";

console.log("qer..", src);
const [verificationItems, setVerificationItems] = useState([
  {
    title: "Verify Account is Older than 1 year",
    status: true,
    endpoint: "/account-age",
    viewFunction: "is_one_year_old"
  },
  {
    title: "Verify Account is Older than 6 months",
    status: false,
    endpoint: "/account-age",
    viewFunction: "six_month_old"
  },
  {
    title: "Verify Account is Older than 2 year",
    status: false,
    endpoint: "/account-age",
    viewFunction: "is_two_year_old"
  },
  {
    title: "Verify Account has connected to more than 5 contracts",
    status: false,
    endpoint: "/connected-contracts",
    viewFunction: "connected_to_5_contracts"
  }
]);

useEffect(() => {
  verificationItems.forEach((item, index) => {
    const result = Near.view(contract, item.viewFunction, { account_id: accountId });
    const newItems = [...verificationItems];
    newItems[index].status = result;
    setVerificationItems(newItems);
    
  });
}, [verificationItems])

const [selectedIndex, setSelectedIndex] = useState(null);

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

    & + button { /* Spacing between buttons */
      margin-top: 10px;
    }

    &:hover {
      background-color: #2a69a5;
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
  // Make API and smart contract calls based on your logic
  // Update verifications state based on results
  const base_url = "https://api.nearbadger.vercel.app";

  console.log("response here..", response);
  let action = verificationItems[index];
  asyncFetch(`${base_url}${action.endpoint}`, {
    method: "POST",
    body: JSON.stringify({ accountId }),
    mode: "no-cors",
  })
    .then((response) => {
      let res = response.body;
      Near.call(contract, "update_contract_age", {
        signature: res.signature,
        account_age: res.accountInfo,
        max_block_height: res.max_block_height,
      });
    })
    .catch((err) => console.log(err));
};

const handleSelection = (index) => {
  if (selectedIndex !== index) {
    const newItems = [...verificationItems];
    const selectedItem = newItems.splice(index, 1)[0]; // Remove selected item
    newItems.unshift(selectedItem); // Add selected item to the front
    setVerificationItems(newItems);
    setSelectedIndex(0);
  }
};
const isCardSelected = selectedIndex !== null;

return (
  <wrapper>
    <h2>Available Stamp Verifications</h2>
    {verificationItems.map((item, index) => (
      <VerificationCard
        key={index}
        selected={selectedIndex === index}
        onClick={() => handleSelection(index)}
      >
        <VerificationTitle>{item.title}</VerificationTitle>
        <VerificationStatus verified={true}></VerificationStatus>
        <button
        style={{ backgroundColor: item.status ? "green" : "" }}
        verified={true}
          disabled={isCardSelected && selectedIndex !== index}
          onClick={() => handleVerify(index)}
        >
          verify info
        </button>
      </VerificationCard>
    ))}
  </wrapper>
);
