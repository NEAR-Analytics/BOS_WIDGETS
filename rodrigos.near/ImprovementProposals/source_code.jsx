const authorId = props.authorId || "rodrigos.near";
const contractId = props.contractId || "ip-aaxxii-test.near";
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.75em;
  gap: 0.75em;
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 1.125em;
    line-height: 1.5em;
    color: #000000;
  }
  @media (max-width: 600px) {
    flex-direction: column;
   }
`;

const logo = (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 226.000000 233.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,233.000000) scale(0.100000,-0.100000)"
      fill="#000000"
      stroke="none"
    >
      <path
        d="M0 1165 l0 -1165 1130 0 1130 0 0 1165 0 1165 -1130 0 -1130 0 0
-1165z m1380 966 c169 -50 319 -138 441 -260 167 -167 261 -365 289 -610 21
-175 -17 -378 -101 -546 -44 -88 -102 -173 -124 -181 -14 -6 -389 322 -383
335 2 3 17 35 35 71 40 82 53 136 53 225 0 135 -46 248 -140 349 -182 194
-470 197 -661 7 -200 -200 -200 -513 0 -711 184 -182 453 -188 641 -13 33 30
64 53 69 51 15 -5 371 -329 371 -337 0 -4 -30 -37 -68 -73 -196 -189 -472
-292 -741 -275 -772 48 -1202 907 -778 1554 141 215 369 370 627 428 101 23
372 14 470 -14z"
      />
    </g>
  </svg>
);

const ContentContainer = styled.div`
  width: 100%;
  background: #fafafa;

  &.form {
    border: none;
    background: #fafafa;
  }

  * {
    margin: 0;
  }
`;
const Container = styled.div`
width: 100%;
background: #fafafa;
padding: 3em;

&.form {
  border: none;
  background: #fafafa;
}

* {
  margin: 0;
}

@media (max-width: 768px) {
 padding: 1.5em
}
`;

State.init({
  tab: props.tab ?? "home",
  content: props.content ?? "",
  transactionHashes: props.transactionHashes,
  transactionHashesIsHandled: false,
});

const isForm = ["createproposal"].includes(state.tab);

const update = (state) => State.update(state);

const getContent = {
  home: (
    <Widget
      src={`${authorId}/widget/ImprovementProposals.Dashboard`}
      props={{
        tab: state.tab,
        update,
        authorId,
        contractId,
      }}
    />
  ),
  createproposal: (
    <Widget
      src={`${authorId}/widget/ImprovementProposals.Proposal.Create.Index`}
      props={{
        tab: state.tab,
        update,
        transactionHashes: state.transactionHashes,
        transactionHashesIsHandled: state.transactionHashesIsHandled,
        contractId,
        authorId,
      }}
    />
  ),
  proposal: (
    <Widget
      src={`${authorId}/widget/ImprovementProposals.Proposal.Index`}
      props={{
        tab: state.tab,
        update,
        mpip_id: props.mpip_id,
        transactionHashes: state.transactionHashes,
        transactionHashesIsHandled: state.transactionHashesIsHandled,
        contractId,
        authorId,
      }}
    />
  ),
}[state.tab];

return (
  <Container>
    <Header>
      <a
        href={`/${authorId}/widget/ImprovementProposals?tab=home`}
        onClick={() =>
          update({
            tab: "home",
          })
        }
        style={{
          fontSize: "33px",
          fontWeight: "700",
          color: "black",
          textDecoration: "none",
        }}
      >
        {logo}
        <span>AAXXII</span>
      </a>
      <Widget
        src={`${authorId}/widget/Governance.Balance`}
        props={{ authorId, contractId }}
      />
    </Header>
    <ContentContainer className={isForm ? "form" : ""}>
      {getContent}
    </ContentContainer>
  </Container>
);
