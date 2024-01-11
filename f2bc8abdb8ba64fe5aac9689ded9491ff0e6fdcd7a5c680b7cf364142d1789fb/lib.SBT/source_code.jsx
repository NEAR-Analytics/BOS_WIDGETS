const {
  isTest,
  stateUpdate,
  functionsToCallByLibrary,
  callLibs,
  baseAction,
  callerWidget,
  widgets,
} = props;
const libName = "SBT"; // EDIT: set lib name
const functionsToCall = functionsToCallByLibrary[libName];

const sbtWhiteList =
  context.networkId === "testnet"
    ? [
        {
          value: "fractal-v2.i-am-human.testnet - class 1",
          title: "Fractal",
          default: true,
        },
        {
          value: "community-v2.i-am-human.testnet - class 1",
          title: "Community",
        },
      ]
    : [
        {
          value: "fractal.i-am-human.near - class 1",
          title: "General",
          default: true,
        },
        { value: "community.i-am-human.near - class 1", title: "OG" },
        { value: "community.i-am-human.near - class 2", title: "Contributor" },
        {
          value: "community.i-am-human.near - class 3",
          title: "Core Contributor",
        },
        { value: "elections.ndc-gwg.near - class 2", title: "HoM" },
        { value: "elections.ndc-gwg.near - class 3", title: "CoA" },
        { value: "elections.ndc-gwg.near - class 4", title: "TC" },
        { value: "public", title: "Public" },
      ];

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
);
let resultFunctionsToCall = [];

// START LIB CALLS SECTION
// This lib does not call any other lib
// END LIB CALLS SECTION

function log(message) {
  console.log(`lib.${libName}`, message);
}

function logError(message) {
  console.error(`lib.${libName}`, message);
}

function libStateUpdate(obj) {
  State.update(obj);
}

// START LIB FUNCTIONS: EDIT set functions you need

function getSBTWhiteList(props) {
  const {} = props;

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "getSBTWhiteList";
  });

  return sbtWhiteList;
}

function isValidUser(props) {
  const { accountId, sbtsNames } = props;
  const userSBTs = Near.view(
    "registry.i-am-human.near",
    "sbt_tokens_by_owner",
    {
      account: accountId,
    }
  );
  const isSBTContractLoaded = userSBTs !== null;
  if (!isSBTContractLoaded) {
    return undefined;
  }

  const sbtsData = sbtsNames.map((sbt) => {
    const data = sbt.split(" - class ");
    return { name: data[0], classNumber: Number(data[1]) };
  });
  const usersValidityBySBT = {};
  sbtsNames.forEach((sbtName, index) => {
    const isUserValid =
      isSBTContractLoaded &&
      userSBTs.find((userSbt) => {
        return (
          userSbt[0] === sbtsData[index].name &&
          userSbt[1].find(
            (sbtExtraData) =>
              sbtExtraData.metadata["class"] === sbtsData[index].classNumber
          )
        );
      }) !== undefined;
    usersValidityBySBT[sbtName] = isUserValid || sbtName === "public";
  });

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "isValidUser";
  });

  // return true;
  return { ...usersValidityBySBT };
}

function getLoggedUserSbts(props) {
  const { accountId } = props;
  const userSBTs = Near.view(
    "registry.i-am-human.near",
    "sbt_tokens_by_owner",
    {
      account: accountId,
    }
  );

  if (userSBTs) {
    resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
      return call.functionName !== "getLoggedUserSbts";
    });
  }

  return userSBTs;
}
// END LIB FUNCTIONS

// EDIT: set functions you want to export
function callFunction(call) {
  if (call.functionName === "getSBTWhiteList") {
    return getSBTWhiteList(call.props);
  } else if (call.functionName === "isValidUser") {
    return isValidUser(call.props);
  } else if (call.functionName === "getLoggedUserSbts") {
    return getLoggedUserSbts(call.props);
  }
}

if (functionsToCall && functionsToCall.length > 0) {
  const updateObj = Object.assign({}, functionsToCallByLibrary);
  resultFunctionsToCall = [...functionsToCall];
  functionsToCall.forEach((call) => {
    updateObj[call.key] = callFunction(call);
  });

  resultFunctionsToCallByLibrary[libName] = resultFunctionsToCall;
  updateObj.functionsToCallByLibrary = resultFunctionsToCallByLibrary;
  stateUpdate(updateObj);
}

return <></>;
