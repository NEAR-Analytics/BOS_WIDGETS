styled.div`
.input:focus
`;

return (
  <div
    class="chatbot-container"
    style={{ backgroundColor: "#bacee0", width: "100%", height: "100%" }}
  >
    <div
      class="header"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "#bacee0",
      }}
    >
      <div
        class="header-box"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <h1
          style={{
            position: "absolute",
            top: "40px",
            left: "90px",
            fontSize: "20px",
          }}
        >
          챗봇
        </h1>
      </div>
    </div>
    <div class="messages-container" id="messages-container"></div>
    <div id="chat-form">
      <div
        class="input-container"
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "150px",
          backgroundColor: "#fff",
        }}
      >
        <div
          class="input-box"
          style={{ width: "100%", height: "150px", position: "relative" }}
        >
          <textarea
            id="myTextArea"
            class="input"
            style={{
              width: "100%",
              height: "100px",
              border: "0",
              paddingLeft: "10px",
              resize: "none",
            }}
          ></textarea>
          <div class="button">
            <button id="myButton" class="send-button">
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
