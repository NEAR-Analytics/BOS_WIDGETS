const { data, handle, communityAddonId } = props;

const { Tile } =
  VM.require("thomasguntenaar.near/widget/devhub.components.molecule.Tile") ||
  (() => <></>);

if (!Tile) {
  return <div>Loading...</div>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 768px) {
    padding: 20px 5px;
  }
`;

return (
  <Tile className="p-3 bg-white min-vh-100">
    <Container>
      <Widget
        src={"thomasguntenaar.near/widget/devhub.entity.addon.blogv2.editor.index"}
        props={{
          data,
          handle,
          communityAddonId,
        }}
      />
    </Container>
  </Tile>
);
