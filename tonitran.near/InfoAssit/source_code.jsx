State.init({
  data: null,
  isFetched: false,
  isModalOpen: false,
  isButtonShow: true,
  selectingId: "",
  selectingIdContent: "",
  selectingIdUrl: "",
  chatcontent: "",
  queryText: "",
  isSending: false,
});

const Wrapper = styled.div`
  body {
  background: #444;
}

.custom-textarea {
  width: 70%; 
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.play-btn {
  width: 30px;
  height: 30px;
  background: radial-gradient( rgba(255, 0, 128, 0.8) 60%, rgba(255, 255, 255, 1) 62%);
  border-radius: 50%;
  position: relative;
  display: block;
  margin: 3px auto;
  box-shadow: 0px 0px 2.5px 0.3px rgba(255, 0, 128, 0.8);
}

/* triangle */
.play-btn::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translateX(-40%) translateY(-50%);
  transform: translateX(-40%) translateY(-50%);
  transform-origin: center center;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #fff;
  z-index: 100;
  -webkit-transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
  transition: all 400ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

/* pulse wave */
.play-btn:before {
  content: "";
  position: absolute;
  width: 150%;
  height: 150%;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation: pulsate1 2s;
  animation: pulsate1 2s;
  -webkit-animation-direction: forwards;
  animation-direction: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: steps;
  animation-timing-function: steps;
  opacity: 1;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, .75);
  top: -30%;
  left: -30%;
  background: rgba(198, 16, 0, 0);
}

@-webkit-keyframes pulsate1 {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
    box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
    box-shadow: none;

  }
}

@keyframes pulsate1 {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
    box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
  }
  100% {
    -webkit-transform: scale(1, 1);
    transform: scale(1);
    opacity: 0;
    box-shadow: none;

  }
}
`;

function setQueryText(text) {
  State.update({ queryText: text });
}

function playAudio() {
  asyncFetch("https://news.nftfi.cloud/newaudiourl/").then(({ body }) => {
    console.log("Audio body:", body);
    let audio = new Audio(body);
    audio.play();
  });
}

function handleKeyPress(event) {
  if (event.key === "Enter" && state.queryText.trim() !== "") {
    console.log("going to call onSendClick...");
    onSendClick(state.selectingId, state.queryText);
  }
}

function updateChatbox(question, answer) {
  console.log("updateChatbox is called");

  const newChatContent =
    state.chatcontent + "Q: " + question + "\r\n" + "A: " + answer + "\r\n";

  console.log("newChatContent: ", newChatContent);
  State.update({ chatcontent: newChatContent });
  console.log("state.chatcontent: ", state.chatcontent);
}

function getContentAndUrl(selectedID) {
  const selectedArticle = state.data.find(
    (article) => article.id === selectedID
  );

  if (selectedArticle) {
    const content = selectedArticle.summary;
    const url = selectedArticle.url;
    console.log("content: ", content);
    console.log("url: ", url);
    State.update({
      selectingIdContent: content,
      selectingIdUrl: url,
    });
    console.log("state.selectingIdContent: ", state.selectingIdContent);
    console.log("state.selectingIdUrl: ", state.selectingIdUrl);
  } else {
    State.update({
      selectingIdContent: "Article not found",
    });
  }
}

function openModal(articleId) {
  console.log("Clicked on button with article ID:", articleId);
  getContentAndUrl(articleId);
  State.update({
    isModalOpen: true,
    isButtonShow: false,
    selectingId: articleId,
  });
  console.log("isModalOpen: ", state.isModalOpen);
  console.log("isButtonShow: ", state.isButtonShow);
  console.log("buttons: ", buttons);
}

function closeModal() {
  State.update({ isModalOpen: false, isButtonShow: true, selectingId: "" });
  console.log("isModalOpen: ", state.isModalOpen);
  console.log("isButtonShow: ", state.isButtonShow);
  console.log("buttons: ", buttons);
}

function onSendClick(articleId, queryText) {
  State.update({ queryText: "", isSending: true });
  console.log("onSendClick is called with queryText:", queryText);
  asyncFetch("https://news.nftfi.cloud/articles/" + articleId + "/ask/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: queryText }),
  })
    .then((response) => {
      const answer = response.body.answer;
      updateChatbox(queryText, answer);
    })
    .then(() => {
      State.update({ isSending: false });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

if (!state.isFetched) {
  asyncFetch("https://news.nftfi.cloud/titles/").then(({ body }) => {
    State.update({ data: body, isFetched: true });
    console.log("Finish fectching");
  });
}

const buttons = state.data.map((button) => {
  return (
    <button
      key={button.id}
      type="button"
      style={{
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left",
      }}
      onClick={() => openModal(button.id)}
    >
      ({button.published.split("-").slice(1).join("-")}) {button.title}
    </button>
  );
});

return (
  <div>
    <Wrapper>
      <a class="play-btn" href="#" onClick={() => playAudio()}></a>
      <div style={{ textAlign: "center" }}>
        ( Selected Category = "Blockchain" )
      </div>
    </Wrapper>
    {state.isButtonShow && buttons}
    {state.isModalOpen && (
      <div
        id="modal"
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex min-h-screen pt-0 px-0 pb-20 sm:block sm:p-0">
          <div class="inline-block align-top bg-gray-900 text-blue rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-top sm:w-full">
            <div class="px-0 pt-0 pb-4 sm:p-6 sm:pb-4">
              <p id="modal-summary" class="mt-2 text-sm">
                <p style={{ whiteSpace: "pre-line", textAlign: "left" }}>
                  {state.selectingIdContent}
                </p>
                <a
                  href={state.selectingIdUrl}
                  target="_blank"
                  class="mt-2 text-indigo-500 hover:text-indigo-400"
                >
                  Original Source
                </a>
                <div class="mt-1">
                  <div
                    id="chatbox"
                    class="mt-1"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {state.chatcontent}
                  </div>
                  <div class="d-flex flex-column">
                    <Wrapper>
                      <div>
                        <textarea
                          id="querytext"
                          width="1600"
                          rows="2"
                          maxlength="200"
                          class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                          placeholder="Input your question ..."
                          value={state.queryText}
                          onChange={(e) => setQueryText(e.target.value)}
                          onKeyUp={(e) => handleKeyPress(e)}
                        ></textarea>

                        <button
                          id="sendButton"
                          class="mt-2 bg-indigo-500 hover:bg-indigo-400 text-blue font-bold py-2 px-4 rounded"
                          onClick={() =>
                            onSendClick(state.selectingId, state.queryText)
                          }
                        >
                          {state.isSending ? (
                            <span class="loading-spinner">sending...</span>
                          ) : (
                            <i class="fas fa-chevron-right">Send</i>
                          )}
                        </button>
                      </div>
                    </Wrapper>
                  </div>
                </div>
              </p>
            </div>

            <button
              id="modal-close"
              type="button"
              class="mt-0 w-full inline-flex justify-top rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-700 text-base font-medium hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => closeModal()}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
