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
        <h4>Learn More</h4>
        <div className="mb-2 d-flex gap-2 flex-wrap">
          <a className="btn btn-outline-primary" href="#">
            What's Bac Inc?
          </a>
          <a
            className="btn btn-outline-primary"
            href="https://bac-inc.near.social"
          >
            Community Dao
          </a>
        </div>
        <div className="mb-2 d-flex gap-2 flex-wrap">
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
      </div>
    </div>
    <div className="text-bg-light rounded-4">
      <Widget src="shemar268abel.near/widget/DAO.Funds.index" />
    </div>
  </>
);
