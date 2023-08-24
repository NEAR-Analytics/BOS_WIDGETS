State.init({
  data: null,
  isFetched: false,
  isModalOpen: false,
  isButtonShow: true,
  selectingId: "",
  chatcontent: "",
  queryText: "",
});

// if (!state.isFetched) {
//   asyncFetch("https://news.nftfi.cloud/titles/").then(({ body }) => {
//     State.update({ data: body, isFetched: true });
//   });
// }

// const buttons = state.data.map((button, index) => {
//   return <div key={index}>{button.title}</div>;
// });

function setQueryText(text) {
  State.update({ queryText: text });
}

function handleKeyPress(event) {
  console.log("handleKeyPress is called");
  console.log("event.key: ", event.key);
  console.log("state.queryText: ", state.queryText);

  if (event.key === "Enter" && state.queryText.trim() !== "") {
    console.log("going to call onSendClick...");
    onSendClick(state.selectingId, state.queryText);
  }
}

function updateChatbox(question, answer) {
  console.log("updateChatbox is called");
  // const sanitizedQuestion = question.replace(/[&<>"']/g, (match) => {
  //   switch (match) {
  //     case "&":
  //       return "&amp;";
  //     case "<":
  //       return "&lt;";
  //     case ">":
  //       return "&gt;";
  //     case '"':
  //       return "&quot;";
  //     case "'":
  //       return "&#39;";
  //     default:
  //       return match;
  //   }
  // });

  // const newChatContent =
  //   state.chatcontent +
  //   `<p class="text-right text-white-500">Q: ` +
  //   sanitizedQuestion +
  //   `</p>`;

  const newChatContent =
    state.chatcontent + "Q: " + question + "\r\n" + "A: " + answer + "\r\n";

  console.log("newChatContent: ", newChatContent);
  State.update({ chatcontent: newChatContent });
  console.log("state.chatcontent: ", state.chatcontent);
}

function openModal(articleId) {
  console.log("Clicked on button with article ID:", articleId);
  // fetch(`https://news.nftfi.cloud/articles/${articleId}`)
  //   .then((response) => response.json())
  //   .then((article) => {
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
  console.log("onSendClick is called with queryText:", queryText);
  asyncFetch("https://news.nftfi.cloud/articles/" + articleId + "/ask/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: queryText }),
  })
    .then((response) => response.json())
    .then((data) => {
      const answer = data.answer;
      updateChatbox(queryText, answer);
      State.update({ queryText: "" });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

const body = [
  {
    id: "2308.02996v1",
    title:
      "Đánh giá khoảng cách giữa Web 4.0 và cơ sở hạ tầng mạng thông minh Web 3.0, Đánh giá khoảng cách giữa Web 4.0 và cơ sở hạ tầng mạng thông minh Web 3.0, Đánh giá khoảng cách giữa Web 4.0 và cơ sở hạ tầng mạng thông minh Web 3.0",
    published: "2023-08-06",
  },
  {
    id: "2308.02996v3",
    title: "Hạ tầng mạng thông minh Web 3.0",
    published: "2023-08-07",
  },
];
State.update({ data: body, isFetched: true });

const buttons = body.map((button) => {
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
      {button.title.length > 100
        ? button.title.slice(0, 100) + "..."
        : button.title}
    </button>
  );
});
return (
  <div>
    {state.isButtonShow && buttons}
    {state.isModalOpen && (
      <div
        id="modal"
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            id="modal-backdrop"
            class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            class="sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div class="inline-block align-bottom bg-gray-900 text-blue rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 id="modal-title" class="text-lg leading-6 font-medium"></h3>
              <p id="modal-summary" class="mt-2 text-sm">
                <p>
                  Tiêu đề: Đánh giá khoảng cách giữa Web 4.0 và cơ sở hạ tầng
                  mạng thông minh Web 3.0 Tóm tắt: Bài báo đánh giá sự khác biệt
                  giữa Web 4.0 và Web 3.0 từ các khía cạnh khoa học và công
                  nghiệp. Nó cung cấp một cái nhìn về sự phát triển của World
                  Wide Web và những yêu cầu của Web 4.0 đối với trải nghiệm web
                  sống động hơn, dịch vụ trí tuệ phân tán và quyền riêng tư đảm
                  bảo. Các điểm nổi bật: 1. Web 4.0 đang phát triển thành một hệ
                  sinh thái thông minh và phân tán với sự tham gia tích cực của
                  Châu Âu. 2. Web 4.0 cam kết mang lại trải nghiệm web sống động
                  hơn, dịch vụ trí tuệ phân tán và quyền riêng tư đảm bảo. 3.
                  Web 4.0 yêu cầu cơ sở hạ tầng mạng thông minh và phân tán để
                  đáp ứng nhu cầu ngày càng tăng về nội dung VR/XR. 4. Web 4.0
                  giới thiệu các thực thể trí tuệ nhân tạo (NAEs) là một phần
                  tích cực của mạng, đóng vai trò quan trọng trong việc mang đến
                  sự thông minh mạng lưới. 5. NAEs hoạt động theo mô hình vòng
                  đời, từ khởi tạo và cấu hình đến hoạt động ban đầu và phát
                  triển, hoạt động ổn định và mở rộng, và cuối cùng là kết thúc
                  và chấm dứt. 6. Các mạng ngầm phát triển trong Web 4.0 phải
                  đảm bảo quyền riêng tư và bảo mật thông tin khi xử lý dữ liệu
                  nhạy cảm. 7. Web 4.0 đối mặt với thách thức về quyền riêng tư,
                  chẳng hạn như quản lý danh tính và phân phối dữ liệu. 8. Web
                  4.0 có thể tạo ra cơ hội mới cho quy định và bảo vệ quyền
                  riêng tư của người dùng. 9. GDPR có thể có vai trò quan trọng
                  trong việc đảm bảo sự riêng tư và bảo vệ dữ liệu cá nhân trong
                  Web 4.0. Từ khóa: Web 4.0, Web 3.0, trí tuệ nhân tạo, mạng
                  ngầm, nội dung VR/XR, quyền riêng tư, quyền riêng tư, GDPR.
                </p>
                <a
                  href="abc.com"
                  target="_blank"
                  class="mt-2 text-indigo-500 hover:text-indigo-400"
                >
                  Link đầy đủ
                </a>
                <div class="mt-4">
                  <div
                    id="chatbox"
                    class="mt-4"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {state.chatcontent}
                  </div>
                  <div class="d-flex flex-column">
                    <div class="w-full button-container">
                      <textarea
                        id="querytext"
                        rows="5"
                        maxlength="600"
                        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                        placeholder="Nhập câu hỏi ..."
                        value={state.queryText}
                        onChange={(e) => setQueryText(e.target.value)}
                        onKeyUp={(e) => handleKeyPress(e)}
                      ></textarea>
                      <button
                        id="sendButton"
                        class="mt-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                          onSendClick(state.selectingId, state.queryText)
                        }
                      >
                        <i class="fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </p>
            </div>
            <div class="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                id="modal-close"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-700 text-base font-medium hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => closeModal()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
