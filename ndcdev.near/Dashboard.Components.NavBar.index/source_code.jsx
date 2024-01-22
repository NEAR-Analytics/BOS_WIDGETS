const { assets } = VM.require(`ndcdev.near/widget/Dashboard.Config`);
const { NavBar } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.NavBar.styled`,
);

return (
  <NavBar>
    <a href={`/ndcdev.near/widget/Dashboard.App?page=home`}>
      <div className="d-flex gap-3 align-items-center">
        <img src={assets.logoWhite} />
        <div className="header-text">NDC DASHBOARD</div>
      </div>
    </a>
    <div className="color-text">FOR PEOPLE BY PEOPLE</div>
  </NavBar>
);
