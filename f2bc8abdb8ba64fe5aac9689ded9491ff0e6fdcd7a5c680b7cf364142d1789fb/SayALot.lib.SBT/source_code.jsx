const { isTest, stateUpdate, libCalls } = props;

let resultLibCalls = [];

function isValidUser(props) {
  const { accountId, sbtName } = props;
  // console.log(0, accountId);
  const userSBTs = Near.view(
    "registry.i-am-human.near",
    "sbt_tokens_by_owner",
    {
      account: accountId,
    }
  );

  const result =
    userSBTs.find((sbt) => {
      return sbt[0] === sbtName;
    }) !== undefined;
  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "isValidUser";
  });

  // return true;

  return result;
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
