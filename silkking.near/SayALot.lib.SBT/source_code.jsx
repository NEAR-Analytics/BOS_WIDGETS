const { isTest, stateUpdate, libCalls } = props;

let resultLibCalls = [];

function isValidUser(props) {
  const { accountId, sbtsNames } = props;
  console.log(5);
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
  console.log(4, sbtsNames);
  const usersValidityBySBT = sbtsNames.map((sbtName, index) => {
    const userValidityBySBT =
      userSBTs.find((userSbt) => {
        console.log(3, userSbt, sbtsData);
        return (
          userSbt[0] === sbtsData[index].name &&
          userSbt[1].find(
            (sbtExtraData) =>
              sbtExtraData.metadata["class"] === sbtsData[index].classNumber
          )
        );
      }) !== undefined;
    return {
      [sbtName]: userValidityBySBT,
    };
  });
  // const sbtsFiltered = userSBTs.filter((sbt) => {
  //   return sbt[0] === sbtsData[0].name;
  // });

  // const classFiltered = sbtsFiltered[0][1]
  //   ? sbtsFiltered[0][1].find((sbt) => {
  //       return sbt.metadata["class"] === sbtsData[0].classNumber;
  //     })
  //   : undefined;

  // const result = classFiltered !== undefined;

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
  console.log(2, usersValidityBySBT);
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
