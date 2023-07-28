const files = props.files;

let initialFile = files[0];

State.init({
  file: initialFile,
});

const Button = styled.button``;

function onChange(code) {
  //   Storage.privateSet({ path: state.path }, e.target.value);
  State.update({
    code,
  });
}

function composeData() {
  const parts = state.file.path.split("/");
  let content = {};
  if (parts[1] === "widget") {
    content = {
      "": state.code,
    };
  } else {
    content = JSON.parse(state.code);
  }
  const data = {
    [parts[1]]: {
      [parts[2]]: content,
    },
  };
  return data;
}

return (
  <div>
    <div>
      {files.map((file) => {
        return (
          <Button
            onClick={() =>
              State.update({
                file,
              })
            }
          >
            {file.path}
          </Button>
        );
      })}
    </div>
    <Widget
      src={"efiz.near/widget/MonacoEditor"}
      props={{
        path: state.file.path,
        language: state.file.language,
        code: state.file.code,
        onChange: onChange,
      }}
    />
    <CommitButton className="btn btn-primary" data={composeData}>
      Save
    </CommitButton>
  </div>
);
