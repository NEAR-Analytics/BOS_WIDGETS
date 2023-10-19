// HOW TO USE
// Create the functions that you want. Then add the functions you want to 'export' inside the `callFunction` function

// INTERFACES
// interface FunctionCall {
//     functionName: string,
//     key: string, // The state of the caller will be updated with this string as a key
//     props: Record<string, any> // function parameters as object
// }

// type LibsCalls = Record<string, FunctionCall> // Key is lib name after lib.

const { isTest, stateUpdate, functionsToCallByLibrary, callLibs } = props;
const functionsToCall = functionsToCallByLibrary.template; // Change this with the name of your widget

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
); // We make a copy of the functions we're going to call to clean it afterwards if needed, so it isn't called every time the caller gets updated.
let resultFunctionsToCall = []; // Util for resultFunctionsToCallByLibrary

const libSrcArray = []; // string to lib widget

State.init({
  libsCalls: {}, // is a LibsCalls object. It's used to call another library's functions
});

function firstFunctionName(props) {
  const { firstProp, secondProp } = props;
  //Execute function
  const saveValueToReturn = true;

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "firstFunctionName";
  });
  return saveValueToReturn;
}

function secondFunctionName(props) {
  const { firstProp, secondProp } = props;
  //Execute function
  const saveValueToReturn = true;

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "secondFunctionName";
  });
  return saveValueToReturn;
}

function callFunction(call) {
  if (call.functionName === "firstFunctionName") {
    return firstFunctionName(call.props);
  } else if (call.functionName === "secondFunctionName") {
    return secondFunctionName(call.props);
  }
}

if (functionsToCall && functionsToCall.length > 0) {
  const updateObj = Object.assign({}, functionsToCallByLibrary);
  resultFunctionsToCall = [...functionsToCall];
  functionsToCall.forEach((call) => {
    updateObj[call.key] = callFunction(call);
  });

  resultFunctionsToCallByLibrary.template = resultFunctionsToCall;
  updateObj.functionsToCallByLibrary = resultFunctionsToCallByLibrary;
  stateUpdate(updateObj);
}

return (
  <>
    <>
      {libSrcArray.map((src) => {
        return callLibs(src, libStateUpdate, state.libsCalls, "lib.template");
      })}
    </>
  </>
);
