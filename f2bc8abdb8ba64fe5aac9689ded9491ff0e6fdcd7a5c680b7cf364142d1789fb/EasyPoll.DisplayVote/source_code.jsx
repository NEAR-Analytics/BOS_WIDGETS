if (!props.isPreview && !props.poll) {
  return "Property poll not set";
}

if (!props.whitelist) {
  return "Property whitelist not set";
}

const isTest = props.isTest;

const isPreview = props.isPreview ?? false;
const indexVersion = props.indexVersion ?? "3.2.0";
const whitelist = props.whitelist;

let widgetOwner = "neardigitalcollective.near";

// Getting question
const poll = props.poll;

State.init({
  answers: {},
});

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
const answers = isTest
  ? Social.index("poll_question", `test-answer-v${indexVersion}`)
  : Social.index("poll_question", `answer-v${indexVersion}`);

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
let hasVoted = true ?? userHasVoted();
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
      isTest,
      poll,
      canVote,
      countVotes,
      hasVoted,
      indexVersion,
      isQuestionOpen,
      validAnswersToThisPoll,
      whitelist,
    }}
  />
);
