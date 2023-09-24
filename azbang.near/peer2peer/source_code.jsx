const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";

const Button = styled.button`
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #255ff4;
  padding: 16px;
  width: 250px;
  border-radius: 32px;
  border: none;
  text-align: center;
  font-weight: bold;
  transition: 0.2s background-color;
  height: 64px;
  &:hover {
    color: #fff;
    text-decoration: none;
    background-color: rgb(107 148 255);
  }
`;

const CONTRACT = "0x79b78D8CCCAccCA749D6dEa6BF5457793D2db34c";
const tokenAddress = "0x8c9e6c40d3402480ACE624730524fACC5482798c";
const abi = ["function approve(address _spender, uint _value)"];

const signer = Ethers.provider().getSigner();
const contract = new ethers.Contract(tokenAddress, abi, signer);

const handleCreate = () => {
  contract.approve(CONTRACT, 10).then((tx) => {
    tx.wait().then(console.log);
  });
};

return <Button onClick={() => handleCreate()}>Create order</Button>;
