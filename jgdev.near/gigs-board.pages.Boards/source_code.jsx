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
};
/* END_INCLUDE: "common.jsx" */

const selectedBoardId = props.selectedBoardId ?? "mnwtransition";

const boards = props.boards ?? [
  {
    name: "near.social",
    id: "nearsocial",
    config: {
      requiredLabels: ["near-social"],
      columns: [
        { label: "widget", title: "Widget" },
        { label: "integration", title: "Integration" },
        { label: "feature-request", title: "Feature Request" },
      ],
      excludedLabels: [],
    },
  },
  {
    name: "Gigs Board",
    id: "gigsboard",
    config: {
      requiredLabels: ["gigs-board"],
      columns: [
        { label: "nep", title: "NEP" },
        { label: "badges", title: "Badges" },
        { label: "feature-request", title: "Feature Request" },
      ],
      excludedLabels: [],
    },
  },
  {
    name: "Funding",
    id: "funding",
    config: {
      requiredLabels: ["funding"],
      columns: [
        { label: "funding-new-request", title: "New Request" },
        {
          label: "funding-information-collection",
          title: "Information Collection",
        },
        { label: "funding-processing", title: "Processing" },
        { label: "funding-funded", title: "Funded" },
      ],
      excludedLabels: [],
    },
  },
];

// Bootstrap tabs documentation: https://getbootstrap.com/docs/5.2/components/navs-tabs
const pageContent = (
  <div>
    <ul class="nav nav-tabs my-3">
      {boards.map((board) => (
        <li class="nav-item" key={board.id}>
          <a
            href={href("Boards", { selectedBoardId: board.id })}
            class={`nav-link ${board.id == selectedBoardId ? "active" : ""}`}
          >
            {board.name}
          </a>
        </li>
      ))}
    </ul>
    <div class="tab-content">
      {boards.map((board) => (
        <div
          class={`tab-pane fade ${
            board.id == selectedBoardId ? "show active" : ""
          }`}
          id={`board${board.id}`}
          role="tabpanel"
          aria-labelledby={`${board.id}-tab`}
          tabindex="0"
          key={board.id}
        >
          {widget("components.boards.KanbanBoard", {
            requiredLabels: board.config.requiredLabels,
            excludedLabels: board.config.excludedLabels,
            columns: board.config.columns,
            boardId: board.id,
          })}
        </div>
      ))}
    </div>
  </div>
);

return widget("components.layout.Page", {
  children: pageContent,
});
