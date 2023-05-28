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

const WrapperWidget = ({ children, id, storageType }) => {
  // This function handles the state change for the children widgets
  const handleStateChange = (key, value) => {
    // Use the unique identifier to create a unique storage key
    const storageKey = `${id}_${key}`;

    if (storageType === "local") {
      // Update the local storage with the new state
      localStorage.setItem(storageKey, JSON.stringify(value));
    } else if (storageType === "sync") {
      // Update the sync storage with the new state
      // Replace this with the appropriate API call for your sync storage
      syncStorage.setItem(storageKey, JSON.stringify(value));
    }
  };

  // This function initializes the state of the children widgets
  const initState = (key, defaultValue) => {
    // Use the unique identifier to create a unique storage key
    const storageKey = `${id}_${key}`;

    let storedValue;
    if (storageType === "local") {
      storedValue = localStorage.getItem(storageKey);
    } else if (storageType === "sync") {
      // Retrieve the value from sync storage
      // Replace this with the appropriate API call for your sync storage
      storedValue = syncStorage.getItem(storageKey);
    }

    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  };

  // Render the children widgets and pass the state management functions as props
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { handleStateChange, initState })
  );
};/* END_INCLUDE: "common.jsx" */

return props.post === undefined ? (
  "Loading ..."
) : (
  <>
    <a className="btn btn-outline-dark" href={href("Post", { id: props.post })}>
      View Developer Governance post
    </a>
  </>
);
