const daoId = "marmaj-research.sputnik-dao.near";

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Item = styled.div``;

return (
  <>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    {context.accountId && (
      <div className="text-bg-light rounded-4 p-3 mb-3">
        <a
          href={`#/mob.near/widget/ProfilePage`}
          className="text-decoration-none link-dark"
        >
          <Widget
            src="mob.near/widget/Profile.InlineBlock"
            props={{ accountId: context.accountId }}
          />
        </a>
      </div>
    )}
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <div>
        <div className="mb-3">
          <Widget
            src="shemar268abel.near/widget/Profile.InlineBlock"
            props={{ accountId: daoId }}
          />
        </div>
        <div
          className="mb-2 d-flex gap-2 flex-wrap"
          style={{ justifyContent: "center" }}
        >
          <a
            className="btn btn-outline-secondary border-0"
            href="#/mob.near/widget/ProfilePage?accountId=bac-inc.near"
          >
            <i className="bi bi-person-circle"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://t.me/BAC_inc/1"
          >
            <i className="bi bi-telegram"></i>
          </a>
          <a
            className="btn btn-outline-secondary border-0"
            href="https://github.com/MarmaJFoundation"
          >
            <i className="bi bi-github"></i>
          </a>
          <a className="btn btn-outline-secondary border-0" href="#">
            <i className="bi bi-twitter"></i>
          </a>
          <a className="btn btn-outline-secondary border-0" href="#">
            <i className="bi bi-wikipedia"></i>
          </a>
        </div>
        <Widget
          src="shemar268abel.near/widget/FungibleTokenBalance"
          props={{ accountId: daoId }}
        />
      </div>
    </div>
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <h3>Followers</h3>
      <Widget src="near/widget/FollowersList" props={{ accountId: daoId }} />
    </div>
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <Widget
        src="astraplusplus.ndctools.near/widget/DAO.Proposals.index"
        props={{ daoId }}
      />
    </div>
    <div className="text-bg-light rounded-4 p-3 mb-3">
      <Widget
        src="shemar268abel.near/widget/DAO.Members.index"
        props={{ daoId }}
      />
    </div>
    {/*<div className="text-bg-light rounded-4 p-3 mb-3">
      <Widget
        src="nearhorizon.near/widget/Project.ListPage"
        props={{ daoId }}
      />
    </div>*/}
  </>
);
