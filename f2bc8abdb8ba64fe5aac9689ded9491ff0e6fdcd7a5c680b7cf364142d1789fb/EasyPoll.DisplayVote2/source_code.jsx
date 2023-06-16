const widgetOwner = "neardigitalcollective.near";

let defaultVotes = [];
for (let i = 0; i < props.poll.value.questions.length; i++) {
  if (props.poll.value.questions[i].questionType == "2") {
    defaultVotes.push([""]);
  } else {
    defaultVotes.push("");
  }
}

State.init({
  vote: defaultVotes,
});

function getInputStyles(questionType, questionNumber, optionNumber) {
  if (questionType == "2") {
    return state.vote[questionNumber].includes(optionNumber + "")
      ? {
          borderColor: "black",
          backgroundColor: "black",
          width: "1rem",
          marginRight: "0.7rem",
        }
      : {
          width: "1rem",
          marginRight: "0.7rem",
        };
  } else {
    return optionNumber + "" == state.vote[questionNumber]
      ? {
          borderColor: "black",
          backgroundColor: "black",
          width: "1rem",
          marginRight: "0.7rem",
        }
      : {
          width: "1rem",
          marginRight: "0.7rem",
        };
  }
}

function getBgColor(index, isPrimary) {
  let allColorsOfThisType =
    state.vote != `${index}` && isPrimary ? allBgColors : allSecondaryBgColors;

  return Number.isInteger((index + 1) / allColorsOfThisType.length)
    ? allColorsOfThisType[0]
    : allColorsOfThisType[
        ((index + 1) / allColorsOfThisType.length -
          Math.trunc((index + 1) / allColorsOfThisType.length)) *
          allColorsOfThisType.length -
          1
      ];
}

function isVoteValid() {
  let isValid = state.vote.length == props.poll.value.questions.length;
  isValid = isValid && context.accountId;
  for (let i = 0; i < state.vote.length; i++) {
    const vote = state.vote[i];
    // vote should always be a string, but in one case is treated as an array. Replace array with csv
    if (Array.isArray(vote)) {
      isValid = isValid && vote.filter((v) => v.trim() != "").length > 0;
    } else {
      isValid = isValid && vote.trim() != "";
    }
  }
  return isValid;
}

function clickRadioInputHandler(questionNumber, optionNumber) {
  return () => {
    let newVote = state.vote;

    newVote[questionNumber] = optionNumber + "";
    State.update({ vote: newVote });
  };
}

function clickCheckboxInputHandler(questionNumber, optionNumber) {
  return () => {
    let newVote = state.vote;

    let oldQuestionVotes = newVote[questionNumber];
    let newQuestionVotes = [];

    if (!oldQuestionVotes.includes(optionNumber + "")) {
      newQuestionVotes = oldQuestionVotes;
      newQuestionVotes.push(optionNumber + "");
    } else {
      for (let i = 0; i < oldQuestionVotes.length; i++) {
        if (oldQuestionVotes[i] != optionNumber + "") {
          newQuestionVotes.push(oldQuestionVotes[i]);
        }
      }
    }

    newVote[questionNumber] = newQuestionVotes.filter((a) => a != "");

    State.update({ votes: newVote });
  };
}

const renderMultipleChoiceInput = ({
  questionNumber,
  questionType,
  option,
  optionNumber,
}) => (
  <>
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.DisplayMultiVote`}
      props={{
        vote: state.vote,
        questionNumber,
        questionType,
        option,
        optionNumber,
        canVote: props.canVote,
        getBgColor: getBgColor,
        countVotes: props.countVotes,
        clickRadioInputHandler: clickRadioInputHandler,
        getInputStyles: getInputStyles,
      }}
    />
  </>
);

return (
  <>
    <Widget
      src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/EasyPoll.DisplayMultiVote2`}
      props={{
        poll: props.poll,
        indexVersion: props.indexVersion,
        vote: state.vote,
        questions: props.poll.value.questions,
        renderMultipleChoiceInput,
        getInputStyles: getInputStyles,
        hasVoted: props.hasVoted,
        stateUpdate: (data) => State.update(data),
        isQuestionOpen: props.isQuestionOpen,
        isVoteValid: isVoteValid,
        validAnswersToThisPoll: props.validAnswersToThisPoll,
      }}
    />
  </>
);
