/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/neardevhub-treasury-dashboard.git#readme
*/
/* INCLUDE: "includes//common.jsx" */
const REPL_TREASURY_CONTRACT = "treasurydevhub.near";
const REPL_TREASURY = "megha19.near";
//   "dashboard.treasury-devdao.near";
const REPL_DEVHUB = "devhub.near";
// devhub.near;
const REPL_PROPOSAL_CONTRACT =
  "713ed9aef61d14ce3dfeb3f5a55dfdf16c407280267e8de96bce0953d0e1af8c";
const REPL_NEAR = "near";
/* END_INCLUDE: "includes//common.jsx" */

const treasuryDaoID = REPL_TREASURY_CONTRACT;
const resPerPage = 50;
const [currentPage, setPage] = useState(0);

const [expandSummaryIndex, setExpandSummary] = useState({});
const proposals = Near.view(treasuryDaoID, "get_proposals", {
  from_index: currentPage === 0 ? currentPage : (currentPage - 1) * resPerPage,
  limit: resPerPage,
});

const lastProposalID = Near.view(treasuryDaoID, "get_last_proposal_id", {});
if (proposals === null || lastProposalID === null) {
  return <></>;
}

const Container = styled.div`
  font-size: 13px;
  .text-grey {
    color: #b9b9b9 !important;
  }

  .card-custom {
    border-radius: 5px;
    background-color: white;
  }

  .text-size-2 {
    font-size: 15px;
  }

  .text-dark-grey {
    color: #687076;
  }

  .text-grey-100 {
    background-color: #f5f5f5;
  }

  td {
    padding: 0.5rem;
    color: inherit;
  }

  .overflow {
    overflow: auto;
  }

  .max-w-100 {
    max-width: 100%;
  }
`;

// filter approved proposals
const historyProposals = proposals.filter((item) => {
  if (item.kind) {
    return (
      typeof item.kind === "object" &&
      Object.keys(item.kind)?.[0] === "Transfer" &&
      item.status === "Approved"
    );
  }
  return false;
});

const ProposalsComponent = () => {
  return (
    <tbody>
      {historyProposals?.map((item, index) => {
        const description = JSON.parse(item.description);
        const proposal = Near.view(REPL_PROPOSAL_CONTRACT, "get_proposal", {
          proposal_id: description.proposal_id,
        });
        const args = item.kind.Transfer;
        const isReceiverkycbVerified = true;
        return (
          <tr className={expandSummaryIndex[index] ? "text-grey-100" : ""}>
            <td>{item.id}</td>
            <td>
              <div className="d-flex flex-row gap-2">
                <div
                  className="d-flex flex-column gap-2 flex-wrap"
                  style={{ maxWidth: 320 }}
                >
                  <div
                    className={
                      "h6 bold max-w-100" +
                      (!expandSummaryIndex[index] && " text-truncate")
                    }
                  >
                    {proposal?.snapshot?.name}
                  </div>
                  {expandSummaryIndex[index] && (
                    <div className={"text-dark-grey max-w-100"}>
                      {proposal?.snapshot?.summary}
                    </div>
                  )}
                </div>
                <div className="cursor">
                  <img
                    src={
                      expandSummaryIndex[index]
                        ? "https://ipfs.near.social/ipfs/bafkreic35n4yddasdpl532oqcxjwore66jrjx2qc433hqdh5wi2ijy4ida"
                        : "https://ipfs.near.social/ipfs/bafkreiaujwid7iigy6sbkrt6zkwmafz5umocvzglndugvofcz2fpw5ur3y"
                    }
                    onClick={() =>
                      setExpandSummary((prevState) => ({
                        ...prevState,
                        [index]: !prevState[index],
                      }))
                    }
                    height={20}
                  />
                </div>
              </div>
            </td>
            <td className="text-truncate bold" style={{ maxWidth: 150 }}>
              {treasuryDaoID}
            </td>
            <td className="text-truncate bold" style={{ maxWidth: 150 }}>
              {args.receiver_id}
            </td>
            <td>
              {isReceiverkycbVerified ? (
                <img
                  src="https://ipfs.near.social/ipfs/bafkreidqveupkcc7e3rko2e67lztsqrfnjzw3ceoajyglqeomvv7xznusm"
                  height={30}
                />
              ) : (
                "Need icon"
              )}
            </td>
            <td className="bold">
              <Widget
                src={`${REPL_TREASURY}/widget/neardevhub-trustees.components.molecule.TokenAmount`}
                props={{
                  amountWithoutDecimals: args.amount,
                  address: args.token_id,
                }}
              />
            </td>
            <td>{Object.keys(item.votes ?? {}).join(", ")}</td>
            <td className="text-truncate" style={{ maxWidth: 150 }}>
              {item.txnHash}
            </td>
            <td className="text-grey">
              {/* <Widget
                src={`${REPL_NEAR}/widget/TimeAgo`}
                props={{
                  blockTimestamp: item.approvedAt,
                }}
              /> */}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
return (
  <Container className="d-flex flex-column gap-4">
    <div className="d-flex flex-row gap-2 align-items-center justify-content-between">
      <div className="h5 bold mb-0">{props.title ?? "Payment History"}</div>
      {/* currently we don't support any filter */}
      {/* <div>
        <button className="btn btn-outline-primary d-flex gap-2 align-items-center justify-content-center p-2 px-3">
          <i class="bi bi-sliders"></i> <div>Filters</div>
        </button>
      </div> */}
    </div>
    <div className="card-custom overflow p-3">
      <table className="table">
        <thead>
          <tr className="text-grey">
            <td>ID</td>
            <td>PROPOSAL</td>
            <td>FROM</td>
            <td>TO</td>
            <td>KYC/B VERIFIED</td>
            <td>AMOUNT</td>
            <td>APPROVER</td>
            <td>TRANSACTION</td>
            <td>WHEN</td>
          </tr>
        </thead>
        <ProposalsComponent />
      </table>
    </div>
    <div className="d-flex align-items-center justify-content-center">
      <Widget
        src={`${REPL_TREASURY}/widget/neardevhub-trustees.components.molecule.Pagination`}
        props={{
          totalPages: Math.round(lastProposalID / resPerPage),
          onPageClick: (v) => setPage(v),
        }}
      />
    </div>
  </Container>
);
