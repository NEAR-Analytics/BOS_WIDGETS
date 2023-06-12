/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "jgdev.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

return (
  <div
    class="card mb-2"
    style={{
      boxShadow: "1px 1px 3px rgba(0, 128, 128, 0.33)",
      overflow: "hidden",
    }}
  >
    <div class="nav navbar bg-body-tertiary">
      <div class="container-fluid">
        <div class="d-flex flex-row align-items-center justify-content-around">
          <div
            class="navbar-brand d-none d-sm-block"
            style={{ height: "2.5em", width: "2.5em", minWidth: "2.5em" }}
          >
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                metadata,
                accountId,
                widgetName,
                style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
                className: "me-3",
              }}
            />
          </div>
          <div class="nav navbar-brand h3 d-none d-sm-block me-3">Create</div>
          <div class="d-flex flex-row justify-content-around">
            <ul class="navbar-nav flex-row">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  data-bs-toggle="collapse tooltip"
                  title="Idea"
                  href={`#collapseIdeaEditorNavbar`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseIdeaEditorNavbar`}
                >
                  <i
                    class="bi-lightbulb-fill"
                    style={{
                      fontSize: "30px",
                      padding: "7px",
                      color: "rgb(0,128,128)",
                    }}
                  >
                    {" "}
                  </i>
                  <span class="d-none d-sm-inline">Idea</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-bs-toggle="collapse tooltip"
                  title="Solution"
                  href={`#collapseSubmissionEditorNavbar`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseSubmissionEditorNavbar`}
                >
                  <i
                    class="bi-rocket-fill"
                    style={{
                      fontSize: "30px",
                      padding: "7px",
                      color: "rgb(0,128,128)",
                    }}
                  >
                    {" "}
                  </i>
                  <span class="d-none d-sm-inline">Solution</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-bs-toggle="collapse tooltip"
                  title="Attestation"
                  href={`#collapseAttestationEditorNavbar`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseAttestationEditorNavbar`}
                >
                  <i
                    class="bi-check-circle-fill"
                    style={{
                      fontSize: "30px",
                      padding: "7px",
                      color: "rgb(0,128,128)",
                    }}
                  >
                    {" "}
                  </i>
                  <span class="d-none d-sm-inline">Attestation</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-bs-toggle="collapse tooltip"
                  title="Sponsorship"
                  href={`#collapseSponsorshipEditorNavbar`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseSponsorshipEditorNavbar`}
                >
                  <i
                    class="bi-cash-coin"
                    style={{
                      fontSize: "30px",
                      padding: "7px",
                      color: "rgb(0,128,128)",
                    }}
                  >
                    {" "}
                  </i>
                  <span class="d-none d-sm-inline">Sponsorship</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row" id={`accordionNavbar`}>
        <div
          class="collapse"
          id={`collapseCommentEditorNavbar`}
          data-bs-parent={`#accordionNavbar`}
        >
          {widget("components.posts.PostEditor", {
            postType: "Comment",
            parentId: null,
            labels: props.labels,
          })}
        </div>
        <div
          class="collapse"
          id={`collapseIdeaEditorNavbar`}
          data-bs-parent={`#accordionNavbar`}
        >
          {widget("components.posts.PostEditor", {
            postType: "Idea",
            parentId: null,
            labels: props.labels,
          })}
        </div>
        <div
          class="collapse"
          id={`collapseSubmissionEditorNavbar`}
          data-bs-parent={`#accordionNavbar`}
        >
          {widget("components.posts.PostEditor", {
            postType: "Submission",
            parentId: null,
            labels: props.labels,
          })}
        </div>
        <div
          class="collapse"
          id={`collapseAttestationEditorNavbar`}
          data-bs-parent={`#accordionNavbar`}
        >
          {widget("components.posts.PostEditor", {
            postType: "Attestation",
            parentId: null,
            labels: props.labels,
          })}
        </div>
        <div
          class="collapse"
          id={`collapseSponsorshipEditorNavbar`}
          data-bs-parent={`#accordionNavbar`}
        >
          {widget("components.posts.PostEditor", {
            postType: "Sponsorship",
            parentId: null,
            labels: props.labels,
          })}
        </div>
      </div>
    </div>
  </div>
);
