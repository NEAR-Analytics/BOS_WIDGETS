const item = props.item;

if (!item) {
  return "";
}

const reposts = Social.index("repost", item);

const dataLoading = reposts === null;

const repostsByUsers = Object.fromEntries(
  (reposts || [])
    .filter((repost) => repost.value.type === "repost")
    .map((repost) => [repost.accountId, repost])
);

if (state.hasRepost === true) {
  repostsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
}

const accountsWithReposts = Object.keys(repostsByUsers);
const hasRepost = context.accountId && !!repostsByUsers[context.accountId];

const RepostButton = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  fill: currentColor;
  svg {
    margin-top: -0.2em;
  }
  &:hover {
    color: rgb(0, 184, 124);
    background: rgb(0, 184, 124, 0.1);
  }
  .reposted {
    color: rgb(0, 184, 124);
  }
`;

const repostClick = () => {
  if (state.loading) {
    return;
  }
  State.update({
    loading: true,
  });
  const reposts = [
    {
      key: "main",
      value: {
        type: "repost",
        item,
      },
    },
  ];
  if (!hasRepost) {
    reposts.push({
      key: item,
      value: {
        type: "repost",
      },
    });
  }
  const data = {
    index: {
      repost: JSON.stringify(reposts),
    },
  };

  if (!hasRepost && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "repost",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasRepost: true }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = "Repost";

// const repostSvg = (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 0 576 512">
//     <path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z" />
//   </svg>
// );

const repostSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="rotate(180, 12, 12), translate(0, 4)"
    />
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="translate(0, 4)"
    />
  </svg>
);

return (
  <div className="align-items-center">
    <RepostButton
      disabled={state.loading || dataLoading || !context.accountId}
      className="btn me-1"
      title={title}
      onClick={repostClick}
    >
      {state.loading || dataLoading ? (
        <span
          className="spinner-grow spinner-grow-sm p-2"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <span className={`bi fs-4 ${hasRepost ? "reposted" : ""}`}>
          {repostSvg}
        </span>
      )}
    </RepostButton>
    <div className="align-items-center text-center">
      {accountsWithReposts.length}
    </div>
  </div>
);
