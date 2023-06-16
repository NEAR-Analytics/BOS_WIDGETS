if (!props.isPreview && !props.poll) {
  return "Property poll not set";
}

if (!props.whitelist) {
  return "Property whitelist not set";
}

const isPreview = props.isPreview ?? false;
const indexVersion = props.indexVersion ?? "3.2.0";
const whitelist = props.whitelist;

let widgetOwner = "neardigitalcollective.near";

// Getting question
const poll = props.poll;

State.init({
  answers: {},
});

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

// let bgBlue = "#96C0FF";
// let bgRed = "#FFB4B4";
// let bgYellow = "#FFE999";
// let bgPurple = "#E6C0FF";
// let bgGreen = "#96FFE0";
// let bgPink = "#FF96B9";
// let bgSkyBlue = "#96EAFF";
// let bgIndigo = "#96DCD2";

// let allBgColors = [
//   bgBlue,
//   bgRed,
//   bgYellow,
//   bgPurple,
//   bgGreen,
//   bgPink,
//   bgSkyBlue,
//   bgIndigo,
// ];

// let secondaryBgBlue = "#E6F0FF";
// let secondaryBgRed = "#FFEDED";
// let secondaryBgYellow = "#FFFAE6";
// let secondaryBgPurple = "#F9F0FF";
// let secondaryBgGreen = "#E6FFF7";
// let secondaryBgPink = "#FFE6EE";
// let secondaryBgSkyBlue = "#E6FAFF";
// let secondaryBgIndigo = "#E6F6F4";

// let allSecondaryBgColors = [
//   secondaryBgBlue,
//   secondaryBgRed,
//   secondaryBgYellow,
//   secondaryBgPurple,
//   secondaryBgGreen,
//   secondaryBgPink,
//   secondaryBgSkyBlue,
//   secondaryBgIndigo,
// ];

// Utility function
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

// Discards answers that were posted after question's end date
function getTimeRelatedValidAnswers(answers) {
  let low = 0;
  let high = answers.length - 1;
  const questionEndTimestamp = poll.value.endTimestamp;
  let endBlockTimestamp = getBlockTimestamp(answers[high].blockHeight);
  if (endBlockTimestamp < questionEndTimestamp) return answers;
  // For tries to exceed 50 there should be more than 10e15 answers which will never happen. But if you mess up and make an infinite cycle it will crash. This way it will never be infinite
  let tries = 10;
  while (high - low > 1 && tries > 0) {
    tries--;
    let curr = Math.floor((high - low) / 2) + low;
    let currBlockTimestamp = getBlockTimestamp(answers[curr].blockHeight);
    if (currBlockTimestamp < questionEndTimestamp) {
      low = curr;
    } else {
      high = curr;
    }
  }
  // Slice ignores the index of the last one. Since high - low == 1, high = low + 1
  return answers.slice(0, high);
}

function getOptionRelatedValidAnswers(answers) {
  return answers.filter((a) => {
    const userAnswers = a.value.answer;
    return userAnswers.every((an, i) => {
      // If has choicesOptions, then it's needs validation answer is among the options. If not, any answer is just fine
      if (poll.value.questions[i].choicesOptions.length > 0) {
        if (Array.isArray(an)) {
          return an.every(
            (ans) =>
              0 <= Number(ans) &&
              Number(ans) < poll.value.questions[i].choicesOptions.length
          );
        } else {
          return (
            0 <= Number(an) &&
            Number(an) < poll.value.questions[i].choicesOptions.length
          );
        }
      } else {
        return true;
      }
    });
  });
}

// Getting valid answers
const answers = Social.index("poll_question", `answer-v${indexVersion}`);

if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
  State.update({ answers: answers });
}

if (!state.answers) {
  return "Loading";
}

const isUserAllowedToVote = (accountId) => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: accountId,
    issuer: "fractal.i-am-human.near",
  });
  const hasSBTToken = view?.[0]?.[1]?.[0];
  return hasSBTToken || whitelist.includes(accountId);
};

const answersToThisPoll = state.answers.filter(
  (a) => a.value.questionBlockHeight == props.poll.blockHeight
);
function getValidAnswers() {
  let validTimeAnswers = getTimeRelatedValidAnswers(answersToThisPoll);
  let validOptionAndTimeAnswers =
    getOptionRelatedValidAnswers(validTimeAnswers);
  const validateAddresses = validOptionAndTimeAnswers.filter((item) => {
    return isUserAllowedToVote(item.accountId);
    // const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    //   account: item.accountId,
    //   issuer: "fractal.i-am-human.near",
    // });
    // return view?.[0]?.[1]?.[0] /*|| whitelist.includes(item.accountId)*/;
  });
  return validateAddresses;
}
const validAnswersToThisPoll = getValidAnswers(answersToThisPoll);
// Getting if user has already voted
const currAccountId = context.accountId ?? "";
function userHasVoted() {
  return (
    validAnswersToThisPoll.find((a) => a.accountId == currAccountId) !=
    undefined
  );
}
let hasVoted = userHasVoted();
const isQuestionOpen =
  poll.value.startTimestamp < Date.now() &&
  Date.now() < poll.value.endTimestamp;
const canVote = !hasVoted && isQuestionOpen;

// Counting votes to display
function countVotes(questionNumber, questionType) {
  if (questionType == "3") return;
  return validAnswersToThisPoll.reduce((acc, curr) => {
    let ans = curr.value.answer[questionNumber];
    if (Array.isArray(ans)) {
      ans.forEach((a) => {
        acc[Number(a)] += 1;
      });
    } else {
      acc[Number(ans)] += 1;
    }

    return acc;
  }, new Array(poll.value.questions[questionNumber].choicesOptions.length).fill(0));
}

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisPoll.length == 0) return 0;
  return ((votesToThisOption / validAnswersToThisPoll.length) * 100).toFixed(2);
}

return (
  <Widget
    src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/EasyPoll.DisplayVote2`}
    props={{
      poll,
      canVote,
      countVotes,
      getInputStyles,
      hasVoted,
      indexVersion,
      isQuestionOpen,
      validAnswersToThisPoll,
      whitelist,
    }}
  />
);
