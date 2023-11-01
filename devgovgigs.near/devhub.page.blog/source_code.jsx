const { id } = props;

const { Page } =
  VM.require("devgovgigs.near/widget/devhub.entity.addon.blog.Page") ||
  (() => <></>);

return (
  <Widget
    src="devgovgigs.near/widget/devhub.entity.post.Postv2"
    props={{ postKey: id, template: (p) => <Page {...(p || {})} /> }}
  />
);
