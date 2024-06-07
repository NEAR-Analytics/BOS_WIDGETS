/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes/common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "megha19.near";
const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT = "truedove38.near";
const REPL_RPC_URL = "https://rpc.mainnet.near.org";
const REPL_NEAR = "near";
const REPL_SOCIAL_CONTRACT = "social.near";
const RFP_IMAGE =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const RFP_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_rfps_with_latest_snapshot";

const RFP_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_rfp_snapshots";

const PROPOSAL_FEED_INDEXER_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_proposals_with_latest_snapshot";

const PROPOSAL_QUERY_NAME =
  "polyprogrammist_near_devhub_objects_s_proposal_snapshots";
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

const { linkedRfp, onChange, disabled, onDeleteRfp } = props;

const isModerator = Near.view(
  REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT,
  "is_allowed_to_write_rfps",
  {
    editor: context.accountId,
  }
);

const [selectedRFP, setSelectedRFP] = useState(null);
const [acceptingRfpsOptions, setAcceptingRfpsOption] = useState([]);
const [allRfpOptions, setAllRfpOptions] = useState([]);
const [searchRFPId, setSearchRfpId] = useState("");
const [initialStateApplied, setInitialState] = useState(false);

const queryName = RFP_FEED_INDEXER_QUERY_NAME;
const query = `query GetLatestSnapshot($offset: Int = 0, $limit: Int = 10, $where: ${queryName}_bool_exp = {}) {
  ${queryName}(
    offset: $offset
    limit: $limit
    order_by: {rfp_id: desc}
    where: $where
  ) {
    name
    rfp_id
    timeline
  }
  }`;

function separateNumberAndText(str) {
  const numberRegex = /\d+/;

  if (numberRegex.test(str)) {
    const number = str.match(numberRegex)[0];
    const text = str.replace(numberRegex, "").trim();
    return { number: parseInt(number), text };
  } else {
    return { number: null, text: str.trim() };
  }
}

const buildWhereClause = () => {
  // show only accepting submissions stage rfps
  let where = {};
  const { number, text } = separateNumberAndText(searchRFPId);

  if (number) {
    where = { rfp_id: { _eq: number }, ...where };
  }

  if (text) {
    where = { name: { _ilike: `%${text}%` }, ...where };
  }

  return where;
};

const fetchRfps = () => {
  const FETCH_LIMIT = 30;
  const variables = {
    limit: FETCH_LIMIT,
    offset: 0,
    where: buildWhereClause(),
  };
  fetchGraphQL(query, "GetLatestSnapshot", variables).then(async (result) => {
    if (result.status === 200) {
      if (result.body.data) {
        const rfpsData = result.body.data?.[queryName];
        const data = [];
        const acceptingData = [];
        for (const prop of rfpsData) {
          const timeline = parseJSON(prop.timeline);
          const label = "# " + prop.rfp_id + " : " + prop.name;
          const value = prop.rfp_id;
          if (timeline.status === RFP_TIMELINE_STATUS.ACCEPTING_SUBMISSIONS) {
            acceptingData.push({
              label,
              value,
            });
          }
          data.push({
            label,
            value,
          });
        }
        setAcceptingRfpsOption(acceptingData);
        setAllRfpOptions(data);
      }
    }
  });
};

useEffect(() => {
  fetchRfps();
}, [searchRFPId]);

useEffect(() => {
  if (JSON.stringify(linkedRfp) !== JSON.stringify(selectedRFP)) {
    if (allRfpOptions.length > 0) {
      if (typeof linkedRfp !== "object") {
        setSelectedRFP(allRfpOptions.find((i) => linkedRfp === i.value));
      } else {
        setSelectedRFP(linkedRfp);
      }
      setInitialState(true);
    }
  } else {
    setInitialState(true);
  }
}, [linkedRfp, allRfpOptions]);

useEffect(() => {
  if (
    JSON.stringify(linkedRfp) !== JSON.stringify(selectedRFP) &&
    initialStateApplied
  ) {
    onChange(selectedRFP);
  }
}, [selectedRFP, initialStateApplied]);

return (
  <>
    {selectedRFP && (
      <div className="d-flex gap-2 align-items-center">
        <a
          className="text-decoration-underline flex-1"
          href={href({
            widgetSrc: `${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.pages.app`,
            params: {
              page: "rfp",
              id: selectedRFP.value,
            },
          })}
          target="_blank"
          rel="noopener noreferrer"
        >
          {selectedRFP.label}
        </a>
        {!disabled && (
          <div
            className="cursor-pointer"
            onClick={() => {
              onDeleteRfp();
              setSelectedRFP(null);
            }}
          >
            <i className="bi bi-trash3-fill"></i>
          </div>
        )}
      </div>
    )}
    <Widget
      src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.molecule.DropDownWithSearch`}
      props={{
        disabled: disabled,
        selectedValue: selectedRFP.value,
        onChange: (v) => {
          setSelectedRFP(v);
        },
        options: isModerator ? allRfpOptions : acceptingRfpsOptions,
        showSearch: true,
        searchInputPlaceholder: "Search by Id",
        defaultLabel: "Search RFP",
        searchByValue: true,
        onSearch: (value) => {
          setSearchRfpId(value);
        },
      }}
    />
  </>
);
