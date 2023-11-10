const { href } = VM.require("devhub.jass.near/widget/core.lib.url");

href || (href = () => {});

const { metadata, payload, handle, permissions } = props;
// TODO: Convert this viewer to display the provided data via metadata, payload

const CommunityBoardPage = ({ handle, permissions }) => {
  return (
    <Widget
      // TODO: LEGACY.
      src="devgovgigs.near/widget/gigs-board.entity.workspace.view.kanban.configurator"
      props={{
        communityHandle: handle, // rather than fetching again via the handle
        link: href({
          // do we need a link?
          widgetSrc: "devhub.jass.near/widget/app",
          params: { page: "community", handle },
        }),
        permissions,
        // TODO: REMOVE AFTER MIGRATION.
        nearDevGovGigsWidgetsAccountId: "devhub.jass.near",
        nearDevGovGigsWidgetsAccountId: "devgovgigs.near",
      }}
    />
  );
};

return CommunityBoardPage(props);
