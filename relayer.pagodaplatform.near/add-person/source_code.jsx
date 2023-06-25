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
  employeeID: "",
  loading: false,
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

const addEmployee = (employeeID, domain) => {
  State.update({
    loading: true,
  });
  if (!interface) {
    console.log("Error: You do not have contract interfaces!");
    return false;
  }
  if (!domain) {
    <Widget
      src="s-farshad-k.near/widget/WarningBoxComponent"
      props={{ children: "Domain is missing" }}
    />;
  }
  if (!employeeID) {
    <Widget
      src="s-farshad-k.near/widget/WarningBoxComponent"
      props={{ children: "EmployeeID is missing" }}
    />;
  }

  // const domainBytes = Buffer.from(domain, "utf8");
  // const employeeIDBytes = Buffer.from(domain, "utf8");

  const encodedData = interface.encodeFunctionData("add_Employee", [
    employeeID,
    domain,
  ]);
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
  const result = contract.add_Employee(encodedData);
  console.log(result);
  return result;
};

if (state.loading) {
  return <Widget src="s-farshad-k.near/widget/Loading" props={{}} />;
}
return (
  <div>
    <Widget
      src="s-farshad-k.near/widget/hero-header"
      props={{
        title: "Please tell us your website address ",
        subtitle: "We will ask you to verify the ownership of this domain! ",
      }}
    />
    Add an employee to your company:
    <input
      value={state.domain}
      onChange={(e) => {
        State.update({ domain: e.target.value });
      }}
      placeholder="e.g. google.com"
    />
    <input
      value={state.employeeID}
      onChange={(e) => {
        State.update({ employeeID: e.target.value });
      }}
      placeholder="Public key of the employee e.g. 0x12Ec9880959e52b43381ed8458b7fce05AF4E74A"
    />
    <button
      onClick={() => {
        addEmployee(state.domain)
          .then((res) => {
            console.log("request completed:", res);
            State.update({ loading: false });
          })
          .catch((err) => {
            console.log("error:", err);
            State.update({ loading: false });
          });
      }}
    >
      Add Employee
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
