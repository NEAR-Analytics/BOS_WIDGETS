const { isTest, stateUpdate, libCalls } = props;

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
    return { name: data[0], classNumber: data[1] };
  });

  const sbtsFiltered = userSBTs.filter((sbt) => {
    return sbt[0] === sbtsData[0].name;
  });

  const result =
    sbtsFiltered &&
    sbtsFiltered[0][1].find((sbt) => {
      return Number(sbt.metadata["class"]) === Number(sbtsData[0].classNumber);
    }) !== undefined;

  // const result =
  //   userSBTs
  //     .filter((sbt) => {
  //       return sbt[0] === sbtsData[0].name;
  //     })
  //     .find((sbt) => {
  //       return (
  //         Number(sbt[1].metadata["class"]) === Number(sbtsData[0].classNumber)
  //       );
  //     }) !== undefined;
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
