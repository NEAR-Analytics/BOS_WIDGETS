const storageBalances = props.storageBalances || {};
const expandedContracts = props.expandedContracts || {};

const ContractCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const ContractHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const ContractDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #F5F7F8;
  background-color: #272829;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #31363f;
  }
`;

const toggleContract = (contractId) => {
  Near.call("test.near", "toggle_contract", { contract_id: contractId });
};

const storageWithdraw = (contractId) => {
  Near.call(contractId, "storage_withdraw", {}, "30000000000000", "1");
};

const storageUnregister = (contractId) => {
  Near.call(contractId, "storage_unregister", {}, "30000000000000", "1");
};

return Object.entries(storageBalances)
  .filter(
    ([_, storageBalanceOf]) =>
      storageBalanceOf != null &&
      !!storageBalanceOf.total &&
      !!storageBalanceOf.available
  )
  .map(([contractId, storageBalanceOf]) => {
    const total = Big(storageBalanceOf.total)
      .div(Big(10).pow(24))
      .round(3)
      .toString();
    const available = Big(storageBalanceOf.available)
      .div(Big(10).pow(24))
      .round(3)
      .toString();
    return (
      <ContractCard key={contractId}>
        <ContractHeader onClick={() => toggleContract(contractId)}>
          <label style={{ color: "#272829" }}>📝 {contractId}</label>
          <span>{expandedContracts[contractId] ? "▲" : "▼"}</span>
        </ContractHeader>
        {expandedContracts[contractId] && (
          <ContractDetails>
            <div style={{ color: "#272829" }}>已抵押: {total}</div>
            <div style={{ color: "#272829" }}>可用: {available}</div>
            <ButtonGroup>
              {storageBalanceOf.available &&
                Number(storageBalanceOf.available) > 0 && (
                  <Button onClick={() => storageWithdraw(contractId)}>
                    釋放 {available} NEAR
                  </Button>
                )}
              <Button onClick={() => storageUnregister(contractId)}>
                為 {total} NEAR 註銷帳戶
              </Button>
            </ButtonGroup>
          </ContractDetails>
        )}
      </ContractCard>
    );
  });
