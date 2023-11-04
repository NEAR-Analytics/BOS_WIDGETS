const { href } = VM.require("devhub.near/widget/core.lib.url");

href || (href = () => {});

const { kanbanBoards, handle, permissions } = props;
// TODO: Convert this viewer to display the provided data via kanbanBoards

return (
  <Widget
    // TODO: LEGACY.
    src="devgovgigs.near/widget/gigs-board.entity.workspace.view.github.configurator"
    props={{
      communityHandle: handle, // rather than fetching again via the handle
      link: href({
        // do we need a link?
        widgetSrc: "devhub.near/widget/app",
        params: { page: "community", handle },
      }),
      permissions,
      // TODO: REMOVE AFTER MIGRATION.
      nearDevGovGigsWidgetsAccountId: "devhub.near",
      nearDevGovGigsWidgetsAccountId: "devgovgigs.near",
    }}
  />
);
