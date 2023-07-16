const daoId = props.daoId ?? "build.sputnik-dao.near";
const proposalId = props.proposalId ?? 187;

let proposal = props.proposal && JSON.parse(JSON.stringify(props.proposal));

// if proposal is not provided and proposalId and daoId are provided then fetch proposal
if (!proposal && proposalId && daoId) {
  let new_proposal = Near.view(daoId, "get_proposal", {
    id: Number(proposalId),
  });
  if (new_proposal) {
    proposal = new_proposal;
  } else if (new_proposal === null) {
    return "Loading...";
  } else {
    return "Proposal not found, check console for details.";
  }
} else if (!proposal) {
  return "Please provide a proposal or proposalId.";
}

// --- check user permissions
function toPolicyLabel(proposalKind) {
  const kindName =
    typeof proposalKind === "string"
      ? proposalKind
      : Object.keys(proposalKind)[0];
  switch (kindName) {
    case "FunctionCall":
      return "call";
    default:
      return "";
  }
}

let roles = Near.view(daoId, "get_policy");
roles = roles === null ? [] : roles.roles;
const userRoles = [];
for (const role of roles) {
  if (role.kind === "Everyone") {
    userRoles.push(role);
    continue;
  }
  if (!role.kind.Group) continue;
  if (
    context.accountId &&
    role.kind.Group &&
    role.kind.Group.includes(context.accountId)
  ) {
    userRoles.push(role);
  }
}

const isAllowedTo = (action) => {
  let allowed = false;

  const allowedRoles = userRoles
    .filter(({ permissions }) => {
      const allowedRole =
        permissions.includes(
          `${toPolicyLabel(proposal.kind)}:${action.toString()}`
        ) ||
        permissions.includes(`${toPolicyLabel(proposal.kind)}:*`) ||
        permissions.includes(`*:${action.toString()}`) ||
        permissions.includes("*:*");
      allowed = allowed || allowedRole;
      return allowedRole;
    })
    .map((role) => role.name);

  return [allowed, allowedRoles];
};

const isAllowedToVoteYes = isAllowedTo("VoteApprove")[0];
const isAllowedToVoteNo = isAllowedTo("VoteReject")[0];
const isAllowedToVoteRemove = isAllowedTo("VoteRemove")[0];

console.log(isAllowedToVoteYes, isAllowedToVoteNo, isAllowedToVoteRemove);
// --- end of check

proposal.type =
  typeof proposal.kind === "string"
    ? proposal.kind
    : Object.keys(proposal.kind)[0];
proposal.type = proposal.type.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

proposal.status = proposal.status.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

// ==============================
// Styled Components
// ==============================

const statusColor =
  proposal.status === "Approved"
    ? "#28a930"
    : proposal.status === "In Progress"
    ? "#58a1ff"
    : proposal.status === "Failed"
    ? "#dc3545"
    : "#6c757d";

const statusBackgroundColor =
  proposal.status === "Approved"
    ? "#ecf7ef"
    : proposal.status === "Failed" || proposal.status === "Rejected"
    ? "#fdf4f4"
    : "#fff";

const Wrapper = styled.div`
  background-color: ${statusBackgroundColor};
  margin: 16px auto;
  max-width: 900px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 500px;

  p {
    line-height: 1.4;
    font-weight: 400;
    font-size: 15px;
    color: #868682;
    margin: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #1b1b18;
  }

  h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: #6c757d;
  }

  .status {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: ${statusColor};
  }
`;

const MarkdownContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 24px;
  background-color: #f8f9fa;
  color: #1b1b18;
  border-radius: 14px;
  max-height: 700px;
  overflow-y: auto;
  color: #333;
  line-height: 1.6;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  h1 {
    font-size: 2em;
    color: #111;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.3em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 1.5em;
    color: #222;
    margin-bottom: 0.75em;
  }

  h3 {
    font-size: 1.3em;
    color: #333;
    margin-bottom: 0.6em;
  }

  h4 {
    font-size: 1.2em;
    color: #444;
    margin-bottom: 0.5em;
  }

  h5 {
    font-size: 1.1em;
    color: #555;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1em;
    margin-bottom: 1em;
  }

  a {
    color: #0645ad;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

function deepSortObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    // Return non-object values as is
    return obj;
  }

  if (Array.isArray(obj)) {
    // If the input is an array, recursively sort each element
    return obj.map(deepSortObject).sort();
  }

  const sortedObject = {};
  const sortedKeys = Object.keys(obj).sort((keyA, keyB) => {
    // Compare keys in a case-insensitive manner
    return keyA.toLowerCase().localeCompare(keyB.toLowerCase());
  });

  for (const key of sortedKeys) {
    sortedObject[key] = deepSortObject(obj[key]);
  }

  return sortedObject;
}

const RenderProposalArgs = () => {
  const proposal_type =
    typeof proposal.kind === "string"
      ? proposal.kind
      : Object.keys(proposal.kind)[0];

  if (proposal_type === "FunctionCall")
    return proposal.kind.FunctionCall.actions.reduce((acc, { args }) => {
      return acc.concat(
        <div className="w-100">
          <h5>Arguments</h5>
          <Markdown
            text={
              "```json\n" +
              JSON.stringify(
                JSON.parse(Buffer.from(args, "base64").toString("utf8")),
                null,
                2
              ) +
              "\n```"
            }
          />
        </div>
      );
    });
};

const useMarkdownForDescription =
  proposal.type === "FunctionCall" ? true : false;

const proposalURL = `/#/sking.near/widget/DAO.Page?daoId=${daoId}&tab=proposal&proposalId=${proposal.id}`;
return (
  <Wrapper>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h5>#{proposal.id}</h5>
        <h3>
          <a href={proposalURL} target="_blank" rel="noreferrer">
            <i className="bi bi-link-45deg"></i>
          </a>
        </h3>
      </div>
      <div className="d-flex flex-column align-items-end">
        <h5>Status</h5>
        <span className="status">{proposal.status}</span>
      </div>
    </div>
    <div>
      <h5>PROPOSER</h5>
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId: proposal.proposer, tooltip: true }}
      />
    </div>
    <div>
      <h5>Description</h5>
      {useMarkdownForDescription ? (
        <MarkdownContainer>
          <Markdown text={proposal.description} />
        </MarkdownContainer>
      ) : (
        <p>{proposal.description}</p>
      )}
    </div>
    <div
      className="d-flex flex-wrap align-items-start"
      style={{
        rowGap: "16px",
        columnGap: "48px",
      }}
    >
      <RenderProposalArgs />
    </div>

    <div className="w-100">
      <h5>Votes</h5>
      <Widget
        src="sking.near/widget/DAO.Proposal.Vote"
        props={{
          daoId: daoId,
          proposal: proposal,
          isAllowedToVote: [
            isAllowedToVoteYes,
            isAllowedToVoteNo,
            isAllowedToVoteRemove,
          ],
        }}
      />
    </div>

    <Widget
      src="sking.near/widget/DAO.Proposal.Additional"
      props={{
        daoId: daoId,
        proposal: proposal,
      }}
    />
  </Wrapper>
);
