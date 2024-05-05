if (!context.accountId) {
  return "Debes iniciar sesión";
}

const composeData = () => {};
State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
});
return (
  <>
    <div style={{ margin: "0 -12px" }}>
      <Widget
        src="ceemalvarezji.near/widget/N.InputComentario"
        props={{
          placeholder: "¿Qué estás pensando?",
          onChange: state.onChange,

          composeButton: (onCompose) => (
            <CommitButton
              disabled={!state.content}
              force
              className="btn btn-primary rounded-5"
              data={composeData}
              onCommit={() => {
                onCompose();
              }}
            >
              Comentar
            </CommitButton>
          ),
        }}
      />
    </div>
    {state.content && (
      <Widget
        src="mob.near/widget/MainPage.N.Post"
        props={{
          accountId: context.accountId,
          content: state.content,
          blockHeight: "now",
        }}
      />
    )}
  </>
);
