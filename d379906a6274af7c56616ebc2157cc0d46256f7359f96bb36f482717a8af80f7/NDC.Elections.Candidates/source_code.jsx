const {
  electionContract,
  registryContract,
  ndcOrganization,
  myVotes,
  ids,
  id,
  typ,
  ref_link,
  quorum,
  seats,
  voters_num,
  result,
  iahToken,
  candidateFilterId,
  blacklisted,
  greylisted,
  isBonded,
  hasPolicyNFT,
  hasIVotedNFT,
  electionStatus,
} = props;

const widgets = {
  voters: "election.ndctools.near/widget/NDC.Elections.Voters",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  modal: "nomination.ndctools.near/widget/NDC.Modal",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
  budget: "election.ndctools.near/widget/NDC.Elections.BudgetPackage",
  castVotes: "election.ndctools.near/widget/NDC.Elections.CastVotes",
};

const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const QUERY_API_ENDPOINT = "https://graph.mintbase.xyz/mainnet";
const POLICY_HASH =
  "99c19c7a4ea920bb2ae2c5a214b35f6c0393e518e7637b2d6dccf365dd62a047";
const FAIR_POLICY_DOC =
  "https://bafkreidwdxocdkfsv6srynw7ipnogfuw76fzncmxd5jv7furbsn5cp4bz4.ipfs.nftstorage.link";
const FAIR_POLICY_NFT =
  "https://ipfs.near.social/ipfs/bafkreiabsu7xhumhim4gxj5h7umopc3b5ekppeofwwizsf5loqs2vcntpm";
const I_VOTED_NFT =
  "https://ipfs.near.social/ipfs/bafkreiewiq4puwmcu7ciztsfqvmpl3gsumfgsm5r22g24abiynoeghsyey";
const SHARE_LINK =
  "https://twitter.com/intent/tweet?text=I%20minted%20%E2%80%9CI%20Voted%E2%80%9D%20NFT%20during%20NDC%20Elections!%20%F0%9F%8E%89%0A%0ACheck%20election%20here%3A%20https%3A//near.org/election.ndctools.near/widget/NDC.Elections.Main%0A%0A%23NDC%20%23NEAR";
const MINT_VOTING_POLICY_NFT = `https://shard.dog/fairvoting?ids=[${ids}]&accountId=${context.accountId}`;
const MINT_I_VOTED_NFT = `https://shard.dog/ivoted?ids=[${ids}]&accountId=${context.accountId}`;
const BLACKLIST_VERIFY_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSdQYxiUcxpiCDVKnN55Q7T2fnUPt0VjRdzo46qEkV7ub5mWFw/viewform";
const GREYLIST_VERIFY_LINK =
  "https://airtable.com/appgHJzUuw1Kb2GJV/shrCdvjmWMzwaMEj8";
const MIN_BOND = 3; //3
const MAX_BOND = 300; //300;

const Container = styled.div`
  position: relative:
  font-family: Avenir;
  font-size: 16px;
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  padding-top: 2px;

  @media (max-width: 400px) {
    width: 60px;
  }
`;

const UserIcons = styled.div`
  width: 45px;
  color: ${(props) => (props.selected && !props.winnerId ? "#fff" : "black")};
`;

const CandidateItemRow = styled.div`
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
  color: ${(props) => (props.selected && !props.winnerId ? "#fff" : "inherit")};

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
  
  @media (max-width: 400px) {
    padding: 0 10px;
  }
`;

const Candidates = styled.div`
  cursor: pointer;
`;

const Bookmark = styled.div`
  width: 90px;
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

const Votes = styled.div``;

const Action = styled.div``;

const Nomination = styled.div`
  width: 100px;
`;

const NominationLink = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const InfoRow = styled.div`
  gap: 54px;

  @media (max-width: 768px) {
    gap: 25px;
  }
`;

const NominationLinkMobile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const FilterRow = styled.div`
  padding: 15px 20px;
  font-size: 13px;
`;

const CandidatesContainer = styled.div`
  overflow-y: scroll;
  max-height: 490px;
  width: 100%;
`;

const StickyContainer = styled.div`
  position: "fixed",
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
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

const GraylistedAlert = styled.div`
  background: rgb(236 236 236);
`;

const Rules = styled.div`
  overflow-y: scroll;
  max-height: 300px;
`;

const Rule = styled.div`
  color: #f29bc0;
`;

const currentUser = context.accountId;

const housesMapping = {
  CouncilOfAdvisors: "Council Of Advisors",
  HouseOfMerit: "House of Merit",
  TransparencyCommission: "Transparency Commission",
  SetupPackage: "Budget Package",
};

const alreadyVoted = (candidateId) => true;

const alreadyVotedForHouse = () => true;

const filteredCandidates = () => {
  let candidates = result;

  if (state.filterOption === "bookmark")
    candidates = state.filter.bookmark
      ? state.candidates.filter(([candidateId, _votes], _index) =>
          state.bookmarked.includes(candidateId)
        )
      : result;
  if (state.filterOption === "candidates")
    candidates = candidates.sort((a, b) =>
      state.filter.candidates
        ? a[0].localeCompare(b[0])
        : b[0].localeCompare(a[0])
    );
  if (state.filterOption === "votes")
    candidates = candidates.sort((a, b) =>
      state.filter.votes ? a[1] - b[1] : b[1] - a[1]
    );
  if (state.filterOption === "my_votes")
    candidates = state.filter.my_votes
      ? state.candidates.filter(([candidateId, _votes], _index) =>
          alreadyVoted(candidateId)
        )
      : result;

  if (candidateFilterId)
    candidates = result.filter(([candidate, _vote], _index) =>
      candidate.toLowerCase().includes(candidateFilterId.toLowerCase())
    );

  return candidates;
};

const handleSelectCandidate = (candidateId) => {
  if (!state.acceptedPolicy) {
    State.update({ showToSModal: true });
    return;
  }
  if (!!state.acceptedPolicy && hasPolicyNFT === false) {
    State.update({ showMintPolicyModal: true });
    return;
  }

  const selectedItems = state.selectedCandidates.includes(candidateId)
    ? state.selectedCandidates.filter((el) => el !== candidateId)
    : [...state.selectedCandidates, candidateId];

  const currentVotes = seats - myVotesForHouse().length - selectedItems.length;
  if (currentVotes < 0) return;

  State.update({
    selectedCandidates: selectedItems,
    availableVotes: currentVotes,
    reload: false,
  });

  return true;
};

const handleCast = () =>
  !!state.acceptedPolicy && hasPolicyNFT
    ? State.update({ bountyProgramModal: true })
    : State.update({ showToSModal: true });

const handleResetSelection = () => {
  State.update({
    selectedCandidates: [],
    availableVotes: seats - myVotesForHouse().length,
  });
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
          bookmarked: selectedItems,
          loading: false,
          reload: true,
        });
      },
      onCancel: () => State.update({ loading: false }),
    }
  );
};

const handleVote = () => {
  const voteFunc = {
    contractName: electionContract,
    methodName: "vote",
    args: { prop_id: props.id, vote: state.selectedCandidates },
    gas: "110000000000000",
  };

  const bondFunc = {
    contractName: registryContract,
    methodName: "is_human_call",
    args: { ctr: electionContract, function: "bond", payload: "{}" },
    gas: "110000000000000",
    deposit: (greylisted ? MAX_BOND : MIN_BOND) * 1000000000000000000000000,
  };

  const arr = isBonded ? [voteFunc] : [bondFunc, voteFunc];

  Near.call(arr);
  State.update({
    bountyProgramModal: false,
    reload: true,
  });
};

const handleAcceptToS = () => {
  Near.call(
    electionContract,
    "accept_fair_voting_policy",
    { policy: POLICY_HASH },
    70000000000000,
    1000000000000000000000
  );
  State.update({
    showToSModal: false,
    reload: true,
  });
};

const handleFilter = (option) => {
  let filterOption = "";
  let filter = {};

  if (option.bookmark) {
    filterOption = "bookmark";
    filter = { bookmark: !state.filter.bookmark };
  }
  if (option.candidates) {
    filterOption = "candidates";
    filter = { candidates: !state.filter.candidates };
  }
  if (option.votes) {
    filterOption = "votes";
    filter = { votes: !state.filter.votes };
  }
  if (option.my_votes) {
    filterOption = "my_votes";
    filter = { my_votes: !state.filter.my_votes };
  }

  State.update({ filterOption, filter, reload: true });
};

const handleStateTransition = () => {
  if (state.filterOption !== "") return;

  switch (electionStatus) {
    case "ONGOING":
      if (!!state.acceptedPolicy)
        State.update({
          showMintPolicyModal: hasPolicyNFT === false,
          showMintIVotedModal:
            state.hasVotedOnAllProposals &&
            hasIVotedNFT === false &&
            hasPolicyNFT === true,
        });
      break;
    case "COOLDOWN":
      State.update({
        showReviewModal: true,
      });
      break;
    case "ENDED":
      State.update({ winnerIds });
      break;
    default:
      0;
  }
};

const loadSocialDBData = () => {
  let _bookmarked = Social.index(currentUser, `${ndcOrganization}/${typ}`);

  return _bookmarked && _bookmarked[_bookmarked.length - 1]
    ? _bookmarked[_bookmarked.length - 1].value
    : [];
};

function fetchGraphQL(series) {
  return asyncFetch(QUERY_API_ENDPOINT, {
    method: "POST",
    headers: { "mb-api-key": "anon", "x-hasura-role": electionContract },
    body: JSON.stringify({
      query: `
        query MyQuery {
          nft_tokens(
            where: {
              nft_contract_id: {
                _eq: "mint.sharddog.near"
              },
              token_id: {_regex: "^${series}:"},
              owner: {_eq: "${currentUser}"}}
            order_by: {minted_timestamp: asc}
          ) {
            last_transfer_timestamp
          }
        }
      `,
      variables: {},
      operationName: "MyQuery",
    }),
  });
}

const processNFTAvailability = (result, key) => {
  if (result.status === 200) {
    let data = result.body.data;
    if (data) {
      const tokens = data.nft_tokens;

      State.update({
        [key]: tokens.length > 0 && tokens[0].last_transfer_timestamp === null,
      });
    }
  }
};

const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);
const isVisible = () => true;

State.init({
  reload: true,
  loading: false,
  acceptedPolicy: false,
  hasVotedOnAllProposals: false,
  availableVotes: seats - myVotesForHouse().length,
  selected: null,
  bookmarked: [],
  tosAgreementInput: false,
  tosAgreement: false,
  selectedCandidates: [],
  voters: [],
  candidates: result,
  filter: {
    bookmark: false,
    candidates: false,
    votes: false,
    my_votes: false,
  },
  filterOption: "",
  showToSModal: false,
  bountyProgramModal: false,
  showReviewModal: false,
  blacklistedModal: true,

  showMintPolicyModal: false,
  showMintIVotedModal: false,
  hasPolicyNFT: null,
  hasIVotedNFT: null,
  winnerIds: [],
});

const winnerIds = Near.view(electionContract, "winners_by_proposal", {
  prop_id: props.id,
});

if (state.reload) {
  const hasVotedOnAllProposals = Near.view(
    electionContract,
    "has_voted_on_all_proposals",
    { user: currentUser }
  );

  const acceptedPolicy = Near.view(electionContract, "accepted_policy", {
    user: currentUser,
  });

  const bookmarked = loadSocialDBData();

  State.update({
    acceptedPolicy: acceptedPolicy === POLICY_HASH ?? acceptedPolicy,
    winnerIds: winnerIds ?? state.winnerIds,
    bookmarked: bookmarked ?? state.bookmarked,
    candidates: filteredCandidates(),
    hasVotedOnAllProposals,
  });

  handleStateTransition();
}

const UserLink = ({ title, src, selected, winnerId }) => (
  <div className="d-flex mr-3">
    <StyledLink href={src} target="_blank">
      {title}
    </StyledLink>
    <UserIcons
      selected={selected}
      winnerId={winnerId}
      className="d-flex align-items-center"
    >
      <Icon className="bi bi-arrow-up-right" />
      {state.winnerIds.includes(title) && (
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

const CandidateItem = ({ candidateId, votes }) => (
  <div>
    <CandidateItemRow
      className="d-flex align-items-center justify-content-between"
      selected={state.selected === candidateId}
      winnerId={state.winnerIds.includes(candidateId)}
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
                })
              }
            />
          </Expand>
        )}

        {iahToken && (
          <Bookmark
            selected={state.selected === candidateId}
            winnerId={state.winnerIds.includes(candidateId)}
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
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId: candidateId,
                imageClassName: "rounded-circle w-100 h-100",
                style: { width: "24px", height: "24px", marginRight: 5 },
              }}
            />
            <UserLink
              selected={state.selected === candidateId}
              winnerId={state.winnerIds.includes(candidateId)}
              src={`https://near.org/near/widget/ProfilePage?accountId=${candidateId}`}
              title={candidateId}
            />
          </div>
        </div>
      </div>
      <InfoRow className="d-flex w-100 align-items-center justify-content-end">
        <NominationLink>
          <Widget
            src={widgets.styledComponents}
            props={{
              Link: {
                size: "sm",
                className: state.winnerIds.includes(candidateId)
                  ? "secondary success"
                  : "secondary dark",
                text: "Nomination",
                icon: <i className="bi bi-box-arrow-up-right" />,
                href: `https://near.org/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=HouseOfMerit&accountId=${candidateId}`,
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
                className: state.winnerIds.includes(candidateId)
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
        <Votes>{votes}</Votes>
        {iahToken && (
          <Votes>
            <input
              id="input"
              disabled={
                alreadyVotedForHouse() ||
                blacklisted ||
                electionStatus !== "ONGOING"
              }
              onClick={() => handleSelectCandidate(candidateId)}
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

const Filters = () => (
  <FilterRow className="d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center w-100">
      {isVisible() && <Expand />}
      {iahToken && (
        <Bookmark
          role="button"
          className="text-secondary"
          onClick={() => handleFilter({ bookmark: true })}
        >
          <small>Bookmark</small>
          <i
            className={`bi ${
              state.filter.bookmark ? "bi-funnel-fill" : "bi-funnel"
            }`}
          />
        </Bookmark>
      )}
      <Candidates
        className="text-secondary"
        onClick={() => handleFilter({ candidates: true })}
      >
        <small>Candidate</small>
        <i
          className={`bi ${
            state.filter.candidates ? "bi-arrow-down" : "bi-arrow-up"
          }`}
        />
      </Candidates>
    </div>
    <div className="d-flex w-100 align-items-center justify-content-end gap-2">
      <Nomination className="text-secondary text-start text-md-start">
        <small>Nomination</small>
      </Nomination>
      {isVisible() && (
        <Votes
          role="button"
          className="text-secondary"
          onClick={() => handleFilter({ votes: true })}
        >
          <small>Total votes</small>
          <i
            className={`bi ${
              state.filter.votes ? "bi-arrow-down" : "bi-arrow-up"
            }`}
          />
        </Votes>
      )}
      {iahToken && (
        <Action
          role="button"
          className="text-secondary"
          onClick={() => handleFilter({ my_votes: true })}
        >
          <small>My votes</small>
          <i
            className={`bi ${
              state.filter.my_votes ? "bi-funnel-fill" : "bi-funnel"
            }`}
          />
        </Action>
      )}
    </div>
  </FilterRow>
);

const ALink = ({ title, href }) => (
  <a href={href} target={"_blank"} rel={"noopener"}>
    {title}
  </a>
);

return (
  <>
    {state.showReviewModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: (
            <div>
              <img src="https://bafkreidmuyeawyqduaotd27jozw5czdrm7t7w5hlcx5nfjzjjxxzvyhkyi.ipfs.nftstorage.link/" />
              <div className="mt-4">Election results are under review</div>
            </div>
          ),
          description:
            "Election results are under review by Election integrity Councils. Please wait it may take a few days",
          Button: {
            title: "I understand",
            onCancel: () =>
              State.update({ showReviewModal: false, reload: false }),
            onSubmit: () =>
              State.update({ showReviewModal: false, reload: false }),
          },
        }}
      />
    )}
    {blacklisted && state.blacklistedModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: (
            <div>
              <img src="https://bafkreignre4f27jsdgxt25pgnenjyqfw55pkhtnu5gkv7vhex3ttv45pbe.ipfs.nftstorage.link" />
              <div className="mt-4">You are on the election blacklist. </div>
            </div>
          ),
          description: (
            <>
              The community has voted to block backlisted accounts from voting
              in the NDC general election. You have been blacklisted due
              previously violating the
              <ALink title="Fair Voting Policy." href={FAIR_POLICY_DOC} />.
            </>
          ),
          Button: {
            title: "I understand",
            onCancel: () => State.update({ blacklistedModal: false }),
            onSubmit: () => State.update({ blacklistedModal: false }),
          },
          SecondaryButton: {
            type: "Link",
            title: "Appeal the Decision",
            href: BLACKLIST_VERIFY_LINK,
          },
        }}
      />
    )}
    {state.showToSModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: (
            <div>
              <img src="https://bafkreidmuyeawyqduaotd27jozw5czdrm7t7w5hlcx5nfjzjjxxzvyhkyi.ipfs.nftstorage.link/" />
              <div className="mt-4">
                Before you vote, please review the Fair Voting Policy.
              </div>
            </div>
          ),
          description: (
            <>
              <div className="mt-4">
                Please make sure to read and understand the{" "}
                <ALink title="Fair Voting Policy." href={FAIR_POLICY_DOC} />
                which outlines the responsibilities of each voter.
              </div>
            </>
          ),
          content: (
            <Section className="d-flex justify-content-center w-100 my-4">
              <input
                type="checkbox"
                className="form-check-input"
                checked={state.tosAgreementInput}
                onClick={() =>
                  State.update({ tosAgreementInput: !state.tosAgreementInput })
                }
              />
              I agree with{" "}
              <ALink title="Fair Voting Policy." href={FAIR_POLICY_DOC} />
            </Section>
          ),
          Button: {
            title: state.loading ? (
              <Loader />
            ) : (
              <>Agree to Fair Voting Policy</>
            ),
            disabled: !state.tosAgreementInput,
            onCancel: () => State.update({ showToSModal: false }),
            onSubmit: handleAcceptToS,
          },
        }}
      />
    )}
    {state.showMintPolicyModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: "Before you vote, mint Fair Voting Policy NFT.",
          description: (
            <>
              <img width={300} src={FAIR_POLICY_NFT} />
              <div className="mt-4 mb-4">
                Please make sure to read and understand the{" "}
                <ALink title="Fair Voting Policy." href={FAIR_POLICY_DOC} />
                which outlines the responsibilities of each voter.
              </div>
            </>
          ),
          Button: {
            type: "Link",
            title: "Mint Fair Voting NFT",
            onCancel: () =>
              State.update({ showMintPolicyModal: false, reload: false }),
            href: MINT_VOTING_POLICY_NFT,
            doNotOpenNew: true,
          },
        }}
      />
    )}
    {state.bountyProgramModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: (
            <div>
              <img src="https://bafkreidmuyeawyqduaotd27jozw5czdrm7t7w5hlcx5nfjzjjxxzvyhkyi.ipfs.nftstorage.link/" />
              <div className="mt-4">
                {greylisted ? (
                  <>Additional Verification Required.</>
                ) : (
                  <>You are about to cast your votes.</>
                )}
              </div>
            </div>
          ),
          description: (
            <Rules>
              <Rule className="d-flex gap-2">
                <h3>1</h3>
                <p className="text-secondary text-start">
                  Don't sell your vote and risk being banned from governance.
                  Instead report bad actors and claim a bounty up to 2,500 NEAR.
                  Learn more about{" "}
                  <ALink
                    title="Whistleblower Bounty Program"
                    href="https://medium.com/@neardigitalcollective/introducing-ndc-whistleblower-bounty-program-d4fe1b9fc5a0"
                  />
                </p>
              </Rule>
              <Rule className="d-flex gap-2">
                <h3>2</h3>
                <p className="text-secondary text-start">
                  A bond of <b>{greylisted ? MAX_BOND : MIN_BOND} NEAR</b> is
                  required to vote. If you are a fair voter, this bond will
                  returned to you after the election results are reviewed and
                  rectified.
                </p>
              </Rule>
              <Rule className="d-flex gap-2">
                <h3>3</h3>
                <p className="text-secondary text-start">
                  You votes <b>cannot</b> be changed.
                </p>
              </Rule>

              {greylisted && (
                <GraylistedAlert className="p-3 mb-4 rounded">
                  <b>Voters without reputation need to be verified</b> by the
                  Election Integrity Council or place a substantial bond to
                  vote. If you are a fair voter, this bond will be returned to
                  you once the election results are reviewed and ratified.
                </GraylistedAlert>
              )}
            </Rules>
          ),
          Button: {
            title: `Cast ${state.selectedCandidates.length || ""} Vote${
              state.selectedCandidates.length === 1 ? "" : "s"
            }`,
            disabled:
              state.selectedCandidates.length === 0 || alreadyVotedForHouse(),
            onCancel: () =>
              State.update({ bountyProgramModal: false, reload: false }),
            onSubmit: handleVote,
          },
          SecondaryButton: {
            type: greylisted ? "Link" : "Button",
            title: greylisted ? "Apply to Verify" : "Cancel",
            href: GREYLIST_VERIFY_LINK,
            onSubmit: () =>
              State.update({ bountyProgramModal: false, reload: false }),
          },
        }}
      />
    )}
    {state.showMintIVotedModal && (
      <Widget
        src={widgets.modal}
        props={{
          title: "Congratulations! Mint “I Voted” NFT",
          description: (
            <div>
              <img width={300} src={I_VOTED_NFT} />
              <div className="mt-4 mb-4">
                Celebrate voting in the inaugural NEAR election and mint your “I
                Voted” NFT! 🎉
              </div>
            </div>
          ),
          Button: {
            type: "Link",
            title: "Mint I voted NFT",
            onCancel: () =>
              State.update({ showMintIVotedModal: false, reload: false }),
            href: MINT_I_VOTED_NFT,
            doNotOpenNew: true,
          },
          SecondaryButton: {
            type: "Link",
            title: "Tweet I Voted",
            href: SHARE_LINK,
          },
        }}
      />
    )}

    <Container>
      <h2>{housesMapping[typ]}</h2>
      {typ === "SetupPackage" ? (
        <Widget src={widgets.budget} />
      ) : (
        <>
          <small className="text-secondary">{result.length} Candidates</small>
          {state.candidates.length > 0 ? (
            <>
              <Filters />
              <CandidatesContainer>
                {state.candidates.map(([candidateId, votes], index) => (
                  <CandidateItem
                    candidateId={candidateId}
                    votes={votes}
                    key={index}
                  />
                ))}
              </CandidatesContainer>
            </>
          ) : (
            <div className="d-flex p-5 justify-content-center align-items-center flex-column gap-2">
              <span>There are no candidates found.</span>
              {state.filterOption && (
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      className: "secondary dark",
                      text: "Clear Filters",
                      onClick: () =>
                        State.update({
                          filterOption: "",
                          filter: {
                            bookmark: false,
                            candidates: false,
                            votes: false,
                            my_votes: false,
                          },
                        }),
                    },
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
      <div>
        {iahToken && (
          <Widget
            src={widgets.castVotes}
            props={{
              ...props,
              ...state,
              handleCast,
              handleVote,
              handleResetSelection,
              handleSelectCandidate,
            }}
          />
        )}
      </div>
    </Container>
  </>
);
