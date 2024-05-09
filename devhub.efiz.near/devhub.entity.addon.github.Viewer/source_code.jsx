const { href } = VM.require("devhub.efiz.near/widget/core.lib.url");

href || (href = () => {});

const { kanbanBoards, handle, permissions } = props;
// TODO: Convert this viewer to display the provided data via kanbanBoards

return (
  <Widget
    src="devhub.efiz.near/widget/devhub.entity.addon.github.configurator"
    props={{
      communityHandle: handle, // rather than fetching again via the handle
      link: href({
        // do we need a link?
        widgetSrc: "devhub.efiz.near/widget/app",
        params: { page: "community", handle },
      }),
      permissions,
    }}
  />
);
