/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes//common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "megha19.near";
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
const setSelected = props.onStateChange ?? (() => {});

const timelineStatusArray = Object.entries(TIMELINE_STATUS).map(
  ([key, value]) => ({
    label: key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
    value,
  })
);
return (
  <div>
    <Widget
      src={`${REPL_DEVHUB}/widget/devhub.components.molecule.DropDown`}
      props={{
        options: timelineStatusArray,
        label: "Timeline",
        onUpdate: (v) => {
          setSelected(v);
        },
      }}
    />
  </div>
);
