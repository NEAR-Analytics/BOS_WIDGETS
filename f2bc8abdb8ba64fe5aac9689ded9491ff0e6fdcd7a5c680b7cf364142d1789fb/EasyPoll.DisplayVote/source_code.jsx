let isPreview = props.isPreview ?? false;
let poll = props.poll ?? {
  accountId: "neardigitalcollective.near",
  blockHeight: 94242300,
  value: {
    isDraft: false,
    title: "OG Criteria Poll",
    description:
      "Greetings! We're thrilled to welcome you to this significant discussion on the role and qualifications of an OG in the NEAR Digital Collective.\nUnderstanding the 'OG' role, in our community context, is crucial as it impacts our collective's governance and development. We're looking at defining the criteria for an OG, discussing their level of activity, and considering a proposal that only OG's with an SBT should run for NDC V1 Gov.\n\nWe highly value your perspective. Regardless if you're a long-time member or a recent addition to our community, your opinion matters greatly. Your input enriches our collective decision-making and ensures our decisions truly reflect the community's voice.\nThank you for participating in this discussion and contributing to the future direction of the NEAR Digital Collective. \n\nRemember, your responses are invaluable to us, and we thank you for taking the time to participate in this poll. Your voice matters to us and helps shape the future direction of the NEAR Digital Collective. Thank you for your contribution!",
    tgLink: "",
    startTimestamp: 1686837600000,
    endTimestamp: 1688047200000,
    questions: [
      {
        question:
          "The GWG has proposed specific criteria for what qualifies as an OG you only need to fit one of the criteria to qualify. How much do you agree or disagree with these criteria ? 1. Champion/Contributor to GWG/NDC Gov (Anyone that received a 2022 Q4, 2023 Q1, or Q2 Gig/Bounty Reward)  2. NEAR Inc or NF member (before Pagoda Rebrand Feb ‘22) and is still a current member  3. Active in NEAR Community for 1.5 years before the election",
        questionType: "1",
        choicesOptions: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree ",
        ],
      },
      {
        question:
          "Could you explain why you feel this way about the proposed criteria for an OG?",
        questionType: "3",
        choicesOptions: [],
      },
      {
        question:
          "The OG criteria was a guardrail made by the GWG to ensure only people that are well informed and knowledgeable in the ecosystem can run for the governing bodies. How much do you agree or disagree with the proposal by the GWG that only qualified OG's with an SBT should be eligible to run for NDC V1 Gov instead of people from other chains that aren’t knowledgeable about NEAR.?",
        questionType: "1",
        choicesOptions: [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree",
        ],
      },
      {
        question:
          "What are your reasons for agreeing or disagreeing with this proposal above?",
        questionType: "3",
        choicesOptions: [],
      },
      {
        question:
          "In your opinion, what should be the minimum level of on-chain activity over the past 6 months required for an OG to be considered active when the market slowed down?",
        questionType: "1",
        choicesOptions: [
          "No minimum requirement",
          "Low level of activity (1 transaction per 6 months)",
          "Moderate level of activity (1 transaction per 3 months)",
          "High level of activity (1 transaction per month)",
          "Very high level of activity (1 transaction per week)",
        ],
      },
      {
        question:
          "Could you share your thoughts on why you believe this level of activity is appropriate for an OG? Additionally, how would you quantify this level of activity?”",
        questionType: "3",
        choicesOptions: [],
      },
      {
        question:
          "What do you believe should be the duration of an OG SBT before it expires?",
        questionType: "1",
        choicesOptions: [
          "1 year",
          "1.5 years",
          "2 years",
          "Other (please specify in the question below)",
        ],
      },
      {
        question:
          "Could you explain your reasons for choosing this duration for an OG SBT?",
        questionType: "3",
        choicesOptions: [],
      },
    ],
    timestamp: 1686834874377,
  },
};

let whitelist = props.whitelist ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
];

if (!isPreview && !poll) {
  return "Property poll not set";
}

if (!whitelist) {
  return "Property whitelist not set";
}

const indexVersion = props.indexVersion ?? "3.2.0";

let widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

let defaultVotes = [];
for (let i = 0; i < poll.value.questions.length; i++) {
  if (poll.value.questions[i].questionType == "2") {
    defaultVotes.push([""]);
  } else {
    defaultVotes.push("");
  }
}

State.init({
  vote: userVote ?? defaultVotes,
  answers: {},
  showErrorsInForm: false,
  hoveringElement: "",
});

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

let fontColorBlue = "#003E9C";
let fontColorRed = "#9C2B2B";
let fontColorYellow = "#9C7B03";
let fontColorPurple = "#763E9C";
let fontColorGreen = "#009C6D";
let fontColorPink = "#9C0034";
let fontColorSkyBlue = "#007C9C";
let fontColorIndigo = "#006758";

let allFontColors = [
  fontColorBlue,
  fontColorRed,
  fontColorYellow,
  fontColorPurple,
  fontColorGreen,
  fontColorPink,
  fontColorSkyBlue,
  fontColorIndigo,
];

let secondaryColor = "#E9EBF8";

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

function getFontColor(index) {
  return Number.isInteger((index + 1) / allFontColors.length)
    ? allFontColors[0]
    : allFontColors[
        ((index + 1) / allFontColors.length -
          Math.trunc((index + 1) / allFontColors.length)) *
          allFontColors.length -
          1
      ];
}

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
  (a) => a.value.questionBlockHeight == poll.blockHeight
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

let userVote;
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

//TODO review this!
const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: `answer-v${indexVersion}`,
          value: {
            answer: state.vote,
            questionBlockHeight: poll.blockHeight,
          },
        },
        undefined,
        0
      ),
    },
  };
};

function isVoteValid() {
  let isValid = state.vote.length == poll.value.questions.length;
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

function calculatePercentage(votesToThisOption) {
  if (validAnswersToThisPoll.length == 0) return 0;
  return ((votesToThisOption / validAnswersToThisPoll.length) * 100).toFixed(2);
}

function calculatePercentageOfOption(votes, index) {
  const validAnswers = votes.reduce((acc, curr) => acc + curr, 0);

  if (validAnswers == 0 || votes.length == 0) return 0;

  const votesToThisOption = votes[index];
  return ((votesToThisOption / validAnswers) * 100).toFixed(2);
}

function getBorderRadious(questionNumber, optionNumber) {
  if (optionNumber == 0) {
    return "12px 12px 4px 4px";
  } else if (
    optionNumber ==
    poll.value.questions[questionNumber].choicesOptions.length - 1
  ) {
    return "4px 4px 12px 12px";
  } else {
    return "4px";
  }
}

const isValidInput = () => {
  let result = state.vote != "";
  return result && !isPreview;
};

const renderAnswers = (questionNumber) => {
  return (
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.AnswerCommentsContainer`}
      props={{
        answers: validAnswersToThisPoll,
        questionNumber,
      }}
    />
  );
};

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

return (
  <Widget
    src={`${widgetOwner}/widget/EasyPoll.DisplayVote2`}
    props={{
      state: {
        vote: state.vote,
        hoveringElement: state.hoveringElement,
        showErrorsInForm: state.showErrorsInForm,
      },
      poll,
      canVote,
      getBgColor,
      getFontColor,
      countVotes,
      getBorderRadious,
      calculatePercentageOfOption,
      getBlockTimestamp,
      clickCheckboxInputHandler,
      clickRadioInputHandler,
      getInputStyles,
      hasVoted,
      getPublicationParams,
      stateUpdate: (data) => State.update(data),
      isQuestionOpen,
      isVoteValid,
      validAnswersToThisPoll,
      renderAnswers,
      whitelist,
    }}
  />
);
