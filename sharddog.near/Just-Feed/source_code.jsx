return (
  <>
    <div className="row">
      <div className="col-sm-1 position-sticky top-0" id="sharddogs">
        <Widget src="sharddog.near/widget/Sharddog" />
      </div>
      <div
        className="tab-content col-sm-10 offset-sm-12 border-left top-0"
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
          <Widget src="sharddog.near/widget/JustFeed.MainPage.Content" />
        </div>
      </div>
    </div>
  </>
);
