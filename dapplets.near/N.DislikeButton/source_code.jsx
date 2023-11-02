const item = props.item;

if (!item) {
  return "";
}

useEffect(() => {
  State.update({ hasLike: null });
}, [item]);

const likes = Social.index("like", item);

const dataLoading = likes === null;

const likesByUsers = {};

(likes || []).forEach((like) => {
  if (like.value.type === "like") {
    likesByUsers[like.accountId] = like;
  } else if (like.value.type === "unlike") {
    delete likesByUsers[like.accountId];
  }
});
if (state.hasLike === true) {
  likesByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.hasLike === false) {
  delete likesByUsers[context.accountId];
}

const accountsWithLikes = Object.keys(likesByUsers);
const likeCount = accountsWithLikes.length;
const hasLike = context.accountId && !!likesByUsers[context.accountId];

const heartSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-thumb-down"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
  </svg>
);

const heartFillSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-thumb-down-filled"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path
      d="M13 21.008a3 3 0 0 0 2.995 -2.823l.005 -.177v-4h2a3 3 0 0 0 2.98 -2.65l.015 -.173l.005 -.177l-.02 -.196l-1.006 -5.032c-.381 -1.625 -1.502 -2.796 -2.81 -2.78l-.164 .008h-8a1 1 0 0 0 -.993 .884l-.007 .116l.001 9.536a1 1 0 0 0 .5 .866a2.998 2.998 0 0 1 1.492 2.396l.007 .202v1a3 3 0 0 0 3 3z"
      stroke-width="0"
      fill="currentColor"
    ></path>
    <path
      d="M5 14.008a1 1 0 0 0 .993 -.883l.007 -.117v-9a1 1 0 0 0 -.883 -.993l-.117 -.007h-1a2 2 0 0 0 -1.995 1.852l-.005 .15v7a2 2 0 0 0 1.85 1.994l.15 .005h1z"
      stroke-width="0"
      fill="currentColor"
    ></path>
  </svg>
);

const LikeButton = styled.div`
  line-height: 20px;
  min-height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  background: inherit;
  color: inherit;
  font-size: 16px;
  .icon {
    position: relative;
    &:before {
      margin: -8px;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border-radius: 50%;
    }
  }

  .count {
    margin-left: 8px;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &:not([disabled]):hover {
    opacity: 1 !important;
    color: red;

    .icon:before {
      background: rgba(255, 0, 0, 0.1);
    }
  }
  .liked {
    color: red;
  }

  .loading {
    @keyframes scaleAnimation {
     0%, 100% {
        transform: scale(1) rotate(0deg);
      }
      25% {
        transform: scale(1.2) rotate(-15deg);
      }
      50% {
        transform: scale(1) rotate(0deg);
      }
      75% {
        transform: scale(1.2) rotate(15deg);
      }
    }

    transform-origin: center;
    animation: scaleAnimation 1s ease-in-out infinite;
  }
`;

const likeClick = () => {
  if (state.loading || dataLoading || !context.accountId) {
    return;
  }
  State.update({
    loading: true,
  });
  const data = {
    index: {
      like: JSON.stringify({
        key: item,
        value: {
          type: hasLike ? "unlike" : "like",
        },
      }),
    },
  };

  if (!hasLike && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "like",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasLike: !hasLike }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = hasLike ? "Unlike" : "Like";

return (
  <div className="d-inline-flex align-items-center">
    <LikeButton
      disabled={state.loading || dataLoading || !context.accountId}
      title={title}
      onClick={likeClick}
    >
      <span
        className={`icon ${state.loading ? "loading " : ""}${
          hasLike ? "liked" : ""
        }`}
      >
        {hasLike ? heartFillSvg : heartSvg}
      </span>
      <span className={`count ${hasLike ? "liked" : ""}`}>
        <Widget
          loading={likeCount || ""}
          src="mob.near/widget/N.Overlay.Faces"
          props={{ accounts: likesByUsers, limit: 10 }}
        />
      </span>
    </LikeButton>
  </div>
);
