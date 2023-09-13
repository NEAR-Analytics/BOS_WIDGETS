const {
  candidateId,
  votes,
  winnerIds,
  myVotes,
  typ,
  handleCountCandidates,
  handleModals,
  iahToken,
  blacklisted,
  electionStatus,
} = props;

const widgets = {
  voters: "election.ndctools.near/widget/NDC.Elections.Voters",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const Container = styled.div`
  position: relative:
  font-family: Avenir;
  font-size: 16px;
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 215px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  padding-top: 2px;

  @media (max-width: 400px) {
    width: 120px;
  }
`;

const UserIcons = styled.div`
  width: 20px;
  color: ${(props) => (props.selected && !props.winnerId ? "#fff" : "black")};
`;

const CandidateItemRow = styled.div`
  @media (max-width: 400px) {
    padding: 0 10px !important;
  }

  padding: 0 20px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.winnerId
      ? "rgb(206 233 207)"
      : props.selected
      ? "#4aa6ee"
      : "#F8F8F9"};
  border-color: ${(props) =>
    props.winnerId
      ? "rgb(137 201 139)"
      : props.selected
      ? "#4aa6ee"
      : "#F8F8F9"};
      color: ${(props) =>
        props.selected && !props.winnerId ? "#fff" : "inherit"};

  small span {
    color: ${(props) =>
      props.selected && !props.winnerId ? "#fff" : "inherit"};
  }

  &:hover {
    background: ${(props) =>
      props.winnerId
        ? "rgb(206 233 207)"
        : props.selected
        ? "#4aa6ee"
        : "#d4e4f461"};
  }

  .form-check-input:checked {
    background-color: ${(props) =>
      props.winnerId ? "#239f28" : "#0d6efd"} !important;
    border-color: ${(props) =>
      props.winnerId ? "#239f28" : "#0d6efd"} !important;
`;

const Bookmark = styled.div`
  width: 40px;
  cursor: pointer;

  #bookmark.bi-bookmark-fill {
    color: ${(props) =>
      props.winnerId ? "#198754" : props.selected ? "#fff" : "#4498E0"};
  }

  @media (max-width: 400px) {
    width: auto;
    margin-right: 15px;
  }
`;

const Expand = styled.div`
  width: 35px;
  cursor: pointer;

  @media (max-width: 400px) {
    width: 20px;
    margin-right: 10px;
  }
`;

const Votes = styled.div`
  width: 15px;
`;

const NominationLink = styled.div`
  display: block;

  @media (max-width: 400px) {
    display: none;
  }
`;

const InfoRow = styled.div`
  gap: 45px;

  @media (max-width: 768px) {
    gap: 35px;
  }

  @media (max-width: 400px) {
    gap: 20px;
  }
`;

const NominationLinkMobile = styled.div`
  display: none;

  @media (max-width: 400px) {
    display: block;
  }
`;

const Icon = styled.i`
  font-size: 14px;
`;

const Winner = styled.i`
  margin-left: 10px;
  font-size: 14px;
`;

const Section = styled.div`
  gap: 8px;
  margin-bottom: 10px;
`;

const currentUser = context.accountId;

const alreadyVoted = (candidateId) =>
  myVotes.some((voter) => voter.candidate === candidateId);

const alreadyVotedForHouse = () => myVotes.some((voter) => voter.house === typ);

const handleSelect = (candidateId) => {
  if (!handleModals()) return;

  const selectedItems = state.selectedCandidates.includes(candidateId)
    ? state.selectedCandidates.filter((el) => el !== candidateId)
    : [...state.selectedCandidates, candidateId];
  const currentVotes = seats - myVotesForHouse().length - selectedItems.length;
  if (currentVotes < 0) return;

  handleCountCandidates(currentVotes, selectedItems);
  State.update({ selectedCandidates: selectedItems });

  return true;
};

const selectedBookmarks = (candidateId) => {
  let selectedItems = state.bookmarked.includes(candidateId)
    ? state.bookmarked.filter((el) => el !== candidateId)
    : [...state.bookmarked, candidateId];

  return [...new Set(selectedItems)];
};

const handleBookmarkCandidate = (candidateId) => {
  let selectedItems = selectedBookmarks(candidateId);
  State.update({ loading: candidateId });

  Social.set(
    {
      index: {
        [currentUser]: JSON.stringify({
          key: `${ndcOrganization}/${typ}`,
          value: selectedBookmarks(candidateId),
        }),
      },
    },
    {
      force: true,
      onCommit: () => {
        if (selectedItems.length === 0)
          State.update({ selectedCandidates: result });

        State.update({
          loading: false,
          reload: false,
          bookmarked: selectedBookmarks(candidateId),
        });
      },
      onCancel: () => State.update({ loading: false, reload: false }),
    }
  );
};

function loadSocialDBData() {
  let _bookmarked = Social.index(currentUser, `${ndcOrganization}/${typ}`);
  const bookmarked =
    _bookmarked && _bookmarked[_bookmarked.length - 1]
      ? _bookmarked[_bookmarked.length - 1].value
      : [];
  State.update({ bookmarked });
}

const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);
const isVisible = () => myVotesForHouse().length > 0 || winnerIds.length > 0;

State.init({
  reload: true,
  loading: false,
  selected: null,
  bookmarked: [],
  selectedCandidates: [],
  candidates: result,
});

const UserLink = ({ title, src, selected, winnerId }) => (
  <div className="d-flex mr-3">
    <StyledLink href={src} target="_blank">
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId: title, tooltip: false }}
      />
    </StyledLink>
    <UserIcons
      selected={selected}
      winnerId={winnerId}
      className="d-flex align-items-center"
    >
      <Icon className="bi bi-arrow-up-right" />
      {winnerIds.includes(title) && (
        <Winner className="bi bi-trophy-fill p-1 text-success" />
      )}
    </UserIcons>
  </div>
);

const Loader = () => (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

const ALink = ({ title, href }) => (
  <a href={href} target={"_blank"} rel={"noopener"}>
    {title}
  </a>
);

loadSocialDBData();

return (
  <div>
    <CandidateItemRow
      className="d-flex align-items-center justify-content-between"
      selected={state.selected === candidateId}
      winnerId={winnerIds.includes(candidateId)}
    >
      <div className="d-flex w-100 align-items-center">
        {isVisible() && (
          <Expand>
            <i
              className={`${
                state.selected === candidateId
                  ? "bi bi-chevron-down"
                  : "bi bi-chevron-right"
              }`}
              onClick={(e) =>
                State.update({
                  selected: state.selected === candidateId ? null : candidateId,
                  reload: false,
                })
              }
            />
          </Expand>
        )}

        {iahToken && (
          <Bookmark
            selected={state.selected === candidateId}
            winnerId={winnerIds.includes(candidateId)}
          >
            {state.loading === candidateId ? (
              <Loader />
            ) : (
              <i
                id="bookmark"
                onClick={() => handleBookmarkCandidate(candidateId)}
                className={`bi ${
                  state.bookmarked.includes(candidateId)
                    ? "bi-bookmark-fill"
                    : "bi-bookmark"
                }`}
              />
            )}
          </Bookmark>
        )}
        <div className="d-flex align-items-center">
          <div className="d-flex justify-items-center">
            <UserLink
              selected={state.selected === candidateId}
              winnerId={winnerIds.includes(candidateId)}
              src={`https://near.org/near/widget/ProfilePage?accountId=${candidateId}`}
              title={candidateId}
            />
          </div>
        </div>
      </div>
      <InfoRow
        className={`d-flex w-100 align-items-center ${
          iahToken ? "justify-content-center" : "justify-content-end"
        }`}
      >
        <NominationLink>
          <Widget
            src={widgets.styledComponents}
            props={{
              Link: {
                size: "sm",
                className: winnerIds.includes(candidateId)
                  ? "secondary success"
                  : "secondary dark",
                text: "Nomination",
                icon: <i className="bi bi-box-arrow-up-right" />,
                href: `https://near.org/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=${typ}&accountId=${candidateId}`,
                inverse: state.selected === candidateId,
              },
            }}
          />
        </NominationLink>
        <NominationLinkMobile>
          <Widget
            src={widgets.styledComponents}
            props={{
              Link: {
                size: "sm",
                className: winnerIds.includes(candidateId)
                  ? "secondary success"
                  : "secondary dark",
                text: "",
                icon: <i className="bi bi-box-arrow-up-right" />,
                href: `https://near.org/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=HouseOfMerit&accountId=${candidateId}`,
                inverse: state.selected === candidateId,
              },
            }}
          />
        </NominationLinkMobile>
        {isVisible() && <Votes>{votes}</Votes>}
        {iahToken && (
          <Votes>
            <input
              id="input"
              disabled={
                alreadyVotedForHouse() ||
                blacklisted ||
                electionStatus !== "ONGOING"
              }
              onClick={() => handleSelect(candidateId)}
              className="form-check-input"
              type="checkbox"
              checked={
                state.selectedCandidates.includes(candidateId) ||
                alreadyVoted(candidateId)
              }
            />
          </Votes>
        )}
      </InfoRow>
    </CandidateItemRow>

    {state.selected === candidateId && isVisible() && (
      <Widget
        src={widgets.voters}
        props={{ candidateId, electionContract, iahToken, ids }}
      />
    )}
  </div>
);
