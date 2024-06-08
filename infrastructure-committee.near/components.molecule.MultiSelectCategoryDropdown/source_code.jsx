/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes/common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "infrastructure-committee.near";
const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT =
  "infrastructure-committee.near";
const REPL_RPC_URL = "https://rpc.mainnet.near.org";
const REPL_NEAR = "near";
const RFP_IMAGE =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const RFP_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_rfps_with_latest_snapshot";

const RFP_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_rfp_snapshots";

const PROPOSAL_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_proposals_with_latest_snapshot";

const PROPOSAL_QUERY_NAME =
  "polyprogrammist_near_devhub_ic_v1_proposal_snapshots";
const RFP_TIMELINE_STATUS = {
  ACCEPTING_SUBMISSIONS: "ACCEPTING_SUBMISSIONS",
  EVALUATION: "EVALUATION",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  CANCELLED: "CANCELLED",
};

const PROPOSAL_TIMELINE_STATUS = {
  DRAFT: "DRAFT",
  REVIEW: "REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELLED",
  APPROVED_CONDITIONALLY: "APPROVED_CONDITIONALLY",
  PAYMENT_PROCESSING: "PAYMENT_PROCESSING",
  FUNDED: "FUNDED",
};

const QUERYAPI_ENDPOINT = `https://near-queryapi.api.pagoda.co/v1/graphql`;

async function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(QUERYAPI_ENDPOINT, {
    method: "POST",
    headers: { "x-hasura-role": `polyprogrammist_near` },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });
}

const CANCEL_RFP_OPTIONS = {
  CANCEL_PROPOSALS: "CANCEL_PROPOSALS",
  UNLINK_PROPOSALS: "UNLINK_PROPOSALSS",
  NONE: "NONE",
};

function parseJSON(json) {
  if (typeof json === "string") {
    try {
      return JSON.parse(json);
    } catch (error) {
      return json;
    }
  } else {
    return json;
  }
}

function isNumber(value) {
  return typeof value === "number";
}

const PROPOSALS_APPROVED_STATUS_ARRAY = [
  PROPOSAL_TIMELINE_STATUS.APPROVED,
  PROPOSAL_TIMELINE_STATUS.APPROVED_CONDITIONALLY,
  PROPOSAL_TIMELINE_STATUS.PAYMENT_PROCESSING,
  PROPOSAL_TIMELINE_STATUS.FUNDED,
];

function getLinkUsingCurrentGateway(url) {
  const data = fetch(`https://httpbin.org/headers`);
  const gatewayURL = data?.body?.headers?.Origin ?? "";
  return `https://${
    gatewayURL.includes("near.org") ? "dev.near.org" : "near.social"
  }/${url}`;
}
/* END_INCLUDE: "includes/common.jsx" */

const { href } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);
href || (href = () => {});

const {
  selected,
  onChange,
  disabled,
  availableOptions,
  hideDropdown,
  linkedRfp,
} = props;

const [selectedOptions, setSelectedOptions] = useState([]);
const [isOpen, setIsOpen] = useState(false);
const [initialStateApplied, setInitialState] = useState(false);

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

useEffect(() => {
  if (JSON.stringify(selectedOptions) !== JSON.stringify(selected)) {
    if (availableOptions.length > 0) {
      if ((selected ?? []).some((i) => !i.value)) {
        setSelectedOptions(
          selected.map((i) => availableOptions.find((t) => t.value === i))
        );
      } else {
        setSelectedOptions(selected);
      }
      setInitialState(true);
    }
  } else {
    setInitialState(true);
  }
}, [selected, availableOptions]);

useEffect(() => {
  if (
    JSON.stringify(selectedOptions) !== JSON.stringify(selected) &&
    initialStateApplied
  ) {
    onChange(selectedOptions);
  }
}, [selectedOptions, initialStateApplied]);

const Container = styled.div`
  .drop-btn {
    width: 100%;
    text-align: left;
    padding-inline: 10px;
  }

  .dropdown-toggle:after {
    position: absolute;
    top: 46%;
    right: 2%;
  }

  .dropdown-menu {
    width: 100%;
  }

  .dropdown-item.active,
  .dropdown-item:active {
    background-color: #f0f0f0 !important;
    color: black;
  }

  .disabled {
    background-color: #f8f8f8 !important;
    cursor: not-allowed !important;
    border-radius: 5px;
    opacity: inherit !important;
  }

  .disabled.dropdown-toggle::after {
    display: none !important;
  }

  .custom-select {
    position: relative;
  }

  .selected {
    background-color: #f0f0f0;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .text-wrap {
    overflow: hidden;
    white-space: normal;
  }
`;

const handleOptionClick = (option) => {
  if (!selectedOptions.some((item) => item.value === option.value)) {
    setSelectedOptions([...selectedOptions, option]);
  }
  setIsOpen(false);
};

const Item = ({ option }) => {
  return <div> {option.title}</div>;
};

return (
  <>
    <div className="d-flex gap-2 align-items-center">
      {(selectedOptions ?? []).map((option) => {
        return (
          <div
            style={{
              color: "white",
              backgroundColor: `rgb(${option.color})`,
              width: "max-content",
            }}
            className="d-flex gap-2 align-items-center badge rounded-lg p-2 h6 mb-0"
          >
            {option.title}
            {!disabled && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  const updatedOptions = selectedOptions.filter(
                    (item) => item.value !== option.value
                  );
                  setSelectedOptions(updatedOptions);
                }}
              >
                <i className="bi bi-trash3-fill"></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
    {!hideDropdown && (
      <Container>
        <div
          className="custom-select w-100"
          tabIndex="0"
          onBlur={() => setIsOpen(false)}
        >
          <div
            className={
              "dropdown-toggle bg-white border rounded-2 btn drop-btn w-100 " +
              (disabled ? "disabled" : "")
            }
            onClick={!disabled && toggleDropdown}
          >
            <div className={`selected-option`}>
              {linkedRfp ? (
                <span className="text-sm d-flex gap-2 align-items-center">
                  <i class="bi bi-lock-fill"></i>
                  These categories match the chosen RFP and cannot be changed.
                  To use different categories, unlink the RFP.
                </span>
              ) : (
                <span>Select Category </span>
              )}
            </div>
          </div>

          {isOpen && (
            <div className="dropdown-menu rounded-2 dropdown-menu-end dropdown-menu-lg-start px-2 shadow show w-100">
              <div>
                {(availableOptions ?? []).map((option) => (
                  <div
                    key={option.value}
                    className={`dropdown-item cursor-pointer w-100 my-1 ${
                      (selectedOptions ?? []).find(
                        (item) => item.value === option.value
                      )
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    <Item option={option} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    )}
  </>
);
