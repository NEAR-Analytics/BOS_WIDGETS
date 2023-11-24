State.init({
  cMethod: props.cMethod,
  widgetName: props.widgetName || `FastUI-${props.contractAddress}`,
  name: "",
  description: "",
  website: "",
  image: {
    ipfs_cid: "",
  },
  clicked: false,
  export: false,
  img: null,
  tags,
  choose,
});

const onInputChangeWidgetName = ({ target }) => {
  State.update({ widgetName: target.value.replaceAll(" ", "-") });
  State.update({ clicked: false });
  State.update({ export: false });
};
const onInputChangeWidgetTitle = ({ target }) => {
  State.update({ name: target.value });
};
const onInputChangeWidgetDescription = ({ target }) => {
  State.update({ description: target.value });
};
const onInputChangeWidgetWebsite = ({ target }) => {
  State.update({ website: target.value });
};
const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ image: { ipfs_cid: cid } });
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};
const taggedWidgets = Social.keys(`*/widget/*/metadata/tags/*`, "final");
let tags = [];
if (Object.keys(taggedWidgets)) {
  Object.keys(taggedWidgets).forEach((item) => {
    if (taggedWidgets[item].widget) {
      if (Object.keys(taggedWidgets[item].widget).length > 0) {
        Object.keys(taggedWidgets[item].widget).forEach((item1) => {
          if (taggedWidgets[item].widget[item1].metadata.tags) {
            if (
              Object.keys(taggedWidgets[item].widget[item1].metadata.tags)
                .length > 0
            ) {
              Object.keys(
                taggedWidgets[item].widget[item1].metadata.tags
              ).forEach((tag) => {
                tags.push(tag);
              });
            }
          }
        });
      }
    }
  });
}

State.update({ tags: tags });
const openModal = () => {
  State.update({ clicked: false });
  State.update({ export: false });
};
const exportForm = () => {
  if (!state.clicked) {
    State.update({ clicked: true });
    let tagsObj = null;
    if (state.choose) {
      tagsObj = state.choose.reduce((accumulator, value) => {
        return { ...accumulator, [value]: "" };
      }, {});
    }
    const exportListData = Social.get(
      `${context.accountId}/magicbuild/widgetList`
    );

    const exporttList = JSON.parse(exportListData) || [];

    const isExist = false;
    exporttList.forEach((item, index) => {
      if (item.widgetName == state.widgetName) {
        exporttList[index].widgetName = state.widgetName;
        isExist = true;
      }
    });
    if (!isExist) {
      exporttList.push({ widgetName: state.widgetName });
    }
    console.log("cssStyle", abi.cssStyle.replaceAll("\n", ""));

    // const data = {
    //   widget: {
    //     [state.widgetName]: {
    //       "":
    //       //paste date code export
    //     ,
    //       metadata: {
    //         name: state.name,
    //         description: state.description,
    //         linktree: {
    //           website: state.website,
    //         },
    //         image: {
    //           ipfs_cid: state.img.cid,
    //         },
    //         tags: tagsObj,
    //       },
    //     },
    //   },
    //   magicbuild: { widgetList: exporttList },
    // };
    Social.set(data, {
      force: true,
      onCommit: () => {
        State.update({ export: true });
      },
      onCancel: () => {
        State.update({ clicked: false });
      },
    });
  }
};

const Input = styled.input`
    width: 50%;
    border-radius: 4px;
  `;

const [inputText, setInputText] = useState("");
const [inputFontsize, setinputFontsize] = useState("");
const [exportedText, setExportedText] = useState("");

const handleInputChangeFont = (event) => {
  setinputFontsize(event.target.value);
  setExportedText(`${inputText} ${event.target.value}`);
  // console.log("Exported text state:", `${inputText} ${event.target.value}`);
};

const handleInputChange = (event) => {
  setInputText(event.target.value);

  setExportedText(`${event.target.value} ${inputFontsize}`);
  // console.log("Exported text state:", `${event.target.value} ${inputFontsize}`);
};

const SaveButton = styled.button`
  width: 80px;
  height: 35px;
  display: flex;
  align-items: center;
  background-color: white;
  color: black;
  font-size:10px;
  border-radius: 2em;
  padding: 0.5rem;
  position: absolute; 
  bottom: 10px;
  right: 10px;
`;

const Button0001 = styled.button`
  width: 80%;
  height: 40px;
  all: unset;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.6em 2em;
  border: mediumspringgreen solid 0.15em;
  border-radius: 0.25em;
  color: mediumspringgreen;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: border 300ms, color 300ms;
  user-select: none;

  p {
    z-index: 1;
  }

  &:hover {
    color: #212121;
  }

  &:active {
    border-color: teal;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 9em;
    aspect-ratio: 1;
    background: mediumspringgreen;
    opacity: 50%;
    border-radius: 50%;
    transition: transform 500ms, background 300ms;
  }

  &::before {
    left: 0;
    transform: translateX(-8em);
  }

  &::after {
    right: 0;
    transform: translateX(8em);
  }

  &:hover::before {
    transform: translateX(-1em);
  }

  &:hover::after {
    transform: translateX(1em);
  }

  &:active::before,
  &:active::after {
    background: teal;
  }
`;

const updateTextProp = () => {
  const updatedProps = {
    component: (
      <Widget
        src="marketplacebos.near/widget/Button.ButtonP.Button0001"
        props={{ text: inputText, fontsize: inputFontsize }}
      />
    ),
  };
  setProps(updatedProps);
  alert(`Exported UI with text: ${inputText} ${inputFontsize}`);
};

const props = {
  copyBtn:
    "const Button0001 = styled.button`" +
    `width: 80%;
  height: 40px;
  all: unset;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.6em 2em;
  border: mediumspringgreen solid 0.15em;
  border-radius: 0.25em;
  color: mediumspringgreen;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: border 300ms, color 300ms;
  user-select: none;

  p {
    z-index: 1;
  }

  &:hover {
    color: #212121;
  }

  &:active {
    border-color: teal;
  }

  &::before,
  &::after` +
    `\n{ content: "";` +
    `position: absolute;
    width: 9em;
    aspect-ratio: 1;
    background: mediumspringgreen;
    opacity: 50%;
    border-radius: 50%;
    transition: transform 500ms, background 300ms;
  }

  &::before {
    left: 0;
    transform: translateX(-8em);
  }

  &::after {
    right: 0;
    transform: translateX(8em);
  }

  &:hover::before {
    transform: translateX(-1em);
  }

  &:hover::after {
    transform: translateX(1em);
  }

  &:active::before,
  &:active::after {
    background: teal;
  }` +
    "`;" +
    `\n return(
    <Button0001>Button 0001</Button0001>
)`,
  component: (
    <Widget
      src="marketplacebos.near/widget/Button.ButtonP.Button0001"
      props={{ text: inputText, fontsize: inputFontsize }}
    />
  ),
  text:
    "const Button0001 = styled.button`\n" +
    `  width: 80%;
  height: 40px;
  all: unset;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.6em 2em;
  border: mediumspringgreen solid 0.15em;
  border-radius: 0.25em;
  color: mediumspringgreen;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: border 300ms, color 300ms;
  user-select: none;

  p {
    z-index: 1;
  }

  &:hover {
    color: #212121;
  }

  &:active {
    border-color: teal;
  }

  &::before,
  &::after` +
    `\n{ content: "";` +
    `position: absolute;
    width: 9em;
    aspect-ratio: 1;
    background: mediumspringgreen;
    opacity: 50%;
    border-radius: 50%;
    transition: transform 500ms, background 300ms;
  }

  &::before {
    left: 0;
    transform: translateX(-8em);
  }

  &::after {
    right: 0;
    transform: translateX(8em);
  }

  &:hover::before {
    transform: translateX(-1em);
  }

  &:hover::after {
    transform: translateX(1em);
  }

  &:active::before,
  &:active::after {
    background: teal;
  }` +
    "`;" +
    `\n return(
    <Button0001>Button 0001</Button0001>
)`,
  editText: `text: "Button", fontsize: "1.2em"`,
  editInput: (
    <>
      {" "}
      <label> text:</label> <br />
      <Input type="text" value={inputText} onChange={handleInputChange} />
      <br />
      <label> fontsize : </label> <br />
      <Input
        type="text"
        value={inputFontsize}
        onChange={handleInputChangeFont}
      />
      <br />
      <>
        <label></label>
        <button
          data-bs-toggle="modal"
          data-bs-target={`#export-${Date.now()}`}
          class="btn btn-primary form-control "
          onClick={openModal}
        >
          🔼Export
        </button>
        <div
          class="modal fade"
          id={`export-${Date.now()}`}
          tabindex="-2"
          aria-labelledby="exportLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exportLabel">
                  Export Widget
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                {state.export && state.widgetName ? (
                  <>
                    <div class="alert alert-primary" role="alert">
                      <a
                        href={`https://near.social/${context.accountId}/widget/${state.widgetName}`}
                      >
                        {`https://near.social/${context.accountId}/widget/${state.widgetName}`}
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div class="form-group">
                      <label>Widget URL</label>
                      <input
                        class="form-control"
                        defaultValue={state.widgetName || ""}
                        onChange={(e) => onInputChangeWidgetName(e)}
                      />
                      <small class="form-text text-muted">
                        A new widget configured with the form will be created.
                      </small>
                    </div>
                    <div class="form-group pt-2">
                      <label>Name</label>
                      <input
                        class="form-control"
                        defaultValue={state.name || ""}
                        onChange={(e) => onInputChangeWidgetTitle(e)}
                      />
                    </div>
                    <div class="form-group pt-2">
                      <label>Description</label>
                      <input
                        class="form-control"
                        defaultValue={state.description || ""}
                        onChange={(e) => onInputChangeWidgetDescription(e)}
                      />
                    </div>
                    <div class="form-group pt-2">
                      <label></label>
                      <Files
                        multiple={false}
                        accepts={["image/*"]}
                        minFileSize={1}
                        clickable
                        className="btn btn-outline-primary"
                        onChange={filesOnChange}
                      >
                        {state.img?.uploading ? (
                          <> Uploading </>
                        ) : (
                          "Upload Logo Application"
                        )}
                      </Files>
                    </div>
                    <div class="form-group pt-2">
                      <label></label>
                      {state.img && !state.img.uploading ? (
                        <img
                          class="rounded w-50 h-50"
                          style={{ objectFit: "cover" }}
                          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
                          alt="upload preview"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="form-group pt-2">
                      <label>Website</label>
                      <input
                        class="form-control"
                        defaultValue={state.website || ""}
                        onChange={(e) => onInputChangeWidgetWebsite(e)}
                      />
                    </div>
                    <div class="form-group pt-2">
                      <label>Tags</label>

                      <Typeahead
                        options={state.tags || []}
                        multiple
                        onChange={(value) => {
                          State.update({ choose: value });
                        }}
                        placeholder="Input tag..."
                      />
                    </div>
                  </>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button
                  type="button"
                  disabled={state.clicked}
                  onClick={exportForm}
                  class="btn btn-primary"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </>{" "}
    </>
  ),
};

return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardEdit" props={props} />
  </>
);
