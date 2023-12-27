const { href } = VM.require("itexpert120-contra.near/widget/core.lib.url");

href || (href = () => {});

const { kanbanBoards, handle, permissions } = props;
// TODO: Convert this viewer to display the provided data via kanbanBoards

return (
  <Widget
    src="itexpert120-contra.near/widget/devhub.entity.addon.github.configurator"
    props={{
      communityHandle: handle, // rather than fetching again via the handle
      link: href({
        // do we need a link?
        widgetSrc: "itexpert120-contra.near/widget/app",
        params: { page: "community", handle },
      }),
      permissions,
    }}
  />
);
