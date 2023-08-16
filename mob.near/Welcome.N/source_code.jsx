const Nav = styled.div`
  .nav-pills {
    background: rgba(0, 0, 0, 0.02);
    font-weight: 500;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-pills-link-active-color: var(--bs-nav-link-color);
    --bs-nav-pills-link-active-bg: rgba(13, 110, 253, 0.1);
  }
  .nav-item:hover {
    background: rgba(13, 110, 253, 0.15);
  }

  margin: -24px -12px 0;
  border-bottom: 2px solid #ccc;
`;
return (
  <>
    <Nav className="">
      <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pills-feed-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-feed"
            type="button"
            role="tab"
            aria-controls="pills-feed"
            aria-selected="true"
          >
            Feed
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-explore-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-explore"
            type="button"
            role="tab"
            aria-controls="pills-explore"
            aria-selected="false"
          >
            Menu
          </button>
        </li>
      </ul>
    </Nav>
    <div className="tab-content row p-0" id="pills-tabContent">
      <div
        className="tab-pane show active d-lg-block col-lg-8"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Widget src="mob.near/widget/MainPage.N.Content" props={props} />
      </div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      >
        <Widget src="mob.near/widget/Welcome.RHS" props={props} />
      </div>
    </div>
  </>
);
