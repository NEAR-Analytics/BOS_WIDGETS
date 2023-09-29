const { isTest, stateUpdate, libCalls } = props;

function isValidUser(props) {
  const { accountId, sbtName } = props;
  const userSBTs = Near.view(
    "registry.i-am-human.near",
    "sbt_tokens_by_owner",
    {
      account: accountId,
    }
  );

  return (
    userSBTs.find((sbt) => {
      return sbt[0] === sbtName;
    }) !== undefined
  );
}

function libCall(call) {
  if (call.functionName === "isValidUser") {
    return isValidUser(...call.props);
  }
}

let resultLibCalls = [];

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
