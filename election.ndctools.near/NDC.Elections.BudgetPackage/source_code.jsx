const {
  id,
  typ,
  seats,
  electionContract,
  registryContract,
  isIAmHuman,
  myVotes,
} = props;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
  verifyHuman: "nomination.ndctools.near/widget/NDC.VerifyHuman",
};

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

const Section = styled.div`
  gap: 8px;
  margin-bottom: 10px;
`;

const ActionSection = styled.div`
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const currentUser = context.accountId;
const alreadyVotedForHouse = () => myVotes.some((voter) => voter.house === typ);
const myVotesForHouse = () => myVotes.filter((vote) => vote.house === typ);

const handleVote = (value) =>
  Near.call(
    electionContract,
    "vote",
    { prop_id: id },
    "70000000000000",
    2000000000000000000000
  );

State.init({
  availableVotes: seats - myVotesForHouse().length,
});

const CastVotes = () => (
  <CastVotesSection className="d-flex align-items-center justify-content-between gap-3">
    <div className="wrapper">
      <div className="d-flex align-items-end">
        <H3>{alreadyVotedForHouse() ? 0 : state.availableVotes}</H3>
        <span>/</span>
        <H4>{seats}</H4>
        <span className="text-secondary">votes left</span>
      </div>
      <Info className="text-secondary">
        <i class="bi bi-info-circle"></i>
        {alreadyVotedForHouse() && (
          <span>You're already accepted budget package</span>
        )}
      </Info>
    </div>
    <ActionSection className="d-flex gap-2">
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "Yes",
            className: "primary success justify-content-center",
            icon: <i className="bi bi-hand-thumbs-up" />,
            onClick: () => handleVote(0),
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "Abstain",
            className: "secondary dark justify-content-center",
            onClick: () => handleVote(2),
          },
        }}
      />
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            text: "No",
            className: "primary danger justify-content-center",
            icon: <i className="bi bi-hand-thumbs-down" />,
            onClick: () => handleVote(1),
          },
        }}
      />
    </ActionSection>
  </CastVotesSection>
);

const Content = () => (
  <>
    <h5>NEAR Digital Collective Fair Voting Policy</h5>
    <p>
      <b>I. Preamble The NEAR Digital</b>
    </p>
    <p>
      Collective (“NDC”) is dedicated to creating a fair, transparent, and
      decentralized voting mechanism for its community. We believe in the power
      of our community, and we aim to transition governance in a way that values
      every voice and contribution. As part of our commitment, we have created
      this Fair Voting Policy (“Policy”), which outlines our principles and
      procedures. By casting your vote, you agree to adhere to and respect the
      terms and policies outlined in this document.{" "}
    </p>
    <p>
      The purpose of this Policy is to ensure that all voting processes within
      the NDC are carried out in a manner that respects democratic principles,
      promotes equal participation, and maintains transparency and
      accountability, in alignment with our goal to transition towards
      decentralized, community-driven governance.{" "}
    </p>
    <p>
      This Policy applies to all eligible voters in the NDC and encompasses all
      voting processes, including but not limited to elections, nominations,
      general votes, veto votes and motions
    </p>
    <p>
      <b>II. The Election Integrity Council</b>
    </p>
    <p>
      The Election Integrity Council is an independent body of individuals with
      a clear mandate to oversee the first ever NDC election. It is composed of
      sharp minded individuals who do not run for a position in the election and
      have shown great value to NEAR and its Ecosystem. Members will be
      appointed through both the OG SBT holder group and the NDC Legal Working
      Group. The Election Integrity Council will be responsible for the
      enforcement of this Policy, prevent and investigate electoral fraud and
      take action when breaches of this Policy have been detected.
    </p>
  </>
);

return (
  <Container>
    <h1>Budget Package</h1>
    <CandidatesContainer>
      <Content />
      <a href="https://bafkreidwdxocdkfsv6srynw7ipnogfuw76fzncmxd5jv7furbsn5cp4bz4.ipfs.nftstorage.link/">
        View Budget Package profileData
        <i className="ml-2 bi bi-box-arrow-up-right" />
      </a>
    </CandidatesContainer>

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
  </Container>
);
