State.init({
  checked: false,
  response: "",
  answers: ["", ""],
  showOptions: false,
  isCorrect: null,
});
const handleAnswer = (questionIndex, selectedAnswer) => {
  const updatedAnswer = [...state.answers];
  updatedAnswer[questionIndex] = selectedAnswer;

  const allAnswerSelected = updatedAnswer.every((answers) => answers != "");
  State.update({
    answers: updatedAnswer,
    showOptions: allAnswerSelected,
    isCorrect: null,
  });
};

const handleSubmit = () => {
  if (state.answers[0] === "B" && state.answers[1] === "A") {
    State.update({
      isCorrect: true,
    });
  } else {
    State.update({
      isCorrect: false,
    });
  }
};

const handleClick = () => {
  const response = Near.view(state.contracName, state.methodName);
  State.update({ response });
};
return (
  <div className="d-flex flex-column gap-4 py-4">
    <p>Câu hỏi 1: Khi nào diễn ra cuộc cách mạng tháng 8 năm 1945</p>
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Ngày 2 tháng 8 năm 1945",
        id: "checkbox-demo-01",
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Ngày 19 tháng 8 năm 1945",
        id: "checkbox-demo-02",
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Ngày 30 tháng 4 năm 1975",
        id: "checkbox-demo-03",
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Ngày 1 tháng 5 năm 1954",
        id: "checkbox-demo-04",
      }}
    />
    <p>
      Câu hỏi 2: Ai là người sáng lập ra Đảng Cộng Sản Việt Nam (Nay là Đảng
      Cộng Sản Việt Nam)
    </p>
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Hồ Chí Minh",
        id: "checkbox-demo-05",
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Võ Nguyên Giáp",
        id: "checkbox-demo-06",
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Trường Chinh",
        id: "checkbox-demo-07",
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        checked: state.checked,
        onChange: (checked) => State.update({ checked }),
        label: "Phạm Văn Đồng",
        id: "checkbox-demo-08",
      }}
    />
    {state.response}
    <button onClick={handleClick}>Trắc Nghiệm</button>
  </div>
);
