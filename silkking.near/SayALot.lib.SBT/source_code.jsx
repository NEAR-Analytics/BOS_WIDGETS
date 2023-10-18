const { isTest, stateUpdate, functionsToCallByLibrary, callLibs } = props;
const functionsToCall = functionsToCallByLibrary.article;

let resultLibCalls = [];

function isValidUser(props) {
  const { accountId, sbtsNames } = props;
  const userSBTs = Near.view(
    "registry.i-am-human.near",
    "sbt_tokens_by_owner",
    {
      account: accountId,
    }
  );

  const sbtsData = sbtsNames.map((sbt) => {
    const data = sbt.split(" - class ");
    return { name: data[0], classNumber: Number(data[1]) };
  });
  const usersValidityBySBT = {};
  sbtsNames.forEach((sbtName, index) => {
    const userValidityBySBT =
      userSBTs.find((userSbt) => {
        return (
          userSbt[0] === sbtsData[index].name &&
          userSbt[1].find(
            (sbtExtraData) =>
              sbtExtraData.metadata["class"] === sbtsData[index].classNumber
          )
        );
      }) !== undefined;
    usersValidityBySBT[sbtName] = userValidityBySBT;
  });

  resultLibCalls = resultLibCalls.filter((call) => {
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
    resultLibCalls = resultLibCalls.filter((call) => {
      return call.functionName !== "getLoggedUserSbts";
    });
  }

  return userSBTs;
}

function libCall(call) {
  if (call.functionName === "isValidUser") {
    return isValidUser(call.props);
  } else if (call.functionName === "getLoggedUserSbts") {
    return getLoggedUserSbts(call.props);
  }
}

if (libCalls && libCalls.length > 0) {
  const updateObj = {};
  resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <></>;
