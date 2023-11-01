const { id } = props;

const { Page } =
  VM.require("devhub.efiz.near/widget/devhub.entity.addon.blog.Page") ||
  (() => <></>);

return (
  <Widget
    src="devhub.efiz.near/widget/devhub.entity.post.Postv2"
    props={{ postKey: id, template: (p) => <Page {...(p || {})} /> }}
  />
);
