/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes//common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "infrastructure-committee.near";
const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT = "truedove38.near";
const REPL_RPC_URL = "https://rpc.mainnet.near.org";
const REPL_NEAR = "near";
const RFPImage =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const TIMELINE_STATUS = {
  ACCEPTING_SUBMISSIONS: "ACCEPTING_SUBMISSIONS",
  EVALUATION: "EVALUATION",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  CANCELLED: "CANCELLED",
};
/* END_INCLUDE: "includes//common.jsx" */
const timelineStatus = props.timelineStatus;
const size = props.size ?? "md";

const getClassNameByStatus = () => {
  switch (timelineStatus) {
    case TIMELINE_STATUS.CANCELLED:
      return "grey";
    case TIMELINE_STATUS.PROPOSAL_SELECTED:
      return "green";
    case TIMELINE_STATUS.EVALUATION:
      return "orange";
    default:
      return "black";
  }
};

const Container = styled.div`
  font-size: ${({ size }) => {
    switch (size) {
      case "sm":
        return "10px";
      case "lg":
        return "14px";
      default:
        return "12px";
    }
  }};

  min-width: fit-content;

  .orange-tag {
    border: 1px solid #ff7a00 !important;
    color: #ff7a00 !important;
  }

  .black-tag {
    border: 1px solid #000 !important;
    color: #000 !important;
  }

  .grey-tag {
    border: 1px solid #979797 !important;
    color: #979797 !important;
  }

  .green-tag {
    border: 1px solid #04a46e !important;
    color: #04a46e !important;
  }

  .fw-bold {
    font-weight: 600 !important;
  }
`;

return (
  <Container size={size}>
    <div className={getClassNameByStatus() + "-tag fw-bold rounded-2 p-1 px-2"}>
      {(timelineStatus ?? "").replace("_", " ")}
    </div>
  </Container>
);
