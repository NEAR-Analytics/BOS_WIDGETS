const interface = props.interface ? props.interface : null;
const blockchainInfo = props.blockchainInfo ? props.blockchainInfo : {};
const updatePage = props.updatePage
  ? props.updatePage
  : (page) => {
      console.log("no update page", page);
    };

console.log("interface:", interface);
State.init({
  domain: "",
});

const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  color: #333;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #eee;
  }
`;

const addCompany = (domain) => {
  if (!interface) {
    console.log("Error: You do not have contract interfaces!");
    return false;
  }
  const encodedData = interface.encodeFunctionData("add_Company", [domain]);
  if (!domain) {
    <Widget
      src="s-farshad-k.near/widget/WarningBoxComponent"
      props={{ children: "Amount is missing" }}
    />;
  }
  console.log(
    "going for contract:",
    blockchainInfo.contractAddress,
    blockchainInfo.contractABI,
    Ethers.provider().getSigner()
  );

  const contract = new ethers.Contract(
    blockchainInfo.contractAddress,
    blockchainInfo.contractABI,
    Ethers.provider().getSigner() // think about Ethers.provider().getSigner()
  );
  const result = contract.add_Company(encodedData);
  console.log(result);
  return result;
};

return (
  <div>
    <Widget
      src="s-farshad-k.near/widget/hero-header"
      props={{
        title: "Please tell us your website address ",
        subtitle: "We will ask you to verify the ownership of this domain! ",
      }}
    />
    Company website domain:
    <input
      value={state.domain}
      onChange={(e) => {
        State.update({ domain: e.target.value });
      }}
      placeholder="e.g. google.com"
    />
    <button
      onClick={() => {
        addCompany(state.domain)
          .then((res) => {
            console.log("request completed:", res);
          })
          .catch((err) => {
            console.log("error:", err);
          });
      }}
    >
      Add Company
    </button>
    <CancelButton
      onClick={() => {
        updatePage("home");
      }}
    >
      Go Back
    </CancelButton>
  </div>
);
