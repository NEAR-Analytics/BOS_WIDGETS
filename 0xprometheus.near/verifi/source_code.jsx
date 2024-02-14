let { src } = props;

console.log("qer..", src);
const [verificationItems, setVerificationItems] = useState([
  {
    title: "Verify Account is Older than 1 year",
    status: verifications.accountAge,
  },
  {
    title: "Verify Account is Older than 6 months",
    status: verifications.accountAge,
  },
  {
    title: "Verify Account is Older than 2 year",
    status: verifications.accountAge,
  },
  {
    title: "Verify Account has connected to more than 5 contracts",
    status: verifications.accountAge,
  },
  { title: "Verify Number of Contracts", status: verifications.contracts },
  { title: "Verify Balance", status: verifications.balance },
  { title: "Verify Lens Handle", status: verifications.lensHandle },
]);
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
      background-color: blue; /* or your desired highlight color */
    `}
  button {
    display: block; /* Show the button inside the card */
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
  color: ${(props) => (props.verified ? "#008000" : "#f00")};
`;

// VerificationTooltip
const VerificationTooltip = styled.span`
  display: none;
  position: absolute;
  top: 0;
  left: 50%;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 12px;

  ${VerificationCard}:hover & {
    display: block;
  }
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

const handleVerify = async () => {
  // Make API and smart contract calls based on your logic
  // Update verifications state based on results
};

const handleSelection = (index) => {
  if (selectedIndex !== index) {
    console.log("handler speaker.. ", selectedIndex, index, verificationItems);

    const newItems = [...verificationItems];
    console.log("loner..", newItems);
    const selectedItem = newItems.splice(index, 1)[0]; // Remove selected item
    console.log("splixed..", selectedItem, newItems);
    newItems.unshift(selectedItem); // Add selected item to the front
    console.log("get fina....", newItems);
    setVerificationItems(newItems);
    setSelectedIndex(0);
  }
};
const isCardSelected = selectedIndex !== null;

return (
  <wrapper>
    <h2>Account Verification</h2>
    {verificationItems.map((item, index) => (
      <VerificationCard
        key={index}
        selected={selectedIndex === index}
        onClick={() => handleSelection(index)}
      >
        <VerificationTitle>{item.title}</VerificationTitle>
        <VerificationStatus verified={item.status}></VerificationStatus>
        <VerificationTooltip>
          Account must be at least 1 year old.
        </VerificationTooltip>
        <button disabled={isCardSelected && selectedIndex !== index}>
          verify info
        </button>
      </VerificationCard>
    ))}
  </wrapper>
);
