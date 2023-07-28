const files = props.files;

State.init({
  view: files[0],
});

const Button = styled.button``;

function onChange(e) {
  State.update({
    code: e.target.value,
  });
}

return (
  <div>
    <div>
      {files.map((file) => {
        return (
          <Button onClick={() => State.update({ view: file })}>
            {file.path}
          </Button>
        );
      })}
    </div>
    <Widget
      src={"efiz.near/widget/MonacoEditor"}
      props={{
        path: state.view.path,
        language: state.view.language,
        code: state.view.code,
        onChange: onChange,
      }}
    />
  </div>
);
