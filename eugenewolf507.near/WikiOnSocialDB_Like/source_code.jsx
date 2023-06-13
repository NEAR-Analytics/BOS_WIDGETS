const authorForWidget = "eugenewolf507.near";
// Don't forget to put space between emoji and text -> "❤️ Positive"
const initialEmoji = "🤍 Like";
const emojiArray = [
  "❤️ Positive",
  "🙏 Thank you",
  "💯 Definitely",
  "👀 Thinking",
  "🔥 Awesome",
  "👍 Like",
  "🙌 Celebrate",
  "👏 Applause",
  "⚡ Lightning",
];
const item = props.item;
const accountThatIsLoggedIn = context.accountId;

if (!item) {
  return "";
}

State.init({
  emoji: initialEmoji,
  show: false,
  loading: false,
  likes: [],
  unfilteredLikes: [],
});

// =============== CSS Styles ===============
const Button = styled.button`
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  width: 8em;
  height: 2.5em;
  padding: 6px 12px;
  margin: 2px 0;
  border: 0;
  border-radius: .375rem;
  :hover {
    background: #EBEBEB; 
    outline: 1px solid #C6C7C8;
  }
`;

const SmallButton = styled.button`
  border: 0;
  background: transparent;
  position: relative;
  width: 35px;
  height: 35px;
`;

const SmallButtonSpan = styled.span`
  font-size: 19px;
  :hover{
      position: absolute;
      font-size: 35px;
      bottom: -5px;
      width: 35px;
      height: 40px;
      transform: translateX(-50%) translateY(-50%);
  }
`;

// =============== Get Likes ===============
State.update({
  unfilteredLikes: Social.index("like", item, {
    order: "desc",
    subscribe: true,
  }),
});

// arrayLastLikeForEachUser of {accountId, blockHeight, value: {type: "😁 LOL"}}
const uniqueAccounts = {};
const arrayLastLikeForEachUser =
  state.unfilteredLikes &&
  state.unfilteredLikes.filter((obj) => {
    if (!uniqueAccounts[obj.accountId]) {
      uniqueAccounts[obj.accountId] = true;
      return true;
    }
    return false;
  });

const updateEmojiIfUserVoted = () => {
  const resObject = arrayLastLikeForEachUser.find(
    (item) => item.accountId === accountThatIsLoggedIn
  );
  if (resObject) {
    State.update({ emoji: resObject.value.type });
  }
};

arrayLastLikeForEachUser && updateEmojiIfUserVoted();

//likesCount - array of objects {quantity: 1, emoji: '😁', accounts: []}
const getLikesStats = (acc, likeObj) => {
  if (likeObj.value.type === initialEmoji) {
    return acc;
  }
  if (!acc.hasOwnProperty(likeObj.value.type)) {
    acc[likeObj.value.type] = {};
    acc[likeObj.value.type].quantity = 0;
    acc[likeObj.value.type].emoji = likeObj.value.type.slice(0, 2);
    acc[likeObj.value.type].accounts = [];
  }
  acc[likeObj.value.type].quantity += 1;
  acc[likeObj.value.type].accounts = [
    likeObj.accountId,
    ...acc[likeObj.value.type].accounts,
  ];

  return acc;
};
const countLikes = (arr) => Object.values(arr.reduce(getLikesStats, {}));
const likesCount =
  arrayLastLikeForEachUser && countLikes(arrayLastLikeForEachUser);
State.update({ likes: likesCount });

// ================= Mouse Handlers ===============

const handleOnMouseEnter = (e) => {
  State.update({ show: true });
};
const handleOnMouseLeave = (e) => {
  State.update({ show: false });
};

const clickHandler = (emojiMessage) => {
  if (state.loading) {
    return;
  }

  State.update({
    loading: true,
  });
  const emojiToWrite =
    emojiMessage === initialEmoji && state.emoji === initialEmoji
      ? emojiArray[0]
      : emojiMessage;

  const data = {
    index: {
      like: JSON.stringify({
        key: item,
        value: {
          type: emojiToWrite,
        },
      }),
    },
  };
  Social.set(data, {
    onCommit: () => {
      State.update({ emoji: emojiToWrite, loading: false, show: false });
    },
    onCancel: () => State.update({ loading: false, show: false }),
  });
};

// =============== JSX ===============

const overlay = (
  <div
    className="border m-3 p-2 rounded-4 bg-white shadow"
    style={{ maxWidth: "27em", height: "3.2em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    {emojiArray &&
      emojiArray.map((item) => (
        <SmallButton onClick={() => clickHandler(item)}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                <div className="text-truncate text-start">{item.slice(2)}</div>
              </Tooltip>
            }
          >
            <SmallButtonSpan>{item.slice(0, 2)}</SmallButtonSpan>
          </OverlayTrigger>
        </SmallButton>
      ))}
  </div>
);

return (
  <span className="ps-2">
    <OverlayTrigger
      show={state.show}
      trigger={["hover", "focus"]}
      delay={{ show: 250, hide: 300 }}
      placement="auto"
      overlay={overlay}
    >
      <Button
        onClick={() => clickHandler(initialEmoji)}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {state.emoji}
      </Button>
    </OverlayTrigger>
    {state.likes &&
      state.likes.map((item) => (
        <span className="ps-3">
          <Widget
            src={`${authorForWidget}/widget/WikiOnSocialDB_TooltipProfiles`}
            props={{ accounts: item.accounts, emoji: item.emoji }}
          />
        </span>
      ))}
  </span>
);
