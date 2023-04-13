const title = props.title;
const description = props.description;

const accountId = props.accountId;

return (
  <div className="border-bottom pt-3 pb-1">
    <Widget
      src="hack.near/widget/Everything.Summary.Post.Content"
      props={{ title, description }}
    />
  </div>
);
