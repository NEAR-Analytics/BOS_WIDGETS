const wallet = {
  _format: "hh-sol-artifact-1",
  contractName: "Wallet",
  address: "0xB9aab5C40bB7eDF923547e666D1cD85ca0033542",
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
              internalType: "uint256",
              name: "approvals",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "sent",
              type: "bool",
            },
            {
              internalType: "address[]",
              name: "approvers",
              type: "address[]",
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
      inputs: [],
      name: "quorum",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
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
          internalType: "uint256",
          name: "approvals",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "sent",
          type: "bool",
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
    "0x6080604052600260005534801561001557600080fd5b50611266806100256000396000f3fe6080604052600436106100595760003560e01c80631703a018146100655780632f65142c146100905780634c12fa47146100bb5780639377d711146100e4578063cacca4a014610125578063ffabc6731461014e57610060565b3661006057005b600080fd5b34801561007157600080fd5b5061007a61018b565b6040516100879190610b81565b60405180910390f35b34801561009c57600080fd5b506100a5610191565b6040516100b29190610e22565b60405180910390f35b3480156100c757600080fd5b506100e260048036038101906100dd9190610ea1565b61030d565b005b3480156100f057600080fd5b5061010b60048036038101906101069190610ee1565b610606565b60405161011c959493929190610f2c565b60405180910390f35b34801561013157600080fd5b5061014c60048036038101906101479190610ee1565b610679565b005b34801561015a57600080fd5b5061017560048036038101906101709190610fab565b610a92565b6040516101829190610feb565b60405180910390f35b60005481565b60606002805480602002602001604051908101604052809291908181526020016000905b8282101561030457838290600052602060002090600602016040518060c001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600382015481526020016004820160009054906101000a900460ff16151515158152602001600582018054806020026020016040519081016040528092919081815260200182805480156102ec57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116102a2575b505050505081525050815260200190600101906101b5565b50505050905090565b6001339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060026040518060c0016040528060028054905081526020018481526020018373ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600015158152602001600180548060200260200160405190810160405280929190818152602001828054801561049f57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610455575b50505050508152509080600181540180825580915050600190039060005260206000209060060201600090919091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003015560808201518160040160006101000a81548160ff02191690831515021790555060a0820151816005019080519060200190610571929190610ac1565b505050600180548061058657610585611006565b5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055905560018054806105cd576105cc611006565b5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590555050565b6002818154811061061657600080fd5b90600052602060002090600602016000915090508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040160009054906101000a900460ff16905085565b806000805b6002838154811061069257610691611035565b5b90600052602060002090600602016005018054905081101561075a573373ffffffffffffffffffffffffffffffffffffffff16600284815481106106d9576106d8611035565b5b906000526020600020906006020160050182815481106106fc576106fb611035565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff160361074757600191505b808061075290611093565b91505061067e565b5060011515811515146107a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079990611138565b60405180910390fd5b60001515600284815481106107ba576107b9611035565b5b906000526020600020906006020160040160009054906101000a900460ff1615151461081b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610812906111a4565b60405180910390fd5b60001515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900460ff161515146108bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b690611210565b60405180910390fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060006101000a81548160ff0219169083151502179055506002838154811061093c5761093b611035565b5b9060005260206000209060060201600301600081548092919061095e90611093565b91905055506000546002848154811061097a57610979611035565b5b90600052602060002090600602016003015410610a8d576001600284815481106109a7576109a6611035565b5b906000526020600020906006020160040160006101000a81548160ff0219169083151502179055506000600284815481106109e5576109e4611035565b5b906000526020600020906006020160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600060028581548110610a2f57610a2e611035565b5b90600052602060002090600602016001015490508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610a89573d6000803e3d6000fd5b5050505b505050565b60036020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b828054828255906000526020600020908101928215610b3a579160200282015b82811115610b395782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610ae1565b5b509050610b479190610b4b565b5090565b5b80821115610b64576000816000905550600101610b4c565b5090565b6000819050919050565b610b7b81610b68565b82525050565b6000602082019050610b966000830184610b72565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610bd181610b68565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610c0282610bd7565b9050919050565b610c1281610bf7565b82525050565b60008115159050919050565b610c2d81610c18565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610c6a82610bd7565b9050919050565b610c7a81610c5f565b82525050565b6000610c8c8383610c71565b60208301905092915050565b6000602082019050919050565b6000610cb082610c33565b610cba8185610c3e565b9350610cc583610c4f565b8060005b83811015610cf6578151610cdd8882610c80565b9750610ce883610c98565b925050600181019050610cc9565b5085935050505092915050565b600060c083016000830151610d1b6000860182610bc8565b506020830151610d2e6020860182610bc8565b506040830151610d416040860182610c09565b506060830151610d546060860182610bc8565b506080830151610d676080860182610c24565b5060a083015184820360a0860152610d7f8282610ca5565b9150508091505092915050565b6000610d988383610d03565b905092915050565b6000602082019050919050565b6000610db882610b9c565b610dc28185610ba7565b935083602082028501610dd485610bb8565b8060005b85811015610e105784840389528151610df18582610d8c565b9450610dfc83610da0565b925060208a01995050600181019050610dd8565b50829750879550505050505092915050565b60006020820190508181036000830152610e3c8184610dad565b905092915050565b600080fd5b610e5281610b68565b8114610e5d57600080fd5b50565b600081359050610e6f81610e49565b92915050565b610e7e81610bf7565b8114610e8957600080fd5b50565b600081359050610e9b81610e75565b92915050565b60008060408385031215610eb857610eb7610e44565b5b6000610ec685828601610e60565b9250506020610ed785828601610e8c565b9150509250929050565b600060208284031215610ef757610ef6610e44565b5b6000610f0584828501610e60565b91505092915050565b610f1781610bf7565b82525050565b610f2681610c18565b82525050565b600060a082019050610f416000830188610b72565b610f4e6020830187610b72565b610f5b6040830186610f0e565b610f686060830185610b72565b610f756080830184610f1d565b9695505050505050565b610f8881610c5f565b8114610f9357600080fd5b50565b600081359050610fa581610f7f565b92915050565b60008060408385031215610fc257610fc1610e44565b5b6000610fd085828601610f96565b9250506020610fe185828601610e60565b9150509250929050565b60006020820190506110006000830184610f1d565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061109e82610b68565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036110d0576110cf611064565b5b600182019050919050565b600082825260208201905092915050565b7f6f6e6c7920617070726f76657220616c6c6f7765640000000000000000000000600082015250565b60006111226015836110db565b915061112d826110ec565b602082019050919050565b6000602082019050818103600083015261115181611115565b9050919050565b7f7472616e736665722068617320616c7265616479206265656e2073656e740000600082015250565b600061118e601e836110db565b915061119982611158565b602082019050919050565b600060208201905081810360008301526111bd81611181565b9050919050565b7f63616e6e6f7420617070726f7665207472616e73666572207477696365000000600082015250565b60006111fa601d836110db565b9150611205826111c4565b602082019050919050565b60006020820190508181036000830152611229816111ed565b905091905056fea26469706673582212209fbd58fd863995c1d811e5157c340034fada00abe30db9a837dcb9744a03b21a64736f6c63430008130033",
  deployedBytecode:
    "0x6080604052600436106100595760003560e01c80631703a018146100655780632f65142c146100905780634c12fa47146100bb5780639377d711146100e4578063cacca4a014610125578063ffabc6731461014e57610060565b3661006057005b600080fd5b34801561007157600080fd5b5061007a61018b565b6040516100879190610b81565b60405180910390f35b34801561009c57600080fd5b506100a5610191565b6040516100b29190610e22565b60405180910390f35b3480156100c757600080fd5b506100e260048036038101906100dd9190610ea1565b61030d565b005b3480156100f057600080fd5b5061010b60048036038101906101069190610ee1565b610606565b60405161011c959493929190610f2c565b60405180910390f35b34801561013157600080fd5b5061014c60048036038101906101479190610ee1565b610679565b005b34801561015a57600080fd5b5061017560048036038101906101709190610fab565b610a92565b6040516101829190610feb565b60405180910390f35b60005481565b60606002805480602002602001604051908101604052809291908181526020016000905b8282101561030457838290600052602060002090600602016040518060c001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600382015481526020016004820160009054906101000a900460ff16151515158152602001600582018054806020026020016040519081016040528092919081815260200182805480156102ec57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116102a2575b505050505081525050815260200190600101906101b5565b50505050905090565b6001339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060026040518060c0016040528060028054905081526020018481526020018373ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600015158152602001600180548060200260200160405190810160405280929190818152602001828054801561049f57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610455575b50505050508152509080600181540180825580915050600190039060005260206000209060060201600090919091909150600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506060820151816003015560808201518160040160006101000a81548160ff02191690831515021790555060a0820151816005019080519060200190610571929190610ac1565b505050600180548061058657610585611006565b5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055905560018054806105cd576105cc611006565b5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590555050565b6002818154811061061657600080fd5b90600052602060002090600602016000915090508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040160009054906101000a900460ff16905085565b806000805b6002838154811061069257610691611035565b5b90600052602060002090600602016005018054905081101561075a573373ffffffffffffffffffffffffffffffffffffffff16600284815481106106d9576106d8611035565b5b906000526020600020906006020160050182815481106106fc576106fb611035565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff160361074757600191505b808061075290611093565b91505061067e565b5060011515811515146107a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079990611138565b60405180910390fd5b60001515600284815481106107ba576107b9611035565b5b906000526020600020906006020160040160009054906101000a900460ff1615151461081b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610812906111a4565b60405180910390fd5b60001515600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060009054906101000a900460ff161515146108bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b690611210565b60405180910390fd5b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600085815260200190815260200160002060006101000a81548160ff0219169083151502179055506002838154811061093c5761093b611035565b5b9060005260206000209060060201600301600081548092919061095e90611093565b91905055506000546002848154811061097a57610979611035565b5b90600052602060002090600602016003015410610a8d576001600284815481106109a7576109a6611035565b5b906000526020600020906006020160040160006101000a81548160ff0219169083151502179055506000600284815481106109e5576109e4611035565b5b906000526020600020906006020160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600060028581548110610a2f57610a2e611035565b5b90600052602060002090600602016001015490508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610a89573d6000803e3d6000fd5b5050505b505050565b60036020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b828054828255906000526020600020908101928215610b3a579160200282015b82811115610b395782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610ae1565b5b509050610b479190610b4b565b5090565b5b80821115610b64576000816000905550600101610b4c565b5090565b6000819050919050565b610b7b81610b68565b82525050565b6000602082019050610b966000830184610b72565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610bd181610b68565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610c0282610bd7565b9050919050565b610c1281610bf7565b82525050565b60008115159050919050565b610c2d81610c18565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610c6a82610bd7565b9050919050565b610c7a81610c5f565b82525050565b6000610c8c8383610c71565b60208301905092915050565b6000602082019050919050565b6000610cb082610c33565b610cba8185610c3e565b9350610cc583610c4f565b8060005b83811015610cf6578151610cdd8882610c80565b9750610ce883610c98565b925050600181019050610cc9565b5085935050505092915050565b600060c083016000830151610d1b6000860182610bc8565b506020830151610d2e6020860182610bc8565b506040830151610d416040860182610c09565b506060830151610d546060860182610bc8565b506080830151610d676080860182610c24565b5060a083015184820360a0860152610d7f8282610ca5565b9150508091505092915050565b6000610d988383610d03565b905092915050565b6000602082019050919050565b6000610db882610b9c565b610dc28185610ba7565b935083602082028501610dd485610bb8565b8060005b85811015610e105784840389528151610df18582610d8c565b9450610dfc83610da0565b925060208a01995050600181019050610dd8565b50829750879550505050505092915050565b60006020820190508181036000830152610e3c8184610dad565b905092915050565b600080fd5b610e5281610b68565b8114610e5d57600080fd5b50565b600081359050610e6f81610e49565b92915050565b610e7e81610bf7565b8114610e8957600080fd5b50565b600081359050610e9b81610e75565b92915050565b60008060408385031215610eb857610eb7610e44565b5b6000610ec685828601610e60565b9250506020610ed785828601610e8c565b9150509250929050565b600060208284031215610ef757610ef6610e44565b5b6000610f0584828501610e60565b91505092915050565b610f1781610bf7565b82525050565b610f2681610c18565b82525050565b600060a082019050610f416000830188610b72565b610f4e6020830187610b72565b610f5b6040830186610f0e565b610f686060830185610b72565b610f756080830184610f1d565b9695505050505050565b610f8881610c5f565b8114610f9357600080fd5b50565b600081359050610fa581610f7f565b92915050565b60008060408385031215610fc257610fc1610e44565b5b6000610fd085828601610f96565b9250506020610fe185828601610e60565b9150509250929050565b60006020820190506110006000830184610f1d565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061109e82610b68565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036110d0576110cf611064565b5b600182019050919050565b600082825260208201905092915050565b7f6f6e6c7920617070726f76657220616c6c6f7765640000000000000000000000600082015250565b60006111226015836110db565b915061112d826110ec565b602082019050919050565b6000602082019050818103600083015261115181611115565b9050919050565b7f7472616e736665722068617320616c7265616479206265656e2073656e740000600082015250565b600061118e601e836110db565b915061119982611158565b602082019050919050565b600060208201905081810360008301526111bd81611181565b9050919050565b7f63616e6e6f7420617070726f7665207472616e73666572207477696365000000600082015250565b60006111fa601d836110db565b9150611205826111c4565b602082019050919050565b60006020820190508181036000830152611229816111ed565b905091905056fea26469706673582212209fbd58fd863995c1d811e5157c340034fada00abe30db9a837dcb9744a03b21a64736f6c63430008130033",
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
if (state.transfers.length === 0) {
  State.update({
    transfers: contract.getTransfers(),
  });
}
// console.log(state.transfers.length === 0, sender, contract);
// let tmp = true;
// if (tmp) {
//   console.log("jjj");
//   try {
//     contract.methods
//       .createTransfer("0.1", "0xF0DB85E02DBC2d2c9b86dFC245cd9C2CAF9a901B")
//       .send({ from: sender });
//   } catch (error) {
//     console.log(error);
//   }
//   tmp = false;
// }

// function createTransfer(amount, to) {
//   contract
//     .createTransfer(amount, to)
//     .send({ from: sender })
//     .then(() => {
//       State.update({
//         transfers: contract.getTransfers().call(),
//       });
//     });
// }

return (
  <>
    <p>{state.chainId}</p>
    <p>{state.balance}</p>
    {state.transfers.map((transfer) => (
      <p>{transfer.to}</p>
    ))}
  </>
);
