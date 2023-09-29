const sidebar = {
  wrapper: {
    backgroundColor: "#40414F",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "40%",
    transition: "width 0.3s ease",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  buttonStyle: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "16px",
    marginBottom: "20px",
    marginLeft: "20px",
  },
  logoStyle: {
    width: "40px",
    height: "40px",
    margin: "12px",
  },
  iconStyle: {
    width: "24px",
    height: "24px",
    marginRight: "8px",
  },
  ul: {
    margin: "0",
    listStyleType: "none",
    padding: "0",
  },
  li: {
    margin: "0px 0",
    boxSizing: "border-box",
    borderBottom: "solid rgba(255,255,255,0.1)",
    cursor: "pointer",
  },
  p: {
    color: "#fff",
    fontSize: "10px",
    padding: "16px 16px",
    margin: "0px",
    lineHeight: "normal",
    display: "block",
  },
  active: {
    color: "#fff",
    fontSize: "16px",
    padding: "16px 16px",
    lineHeight: "normal",
    display: "block",
    backgroundColor: "rgb(27 23 60)",
  },
};

const Modal = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1;
`;

const ModalBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.4;
`;

const ModalDialog = styled.div`
  padding: 2em;
  z-index: 3;
  background-color: white;
  border-radius: 6px;
  width: 60%;
  max-height: 80%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  overflow-y: auto;

  @media (width < 720px) {
    width: 100%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  padding-bottom: 4px;
  margin-bottom: 3%;
`;

const ModalFooter = styled.div`
  padding-top: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: items-center;
  margin-top: 5%;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0.7em;
  border-radius: 6px;
  border: 0;
  color: #344054;
  transition: 300ms;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const ConfirmButton = styled.button`
  padding: 0.7em;
  border-radius: 6px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  background-color: #12b76a;
  color: white;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0e9f5d;
  }
`;

const DeleteButton = styled.button`
  padding: 0.7em;
  border-radius: 6px;
  border: 0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  background-color: #e53935; /* Kırmızı bir renk seçebilirsiniz */
  color: white;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #c62828; /* Hover durumunda koyu kırmızı */
  }
`;

const title = "Add Attribute";
const addText = "Add";
const saveText = "Save";
const deleteText = "Delete";

State.init({
  key: "",
  value: "",
  isPanelOpen: true,
  modalHidden: true,
  file: null,
  json: null,
  attributes: [],
  id: null,
});

const generateUUID = () => {
  const timestamp = new Date().getTime().toString(16);
  const randomChars = "0123456789abcdef";
  let randomPart = "";

  for (let i = 0; i < 8; i++) {
    randomPart += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }

  return `${timestamp}-${randomPart}`;
};

const handleOnConfirm = () => {
  const uuid = generateUUID();
  const newObject = JSON.parse(
    `{"${state.key.trim()}": "${state.value.trim()}"}`
  );
  const newAttribute = { id: uuid, attribute: newObject };
  State.update({ attributes: [...state.attributes, newAttribute] });
  toggleModalOnClose();
};

const handleOnSave = () => {
  const newObject = JSON.parse(
    `{"${state.key.trim()}": "${state.value.trim()}"}`
  );
  const updatedAttributes = state.attributes.map((attribute) => {
    if (attribute.id === state.id) {
      return { ...attribute, attribute: newObject };
    }
    return attribute;
  });

  State.update({ attributes: updatedAttributes });
  toggleModalOnClose();
};

const handleOnDelete = () => {
  deleteAttribute(state.id);
  toggleModalOnClose();
};

const handleKeyChange = (e) => {
  State.update({ key: e.target.value });
};

const handleValueChange = (e) => {
  State.update({ value: e.target.value });
};

const deleteAttribute = (uuid) => {
  const newArray = state.attributes.filter(
    (attribute) => attribute.id !== uuid
  );
  State.update({ attributes: newArray });
};

const showAttribute = (attribute) => {
  const isAttributeInArray = state.attributes.some(
    (attr) => attr.id === attribute.id
  );

  if (isAttributeInArray) {
    State.update({
      id: attribute.id,
      key: Object.keys(attribute.attribute)[0],
      value: Object.values(attribute.attribute)[0],
      modalHidden: false,
    });
  }
};

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ file: cid });
    const newAttributes = [];
    asyncFetch(`https://ipfs.near.social/ipfs/${cid}`).then((res) => {
      for (const [key, value] of Object.entries(res.body)) {
        const uuid = generateUUID();
        const newObject = JSON.parse(
          `{"${key.toString().trim()}": "${value.toString().trim()}"}`
        );
        const newAttribute = { id: uuid, attribute: newObject };
        newAttributes.push(newAttribute);
      }
      State.update({ attributes: [...state.attributes, ...newAttributes] });
    });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ file: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

const togglePanel = () => {
  State.update({ isPanelOpen: !state.isPanelOpen });
};

const toggleModalOnClose = () => {
  State.update({
    modalHidden: !state.modalHidden,
    key: "",
    value: "",
    id: null,
  });
};

if (!state.modalHidden) {
  return (
    <Modal>
      <ModalBackdrop />

      <ModalDialog>
        <ModalHeader>
          <h5>{title}</h5>
        </ModalHeader>
        <Widget
          src="alicolakk.near/widget/Form"
          props={{
            label: "Key",
            placeholder: "Key",
            onInput: handleKeyChange,
            value: state.key,
          }}
        />
        <Widget
          src="alicolakk.near/widget/Form"
          props={{
            label: "Value",
            placeholder: "Value",
            onInput: handleValueChange,
            value: state.value,
          }}
        />
        <ModalFooter>
          <CloseButton onClick={toggleModalOnClose}>Cancel</CloseButton>
          {state.id ? (
            <>
              <DeleteButton onClick={handleOnDelete}>{deleteText}</DeleteButton>
              <ConfirmButton onClick={handleOnSave}>{saveText}</ConfirmButton>
            </>
          ) : (
            <ConfirmButton onClick={handleOnConfirm}>{addText}</ConfirmButton>
          )}
        </ModalFooter>
      </ModalDialog>
    </Modal>
  );
}

return (
  <>
    <div
      style={{
        ...sidebar.wrapper,
        width: state.isPanelOpen ? "40%" : "0",
        padding: state.isPanelOpen ? "10px" : "0",
        marginLeft: state.isPanelOpen ? "0" : "-30px",
      }}
    >
      <div className="d-flex justify-content-between">
        {state.isPanelOpen && (
          <img
            src="https://seeklogo.com/images/N/near-protocol-near-logo-747A7B638A-seeklogo.com.png"
            alt="Logo Icon"
            style={sidebar.logoStyle}
          />
        )}
        <button onClick={togglePanel} style={sidebar.buttonStyle}>
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-462145.png"
            alt="Menu Icon"
            style={sidebar.iconStyle}
          />
        </button>
      </div>
      {state.isPanelOpen && (
        <>
          <Files
            multiple={false}
            accepts={["application/json"]}
            clickable
            className="btn btn-outline-light"
            style={{ marginBottom: "20px" }}
            onChange={filesOnChange}
          >
            {state.file.uploading ? <>Uploading</> : "Upload an Json "}
          </Files>
          <button
            className="btn btn-outline-light"
            style={{ marginBottom: "20px" }}
            onClick={toggleModalOnClose}
          >
            Add Attribute
          </button>
          <h2 className="text-white text-center mt-3"> Attributes </h2>
          <div
            style={{ borderBottom: "3px solid rgba(255,255,255,0.1)" }}
          ></div>
          <ul style={sidebar.ul}>
            {state.attributes.map((attribute) => (
              <li
                className="d-flex justify-content-between align-items-center"
                style={sidebar.li}
                key={attribute.id}
                onClick={(e) => {
                  showAttribute(attribute);
                  e.stopPropagation();
                }}
              >
                <p className=" text-truncate" style={sidebar.p}>
                  {Object.keys(attribute.attribute)[0]}:
                  {Object.values(attribute.attribute)[0]}
                </p>
                <button
                  className="btn btn-danger"
                  type="button"
                  style={{
                    padding: "0.5em",
                    fontSize: "1rem",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={(e) => {
                    deleteAttribute(attribute.id);
                    e.stopPropagation();
                  }}
                >
                  <i className="bi bi-x text-light fs-3"></i>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  </>
);
