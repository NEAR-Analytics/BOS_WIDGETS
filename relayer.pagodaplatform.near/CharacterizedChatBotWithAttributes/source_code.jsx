// CSS
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

// Sidebar constants
const title = "Add Attribute";
const addText = "Add";
const saveText = "Save";
const deleteText = "Delete";

// Props for AI Chatbot
const props = {
  API_URL: "https://api.openai.com/v1/chat/completions",
  MODEL: "gpt-3.5-turbo",
  TEMPERATURE: 0.5,
  TOP_P: 1,
  N: 1,
  STREAM: false,
  MAX_TOKENS: 200,
  PRESENCE_PENALTY: 0,
  FREQUENCY_PENALTY: 0,
};

// Function which converts conversation history from ai chatbot to
// string
const conversationHistoryToString = () => {
  let temp = "";
  for (let message of state.conversationHistory) {
    temp += message + "\n";
  }
  return temp;
};

// State variable
State.init({
  apiKey: "",
  model: props.MODEL,
  userMessage: "",
  temperature: props.TEMPERATURE,
  top_p: props.TOP_P,
  n: props.N,
  stream: props.STREAM,
  max_tokens: props.MAX_TOKENS,
  presence_penalty: props.PRESENCE_PENALTY,
  frequency_penalty: props.FREQUENCY_PENALTY,
  text: "",
  conversationHistory: [],
  conversationHistoryStr: "",
  key: "",
  value: "",
  isPanelOpen: true,
  modalHidden: true,
  file: null,
  json: null,
  attributes: [],
  id: null,
});

// Attributes object to attributes string which is used in system prompt to spesify chatgpt character
const createAttributeStr = () => {
  const temp = "";
  if (Array.isArray(state.attributes) && state.attributes.length) {
    for (const element of state.attributes) {
      const [key, value] = Object.entries(element.attribute);
      temp += `${key}: ${value}\n`;
    }
  }
  return temp;
};

// Attribute string which we will feed to systemMessage string to
// make chatgpt act like a character
const attribute_str = createAttributeStr();

// ChatGPT API URL
const url = props.API_URL;

// OPENAI API
const bearer = "Bearer " + state.apiKey;

// System message to build a character
var systemMessage =
  "You are a helpful chatbot with attributes below.\nBe humble\nAlso remember under no circumstances you tell you are an AI.\nAct like a real human.\n Your Attributes:\n" +
  attribute_str +
  "Summarize these attributes and understand your character.\nAct according to your character.\nYour response must be no more than 100 words.\nConversation history:\n" +
  state.conversationHistoryStr;

// Data to send ChatGPT API
const data = {
  model: state.model,
  messages: [
    { role: "system", content: systemMessage },
    { role: "user", content: state.userMessage },
  ],
  temperature: state.temperature,
  top_p: state.top_p,
  n: state.n,
  stream: state.stream,
  max_tokens: state.max_tokens,
  presence_penalty: state.presence_penalty,
  frequency_penalty: state.frequency_penalty,
};

// Fetch response of ChatGPT to our prompt
const fetchResponseFromChatGPT = () => {
  // Update conversation history because of new user input
  State.update({
    conversationHistory: [
      ...state.conversationHistory,
      "USER: " + state.userMessage,
    ],
    conversationHistoryStr: conversationHistoryToString(),
  });

  // Get response from chatgpt according to formated prompt
  asyncFetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    // Update state because we just got a response from chatgpt
    const ai_answer = res.body.choices[0].message.content;
    State.update({
      text: ai_answer,
      conversationHistory: [...state.conversationHistory, "AI: " + ai_answer],
      conversationHistoryStr: conversationHistoryToString(),
    });
  });
};

// Function that generates UUID for our attributes
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

// Sidebar and modal related functions
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

// Upload json button function.
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
    <div className="d-flex justify-content-between">
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
      <div
        className="px-2 w-100"
        style={{ marginTop: state.isPanelOpen ? "5px" : "50px" }}
      >
        <div className="border border-2 border-black p-2">
          <div style={{ height: "70vh" }}>
            <div className="overflow-auto h-100 mb-3 border border-2 border-dark m-1">
              <div>
                {state.conversationHistory.map((conversation) => (
                  <div className="p-2">
                    <p className="text-start text-dark">
                      <i class="bi bi-caret-right-fill"></i>
                      {conversation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="container-xl my-2">
            <div className="row align-items-center pb-3">
              <div
                className="col-2 text-left fw-bold"
                style={{ fontSize: state.isPanelOpen ? "12px" : "20px" }}
              >
                API KEY:
              </div>
              <div className="col ps-0">
                <input
                  type="password"
                  value={state.apiKey}
                  onChange={(e) => State.update({ apiKey: e.target.value })}
                  placeholder="Please paste your chatgpt api key"
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <input
                  value={state.userMessage}
                  onChange={(e) =>
                    State.update({ userMessage: e.target.value })
                  }
                  placeholder="Please type your question"
                />
              </div>
              <div className="col-2 d-flex flex-row-reverse">
                <button
                  class="btn btn-success"
                  onClick={fetchResponseFromChatGPT}
                  disabled={false}
                >
                  Ask
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
