const {
  electionContract,
  registryContract,
  ndcOrganization,
  myVotes,
  id,
  typ,
  ref_link,
  quorum,
  seats,
  voters_num,
  result,
  isIAmHuman,
  candidateId,
  blacklisted,
  greylisted,
  alreadyBonded,
} = props;

const widgets = {
  voters: "election.ndctools.near/widget/NDC.Elections.Voters",
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  modal: "nomination.ndctools.near/widget/NDC.Modal",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
  budget: "election.ndctools.near/widget/NDC.Elections.BudgetPackage",
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
const MINT_VOTING_POLICY_NFT = "https://shard.dog/fairvoting/";
const MINT_I_VOTED_NFT = "https://shard.dog/ivoted";
const BLACKLIST_VERIFY_LINK = "";
const GREYLIST_VERIFY_LINK = "";
const MIN_BOND = 0.01; //3
const MAX_BOND = 0.02; //300;
const NFT_SERIES = [1, 2];

const H4 = styled.h4`
  margin-bottom: 0;
`;

const H3 = styled.h3`
  margin-bottom: 0;
`;

const Container = styled.div`
  position: relative:
  font-family: Avenir;
  font-size: 16px;
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  padding-top: 2px;

  @media (max-width: 400px) {
    width: 60px;
  }
`;

const CandidateItemRow = styled.div`
  padding: 0 20px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid;
  background: ${(props) =>
    props.winnerId ? "#239F28" : props.selected ? "#4aa6ee" : "#F8F8F9"};
  border-color: ${(props) =>
    props.winnerId ? "#239F28" : props.selected ? "#4aa6ee" : "#F8F8F9"};
  color: ${(props) => (props.selected || props.winnerId ? "white" : "inherit")};

  &:hover {
    background: ${(props) =>
      props.winnerId ? "#239F28" : props.selected ? "#4aa6ee" : "#d4e4f461"};
  
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
      props.winnerId || props.selected ? "#fff" : "#4498E0"};
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

const Nomination = styled.div``;

const FilterRow = styled.div`
  padding: 15px 20px;
  font-size: 13px;
`;

const Info = styled.i`
  font-size: 12px;
  margin: 0 !important;
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

const CastVotesSection = styled.div`
  background: #fdfeff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;

  @media (max-width: 400px) {
    flex-direction: column;
  }

  .wrapper {
    @media (max-width: 400px) {
      width: 100%;
    }
  }

  button {
    @media (max-width: 400px) {
      width: 100%;
    }
  }

  h3,
  h4 {
    margin: 0 3px;
  }

  h3 {
    font-weight: 900;
  }

  .text-secondary {
    margin: 0 10px;
  }

  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }

    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
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

const ActionSection = styled.div`
  @media (max-width: 400px) {
    width: 100%;
  }
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

const alreadyVoted = (candidateId) =>
  myVotes.some((voter) => voter.candidate === candidateId);

const alreadyVotedForHouse = () => myVotes.some((voter) => voter.house === typ);

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

  if (candidateId)
    candidates = result.filter(([candidate, _vote], _index) =>
      candidate.toLowerCase().includes(candidateId.toLowerCase())
    );

  return candidates;
};

const handleSelectCandidate = (candidateId) => {
  if (!state.acceptedPolicy) {
    State.update({ showToSModal: true });
    return;
  }
  if (!!state.acceptedPolicy && state.hasPolicyNFT === false) {
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

const handleVote = (vote) => {
  const voteFunc = {
    contractName: electionContract,
    methodName: "vote",
    args: { prop_id: props.id, vote },
    gas: "110000000000000",
  };

  const bondFunc = {
    contractName: registryContract,
    methodName: "is_human_call",
    args: { ctr: electionContract, function: "bond", payload: "{}" },
    gas: "110000000000000",
    deposit: (greylisted ? MAX_BOND : MIN_BOND) * 1000000000000000000000000,
  };

  const arr = alreadyBonded ? [voteFunc] : [bondFunc, voteFunc];

  Near.call(arr).then((data) => State.update({ bountyProgramModal: false }));
};

const handleAcceptToS = () => {
  State.update({ loading: true });

  Near.call(
    electionContract,
    "accept_fair_voting_policy",
    { policy: POLICY_HASH },
    70000000000000,
    1000000000000000000000
  ).then((data) =>
    State.update({
      showToSModal: false,
      tosAgreement: true,
      showMintPolicyModal: true,
      loading: false,
    })
  );
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

  switch (state.electionStatus) {
    case "ONGOING":
      if (!!state.acceptedPolicy)
        State.update({
          showMintPolicyModal: state.hasPolicyNFT === false,
          showMintIVotedModal:
            myVotes.length > 0 && state.hasIVotedNFT === false,
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
            where: {nft_contract_id: {_eq: "mint.sharddog.near"}, token_id: {_regex: "^${series}:"}, owner: {_eq: "orangejoe.near"}}
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
      console.log(tokens);
      State.update({
        [key]: tokens.length > 0 && tokens[0].last_transfer_timestamp === null,
      });
    }
  }
};

const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);
const isVisible = () =>
  myVotesForHouse().length > 0 || state.winnerIds.length > 0;

State.init({
  reload: true,
  loading: false,
  electionStatus: "NOT_STARTED",
  acceptedPolicy: false,
  availableVotes: seats - myVotesForHouse().length,
  selected: null,
  bookmarked: [],
  tosAgreementInput: false,
  tosAgreement: false,
  selectedCandidates: JSON.parse(userSelection ?? "[]"),
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

if (state.reload) {
  fetchGraphQL(NFT_SERIES[0]).then((result) =>
    processNFTAvailability(result, "hasPolicyNFT")
  );

  fetchGraphQL(NFT_SERIES[1]).then((result) =>
    processNFTAvailability(result, "hasIVotedNFT")
  );

  const electionStatus = Near.view(electionContract, "proposal_status", {
    prop_id: props.id,
  });

  const acceptedPolicy = Near.view(electionContract, "accepted_policy", {
    user: context.accountId,
  });

  const winnerIds = Near.view(electionContract, "winners_by_house", {
    prop_id: id,
  });

  const bookmarked = loadSocialDBData();

  State.update({
    electionStatus: electionStatus ?? state.electionStatus,
    acceptedPolicy: acceptedPolicy === POLICY_HASH ?? state.acceptedPolicy,
    winnerIds: winnerIds ?? state.winnerIds,
    bookmarked: bookmarked ?? state.bookmarked,
    candidates: filteredCandidates(),
  });

  handleStateTransition();
}

const UserLink = ({ title, src }) => (
  <div className="d-flex mr-3">
    <StyledLink href={src} target="_blank">
      {title}
    </StyledLink>
    <div>
      <Icon className="bi bi-arrow-up-right" />
    </div>
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

        {isIAmHuman && (
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
          <Widget
            src="near/widget/AccountProfileOverlay"
            props={{
              accountId: candidateId,
              children: (
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
                    src={`https://near.org/near/widget/ProfilePage?accountId=${candidateId}`}
                    title={candidateId}
                  />
                </div>
              ),
            }}
          />

          {state.winnerIds.includes(candidateId) && (
            <Winner className="bi bi-trophy p-1" />
          )}
        </div>
      </div>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <Widget
          src={widgets.styledComponents}
          props={{
            Link: {
              size: "sm",
              className: "secondary dark",
              text: "Nomination",
              icon: <i className="bi bi-box-arrow-up-right" />,
              href: `https://near.org/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=HouseOfMerit&accountId=${candidateId}`,
              inverse:
                state.selected === candidateId ||
                state.winnerIds.includes(candidateId),
            },
          }}
        />
        {isVisible() && <Votes>{votes}</Votes>}
        {isIAmHuman && (
          <Votes>
            <input
              id="input"
              disabled={alreadyVotedForHouse() || blacklisted}
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
      </div>
    </CandidateItemRow>
    {state.selected === candidateId && isVisible() && (
      <Widget src={widgets.voters} props={{ candidateId, isIAmHuman }} />
    )}
  </div>
);

const Filters = () => (
  <FilterRow className="d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center w-100">
      {isVisible() && <Expand />}
      {isIAmHuman && (
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
    <div className="d-flex w-100 align-items-center justify-content-between">
      <Nomination className="text-secondary text-end text-md-start">
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
      {isIAmHuman && (
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

const CastVotes = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between gap-3">
    <div className="wrapper">
      <div className="d-flex align-items-end">
        <H3>
          {alreadyVotedForHouse()
            ? 0
            : seats -
              myVotesForHouse().length -
              state.selectedCandidates.length}
        </H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <Info className="text-secondary">
        <i class="bi bi-info-circle"></i>
        {alreadyVotedForHouse() ? (
          <span>You're already voted for {housesMapping[typ]}</span>
        ) : blacklisted ? (
          <span>Your account is blacklisted</span>
        ) : (
          <span>Make sure you selected {seats} candidates</span>
        )}
      </Info>
    </div>
    <ActionSection className="d-flex gap-2">
      {state.selectedCandidates.length > 0 && (
        <Widget
          src={widgets.styledComponents}
          props={{
            Button: {
              className: "secondary dark justify-content-center text-nowrap",
              text: "Reset Selection",
              onClick: () => {
                Storage.privateSet("election_user_selection", "[]");
                State.update({
                  selectedCandidates: [],
                  availableVotes: seats - myVotesForHouse().length,
                });
              },
            },
          }}
        />
      )}
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            className: "primary justify-content-center",
            disabled: state.selectedCandidates.length === 0 || blacklisted,
            text: `Cast ${state.selectedCandidates.length || ""} Vote${
              state.selectedCandidates.length === 1 ? "" : "s"
            }`,
            onClick: () =>
              !!state.acceptedPolicy && state.hasPolicyNFT
                ? State.update({ bountyProgramModal: true })
                : State.update({ showToSModal: true }),
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
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
            "Election results are under review by Election integrity Councils. Please wait it may takes a few days",
          Button: {
            title: "I understand",
            onCancel: () => State.update({ showReviewModal: false }),
            onSubmit: () => State.update({ showReviewModal: false }),
          },
        }}
      />
    )}
    {blacklisted && blacklistedModal && (
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
            <>
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
            </>
          ),
          Button: {
            title: `Cast ${state.selectedCandidates.length || ""} Vote${
              state.selectedCandidates.length === 1 ? "" : "s"
            }`,
            disabled:
              state.selectedCandidates.length === 0 || alreadyVotedForHouse(),
            onCancel: () =>
              State.update({ bountyProgramModal: false, reload: false }),
            onSubmit: () => handleVote(state.selectedCandidates),
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
                Celebrate for voting in the inaugural election of NEAR and mint
                your “I Voted” NFT! 🎉
              </div>
            </div>
          ),
          Button: {
            type: "Link",
            title: "Mint I voted NFT",
            onCancel: () =>
              State.update({ showMintIVotedModal: false, reload: false }),
            href: MINT_I_VOTED_NFT,
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
        <Widget
          src={widgets.budget}
          props={{
            typ,
            seats,
            electionContract,
            registryContract,
            isIAmHuman,
            myVotes,
            handleVote,
          }}
        />
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
            <div className="d-flex p-5 justify-content-center">
              There are no candidates found
            </div>
          )}
          <div>
            {isIAmHuman ? (
              <CastVotes />
            ) : (
              <Widget
                src={widgets.verifyHuman}
                props={{
                  title: "Want to vote?",
                  description: "Click on Verify as a Human to proceed.",
                }}
              />
            )}
          </div>
        </>
      )}
    </Container>
  </>
);
