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
          icon: (
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="24"
                height="24"
                transform="translate(0 0.161133)"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.4 16.1389C23.4 15.6687 23.1997 15.2208 22.8483 14.8928C22.4974 14.5652 22.0241 14.3834 21.5333 14.3834H19.0667L19.0667 13.8049C19.0637 12.9232 18.687 12.0813 18.0238 11.4623C17.361 10.8437 16.4651 10.4972 15.5333 10.4945H13.2333V8.56113H16.2833C16.7741 8.56113 17.2474 8.37929 17.5983 8.05173C17.9497 7.72374 18.15 7.27581 18.15 6.80558V2.91669C18.15 2.44646 17.9497 1.99853 17.5983 1.67053C17.2474 1.34297 16.7741 1.16113 16.2833 1.16113H7.11667C6.62588 1.16113 6.15265 1.34297 5.8017 1.67053C5.45027 1.99853 5.25 2.44646 5.25 2.91669V6.80558C5.25 7.27581 5.45027 7.72374 5.8017 8.05173C6.15265 8.37929 6.62588 8.56113 7.11667 8.56113H11.1667V10.4945L8.86609 10.4945C7.93431 10.4972 7.03899 10.8437 6.37622 11.4623C5.71299 12.0813 5.33627 12.9238 5.33333 13.8056V14.3834H2.86667C2.37588 14.3834 1.90265 14.5652 1.55169 14.8928C1.20027 15.2208 1 15.6687 1 16.1389L1 20.8056C1 21.2758 1.20027 21.7237 1.55169 22.0517C1.90265 22.3793 2.37588 22.5611 2.86667 22.5611H9.86667C10.3575 22.5611 10.8307 22.3793 11.1816 22.0517C11.5331 21.7237 11.7333 21.2758 11.7333 20.8056V16.1389C11.7333 15.6687 11.5331 15.2208 11.1816 14.8928C10.8307 14.5652 10.3575 14.3834 9.86667 14.3834H7.4V13.8056C7.4 13.4507 7.55093 13.1073 7.82462 12.8518C8.09878 12.596 8.4734 12.45 8.86667 12.45L15.5333 12.45C15.9266 12.45 16.3012 12.596 16.5754 12.8518C16.8491 13.1073 17 13.4507 17 13.8056V14.3834H14.5333C14.0425 14.3834 13.5693 14.5652 13.2184 14.8928C12.8669 15.2208 12.6667 15.6687 12.6667 16.1389V20.8056C12.6667 21.2758 12.8669 21.7237 13.2184 22.0517C13.5693 22.3793 14.0425 22.5611 14.5333 22.5611H21.5333C22.0241 22.5611 22.4974 22.3793 22.8483 22.0517C23.1997 21.7237 23.4 21.2758 23.4 20.8056V16.1389ZM14.7333 16.3389H21.3333V20.6056H14.7333V16.3389ZM7.31667 3.11669L16.0833 3.11669V6.60558H7.31667V3.11669ZM3.06667 16.3389H9.66667L9.66667 20.6056H3.06667L3.06667 16.3389Z"
                fill="#667085"
              />
            </svg>
          ),
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
