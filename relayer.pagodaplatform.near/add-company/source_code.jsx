const interface = props.interface ? props.interface : null;

console.log("interface:", interface);

const addCompany = (domain) => {
  if (!interface) {
    console.log("You do not have contract interfaces!");
    return false;
  }
  const encodedData = iface.encodeFunctionData("domain", [domain]);
  if (!domain) {
    <Widget
      src="s-farshad-k.near/widget/WarningBoxComponent"
      props={{ children: "Amount is missing" }}
    />;
  }
  const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    Ethers.provider() // think about Ethers.provider().getSigner()
  );
  const result = contract.addCompany(encodedData);
  console.log(result);
  return result;
};

return <div>This is add company page!</div>;
