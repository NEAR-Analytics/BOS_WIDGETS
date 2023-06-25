const interface = props.interface ? props.interface : null;
const blockchainInfo = props.blockchainInfo ? props.blockchainInfo : {};

console.log("interface:", interface);
State.init({
  domain: "",
});

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
        addCompany(state.domain);
      }}
    >
      Add Company
    </button>
  </div>
);
