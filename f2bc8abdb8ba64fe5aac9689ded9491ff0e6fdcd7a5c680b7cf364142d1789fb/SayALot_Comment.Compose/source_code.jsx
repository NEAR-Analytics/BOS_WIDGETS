const isDebug = props.isDebug;

const addressForComments = isDebug
  ? "test_sayalot-comments"
  : "sayalot-comments";
const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
if (!context.accountId) {
  return "";
}

const item = props.item;

if (!context.accountId) {
  return "";
}

const composeCommentData = () => {
  const data = {
    [addressForArticles]: {
      [addressForComments]: JSON.stringify(
        Object.assign({ item }, state.content)
      ),
    },
    index: {
      [addressForComments]: JSON.stringify({
        key: item,
        value: {
          type: "md",
        },
      }),
    },
  };

  return data;
};

State.init({
  content: "",
  onChange: ({ content }) => {
    State.update({ content });
  },
});

return (
  <>
    <Widget
      src="mob.near/widget/Common.Compose"
      props={{
        placeholder: "Reply",
        initialText: props.initialText,
        onChange: state.onChange,
        onHelper: ({ extractTagNotifications }) => {
          State.update({ extractTagNotifications });
        },
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="btn btn-dark rounded-3"
            data={composeCommentData}
            onCommit={() => {
              onCompose();
              props.onComment && props.onComment(state.content);
            }}
          >
            Comment
          </CommitButton>
        ),
      }}
    />
    {state.content && (
      <div className="mt-3">
        <Widget
          src={`${authorForWidget}/widget/SayALot_Comment`}
          props={{
            item,
            accountId: context.accountId,
            content: state.content,
            blockHeight: "now",
            isDebug,
          }}
        />
      </div>
    )}
  </>
);
