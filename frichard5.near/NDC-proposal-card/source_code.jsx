const { proposal, council, ftList, widgetProvider, voteExpired, parent } = props;
const userAccountId = context.accountId;

const item = {
  type: "sputnik_proposal_comment",
  path: `${proposal.proposal_id}/proposal/main`,
  proposal_id: proposal.proposal_id,
};
const comments = Social.index("comment", item);
const totalComments = comments?.length || 0;

const defaultHeight = "370px";

State.init({
  showClipboardTooltip: false,
  canVote: council.includes(userAccountId),
  displayComments: false,
  height: defaultHeight,
});
let args;
if(proposal.proposal.kind.actions && proposal.proposal.kind.actions[0].args) {
  args = proposal.proposal.kind.actions[0].args;
}

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
  height: ${state.height};
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  border-radius: 4px;
  padding: 20px;
  overflow: auto;
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

const clipboardSvg = (
  <svg
    class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium copy-icon css-vubbuv"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ContentCopyIcon"
    aria-label="Copied to clipboard!"
  >
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
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
      const parsedUrl = p.replace(/[()]/g, '')
      return (
        <a href={parsedUrl} target="_blank">
          {parsedUrl}
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

let ClipboardButton = styled.button`
  position: absolute;
  width: 190px;
  right: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 4px;
`;

let CommentsButton = styled.button`
  margin-top: 40px;
  display: block;
  margin-left: 0px !important;
  border-radius: 4px;
`;

const getTimeLeft = (proposal) => {
  if (proposal.status === "InProgress") {
    const timeLeft =
      Math.floor(voteExpired / Math.pow(10, 9)) -
      (Date.now() - new Date(proposal.submission_time)) / 1000;

    const isTechnicallyExpired =
      Math.floor(timeLeft / (24 * 3600)) >=
      Math.floor(voteExpired / Math.pow(10, 9) / (24 * 3600));
    if (!isTechnicallyExpired) {
      return `${formatCountdown(timeLeft)}  left`;
    } else {
      return "Time for vote expired.";
    }
  }
  return "";
};

function copy(proposal_id) {
  const parentWidget = parent?parent:'NDC-Page';
  const link = `https://near.org/#/${widgetProvider}/widget/${parentWidget}?tab=proposal&proposal_id=${proposal_id}&selected_dao=${proposal.dao_id}`;

  return () => {
    State.update({ showClipboardTooltip: true });
    setTimeout(() => {
      State.update({ showClipboardTooltip: false });
    }, 1000);
    clipboard.writeText(link);
  };
}

const VoteOnProposal = (
  <Widget
    src={`${widgetProvider}/widget/NDC-vote-on-proposal`}
    props={{
      account: state.selectedDao,
      widgetProvider,
      proposal_id: proposal.proposal_id,
      daoId: proposal.dao_id,
    }}
  />
);
return (
  <>
    {proposal && council ? (
      <ProposalCard>
        <Header>
          <Status status={proposal.status}>
            {proposal.status} <TimeLeft>{getTimeLeft(proposal)}</TimeLeft>
          </Status>
          <ProposalId>
            <div>Proposal Id {proposal.proposal_id}</div>
            <a
                href={`https://explorer.near.org/transactions/${proposal.transaction_id}`}
                target="_blank"
            >
              {proposal.transaction_id}
            </a>
            <OverlayTrigger
              key={"left"}
              placement={"left"}
              overlay={
                <Tooltip id={`tooltip`}>
                  Proposal link added to clipboard.
                </Tooltip>
              }
              show={state.showClipboardTooltip}
            >
              <ClipboardButton onClick={copy(proposal.proposal_id)}>
                <span>Copy proposal link </span>
                {clipboardSvg}
              </ClipboardButton>
            </OverlayTrigger>
          </ProposalId>
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
          <InfoWrapper>
            <Label>Target</Label>
            <div style={{ display: "flex" }}>
              <Widget
                src={`${widgetProvider}/widget/table_ft_formatter`}
                props={{
                  ftList,
                  ft: proposal.proposal.kind.token_id,
                  amount: proposal.proposal.kind.amount,
                }}
              />
              <span style={{ marginLeft: "5px" }}>
                to
                <a
                  href={`https://explorer.near.org/accounts/${proposal.proposal.kind.receiver_id}`}
                  target="_blank"
                >
                  {proposal.proposal.kind.receiver_id}
                </a>
              </span>
            </div>
          </InfoWrapper>
        ) : (
          ""
        )}
        {proposal.proposal_type === "AddMemberToRole" ||
        proposal.proposal_type === "RemoveMemberFromRole" ? (
          <InfoWrapper>
            <Label>Target</Label>
            <div style={{ display: "flex" }}>
              <span style={{ marginLeft: "5px" }}>
                <a
                  href={`https://explorer.near.org/accounts/${
                    proposal.proposal.kind.member_id
                  }`}
                  target="_blank"
                >
                  {proposal.proposal.kind.member_id}
                </a>
                will be
                {proposal.proposal_type === "AddMemberToRole"
                  ? "added to the"
                  : "removed from the"}{" "}
                role {proposal.proposal.kind.role}
              </span>
            </div>
          </InfoWrapper>
        ) : (
          ""
        )}
        {state.canVote && proposal.status === "InProgress" && VoteOnProposal}
        {!state.canVote && proposal.status === "InProgress" && (
          <Label>You don't have the permission to vote on proposals.</Label>
        )}

        <CommentsButton
          onClick={() => {
            const isDisplayed = !state.displayComments;
            const height = isDisplayed ? "auto" : defaultHeight;
            State.update({
              displayComments: isDisplayed,
              height,
            });
          }}
        >
          Discuss ({totalComments})
        </CommentsButton>

        {state.displayComments ? (
          <Widget
            src={`${widgetProvider}/widget/NDC-proposal-community-discussion`}
            props={{
              widgetProvider,
              proposal_id: proposal.proposal_id,
              displayComments: state.displayComments,
            }}
          />
        ) : (
          ""
        )}

        {args && <div style={{position:'relative', display:'block'}}><Markdown
            // Decode the args (Base64) to String then Parse the Json then format it and display it as markdown code
            text={
                "```json\n" +
                JSON.stringify(
                    JSON.parse(Buffer.from(args, "base64").toString("utf8")),
                    null,
                    2
                ) +
                "\n```"
            }
        /></div>}
      </ProposalCard>
    ) : (
      ""
    )}
  </>
);
