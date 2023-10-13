const { stateUpdate, libCalls } = props;

let resultLibCalls = [];

function firstFunctionName(props) {
  const { firstProp, secondProp } = props;
  //Execute function
  const saveValueToReturn = true;

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "firstFunctionName";
  });
  return saveValueToReturn;
}

function secondFunctionName(props) {
  const { firstProp, secondProp } = props;
  //Execute function
  const saveValueToReturn = true;

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "secondFunctionName";
  });
  return saveValueToReturn;
}

function libCall(call) {
  if (call.functionName === "firstFunctionName") {
    return firstFunctionName(call.props);
  } else if (call.functionName === "secondFunctionName") {
    return secondFunctionName(call.props);
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

return <>LibTemplate{/*You can test functions here before saving*/}</>;
