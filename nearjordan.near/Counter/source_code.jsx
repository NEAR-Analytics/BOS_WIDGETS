if (
    state.chainId === undefined &&
    ethers !== undefined &&
    Ethers.send("eth_requestAccounts", [])[0]
  ) {
    Ethers.provider()
      .getNetwork()
      .then((chainIdData) => {
        if (chainIdData?.chainId) {
          State.update({ chainId: chainIdData.chainId });
        }
      });
  }
  if (state.chainId !== undefined && state.chainId !== 80001) {
    return <p>Switch to Polygon Mumbai</p>;
  }
  
const Counter_abi=[
    {
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "number",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newNumber",
          "type": "uint256"
        }
      ],
      "name": "setNumber",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const Counter_address = "0x5277e186c1995375132bb559f3E3F94f450bC669";

const Counter_contract = new ethers.Contract(Counter_address, Counter_abi, Ethers.provider().getSigner());

Counter_contract.number().then((n) => { State.update({num: Number(n)}); });

const onIncrement = () => {
    Counter_contract.increment().then((txid) => {
      State.update({ txid: txid });
    });
  };
  
const onSet = () => {
    Counter_contract.setNumber(state.in).then((txid) => {
      State.update({ txid: txid });
    });
  };
  
return(
    <p>Account test2: {sender} {abi[0].name} Number: {state.num.toString()}
    <br/><button onClick={onIncrement}>Increment</button>
    <br/>
    <br/><input type="number" onChange={(e) => State.update({in: ethers.BigNumber.from(e.target.value)})} />
    <br/><button onClick={onSet}>Set</button>
    <br />ABI hash: {ethers.utils.sha256(ethers.utils.toUtf8Bytes(JSON.stringify(Counter_abi)))}</p>);
