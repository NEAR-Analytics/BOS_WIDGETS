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
const repostCount = accountsWithReposts.length;
const hasRepost = context.accountId && !!repostsByUsers[context.accountId];

const RepostButton = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background: inherit;
  &:hover {
    opacity: 1 !important;
    color: rgb(0, 184, 124);
    background: rgb(0, 184, 124, 0.1);
  }
  .count {
    margin-left: 8px;
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

const repostSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="0.5"
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
  <div className="d-inline-flex align-items-center">
    <RepostButton
      disabled={state.loading || dataLoading || !context.accountId}
      title={title}
      onClick={repostClick}
    >
      <span className={hasRepost ? "reposted" : ""}>{repostSvg}</span>
      <span className="count">{repostCount || ""}</span>
    </RepostButton>
  </div>
);
