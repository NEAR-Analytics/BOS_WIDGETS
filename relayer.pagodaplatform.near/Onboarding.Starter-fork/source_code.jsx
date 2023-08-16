const wallet = {
  address: "0x9788C9cE39c936936DD9708DC7E0aBA5bb6Da47c",
  _format: "hh-sol-artifact-1",
  contractName: "Wallet",
  sourceName: "contracts/Wallet.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "approvals",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "approveTransfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "to",
          type: "address",
        },
      ],
      name: "createTransfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getTransfers",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              internalType: "address payable",
              name: "to",
              type: "address",
            },
            {
              internalType: "bool",
              name: "sent",
              type: "bool",
            },
            {
              internalType: "address",
              name: "approver",
              type: "address",
            },
          ],
          internalType: "struct Wallet.Transfer[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "transfers",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "to",
          type: "address",
        },
        {
          internalType: "bool",
          name: "sent",
          type: "bool",
        },
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
  bytecode:
    "0x608060405234801561001057600080fd5b50610d52806100206000396000f3fe60806040526004361061004e5760003560e01c80632f65142c1461005a5780634c12fa47146100855780639377d711146100ae578063cacca4a0146100ef578063ffabc6731461011857610055565b3661005557005b600080fd5b34801561006657600080fd5b5061006f610155565b60405161007c9190610996565b60405180910390f35b34801561009157600080fd5b506100ac60048036038101906100a79190610a15565b61028f565b005b3480156100ba57600080fd5b506100d560048036038101906100d09190610a55565b6103dd565b6040516100e6959493929190610abe565b60405180910390f35b3480156100fb57600080fd5b5061011660048036038101906101119190610a55565b610470565b005b34801561012457600080fd5b5061013f600480360381019061013a9190610b3d565b6107ba565b60405161014c9190610b7d565b60405180910390f35b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561028657838290600052602060002090600402016040518060a001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff161515151581526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505081526020019060010190610179565b50505050905090565b60006040518060a0016040528060008054905081526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050600190039060005260206000209060040201600090919091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160146101000a81548160ff02191690831515021790555060808201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b600081815481106103ed57600080fd5b90600052602060002090600402016000915090508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160149054906101000a900460ff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905085565b8060003373ffffffffffffffffffffffffffffffffffffffff166000838154811061049e5761049d610b98565b5b906000526020600020906004020160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036104f057600190505b6001151581151514610537576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052e90610c24565b60405180910390fd5b600015156000848154811061054f5761054e610b98565b5b906000526020600020906004020160020160149054906101000a900460ff161515146105b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a790610c90565b60405180910390fd5b60001515600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900460ff16151514610654576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064b90610cfc565b60405180910390fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600084815481106106d2576106d1610b98565b5b906000526020600020906004020160020160146101000a81548160ff021916908315150217905550600080848154811061070f5761070e610b98565b5b906000526020600020906004020160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600080858154811061075857610757610b98565b5b90600052602060002090600402016001015490508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156107b2573d6000803e3d6000fd5b505050505050565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000819050919050565b61082881610815565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006108598261082e565b9050919050565b6108698161084e565b82525050565b60008115159050919050565b6108848161086f565b82525050565b60006108958261082e565b9050919050565b6108a58161088a565b82525050565b60a0820160008201516108c1600085018261081f565b5060208201516108d4602085018261081f565b5060408201516108e76040850182610860565b5060608201516108fa606085018261087b565b50608082015161090d608085018261089c565b50505050565b600061091f83836108ab565b60a08301905092915050565b6000602082019050919050565b6000610943826107e9565b61094d81856107f4565b935061095883610805565b8060005b838110156109895781516109708882610913565b975061097b8361092b565b92505060018101905061095c565b5085935050505092915050565b600060208201905081810360008301526109b08184610938565b905092915050565b600080fd5b6109c681610815565b81146109d157600080fd5b50565b6000813590506109e3816109bd565b92915050565b6109f28161084e565b81146109fd57600080fd5b50565b600081359050610a0f816109e9565b92915050565b60008060408385031215610a2c57610a2b6109b8565b5b6000610a3a858286016109d4565b9250506020610a4b85828601610a00565b9150509250929050565b600060208284031215610a6b57610a6a6109b8565b5b6000610a79848285016109d4565b91505092915050565b610a8b81610815565b82525050565b610a9a8161084e565b82525050565b610aa98161086f565b82525050565b610ab88161088a565b82525050565b600060a082019050610ad36000830188610a82565b610ae06020830187610a82565b610aed6040830186610a91565b610afa6060830185610aa0565b610b076080830184610aaf565b9695505050505050565b610b1a8161088a565b8114610b2557600080fd5b50565b600081359050610b3781610b11565b92915050565b60008060408385031215610b5457610b536109b8565b5b6000610b6285828601610b28565b9250506020610b73858286016109d4565b9150509250929050565b6000602082019050610b926000830184610aa0565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f6f6e6c7920617070726f76657220616c6c6f7765640000000000000000000000600082015250565b6000610c0e601583610bc7565b9150610c1982610bd8565b602082019050919050565b60006020820190508181036000830152610c3d81610c01565b9050919050565b7f7472616e736665722068617320616c7265616479206265656e2073656e740000600082015250565b6000610c7a601e83610bc7565b9150610c8582610c44565b602082019050919050565b60006020820190508181036000830152610ca981610c6d565b9050919050565b7f63616e6e6f7420617070726f7665207472616e73666572207477696365000000600082015250565b6000610ce6601d83610bc7565b9150610cf182610cb0565b602082019050919050565b60006020820190508181036000830152610d1581610cd9565b905091905056fea26469706673582212209663c24810505438635f262b22d63f5cfeeb79a35712d1d89db3d18f3c296daf64736f6c63430008130033",
  deployedBytecode:
    "0x60806040526004361061004e5760003560e01c80632f65142c1461005a5780634c12fa47146100855780639377d711146100ae578063cacca4a0146100ef578063ffabc6731461011857610055565b3661005557005b600080fd5b34801561006657600080fd5b5061006f610155565b60405161007c9190610996565b60405180910390f35b34801561009157600080fd5b506100ac60048036038101906100a79190610a15565b61028f565b005b3480156100ba57600080fd5b506100d560048036038101906100d09190610a55565b6103dd565b6040516100e6959493929190610abe565b60405180910390f35b3480156100fb57600080fd5b5061011660048036038101906101119190610a55565b610470565b005b34801561012457600080fd5b5061013f600480360381019061013a9190610b3d565b6107ba565b60405161014c9190610b7d565b60405180910390f35b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561028657838290600052602060002090600402016040518060a001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff161515151581526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505081526020019060010190610179565b50505050905090565b60006040518060a0016040528060008054905081526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050600190039060005260206000209060040201600090919091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160146101000a81548160ff02191690831515021790555060808201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b600081815481106103ed57600080fd5b90600052602060002090600402016000915090508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160149054906101000a900460ff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905085565b8060003373ffffffffffffffffffffffffffffffffffffffff166000838154811061049e5761049d610b98565b5b906000526020600020906004020160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036104f057600190505b6001151581151514610537576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052e90610c24565b60405180910390fd5b600015156000848154811061054f5761054e610b98565b5b906000526020600020906004020160020160149054906101000a900460ff161515146105b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a790610c90565b60405180910390fd5b60001515600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900460ff16151514610654576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064b90610cfc565b60405180910390fd5b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600084815481106106d2576106d1610b98565b5b906000526020600020906004020160020160146101000a81548160ff021916908315150217905550600080848154811061070f5761070e610b98565b5b906000526020600020906004020160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600080858154811061075857610757610b98565b5b90600052602060002090600402016001015490508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156107b2573d6000803e3d6000fd5b505050505050565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000819050919050565b61082881610815565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006108598261082e565b9050919050565b6108698161084e565b82525050565b60008115159050919050565b6108848161086f565b82525050565b60006108958261082e565b9050919050565b6108a58161088a565b82525050565b60a0820160008201516108c1600085018261081f565b5060208201516108d4602085018261081f565b5060408201516108e76040850182610860565b5060608201516108fa606085018261087b565b50608082015161090d608085018261089c565b50505050565b600061091f83836108ab565b60a08301905092915050565b6000602082019050919050565b6000610943826107e9565b61094d81856107f4565b935061095883610805565b8060005b838110156109895781516109708882610913565b975061097b8361092b565b92505060018101905061095c565b5085935050505092915050565b600060208201905081810360008301526109b08184610938565b905092915050565b600080fd5b6109c681610815565b81146109d157600080fd5b50565b6000813590506109e3816109bd565b92915050565b6109f28161084e565b81146109fd57600080fd5b50565b600081359050610a0f816109e9565b92915050565b60008060408385031215610a2c57610a2b6109b8565b5b6000610a3a858286016109d4565b9250506020610a4b85828601610a00565b9150509250929050565b600060208284031215610a6b57610a6a6109b8565b5b6000610a79848285016109d4565b91505092915050565b610a8b81610815565b82525050565b610a9a8161084e565b82525050565b610aa98161086f565b82525050565b610ab88161088a565b82525050565b600060a082019050610ad36000830188610a82565b610ae06020830187610a82565b610aed6040830186610a91565b610afa6060830185610aa0565b610b076080830184610aaf565b9695505050505050565b610b1a8161088a565b8114610b2557600080fd5b50565b600081359050610b3781610b11565b92915050565b60008060408385031215610b5457610b536109b8565b5b6000610b6285828601610b28565b9250506020610b73858286016109d4565b9150509250929050565b6000602082019050610b926000830184610aa0565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f6f6e6c7920617070726f76657220616c6c6f7765640000000000000000000000600082015250565b6000610c0e601583610bc7565b9150610c1982610bd8565b602082019050919050565b60006020820190508181036000830152610c3d81610c01565b9050919050565b7f7472616e736665722068617320616c7265616479206265656e2073656e740000600082015250565b6000610c7a601e83610bc7565b9150610c8582610c44565b602082019050919050565b60006020820190508181036000830152610ca981610c6d565b9050919050565b7f63616e6e6f7420617070726f7665207472616e73666572207477696365000000600082015250565b6000610ce6601d83610bc7565b9150610cf182610cb0565b602082019050919050565b60006020820190508181036000830152610d1581610cd9565b905091905056fea26469706673582212209663c24810505438635f262b22d63f5cfeeb79a35712d1d89db3d18f3c296daf64736f6c63430008130033",
  linkReferences: {},
  deployedLinkReferences: {},
};

State.init({
  chainId: undefined,
  balance: 0,
  transfers: [],
});
const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;
if (state.chainId === undefined && ethers !== undefined && sender) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
  Ethers.provider()
    .getBalance(sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
  console.log("address: ", wallet.address);
  console.log(sender);
}
if (state.chainId !== undefined && state.chainId !== 11155111) {
  return <p>Switch to Ethereum Sepolia</p>;
}
const iface = new ethers.utils.Interface(wallet.abi);
const contract = new ethers.Contract(
  wallet.address,
  wallet.abi,
  Ethers.provider().getSigner()
);
const createTransfer = () => {
  if (contract) {
    console.log("hhh");
    contract
      .createTransfer(1000, "0xF0DB85E02DBC2d2c9b86dFC245cd9C2CAF9a901B")
      .then(() => {
        console.log("hello");
      })
      .catch((err) => console.log(err));
  }
};
const getTransfers = () => {
  if (state.transfers.length === 0) {
    console.log("hhh");
    contract
      .getTransfers()
      .then((transfers) => {
        const tmp = [...state.transfers];
        transfers.map((transfer) => {
          console.log(transfer);

          tmp.push({
            id: Big(transfer[0]).toFixed(0),
            amount: Big(transfer[1]).div(Big(10).pow(18)).toFixed(20),
            to: transfer[2],
            sent: transfer[3],
            approver: transfer[4],
          });
        });
        State.update({ transfers: tmp });
        console.log(transfers);
      })
      .then(() => {
        console.log(state.transfers);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const approveTransfer = (id) => {
  contract.approveTransfer(id).send({ from: sender });
};
return (
  <>
    <p>{state.chainId}</p>
    <p>{state.balance}</p>
    <button onClick={getTransfers}>Get</button>
    {state.transfers.map((transfer) => (
      <div>
        <p>{transfer.to}</p>
        <button onClick={() => approveTransfer(transfer.id)}>Approve</button>
      </div>
    ))}
    <button onClick={createTransfer}>Create</button>
  </>
);
