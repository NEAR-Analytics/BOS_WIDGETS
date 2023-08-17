const { isTest, authorForWidget, elementReactedId } = props;
// Don't forget to put space between emoji and text -> "❤️ Positive"
const initialEmoji = "🤍 Like";
// It is important that 'Heart' Positive emoji is first
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
  "⋈ Bowtie",
];

const accountThatIsLoggedIn = context.accountId;

const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.emojis`];

function callLibs(srcArray, stateUpdate, libCalls) {
  return (
    <>
      {srcArray.map((src) => {
        return (
          <Widget
            src={src}
            props={{
              isTest,
              stateUpdate,
              libCalls,
            }}
          />
        );
      })}
    </>
  );
}

const prodAction = "sayALotArticle";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

const libCalls = [
  {
    functionName: "getReactionsData",
    key: "reactionsData",
    props: {
      elementReactedId,
      createdReaction: state.createReaction,
    },
  },
];

State.init({
  emoji: undefined,
  reactionsData: { reactionsStatistics: [], userReaction: undefined },
  show: false,
  loading: false,
  libCalls,
});

// ========= UPDATE REACTION STATISTICS IF USER VOTED RIGHT NOW=========
function updateReactionsStatisticsIfUserVoted(newEmoji) {
  let currentReactionsStatistics = state.reactionsData.reactionsStatistics;
  console.log("currentReactionsStatistics: ", currentReactionsStatistics);

  const oldReactionStat = currentReactionsStatistics.find((item) =>
    item.accounts.includes(accountThatIsLoggedIn)
  );
  console.log("oldReactionStat: ", oldReactionStat);

  console.log("newEmoji: ", newEmoji);

  let reactedStat = currentReactionsStatistics.find((item) =>
    newEmoji.includes(item.text)
  );
  console.log("reactedStat: ", reactedStat);

  let everyOtherReactionStat = currentReactionsStatistics.filter((item) => {
    !item.accounts.includes(accountThatIsLoggedIn) &&
      !newEmoji.includes(item.text);
  });
  console.log("everyOtherReactionStat: ", everyOtherReactionStat);

  let newReactionsStatistics;

  function getNewStatForEmojiReacted() {
    return {
      accounts: [...reactedStat.accounts, accountThatIsLoggedIn],
      emoji: reactedStat.emoji,
      quantity: reactedStat.quantity++,
      text: reactedStat.text,
    };
  }
  if (oldReactionStat) {
    let newAccountsForOldReactionStat = oldReactionStat.filter((acc) => {
      acc != accountThatIsLoggedIn;
    });
    console.log(
      "newAccountsForOldReactionStat: ",
      newAccountsForOldReactionStat
    );

    let newValueForOldReactionStat = {
      accounts: newAccountsForOldReactionStat,
      emoji: oldReactionStat.emoji,
      quantity: oldReactionStat.quantity - 1,
      text: oldReactionStat.text,
    };

    newReactionsStatistics = [
      ...everyOtherReactionStat,
      getNewStatForEmojiReacted(),
      newValueForOldReactionStat,
    ];
  } else {
    newReactionsStatistics = [
      ...everyOtherReactionStat,
      getNewStatForEmojiReacted(),
    ];
  }
  console.log("newReactionsStatistics: ", newReactionsStatistics);

  State.update({
    reactionsStatistics: newReactionsStatistics,
    loading: false,
    show: false,
  });
}

// ================= Mouse Handlers ===============

function handleOnMouseEnter() {
  State.update({ show: true });
}

function handleOnMouseLeave() {
  State.update({ show: false });
}

function onPushEnd() {
  State.update({ loading: false, show: false });
}

function reactListener(emojiMessage) {
  if (state.loading) {
    return;
  }
  State.update({
    loading: true,
  });

  // decide to put unique emoji or white heart (unreaction emoji)
  const emojiToWrite =
    emojiMessage === initialEmoji &&
    state.reactionsData.userReaction.value.reaction === initialEmoji
      ? emojiArray[0]
      : emojiMessage;

  function onCommit() {
    updateReactionsStatisticsIfUserVoted(emojiToWrite);
  }

  const newLibCalls = [...state.libCalls];
  newLibCalls.push({
    functionName: "createReaction",
    key: "createReaction",
    props: {
      elementReactedId,
      reaction: emojiToWrite,
      onCommit,
      onCancel: onPushEnd,
    },
  });
  State.update({ libCalls: newLibCalls });

  // let data;

  // if (isTest) {
  //   data = {
  //     index: {
  //       test_reaction: JSON.stringify({
  //         key: item,
  //         value: {
  //           type: emojiToWrite,
  //         },
  //       }),
  //     },
  //   };
  // } else {
  //   data = {
  //     index: {
  //       reaction: JSON.stringify({
  //         key: item,
  //         value: {
  //           type: emojiToWrite,
  //         },
  //       }),
  //     },
  //   };
  // // }

  // Social.set(data, {
  //   onCommit: () => {
  //     updateReactionsStatisticsIfUserVoted(emojiToWrite);
  //     State.update({ emoji: emojiToWrite, loading: false, show: false });
  //   },
  //   onCancel: () => State.update({ loading: false, show: false }),
  // });
}

function reactionsStateUpdate(obj) {
  State.update(obj);
}

function showWhenCalled(objText) {
  return state.showReactionsListModal == objText
    ? { display: "block", backdropFilter: "blur(3px)", cursor: "auto" }
    : {};
}

// =============== CSS Styles ===============
const Button = styled.button`
  min-width: fit-content;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: start;
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

const SmallReactButton = styled.button`
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  width: fit-content;
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
position: relative;
  border: 0;
  background: transparent;
  width: 35px;
  height: 35px;
  color: ${({ isHeart }) => (isHeart ? "red" : "")};
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
  
  @media (max-width: 599px) {
      ::before { 
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, .4);
          content: "";}
      :hover{
      ::before { 
          position: absolute;
          width: 100%;
          height: 120%;
          background-color: rgba(255, 255, 255, .4);
          content: "";}
  }
      
  }
`;

// =============== NEW CSS Styles ===============!!!!!!!!
const EmojiWrapper = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible !important;
  padding-left: 8px;
`;

const EmojiListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
  position: absolute;
  right: 0;
  width: 370px;
  max-width: 35vw;
  flex-wrap: wrap;
  display: ${({ show }) => (show ? "flex" : "none")};
  transform: translateY(-10%);
  zIndex: 2;
`;

const SpinnerContainer = styled.div`
  height: 1rem;
  width: 1rem;
  marginTop: 2px;
`;

const CallLibrary = styled.div`
  display: none;
`;

// =============== NEW JSX ===============!!!!!!!!
const Overlay = () => {
  return (
    <EmojiListWrapper
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      show={state.show}
    >
      {emojiArray &&
        emojiArray.map((item) => {
          return (
            <SmallButton
              onClick={() => reactListener(item)}
              isHeart={index === 0}
            >
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div className="text-truncate text-start">
                      {item.slice(2)}
                    </div>
                  </Tooltip>
                }
              >
                <SmallButtonSpan>{item.slice(0, 2)}</SmallButtonSpan>
              </OverlayTrigger>
            </SmallButton>
          );
        })}
    </EmojiListWrapper>
  );
};

const Spinner = () => {
  return (
    <SpinnerContainer className="spinner-border text-secondary" role="status">
      <span className="sr-only" title="Loading..."></span>
    </SpinnerContainer>
  );
};

const renderReaction = (item, isInButton) => {
  return (
    ((item.accounts.includes(context.accountId) && isInButton) ||
      (!item.accounts.includes(context.accountId) && !isInButton)) && (
      <span>
        <Widget
          className={isInButton ? "ps-3" : ""}
          src={`testwiki.near/widget/WikiOnSocialDB_TooltipProfiles`}
          props={{ accounts: item.accounts, emoji: item.emoji }}
        />
      </span>
    )
  );
};

return (
  <>
    <EmojiWrapper>
      {!state.reactionsData.userReaction ? (
        <Button
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          {state.loading && <Spinner />}
          {initialEmoji}
        </Button>
      ) : (
        <SmallReactButton
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          {state.loading && <Spinner />}
          {state.reactionsData.reactionsStatistics &&
            state.reactionsData.reactionsStatistics.map((item) =>
              renderReaction(item, true)
            )}
        </SmallReactButton>
      )}
      <Overlay />
      {state.reactionsData.reactionsStatistics &&
        state.reactionsData.reactionsStatistics.map((item) =>
          renderReaction(item, false)
        )}
    </EmojiWrapper>

    <CallLibrary>
      {callLibs(
        libSrcArray,
        reactionsStateUpdate,
        state.libCalls,
        initialEmoji
      )}
    </CallLibrary>
  </>
);
