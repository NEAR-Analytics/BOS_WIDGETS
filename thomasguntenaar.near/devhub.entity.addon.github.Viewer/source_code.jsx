const { href } = VM.require("thomasguntenaar.near/widget/core.lib.url");

href || (href = () => {});

const { kanbanBoards, handle, permissions } = props;
// TODO: Convert this viewer to display the provided data via kanbanBoards

return (
  <Widget
    src="thomasguntenaar.near/widget/devhub.entity.addon.github.configurator"
    props={{
      communityHandle: handle, // rather than fetching again via the handle
      link: href({
        // do we need a link?
        widgetSrc: "thomasguntenaar.near/widget/dh.community",
        params: { handle },
      }),
      permissions,
    }}
  />
);
