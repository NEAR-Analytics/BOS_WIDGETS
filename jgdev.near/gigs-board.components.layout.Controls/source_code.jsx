/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

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

const WrapperWidget = ({ children, id }) => {
  const storageType = "local"; // Hard-coded storage type

  // This function handles the state change for the children widgets
  const handleStateChange = (key, value) => {
    // Use the unique identifier to create a unique storage key
    const storageKey = `${id}_${key}`;

    console.log(`Setting value for ${storageKey}: `, value); // Console log added here

    // Update the local storage with the new state
    localStorage.setItem(storageKey, JSON.stringify(value));
    console.log(`State saved in local storage for ${storageKey}`); // Console log added here
  };

  // This function initializes the state of the children widgets
  const initState = (key, defaultValue) => {
    // Use the unique identifier to create a unique storage key
    const storageKey = `${id}_${key}`;

    let storedValue = localStorage.getItem(storageKey);
    console.log(
      `Retrieved value from local storage for ${storageKey}: `,
      storedValue
    ); // Console log added here

    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (e) {
        console.error("Error parsing JSON from storage", e);
      }
    }
    return defaultValue;
  };

  // Render the children widgets and pass the state management functions as props
  return React.Children.map(children, (child) =>
    child && typeof child === "object"
      ? React.cloneElement(child, { handleStateChange, initState })
      : child
  );
};
/* END_INCLUDE: "common.jsx" */

return (
  <div className="card border-secondary mb-2">
    <div className="nav navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div
          className="navbar-brand"
          style={{ height: "2.5em", width: "2.5em", minWidth: "2.5em" }}
        >
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              metadata,
              accountId,
              widgetName,
              style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
              className: "me-2",
            }}
          />
        </div>
        <div className="nav navbar-brand h1">Create</div>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                data-bs-toggle="collapse"
                href="#collapseIdeaEditorNavbar"
                role="button"
                aria-expanded="false"
                aria-controls="collapseIdeaEditorNavbar"
              >
                <i className="bi-lightbulb-fill"> </i>
                Idea
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="collapse"
                href="#collapseSubmissionEditorNavbar"
                role="button"
                aria-expanded="false"
                aria-controls="collapseSubmissionEditorNavbar"
              >
                <i className="bi-rocket-fill"> </i>
                Solution
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="collapse"
                href="#collapseAttestationEditorNavbar"
                role="button"
                aria-expanded="false"
                aria-controls="collapseAttestationEditorNavbar"
              >
                <i className="bi-check-circle-fill"> </i>
                Attestation
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                data-bs-toggle="collapse"
                href="#collapseSponsorshipEditorNavbar"
                role="button"
                aria-expanded="false"
                aria-controls="collapseSponsorshipEditorNavbar"
              >
                <i className="bi-cash-coin"> </i>
                Sponsorship
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="row" id="accordionNavbar">
      <div
        className="collapse"
        id="collapseCommentEditorNavbar"
        data-bs-parent="#accordionNavbar"
      >
        <WrapperWidget id={State.commentEditorId}>
          {widget("components.posts.PostEditor", {
            postType: "Comment",
            parentId: null,
            labels: props.labels,
          })}
        </WrapperWidget>
      </div>
      <div
        className="collapse"
        id="collapseIdeaEditorNavbar"
        data-bs-parent="#accordionNavbar"
      >
        <WrapperWidget id={State.ideaEditorId}>
          {widget("components.posts.PostEditor", {
            postType: "Idea",
            parentId: null,
            labels: props.labels,
          })}
        </WrapperWidget>
      </div>
      <div
        className="collapse"
        id="collapseSubmissionEditorNavbar"
        data-bs-parent="#accordionNavbar"
      >
        <WrapperWidget id={State.submissionEditorId}>
          {widget("components.posts.PostEditor", {
            postType: "Submission",
            parentId: null,
            labels: props.labels,
          })}
        </WrapperWidget>
      </div>
      <div
        className="collapse"
        id="collapseAttestationEditorNavbar"
        data-bs-parent="#accordionNavbar"
      >
        <WrapperWidget id={State.attestationEditorId}>
          {widget("components.posts.PostEditor", {
            postType: "Attestation",
            parentId: null,
            labels: props.labels,
          })}
        </WrapperWidget>
      </div>
      <div
        className="collapse"
        id="collapseSponsorshipEditorNavbar"
        data-bs-parent="#accordionNavbar"
      >
        <WrapperWidget id={State.sponsorshipEditorId}>
          {widget("components.posts.PostEditor", {
            postType: "Sponsorship",
            parentId: null,
            labels: props.labels,
          })}
        </WrapperWidget>
      </div>
    </div>
  </div>
);
