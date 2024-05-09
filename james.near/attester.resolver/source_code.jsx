const [accountIds, setAccountIds] = useState([]);
const [inputValue, setInputValue] = useState("");

const handleAddAccountId = () => {
  if (inputValue.trim() !== "" && !accountIds.includes(inputValue)) {
    const newAccountIds = [...accountIds, inputValue];
    setAccountIds(newAccountIds);
    onResolverChange(newAccountIds); // Pass the updated list to the parent component
    setInputValue("");
  }
};

const handleRemoveAccountId = (accountId) => {
  const newAccountIds = accountIds.filter((id) => id !== accountId);
  setAccountIds(newAccountIds);
  onResolverChange(newAccountIds); // Pass the updated list to the parent component
};

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

return (
  <div className="m-1">
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter accountId"
    />
    <button className="btn btn-dark mt-2" onClick={handleAddAccountId}>
      Add
    </button>
    <hr />
    {accountIds.map((accountId) => (
      <div
        className="d-flex flex-row justify-content-between m-3"
        key={accountId}
      >
        <Widget src="james.near/widget/profile.inline" props={{ accountId }} />
        <button
          className="btn btn-light"
          onClick={() => handleRemoveAccountId(accountId)}
        >
          Remove
        </button>
      </div>
    ))}
  </div>
);
