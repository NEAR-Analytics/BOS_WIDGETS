/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/near-prpsls-bos#readme
*/
/* INCLUDE: "includes//common.jsx" */
const REPL_DEVHUB = "devhub.near";
const REPL_INFRASTRUCTURE_COMMITTEE = "megha19.near";
const REPL_INFRASTRUCTURE_COMMITTEE_CONTRACT = "truedove38.near";
const REPL_RPC_URL = "https://rpc.mainnet.near.org";
const REPL_NEAR = "near";
const RFPImage =
  "https://ipfs.near.social/ipfs/bafkreicbygt4kajytlxij24jj6tkg2ppc2dw3dlqhkermkjjfgdfnlizzy";

const TIMELINE_STATUS = {
  ACCEPTING_SUBMISSIONS: "ACCEPTING_SUBMISSIONS",
  EVALUATION: "EVALUATION",
  PROPOSAL_SELECTED: "PROPOSAL_SELECTED",
  CANCELLED: "CANCELLED",
};
/* END_INCLUDE: "includes//common.jsx" */

const Theme = styled.div`
  position: fixed;
  inset: 73px 0px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-top: calc(-1 * var(--body-top-padding));
  background: #f4f4f4;
`;

const Container = styled.div`
  width: 100%;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AppHeader = ({ page }) => (
  <Widget
    src={`${REPL_INFRASTRUCTURE_COMMITTEE}/widget/near-prpsls-bos.components.organism.Navbar`}
    props={{
      page: page,
      ...props,
    }}
  />
);

const AppLayout = ({ page, children }) => {
  return (
    <Theme>
      <Container className="container-xl p-3">
        <AppHeader page={page} />
        <ContentContainer>{children}</ContentContainer>
      </Container>
    </Theme>
  );
};

return { AppLayout };
