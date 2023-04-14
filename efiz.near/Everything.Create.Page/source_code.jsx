const accountId = context.accountId;

State.init({
  hashtag: "",
});

const createThing = () => {
  Social.set(
    {
      widget: {
        [`${state.hashtag}.Summary.Page`]: {
          "": `return (<p>Go configure your <a href="/#/edit/${accountId}/widget/${state.hashtag}.Summary.Page">summary widget</a>!</p>);`,
        },
        [`${state.hashtag}.View.Page`]: {
          "": `return (<p>Go configure your <a href="/#/edit/${accountId}/widget/${state.hashtag}.View.Page">view widget</a>!</p>);`,
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
