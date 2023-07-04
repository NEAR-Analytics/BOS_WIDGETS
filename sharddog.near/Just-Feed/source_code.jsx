return (
  <>
    <div className="tab-content row" id="pills-tabContent">
      <div
        className="tab-pane d-lg-block col-lg-auto"
        id="pills-graph"
        role="tabpanel"
        aria-labelledby="pills-graph-tab"
      ></div>
      <div
        className="tab-pane show active d-lg-block col-lg-auto"
        id="pills-posts"
        role="tabpanel"
        aria-labelledby="pills-posts-tab"
      >
        <Widget src="mob.near/widget/MainPage.Content" />
      </div>
    </div>
  </>
);
