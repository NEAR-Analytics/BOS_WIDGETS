const { href } = VM.require("itexpert120-contra.near/widget/core.lib.url");

href || (href = () => {});

const { metadata, payload, handle, permissions } = props;
// TODO: Convert this viewer to display the provided data via metadata, payload

const CommunityBoardPage = ({ handle, permissions }) => {
  return (
    <Widget
      src="itexpert120-contra.near/widget/devhub.entity.addon.kanban.configurator"
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
};

return CommunityBoardPage(props);
