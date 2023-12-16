const { href } = VM.require("megha19.near/widget/core.lib.url");

href || (href = () => {});

const { metadata, payload, handle, permissions } = props;
// TODO: Convert this viewer to display the provided data via metadata, payload

const CommunityBoardPage = ({ handle, permissions }) => {
  return (
    <Widget
      src="megha19.near/widget/devhub.entity.addon.kanban.Configurator"
      props={{
        communityHandle: handle, // rather than fetching again via the handle
        link: href({
          widgetSrc: "megha19.near/widget/app",
          params: { page: "community", handle },
        }),
        permissions,
      }}
    />
  );
};

return CommunityBoardPage(props);
