const files = props.files;

let initialFile = files[0];

State.init({
  ...initialFile,
});

const Button = styled.button``;

function onChange(e) {
  //   Storage.privateSet({ path: state.path }, e.target.value);
  console.log(e);
  State.update({
    code: e.target.value,
  });
}

function composeData() {
  const parts = state.view.path.split("/");
  let content = {};
  if (parts[1] === "widget") {
    content = {
      "": state.code,
    };
    console.log(state.code);
  }
  //   switch (parts[1]) {
  //     case "widget": {
  //       content = {
  //         "": "state.code",
  //       };
  //       break;
  //     }
  //     case "thing": {
  //       content = state.code;
  //       break;
  //     }
  //     case "type": {
  //       content = state.code;
  //       break;
  //     }
  //   }
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
                path: file.path,
                language: file.language,
                code: file.code,
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
        path: state.path,
        language: state.language,
        code: state.code,
        onChange: onChange,
      }}
    />
    <CommitButton className="btn btn-primary" data={composeData}>
      Save
    </CommitButton>
  </div>
);
