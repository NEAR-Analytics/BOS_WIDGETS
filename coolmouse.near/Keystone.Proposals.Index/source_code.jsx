// constants

const ActionEnum = {
  1: "Add new signer",
  2: "Deploy new ERC-20 token",
  4: "Remove signer",
  8: "Set new ERC-20 token template",
  16: "Delist token",
  32: "List new token",
  64: "Approve token spending",
  128: "Burn token balance",
  256: "Burn token balance from",
  512: "Mint token to",
  1024: "Renounce token ownership",
  2048: "Withdraw token",
  4096: "Tranfer token from",
  8192: "Transfer token ownership",
};
const abi = [
  // proposal(pos: uint256)
  {
    inputs: [
      {
        name: "pos",
        type: "uint256",
      },
    ],
    name: "proposal",
    outputs: [
      {
        components: [
          {
            name: "id",
            type: "bytes32",
          },
          {
            name: "action",
            type: "uint256",
          },
          {
            name: "amount",
            type: "uint256",
          },
          {
            name: "created_at",
            type: "uint256",
          },
          {
            name: "data",
            type: "bytes",
          },
          {
            name: "targets",
            type: "address[]",
          },
          {
            name: "approvals",
            type: "address[]",
          },
          {
            name: "expires",
            type: "uint256",
          },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // proposal_count()
  {
    inputs: [],
    name: "proposal_count",
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
const keystoneAddress = "0xe8E8ED169DcAFD00C3C8Cc26Df4E273b14060d4e"; // Bitkub Chain Mainnet

// states

State.init({
  page: [],
  pageNum: 1,
  pageSize: 20,
});

// lifecycle hooks

if (Ethers.provider()) {
  const iface = new ethers.utils.Interface(abi);
  const encodedData = iface.encodeFunctionData("proposal_count", []);
  Ethers.provider()
    .call({
      to: keystoneAddress,
      data: encodedData,
    })
    .then((rawProposalCount) => {
      const proposalCountHex = iface.decodeFunctionResult(
        "proposal_count",
        rawProposalCount
      );
      let proposals = [];
      for (let i = 0; i < parseInt(proposalCountHex.toString()); i++) {
        const encodedData = iface.encodeFunctionData("proposal", [i]);
        Ethers.provider()
          .call({
            to: keystoneAddress,
            data: encodedData,
          })
          .then((rawProposal) => {
            const proposalHexArr = iface.decodeFunctionResult(
              "proposal",
              rawProposal
            );
            const proposal = {
              id: proposalHexArr[0].id.toString(),
              action: proposalHexArr[0].action.toNumber(),
              amount: proposalHexArr[0].amount.toNumber(),
              created_at: proposalHexArr[0].created_at.toNumber(),
              data: proposalHexArr[0].data.toString(),
              targets: proposalHexArr[0].targets,
              approvals: proposalHexArr[0].approvals,
              expires: proposalHexArr[0].expires.toNumber(),
            };
            proposal["actionEnum"] = ActionEnum[proposal.action];
            proposal["proposedBy"] = proposal["approvals"][0];
            proposal["threshold"] = 1;
            proposals.push(proposal);
          })
          .catch(console.error);
      }
      State.update({ page: proposals });
    })
    .catch(console.error);
}

// funcs
let fasttrack = (proposal) => {};

const KeystoneContent = styled.div`
  h1, h2, h3, h4, h5 {
    margin: 0;
  }
  ol, ul, menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .absolute {
    position: absolute;
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
  .btn {
    display: inline-flex;
    height: 3rem;
    min-height: 3rem;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border-color: transparent;
    border-color: currentColor;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    font-size: 0.875rem;
    line-height: 1em;
    gap: 0.5rem;
    font-weight: 600;
    text-decoration-line: none;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    border-width: 1px;
    animation: button-pop 0.25s ease-out;
    transition-property: color, background-color, border-color, opacity, box-shadow, transform;
    color: currentColor;
    box-shadow: 0 0 #0000, 0 0 #0000), 0;
    outline-color: currentColor;
    background-color: currentColor;
  }
  .btn-outline {
    border-color: currentColor;
    background-color: transparent;
    box-shadow: 0 0 #0000, 0 0 #0000), 0;
  }
  .btn-primary {
    color: oklch(0.6569 0.196 275.75);
    border-color: oklch(0.6569 0.196 275.75);
  }
  .btn-secondary {
    color: oklch(0.748 0.26 342.55);
    border-color: oklch(0.748 0.26 342.55);
  }
  .glass, .glass.btn-active {
    border: none;
    backdrop-filter: blur(40px);
    background-color: transparent;
    background-image: linear-gradient(135deg, rgb(255 255 255 / 30%) 0%, rgb(0 0 0 / 0%) 100%), linear-gradient( 100deg, rgb(255 255 255 / 10%) 25%, rgb(0 0 0 / 0%) 25% );
    box-shadow: 0 0 0 1px rgb(255 255 255 / 10%) inset, 0 0 0 2px rgb(0 0 0 / 5%);
    text-shadow: 0 1px rgb(0 0 0 / 5%);
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
  }
  .card-body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 2rem;
    gap: 0.5rem;
  }
  .card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
  }
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .fill-primary {
    fill: oklch(0.6569 0.196 275.75);
  }
  .fill-secondary {
    fill: oklch(0.748 0.26 342.55);
  }
  .flex {
    display: flex;
  }
  .float-right {
    float: right;
  }
  .form-control {
    display: flex;
    flex-direction: column;
  }
  .grid {
    display: grid;
  }
  .grid-flow-row-dense {
    grid-auto-flow: row dense;
  }
  .h-full {
    height: 100%;
  }
  .input {
    flex-shrink: 1;
    appearance: none;
    height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    border-radius: 0.5rem;
    border-width: 1px;
    border-color: transparent;
    background-color: oklch(0.7206 0.191 231.6) / 0.2;
  }
  .input-info {
    border-color: oklch(0.7206 0.191 231.6);
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .label {
    display: flex;
    user-select: none;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .label-text {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: currentColor;
  }
  .left-12 {
    left: 3rem;
  }
  .left-51 {
    left: 11.75rem;
  }
  .left-100 {
    left: 20rem;
  }
  .max-w-7xl {
    max-width: 80rem;
  }
  .ml-4 {
    margin-left: 1rem;
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
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
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .py-20 {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }
  .transition {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  .w-5 {
    width: 1.25rem;
  }
  .w-96 {
    width: 24rem;
  }
  .w-full {
    width: 100%;
  }
`;

return (
  <>
    <Widget src="coolmouse.near/widget/Keystone.Navbar" />
    <KeystoneContent>
      <div className="overflow-x-auto mx-20 pt-4">
        <div className="text-lg breadcrumbs">
          <ul>
            <li>
              <Link href={"/coolmouse.near/widget/Keystone.Index"}> Home </Link>
            </li>
            <li>Proposals</li>
          </ul>
        </div>
        <div className="py-5">
          <Link
            className="btn btn-primary btn-outline group mr-5"
            href={"/coolmouse.near/widget/Keystone.Proposals.Keystone"}
          >
            <svg
              className="fill-primary h-full w-5 mr-2"
              height="24px"
              version="1.1"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="
                  M22.3,16.7
                  l1.4-1.4
                  L20,11.6l-5.8,5.8
                  c-0.5-0.3-1.1-0.4-1.7-0.4
                  C10.6,17,9,18.6,9,20.5
                  s1.6,3.5,3.5,3.5
                  s3.5-1.6,3.5-3.5
                  c0-0.6-0.2-1.2-0.4-1.7
                  l1.9-1.9
                  l2.3,2.3
                  l1.4-1.4
                  l-2.3-2.3
                  l1.1-1.1
                  L22.3,16.7z
                  M12.5,22
                  c-0.8,0-1.5-0.7-1.5-1.5
                  s0.7-1.5,1.5-1.5
                  s1.5,0.7,1.5,1.5
                  S13.3,22,12.5,22z
                "
              />
              <path
                d="
                  M2,19
                  c0-3.9,3.1-7,7-7
                  c2,0,3.9,0.9,5.3,2.4
                  l1.5-1.3
                  c-0.9-1-1.9-1.8-3.1-2.3
                  C14.1,9.7,15,7.9,15,6
                  c0-3.3-2.7-6-6-6
                  S3,2.7,3,6
                  c0,1.9,0.9,3.7,2.4,4.8
                  C2.2,12.2,0,15.3,0,19
                  v5
                  h8
                  v-2
                  H2
                  V19z
                  M5,6
                  c0-2.2,1.8-4,4-4
                  s4,1.8,4,4
                  s-1.8,4-4,4
                  S5,8.2,5,6z
                "
              />
            </svg>
            New keystone action
          </Link>
          <Link
            className="btn btn-secondary btn-outline group"
            href={"/coolmouse.near/widget/Keystone.Proposals.Token"}
          >
            <svg
              className="fill-secondary h-full w-5 mr-2"
              clipRule="evenodd"
              fillRule="evenodd"
              height="16px"
              version="1.1"
              viewBox="0 0 16 16"
              width="16px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="
                  M5.791 3.318
                  L3.316 5.793
                  a1 1 0 000 1.414
                  l2.475 2.475
                  a1 1 0 001.415 0
                  L9.68 7.207
                  a1 1 0 000-1.414
                  L7.206 3.318
                  a1 1 0 00-1.415 0z
                  m.707 4.95
                  L4.731 6.5
                  l1.767-1.768
                  L8.266 6.5 6.498 8.268z
                "
              />
              <path
                d="
                  M0 6.5
                  a6.5 6.5 0 0112.346-2.845 6.5 6.5 0 11-8.691 8.691
                  A6.5 6.5 0 010 6.5z
                  m6.5-5
                  a5 5 0 100 10 5 5 0 000-10z
                  m6.5 5
                  c0-.201-.01-.4-.027-.597
                  a5 5 0 11-7.07 7.07
                  A6.5 6.5 0 0013 6.5z
                "
              />
            </svg>
            New token action
          </Link>
        </div>
        <table className="table table-compact w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Proposed by</th>
              <th>Action</th>
              <th>Approved</th>
              <th>Created at</th>
              <th>Expired at</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.page.map((proposal, index) => (
              <tr
                className="cursor-pointer transition duration-200 hover:scale-y-110 hover:scale-x-[0.99] hover"
                key={index}
              >
                <td className="px-0 font-bold">
                  {(pageNum - 1) * pageSize + index + 1}
                </td>
                <td></td>
                <td>{proposal.proposedBy.slice(0, 10)}...</td>
                <td>{proposal.actionEnum}</td>
                <td>
                  {(proposal.approvals.length / proposal.threshold) * 100.0}%
                </td>
                <td>{proposal.createdAt}</td>
                <td>{proposal.expires}</td>
                <td>
                  {!!proposal.token ? (
                    <span>
                      {shiftDecimals(proposal.amount, proposal.token.decimals)}
                    </span>
                  ) : (
                    <span>{proposal.amount}</span>
                  )}
                </td>
                <td style={{ pointerEvents: "none" }}>
                  {proposal.approvals.length >= proposal.threshold && (
                    <button
                      style={{ pointerEvents: "auto" }}
                      onClick={() => fasttrack(proposal)}
                      className="btn btn-info btn-outline btn-xs"
                      v-if=""
                    >
                      Execute
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th>Proposed by</th>
              <th>Action</th>
              <th>Approved</th>
              <th>Created at</th>
              <th>Expired at</th>
              <th>Value</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </KeystoneContent>
  </>
);
