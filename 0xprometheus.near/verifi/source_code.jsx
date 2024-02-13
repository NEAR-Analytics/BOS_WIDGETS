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
  left: 100%;
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

return (
  <wrapper>
    <h2>Account Verification</h2>
    <VerificationCard>
      <VerificationTitle>Verify Account Age</VerificationTitle>
      <VerificationStatus verified={verifications.accountAge}>
        {/* Update this based on your logic */}
      </VerificationStatus>
      <VerificationTooltip>
        Account must be at least 1 year old.
      </VerificationTooltip>
      <button onClick={handleVerifyContracts}>Verify Contracts</button>
    </VerificationCard>
    <VerificationCard>
      <VerificationTitle>Verify Number of Contracts</VerificationTitle>
      <VerificationStatus verified={verifications.contracts}>
        {/* Update this based on your logic */}
      </VerificationStatus>
      <VerificationTooltip>You have currently X contracts.</VerificationTooltip>
      <button onClick={handleVerifyContracts}>Verify Contracts</button>
    </VerificationCard>
    <VerificationCard>
      <VerificationTitle>Verify Balance</VerificationTitle>
      <VerificationStatus verified={verifications.balance}>
        {/* Update this based on your logic */}
      </VerificationStatus>
      <VerificationTooltip>Your current balance is X NEAR.</VerificationTooltip>
      <button onClick={handleVerifyContracts}>Verify Contracts</button>
    </VerificationCard>
    <VerificationCard>
      <VerificationTitle>Verify Lens Handle</VerificationTitle>
      <VerificationStatus verified={verifications.lensHandle}>
        {/* Update this based on your logic */}
      </VerificationStatus>
      <VerificationTooltip>Your Lens handle is X.</VerificationTooltip>
      <button onClick={handleVerifyContracts}>Verify Contracts</button>
    </VerificationCard>
  </wrapper>
);
