const accountId = props.accountId ?? context.accountId;

const project = props.project ?? Social.getr(`${accountId}/project`);

const featuredWidget = project.featuredWidget;

if (project === null) {
  return { showEditButton };
}

const showEditButton =
  project !== undefined &&
  (!props.project || props.showEditButton) &&
  accountId &&
  accountId === context.accountId;

return (
  <>
    {showEditButton && (
      <a
        href="#/create.near/widget/PageEditor"
        className="btn mt-4 btn-outline-light float-end position-relative"
        style={{ zIndex: 1 }}
      >
        Edit Page
      </a>
    )}
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
          Featured Widget
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
