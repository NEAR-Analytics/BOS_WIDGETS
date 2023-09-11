const files = props.files;

let initialFile = files[0];

State.init({
  file: initialFile,
});

const Button = styled.button``;

let codeBuffer = state.file.code;

function onChange(code) {
  //   Storage.privateSet({ path: state.path }, e.target.value);
  codeBuffer = code;
}

function save() {
  // const parts = state.file.path.split("/");
  // let content = {};
  // if (parts[1] === "widget") {
  //   content = {
  //     "": state.code,
  //   };
  // } else {
  //   content = JSON.parse(state.code);
  // }
  // const data = {
  //   [parts[1]]: {
  //     [parts[2]]: content,
  //   },
  // };
  // Social.set(data);
  console.log(codeBuffer);
}

const tabButton = styled.button`
  border-radius: 6px 6px 0px 0px;
  outline: none;
  border: none;
  border: solid 1px;
  border-bottom: none;
  border-color: rgb(115 115 115);
  padding: 0.5rem;

  font-weight: 500;

  &:active {
    border: none;
    border: solid 1px;
    border-bottom: none;
  }
`;

const saveButton = styled.button`
  outline: none;
  border: none;

  padding: 0.5rem;

  &:active {
    border: none;
    outline: none;
  }
`;

return (
  <div>
    <div className="d-flex w-100 align-items-center">
      <div>
        {files.map((file) => {
          return (
            <tabButton
              onClick={() =>
                State.update({
                  file,
                })
              }
            >
              {file.path}
            </tabButton>
          );
        })}
      </div>
      <div className="ms-auto">
        <saveButton onClick={save}>Save</saveButton>
      </div>
    </div>
    <Widget
      src={"itexpert120-contra.near/widget/MonacoEditor"}
      props={{
        path: state.file.path,
        language: state.file.language,
        code: state.file.code,
        onChange: onChange,
      }}
    />
  </div>
);
