const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please log in with NEAR";
}

const project = props.project ?? Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading...";
}

const featuredWidget = project.featuredWidget;

State.init({
  loadGroups: false,
  loadComments: false,
});

return (
  <>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="pills-widget-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-widget"
          type="button"
          role="tab"
          aria-controls="pills-widget"
          aria-selected="true"
        >
          Widget
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-comments-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-comments"
          type="button"
          role="tab"
          aria-controls="pills-comments"
          aria-selected="false"
          onClick={() => {
            !state.loadComments && State.update({ loadComments: true });
          }}
        >
          Discussion
        </button>
      </li>
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade in show active"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        <Widget src={featuredWidget} />
      </div>
      <div
        className="tab-pane fade comments"
        id="pills-comments"
        role="tabpanel"
        aria-labelledby="pills-comments-tab"
      >
        <Widget src="devgovgigs.near/widget/Ideas" props={{ accountId }} />
      </div>
    </div>
  </>
);
