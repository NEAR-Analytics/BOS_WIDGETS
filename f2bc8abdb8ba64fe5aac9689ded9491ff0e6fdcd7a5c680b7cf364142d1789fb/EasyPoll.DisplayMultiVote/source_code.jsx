const widgetOwner = "neardigitalcollective.near";

const renderMultipleChoiceInput = ({
  questionNumber,
  questionType,
  option,
  optionNumber,
}) => {
  return (
    <>
      {!props.canVote ? (
        <Widget
          src={`${widgetOwner}/widget/EasyPoll.Percentage`}
          props={{
            vote: props.vote,
            questionNumber: questionNumber,
            questionType: questionType,
            option: option,
            optionNumber: optionNumber,
            canVote: props.canVote,
            getBgColor: props.getBgColor,
            countVotes: props.countVotes,
            clickRadioInputHandler: props.clickRadioInputHandler,
            clickCheckboxInputHandler: props.clickCheckboxInputHandler,
          }}
        />
      ) : (
        <div className="d-flex align-content-center">
          <input
            className="form-check-input"
            id={`${questionNumber}-${optionNumber}`}
            name={`${questionNumber}-${questionType}`}
            key={`${questionNumber}-${optionNumber}-${props.state.vote}`}
            style={props.getInputStyles(
              questionType,
              questionNumber,
              optionNumber
            )}
            type={questionType == "2" ? "checkbox" : "radio"}
            value={optionNumber}
            checked={
              questionType == "2"
                ? props.state.vote[questionNumber].includes(optionNumber + "")
                : props.state.vote[questionNumber] == optionNumber + ""
            }
            onClick={
              questionType != "2" &&
              props.clickRadioInputHandler(questionNumber, optionNumber)
            }
            onChange={
              questionType == "2" &&
              props.clickCheckboxInputHandler(questionNumber, optionNumber)
            }
          />
          <label for={`${questionNumber}-${optionNumber}`}>{option}</label>
        </div>
      )}
    </>
  );
};
return renderMultipleChoiceInput({
  questionNumber: props.questionNumber,
  questionType: props.questionType,
  option: props.option,
  optionNumber: props.optionNumber,
});
