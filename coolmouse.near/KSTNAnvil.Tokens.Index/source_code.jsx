// constants

const abi = [
  // token_count(pos: uint256)
  {
    inputs: [
      {
        name: "pos",
        type: "uint256",
      },
    ],
    name: "token",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // token_count()
  {
    inputs: [],
    name: "token_count",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const erc20Detailed = [
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const keystoneAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Anvil

// states

State.init({
  page: [],
});

// lifecycle hooks

/**
 * onMounted
 */
if (Ethers.provider()) {
  const iface = new ethers.utils.Interface(abi);
  const encodedData = iface.encodeFunctionData("token_count", []);
  Ethers.provider()
    .call({
      to: keystoneAddress,
      data: encodedData,
    })
    .then((rawTokenCount) => {
      const countHex = iface.decodeFunctionResult("token_count", rawTokenCount);
      let tokens = [];
      const iERC20 = new ethers.utils.Interface(erc20Detailed);
      const encodedNameCall = iERC20.encodeFunctionData("name", []);
      const encodedSymbolCall = iERC20.encodeFunctionData("symbol", []);
      const encodedDecimalsCall = iERC20.encodeFunctionData("decimals", []);
      for (let i = 0; i < parseInt(countHex.toString()); i++) {
        const encodedData = iface.encodeFunctionData("token", [i]);
        Ethers.provider()
          .call({
            to: keystoneAddress,
            data: encodedData,
          })
          .then(async (rawToken) => {
            const tokenHex = iface.decodeFunctionResult("token", rawToken);
            const to = tokenHex.toString();
            const token = {
              address: to,
              decimals: await Ethers.provider().call({
                data: encodedDecimalsCall,
                to,
              }),
              name: await Ethers.provider().call({ data: encodedNameCall, to }),
              symbol: await Ethers.provider().call({
                data: encodedSymbolCall,
                to,
              }),
            };
            tokens.push(token);
          })
          .catch(console.error);
      }
      State.update({ page: tokens });
    })
    .catch(console.error);
}

// styles

const KeystoneContent = styled.div`
  h1, h2, h3, h4, h5 {
    margin: 0;
  }
  ol, ul, menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .breadcrumbs {
    max-width: 100%;
    overflow-x: auto;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .breadcrumbs > ul, .breadcrumbs > ol {
    display: flex;
    align-items: center;
    white-space: nowrap;
    min-height: min-content;
  }
  .breadcrumbs > ul > li, .breadcrumbs > ol > li {
    display: flex;
    align-items: center;
  }
  .breadcrumbs > ul > li + ::before, .breadcrumbs > ol > li + ::before {
    content: "";
    margin-left: 0.5rem;
    margin-right: 0.75rem;
    display: block;
    height: 0.375rem;
    width: 0.375rem;
    transform: matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0);
    opacity: 0.4;
    border-top: 1px solid;
    border-right: 1px solid;
    background-color: transparent;
  }
  .breadcrumbs > ul > li > a, .breadcrumbs > ol > li > a {
    display: flex;
    cursor: pointer;
    align-items: center;
  }
  .mx-20 {
    margin-left: 5rem;
    margin-right: 5rem;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .pt-4 {
    padding-top: 1rem;
  }
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  .w-full {
    width: 100%;
  }
`;

return (
  <>
    <Widget src="coolmouse.near/widget/KSTNAnvil.Navbar" />
    <KeystoneContent>
      <div className="overflow-x-auto mx-20 pt-4">
        <div className="text-lg breadcrumbs">
          <ul>
            <li>
              <Link href={"/coolmouse.near/widget/KSTNAnvil.Index"}>
                {" "}
                Home{" "}
              </Link>
            </li>
            <li>Token Dashboard</li>
          </ul>
        </div>
        <table className="w-full text-center pt-4">
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Decimals</th>
            </tr>
          </thead>
          <tbody>
            {state.page.map((token, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{token.address}</td>
                <td>{token.name}</td>
                <td>{token.symbol}</td>
                <td>{token.decimals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </KeystoneContent>
  </>
);
