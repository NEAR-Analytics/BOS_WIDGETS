const { proposal, council, ftList } = props;

const formatCountdown = (seconds) => {
  const d = Math.floor(seconds / (24 * 3600));
  const h = Math.floor((seconds - d * 24 * 3600) / 3600);
  const m = Math.floor((seconds - d * 24 * 3600 - h * 3600) / 60);
  const s = Math.floor(seconds - d * 24 * 3600 - h * 3600 - m * 60);

  let res = "";

  if (d > 0) {
    res += `${d}d `;
  }

  if (h > 0) {
    res += `${h}h `;
  }

  if (m > 0) {
    res += `${m}m `;
  }

  if (!res && s > 0 && s < 60) {
    res = "less than a minute";
  }

  return res;
};

const ProposalCard = styled.div`
  position: relative;
  height: 350px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  overflow: auto;
  border-radius: 4px;
  padding: 20px;
  background: white;
  svg {
    height: 20px;
    &.approved-icon {
      fill:#13a36e;
    }
    &.rejected-icon {
      fill: #ff5e03;
    }
    &.not-voted-yet-icon {
      fill:  rgb(140, 140, 140)
    }
  }
`;

const VoteList = styled.div`
  display:flex;
  flex-direction:column;
`;

const VoteLine = styled.div`
    display: flex;
    justify-content: space-between;
`;

const thumbUpSvg = (
  <svg
    class="approved-icon"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ThumbUpIcon"
  >
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>
  </svg>
);
const thumbDownSvg = (
  <svg
    class="rejected-icon"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ThumbDownIcon"
  >
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>
  </svg>
);
const notVotedYetSvg = (
  <svg
    class="not-voted-yet-icon"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ThumbsUpDownIcon"
  >
    <path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path>
  </svg>
);

const votes = proposal.proposal.votes;

const getVoteSvg = (vote) => {
  switch (vote) {
    case "Reject":
    case "Reject=0x1":
      return thumbDownSvg;
    case "Approve":
    case "Approve=0x0":
      return thumbUpSvg;
  }
};

const parseDescription = (description) => {
  const parsedDesc = description
    .replaceAll("$$$$", " ")
    .replaceAll("\n\n", " ");
  const parts = parsedDesc.split(" ");

  const parsedParts = parts.map((p) => {
    const url = p.match(/https:\/\/\S*/g);
    if (url) {
      return (
        <a href={p} target="_blank">
          {p}
        </a>
      );
    }
    return p + " ";
  });

  return parsedParts;
};

const voteList =
  council && votes
    ? council.map((member) => {
        const hasVoted = Object.keys(votes)
          .map((v) => v)
          .includes(member);

        return (
          <VoteLine>
            <a
              href={`https://explorer.near.org/accounts/${member}`}
              target="_blank"
            >
              {member}
            </a>
            <span>
              {hasVoted ? getVoteSvg(votes[member]) : notVotedYetSvg}{" "}
            </span>
          </VoteLine>
        );
      })
    : "";

const Status = styled.div`
  font-weight: 700;
  color: ${(props) => {
    switch (props.status) {
      case "Rejected":
        return "#ff5e03";
      case "Approved":
        return "#13a36e";
      case "Expired":
        return "grey";
      case "InProgress":
        return "#ff8743";
    }
  }}
`;

const ProposalId = styled.div`
  color:#8c8c8c;
  font-size: 11px;
`;
const Label = styled.span`
  color:#8c8c8c;
  font-size: 11px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const Type = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const PropInfos = styled.div`
  float: right;
  padding: 10px;
  background: rgba(68, 152, 224, 0.1);
  border-radius: 4px;
`;

const VoteInfos = styled.div`
  float: right;
  padding: 10px;
  background: rgba(68, 152, 224, 0.1);
  border-radius: 4px;
`;

const Description = styled.div`
  overflow:auto;
  max-height: 150px;
`;

let TimeLeft = styled.span`
    color: rgba(68, 152, 224);
    margin-left: 10px;
`;

const getTimeLeft = (proposal) => {
  if (proposal.status === "InProgress") {
    return `${formatCountdown(
      (Date.now() - new Date(proposal.submission_time)) / 1000
    )}  left`;
  }
  return "";
};

return (
  <>
    {proposal && council ? (
      <ProposalCard>
        <Header>
          <Status status={proposal.status}>
            {proposal.status} <TimeLeft>{getTimeLeft(proposal)}</TimeLeft>
          </Status>
          <ProposalId>Proposal Id {proposal.proposal_id}</ProposalId>
        </Header>
        <Type>{proposal.proposal_type}</Type>
        <PropInfos>
          <InfoWrapper>
            <Label>Proposer</Label>
            <a
              href={`https://explorer.near.org/accounts/${proposal.proposal.proposer}`}
              target="_blank"
            >
              {proposal.proposal.proposer}
            </a>
          </InfoWrapper>
          <InfoWrapper>
            <Label>Submission Time</Label>
            <span>{new Date(proposal.submission_time).toLocaleString()}</span>
          </InfoWrapper>
          <InfoWrapper>
            <Label>
              Votes ({Object.keys(votes).length}/{council.length})
            </Label>
            <VoteList>{voteList}</VoteList>
          </InfoWrapper>
        </PropInfos>
        <InfoWrapper>
          <Label>Dao id</Label>
          <a
            href={`https://explorer.near.org/accounts/${proposal.dao_id}`}
            target="_blank"
          >
            {proposal.dao_id}
          </a>
        </InfoWrapper>
        <InfoWrapper>
          <Label>Description</Label>
          <Description>
            {parseDescription(proposal.proposal.description)}
          </Description>
        </InfoWrapper>
        {proposal.proposal_type === "Transfer" ? (
          <Widget
            src={`${widgetProvider}/widget/table_ft_formatter`}
            props={{
              ftList,
              ft: proposal.proposal.kind.amount,
              amount: proposal.proposal.kind.token_id,
            }}
          />
        ) : (
          ""
        )}
      </ProposalCard>
    ) : (
      ""
    )}
  </>
);
