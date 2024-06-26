const { data, handle, onSubmit } = props;

const { Tile } =
  VM.require("devhub.near/widget/devhub.components.molecule.Tile") ||
  (() => <></>);

if (!Tile) {
  return <div>Loading...</div>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

const Item = styled.div`
  padding: 10px;
  margin: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const EditableField = styled.input`
  flex: 1;
`;

const initialData = data;

return (
  <Tile className="p-3 bg-white">
    <Container>
      <Widget
        src={"devhub.near/widget/devhub.entity.addon.blog.editor.index"}
        props={{
          data,
          handle,
        }}
      />
    </Container>
  </Tile>
);
