State.init({
  answers: ["", "", ""], // Mảng để lưu trữ câu trả lời của người dùng cho mỗi câu hỏi
  showOptions: false,
  isCorrect: null, // Biến để kiểm tra câu trả lời
});

const handleAnswer = (questionIndex, selectedAnswer) => {
  // Cập nhật câu trả lời đã chọn cho câu hỏi được chỉ định
  const updatedAnswers = [...state.answers];
  console.log("upateAnswerss:", updatedAnswers);
  updatedAnswers[questionIndex] = selectedAnswer;

  // Kiểm tra xem cả hai câu trả lời đã được chọn
  const allAnswersSelected = updatedAnswers.every((answer) => answer !== "");
  console.log("allanswers: ", allAnswersSelected);

  State.update({
    answers: updatedAnswers,
    showOptions: allAnswersSelected,
    isCorrect: null, // Đặt lại biến kiểm tra khi người dùng chọn câu trả lời mới
  });
};

const handleSubmit = () => {
  // Kiểm tra câu trả lời và đưa ra thông báo
  if (
    state.answers[0] === "B" &&
    state.answers[1] === "A" &&
    state.answers[2] === "C"
  ) {
    State.update({
      isCorrect: true,
    });
  } else {
    State.update({
      isCorrect: false,
    });
  }
};
console.log(state.answers);

return (
  <>
    <h1> Câu hỏi trắc nghiệm</h1>
    <div>
      <h2> Câu hỏi 1: Cách mạng tháng 8 dien ra vào thời gian nào </h2>
      <p>
        <input
          value="A"
          name="cauA1"
          id="cauA1"
          type="radio"
          class=""
          onChange={() => handleAnswer(0, "A")}
          checked={state.answers[0] === "A"}
        />
        <label htmlFor="cauA1" style={{ marginLeft: "40px" }}>
          A. Ngày 2 tháng 8 năm 1945
        </label>
      </p>
      <p>
        <input
          value="B"
          name="cauB1"
          type="radio"
          class=""
          id="cauB1"
          onChange={() => handleAnswer(0, "B")}
          checked={state.answers[0] === "B"}
        />
        <label htmlFor="cauB1" style={{ marginLeft: "40px" }}>
          B. Ngày 19 tháng 8 năm 1945
        </label>
      </p>
      <p>
        <input
          value="C"
          name="cauC1"
          type="radio"
          class=""
          id="cauC1"
          onChange={() => handleAnswer(0, "C")}
          checked={state.answers[0] === "C"}
        />
        <label htmlFor="cauC1" style={{ marginLeft: "40px" }}>
          C. Ngày 30 tháng 4 năm 1975
        </label>
      </p>
      <p>
        <input
          value="D"
          name="cau1"
          type="radio"
          class=""
          id="cauD1"
          onChange={() => handleAnswer(0, "D")}
          checked={state.answers[0] === "D"}
        />
        <label htmlFor="cauD1" style={{ marginLeft: "40px" }}>
          D. Ngày 1 tháng 5 năm 1954
        </label>
      </p>
    </div>
    <div>
      <h2> Câu hỏi 2: Ai là người sáng lập ra Đảng Cộng sản Việt Nam? </h2>
      <p>
        <input
          value="A"
          name="cauA2"
          id="cauA2"
          type="radio"
          class=""
          onChange={() => handleAnswer(1, "A")}
          checked={state.answers[1] === "A"}
        />
        <label htmlFor="cauA2" style={{ marginLeft: "40px" }}>
          A. Hồ Chí Minh
        </label>
      </p>
      <p>
        <input
          value="B"
          name="cauB2"
          type="radio"
          class=""
          id="cauB2"
          onChange={() => handleAnswer(1, "B")}
          checked={state.answers[1] === "B"}
        />
        <label htmlFor="cauB2" style={{ marginLeft: "40px" }}>
          B. Võ Nguyên Giáp
        </label>
      </p>
      <p>
        <input
          value="C"
          name="cauC2"
          type="radio"
          class=""
          id="cauC2"
          onChange={() => handleAnswer(1, "C")}
          checked={state.answers[1] === "C"}
        />
        <label htmlFor="cauC2" style={{ marginLeft: "40px" }}>
          C. Trường Chinh
        </label>
      </p>
      <p>
        <input
          value="D"
          name="cauD2"
          type="radio"
          class=""
          id="cauD2"
          onChange={() => handleAnswer(1, "D")}
          checked={state.answers[1] === "D"}
        />
        <label htmlFor="cauD2" style={{ marginLeft: "40px" }}>
          D. Phạm Văn Đồng
        </label>
      </p>
    </div>
    <div>
      <h2> Câu hỏi 3: Tết trung thu vào ngày nào trong năm 2023? </h2>
      <p>
        <input
          value="A"
          name="cauA3"
          id="cauA3"
          type="radio"
          class=""
          onChange={() => handleAnswer(2, "A")}
          checked={state.answers[2] === "A"}
        />
        <label htmlFor="cauA3" style={{ marginLeft: "40px" }}>
          A. 12/12/2023
        </label>
      </p>
      <p>
        <input
          value="B"
          name="cauB3"
          type="radio"
          class=""
          id="cauB3"
          onChange={() => handleAnswer(2, "B")}
          checked={state.answers[2] === "B"}
        />
        <label htmlFor="cauB3" style={{ marginLeft: "40px" }}>
          B. 29/02/2023
        </label>
      </p>
      <p>
        <input
          value="C"
          name="cauC3"
          type="radio"
          class=""
          id="cauC3"
          onChange={() => handleAnswer(2, "C")}
          checked={state.answers[2] === "C"}
        />
        <label htmlFor="cauC3" style={{ marginLeft: "40px" }}>
          C. 29/09/2023
        </label>
      </p>
      <p>
        <input
          value="D"
          name="cauD3"
          type="radio"
          class=""
          id="cauD3"
          onChange={() => handleAnswer(2, "D")}
          checked={state.answers[2] === "D"}
        />
        <label htmlFor="cauD3" style={{ marginLeft: "40px" }}>
          D. 15/08/2023
        </label>
      </p>
    </div>
    <br />
    {state.showOptions && (
      <div>
        <button onClick={handleSubmit}>Trắc Nghiệm</button>
      </div>
    )}
    {state.isCorrect !== null && (
      <div>
        {state.isCorrect ? (
          <p>Bạn đã chính xác!</p>
        ) : (
          <p>Bạn chưa chính xác.</p>
        )}
      </div>
    )}
  </>
);
