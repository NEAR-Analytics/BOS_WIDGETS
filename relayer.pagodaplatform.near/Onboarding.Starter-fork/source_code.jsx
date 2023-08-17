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
    "0x608060405234801561001057600080fd5b50610f49806100206000396000f3fe60806040526004361061004e5760003560e01c80632f65142c1461005a5780634c12fa47146100855780639377d711146100ae578063cacca4a0146100ef578063ffabc6731461011857610055565b3661005557005b600080fd5b34801561006657600080fd5b5061006f610155565b60405161007c9190610abd565b60405180910390f35b34801561009157600080fd5b506100ac60048036038101906100a79190610b3c565b61028f565b005b3480156100ba57600080fd5b506100d560048036038101906100d09190610b7c565b6103dd565b6040516100e6959493929190610be5565b60405180910390f35b3480156100fb57600080fd5b5061011660048036038101906101119190610b7c565b610470565b005b34801561012457600080fd5b5061013f600480360381019061013a9190610c64565b6107f8565b60405161014c9190610ca4565b60405180910390f35b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561028657838290600052602060002090600402016040518060a001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff161515151581526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505081526020019060010190610179565b50505050905090565b60006040518060a0016040528060008054905081526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050600190039060005260206000209060040201600090919091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160146101000a81548160ff02191690831515021790555060808201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b600081815481106103ed57600080fd5b90600052602060002090600402016000915090508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160149054906101000a900460ff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905085565b8060003373ffffffffffffffffffffffffffffffffffffffff166000838154811061049e5761049d610cbf565b5b906000526020600020906004020160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036104f057600190505b6001151581151514610537576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052e90610d4b565b60405180910390fd5b600015156000848154811061054f5761054e610cbf565b5b906000526020600020906004020160020160149054906101000a900460ff161515146105b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a790610db7565b60405180910390fd5b60001515600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900460ff16151514610654576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064b90610e23565b60405180910390fd5b6106926040518060400160405280600481526020017f7465737400000000000000000000000000000000000000000000000000000000815250610827565b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600084815481106107105761070f610cbf565b5b906000526020600020906004020160020160146101000a81548160ff021916908315150217905550600080848154811061074d5761074c610cbf565b5b906000526020600020906004020160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600080858154811061079657610795610cbf565b5b90600052602060002090600402016001015490508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156107f0573d6000803e3d6000fd5b505050505050565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b6108bd8160405160240161083b9190610ec2565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506108c0565b50565b6108d7816108cf6108da6108fb565b63ffffffff16565b50565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b610906819050919050565b61090e610ee4565b565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000819050919050565b61094f8161093c565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061098082610955565b9050919050565b61099081610975565b82525050565b60008115159050919050565b6109ab81610996565b82525050565b60006109bc82610955565b9050919050565b6109cc816109b1565b82525050565b60a0820160008201516109e86000850182610946565b5060208201516109fb6020850182610946565b506040820151610a0e6040850182610987565b506060820151610a2160608501826109a2565b506080820151610a3460808501826109c3565b50505050565b6000610a4683836109d2565b60a08301905092915050565b6000602082019050919050565b6000610a6a82610910565b610a74818561091b565b9350610a7f8361092c565b8060005b83811015610ab0578151610a978882610a3a565b9750610aa283610a52565b925050600181019050610a83565b5085935050505092915050565b60006020820190508181036000830152610ad78184610a5f565b905092915050565b600080fd5b610aed8161093c565b8114610af857600080fd5b50565b600081359050610b0a81610ae4565b92915050565b610b1981610975565b8114610b2457600080fd5b50565b600081359050610b3681610b10565b92915050565b60008060408385031215610b5357610b52610adf565b5b6000610b6185828601610afb565b9250506020610b7285828601610b27565b9150509250929050565b600060208284031215610b9257610b91610adf565b5b6000610ba084828501610afb565b91505092915050565b610bb28161093c565b82525050565b610bc181610975565b82525050565b610bd081610996565b82525050565b610bdf816109b1565b82525050565b600060a082019050610bfa6000830188610ba9565b610c076020830187610ba9565b610c146040830186610bb8565b610c216060830185610bc7565b610c2e6080830184610bd6565b9695505050505050565b610c41816109b1565b8114610c4c57600080fd5b50565b600081359050610c5e81610c38565b92915050565b60008060408385031215610c7b57610c7a610adf565b5b6000610c8985828601610c4f565b9250506020610c9a85828601610afb565b9150509250929050565b6000602082019050610cb96000830184610bc7565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f6f6e6c7920617070726f76657220616c6c6f7765640000000000000000000000600082015250565b6000610d35601583610cee565b9150610d4082610cff565b602082019050919050565b60006020820190508181036000830152610d6481610d28565b9050919050565b7f7472616e736665722068617320616c7265616479206265656e2073656e740000600082015250565b6000610da1601e83610cee565b9150610dac82610d6b565b602082019050919050565b60006020820190508181036000830152610dd081610d94565b9050919050565b7f63616e6e6f7420617070726f7665207472616e73666572207477696365000000600082015250565b6000610e0d601d83610cee565b9150610e1882610dd7565b602082019050919050565b60006020820190508181036000830152610e3c81610e00565b9050919050565b600081519050919050565b60005b83811015610e6c578082015181840152602081019050610e51565b60008484015250505050565b6000601f19601f8301169050919050565b6000610e9482610e43565b610e9e8185610cee565b9350610eae818560208601610e4e565b610eb781610e78565b840191505092915050565b60006020820190508181036000830152610edc8184610e89565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfea264697066735822122076cf76f6842f796d611688aa2f122ea9925c3feedc4d64a3dc445cec90cbfde064736f6c63430008130033",
  deployedBytecode:
    "0x60806040526004361061004e5760003560e01c80632f65142c1461005a5780634c12fa47146100855780639377d711146100ae578063cacca4a0146100ef578063ffabc6731461011857610055565b3661005557005b600080fd5b34801561006657600080fd5b5061006f610155565b60405161007c9190610abd565b60405180910390f35b34801561009157600080fd5b506100ac60048036038101906100a79190610b3c565b61028f565b005b3480156100ba57600080fd5b506100d560048036038101906100d09190610b7c565b6103dd565b6040516100e6959493929190610be5565b60405180910390f35b3480156100fb57600080fd5b5061011660048036038101906101119190610b7c565b610470565b005b34801561012457600080fd5b5061013f600480360381019061013a9190610c64565b6107f8565b60405161014c9190610ca4565b60405180910390f35b60606000805480602002602001604051908101604052809291908181526020016000905b8282101561028657838290600052602060002090600402016040518060a001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff161515151581526020016003820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152505081526020019060010190610179565b50505050905090565b60006040518060a0016040528060008054905081526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020018373ffffffffffffffffffffffffffffffffffffffff168152509080600181540180825580915050600190039060005260206000209060040201600090919091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160146101000a81548160ff02191690831515021790555060808201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b600081815481106103ed57600080fd5b90600052602060002090600402016000915090508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160149054906101000a900460ff16908060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905085565b8060003373ffffffffffffffffffffffffffffffffffffffff166000838154811061049e5761049d610cbf565b5b906000526020600020906004020160030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036104f057600190505b6001151581151514610537576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052e90610d4b565b60405180910390fd5b600015156000848154811061054f5761054e610cbf565b5b906000526020600020906004020160020160149054906101000a900460ff161515146105b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a790610db7565b60405180910390fd5b60001515600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900460ff16151514610654576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064b90610e23565b60405180910390fd5b6106926040518060400160405280600481526020017f7465737400000000000000000000000000000000000000000000000000000000815250610827565b60018060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600084815481106107105761070f610cbf565b5b906000526020600020906004020160020160146101000a81548160ff021916908315150217905550600080848154811061074d5761074c610cbf565b5b906000526020600020906004020160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600080858154811061079657610795610cbf565b5b90600052602060002090600402016001015490508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156107f0573d6000803e3d6000fd5b505050505050565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b6108bd8160405160240161083b9190610ec2565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506108c0565b50565b6108d7816108cf6108da6108fb565b63ffffffff16565b50565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b610906819050919050565b61090e610ee4565b565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000819050919050565b61094f8161093c565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061098082610955565b9050919050565b61099081610975565b82525050565b60008115159050919050565b6109ab81610996565b82525050565b60006109bc82610955565b9050919050565b6109cc816109b1565b82525050565b60a0820160008201516109e86000850182610946565b5060208201516109fb6020850182610946565b506040820151610a0e6040850182610987565b506060820151610a2160608501826109a2565b506080820151610a3460808501826109c3565b50505050565b6000610a4683836109d2565b60a08301905092915050565b6000602082019050919050565b6000610a6a82610910565b610a74818561091b565b9350610a7f8361092c565b8060005b83811015610ab0578151610a978882610a3a565b9750610aa283610a52565b925050600181019050610a83565b5085935050505092915050565b60006020820190508181036000830152610ad78184610a5f565b905092915050565b600080fd5b610aed8161093c565b8114610af857600080fd5b50565b600081359050610b0a81610ae4565b92915050565b610b1981610975565b8114610b2457600080fd5b50565b600081359050610b3681610b10565b92915050565b60008060408385031215610b5357610b52610adf565b5b6000610b6185828601610afb565b9250506020610b7285828601610b27565b9150509250929050565b600060208284031215610b9257610b91610adf565b5b6000610ba084828501610afb565b91505092915050565b610bb28161093c565b82525050565b610bc181610975565b82525050565b610bd081610996565b82525050565b610bdf816109b1565b82525050565b600060a082019050610bfa6000830188610ba9565b610c076020830187610ba9565b610c146040830186610bb8565b610c216060830185610bc7565b610c2e6080830184610bd6565b9695505050505050565b610c41816109b1565b8114610c4c57600080fd5b50565b600081359050610c5e81610c38565b92915050565b60008060408385031215610c7b57610c7a610adf565b5b6000610c8985828601610c4f565b9250506020610c9a85828601610afb565b9150509250929050565b6000602082019050610cb96000830184610bc7565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082825260208201905092915050565b7f6f6e6c7920617070726f76657220616c6c6f7765640000000000000000000000600082015250565b6000610d35601583610cee565b9150610d4082610cff565b602082019050919050565b60006020820190508181036000830152610d6481610d28565b9050919050565b7f7472616e736665722068617320616c7265616479206265656e2073656e740000600082015250565b6000610da1601e83610cee565b9150610dac82610d6b565b602082019050919050565b60006020820190508181036000830152610dd081610d94565b9050919050565b7f63616e6e6f7420617070726f7665207472616e73666572207477696365000000600082015250565b6000610e0d601d83610cee565b9150610e1882610dd7565b602082019050919050565b60006020820190508181036000830152610e3c81610e00565b9050919050565b600081519050919050565b60005b83811015610e6c578082015181840152602081019050610e51565b60008484015250505050565b6000601f19601f8301169050919050565b6000610e9482610e43565b610e9e8185610cee565b9350610eae818560208601610e4e565b610eb781610e78565b840191505092915050565b60006020820190508181036000830152610edc8184610e89565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfea264697066735822122076cf76f6842f796d611688aa2f122ea9925c3feedc4d64a3dc445cec90cbfde064736f6c63430008130033",
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
  console.log(id);
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
        <button onClick={() => approveTransfer(parseInt(transfer.id))}>
          Approve
        </button>
      </div>
    ))}
    <button onClick={createTransfer}>Create</button>
  </>
);
