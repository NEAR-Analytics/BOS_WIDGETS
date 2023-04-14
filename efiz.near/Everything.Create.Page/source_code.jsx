const accountId = context.accountId;

State.init({
  hashtag: "",
});

const createThing = () => {
  Social.set(
    {
      widget: {
        [`${state.hashtag}.View.Page`]: {
          "": `return (<Widget src="efiz.near/widget/TaggedWidgets" props={{hashtag: props.hashtag}} />);`,
        },
      },
    },
    {
      force: true,
    }
  );
};

return (
  <div>
    <Widget
      src="contribut3.near/widget/Inputs.Text"
      props={{
        label: "Hashtag",
        placeholder: "ABC",
        value: state.hashtag,
        onChange: (hashtag) => State.update({ hashtag }),
      }}
    />
    <div>
      <button onClick={createThing} disabled={state.hashtag === ""}>
        Create Page
      </button>
    </div>
  </div>
);
