// constants

const abi = [
  // signer(pos: uint256)
  {
    inputs: [
      {
        name: "pos",
        type: "uint256",
      },
    ],
    name: "signer",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    a,
  },
  // signer_count()
  {
    inputs: [],
    name: "signer_count",
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
const keystoneAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Anvil

// states

State.init({
  page: [],
  pageNum: 1,
  pageSize: 20,
});

// lifecycle hooks

/**
 * onMounted
 */
useEffect(() => {
  if (Ethers.provider()) {
    const iface = new ethers.utils.Interface(abi);
    const encodedData = iface.encodeFunctionData("signer_count", []);
    Ethers.provider()
      .call({
        data: encodedData,
        to: keystoneAddress,
      })
      .then((rawSignerCount) => {
        const countHex = iface.decodeFunctionResult(
          "signer_count",
          rawSignerCount
        );
        let signers = [];
        for (let i = 0; i < parseInt(countHex.toString()); i++) {
          const encodedData = iface.encodeFunctionData("signer", [i]);
          Ethers.provider()
            .call({
              data: encodedData,
              to: keystoneAddress,
            })
            .then((rawSigner) => {
              const signerHex = iface.decodeFunctionResult("signer", rawSigner);
              signers.push(signerHex.toString());
            })
            .catch(console.error);
        }
        State.update({ page: signers });
      })
      .catch(console.error);
  }
}, []);

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
            <li>Signers</li>
          </ul>
        </div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          {loading ? (
            <tbody className="animate-pulse space-x-4">
              {[...Array(state.pageSize).keys()].map((index) => (
                <tr key={index}>
                  {index % 3 != 0 && (
                    <td className="py-3" colSpan={index % 3}>
                      <div className="h-3 bg-slate-300 rounded"></div>
                    </td>
                  )}
                  <td className="py-3" colSpan={3 - (index % 3)}>
                    <div className="h-3 bg-slate-300 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {state.page.map((signer, index) => (
                <tr className="cursor-pointer transition duration-200 hover:scale-y-110 hover:scale-x-[0.99] hover">
                  <td className="px-0 font-bold">
                    {(state.pageNum - 1) * state.pageSize + index + 1}
                  </td>
                  <td>{signer}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          )}
          <tfoot>
            <tr>
              <th></th>
              <th>Address</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </KeystoneContent>
  </>
);
