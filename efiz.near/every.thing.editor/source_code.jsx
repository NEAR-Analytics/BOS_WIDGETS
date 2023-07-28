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
    <CommitButton className="btn btn-primary" data={composeData}>
      Save
    </CommitButton>
  </div>
);
