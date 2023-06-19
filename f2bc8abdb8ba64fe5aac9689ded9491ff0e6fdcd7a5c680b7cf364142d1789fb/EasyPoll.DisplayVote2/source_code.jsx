const widgetOwner = "neardigitalcollective.near";
const isTest = props.isTest;

let defaultVotes = [];
for (let i = 0; i < props.poll.value.questions.length; i++) {
  if (props.poll.value.questions[i].questionType == "2") {
    defaultVotes.push([""]);
  } else {
    defaultVotes.push("");
  }
}

let userVote;

State.init({
  vote: userVote ?? defaultVotes,
});

function getInputStyles(questionType, questionNumber, optionNumber) {
  if (questionType == "2") {
    return state.vote[questionNumber].includes(optionNumber + "")
      ? {
          borderColor: "black",
          borderWidth: "thick",
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
          borderWidth: "thick",
          width: "1rem",
          marginRight: "0.7rem",
        }
      : {
          width: "1rem",
          marginRight: "0.7rem",
        };
  }
}

// let secondaryColor = "#E9EBF8";
// let fontColorBlue = "#003E9C";
// let fontColorRed = "#9C2B2B";
// let fontColorYellow = "#9C7B03";
// let fontColorPurple = "#763E9C";
// let fontColorGreen = "#009C6D";
// let fontColorPink = "#9C0034";
// let fontColorSkyBlue = "#007C9C";
// let fontColorIndigo = "#006758";

// let allFontColors = [
//   fontColorBlue,
//   fontColorRed,
//   fontColorYellow,
//   fontColorPurple,
//   fontColorGreen,
//   fontColorPink,
//   fontColorSkyBlue,
//   fontColorIndigo,
// ];

// function getFontColor(index) {
//   return Number.isInteger((index + 1) / allFontColors.length)
//     ? allFontColors[0]
//     : allFontColors[
//         ((index + 1) / allFontColors.length -
//           Math.trunc((index + 1) / allFontColors.length)) *
//           allFontColors.length -
//           1
//       ];
// }

let bgBlue = "#96C0FF";
let bgRed = "#FFB4B4";
let bgYellow = "#FFE999";
let bgPurple = "#E6C0FF";
let bgGreen = "#96FFE0";
let bgPink = "#FF96B9";
let bgSkyBlue = "#96EAFF";
let bgIndigo = "#96DCD2";

let allBgColors = [
  bgBlue,
  bgRed,
  bgYellow,
  bgPurple,
  bgGreen,
  bgPink,
  bgSkyBlue,
  bgIndigo,
];

let secondaryBgBlue = "#E6F0FF";
let secondaryBgRed = "#FFEDED";
let secondaryBgYellow = "#FFFAE6";
let secondaryBgPurple = "#F9F0FF";
let secondaryBgGreen = "#E6FFF7";
let secondaryBgPink = "#FFE6EE";
let secondaryBgSkyBlue = "#E6FAFF";
let secondaryBgIndigo = "#E6F6F4";

let allSecondaryBgColors = [
  secondaryBgBlue,
  secondaryBgRed,
  secondaryBgYellow,
  secondaryBgPurple,
  secondaryBgGreen,
  secondaryBgPink,
  secondaryBgSkyBlue,
  secondaryBgIndigo,
];

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

return (
  <>
    <Widget
      src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/EasyPoll.DisplayMultiVote2`}
      props={{
        isTest,
        widgetOwner,
        getBgColor,
        poll: props.poll,
        indexVersion: props.indexVersion,
        vote: state.vote,
        questions: props.poll.value.questions,
        renderMultipleChoiceInput,
        getInputStyles: getInputStyles,
        canVote: props.canVote,
        hasVoted: props.hasVoted,
        stateUpdate: (data) => State.update(data),
        isQuestionOpen: props.isQuestionOpen,
        isVoteValid: isVoteValid,
        validAnswersToThisPoll: props.validAnswersToThisPoll,
        countVotes: props.countVotes,
      }}
    />
  </>
);
