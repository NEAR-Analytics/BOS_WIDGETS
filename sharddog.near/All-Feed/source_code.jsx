return (
  <>
    <div className="row">
      <div
        className="tab-content col-sm-12 offset-sm-12 top-0"
        id="pills-tabContent"
      >
        <div
          className="tab-pane  d-lg-block "
          id="pills-graph"
          role="tabpanel"
          aria-labelledby="pills-graph-tab"
        ></div>
        <div
          className="tab-pane show active d-lg-block "
          id="pills-posts"
          role="tabpanel"
          aria-labelledby="pills-posts-tab"
        >
          <Widget src="sharddog.near/widget/AllFeed.Main.Content" />
        </div>
      </div>
    </div>
  </>
);
