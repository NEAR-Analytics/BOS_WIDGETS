const ownerId = "contribut3.near";

const availableContent = ["projects", "proposals", "requests"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "proposals";
  }

  return content;
};

const header = (
  <div>
    <h1 className="fs-2">Manage</h1>
    <p className="fw-semibold fs-5 text-muted">
      Create, edit and manage your projects and contributions
    </p>
  </div>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "entities",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "proposals",
          text: "My Proposals",
          icon: (
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 7.5L13.3333 5M13.3333 5L15.8333 2.5M13.3333 5L18.3333 5M13.3333 17.5V16.5C13.3333 15.0999 13.3333 14.3998 13.0608 13.865C12.8211 13.3946 12.4387 13.0122 11.9683 12.7725C11.4335 12.5 10.7334 12.5 9.33329 12.5H5.66663C4.26649 12.5 3.56643 12.5 3.03165 12.7725C2.56124 13.0122 2.17879 13.3946 1.93911 13.865C1.66663 14.3998 1.66663 15.0999 1.66663 16.5V17.5M10.4166 6.25C10.4166 7.86083 9.11079 9.16667 7.49996 9.16667C5.88913 9.16667 4.58329 7.86083 4.58329 6.25C4.58329 4.63917 5.88913 3.33333 7.49996 3.33333C9.11079 3.33333 10.4166 4.63917 10.4166 6.25Z"
                stroke="#667085"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
        {
          id: "projects",
          text: "My Projects",
          icon: "bi-boxes",
        },
        {
          id: "requests",
          text: "Requests",
          icon: "bi-ui-checks-grid",
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/ProposalsList`}
      props={{
        search: props.search,
        update: props.update,
        accountId: context.accountId,
      }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{
        search: props.search,
        update: props.update,
        accountId: context.accountId,
        isAdmin: true,
      }}
    />
  ),
}[getContent(props.content)];

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
        <Widget
          src={`${ownerId}/widget/CreateNewInput`}
          props={{ update: props.update }}
        />
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        <Widget
          src={`${ownerId}/widget/SearchInput`}
          props={{ search: props.search, update: props.update }}
        />
      </div>
    </div>
    <div className="px-3 pt-3">
      {context.accountId
        ? content
        : "You need to be logged in to view this page!"}
    </div>
  </div>
);
