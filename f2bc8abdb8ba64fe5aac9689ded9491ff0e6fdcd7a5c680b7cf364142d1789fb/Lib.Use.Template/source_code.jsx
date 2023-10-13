//Functions that you'll use at beggining
//Example:
// [
//     {
//         library1 as string(equal to library name): [
//             {functionName: string, key: string, props: object }
//         ]
//     }, {
//         library2 as string(equal to library name): [
//             {functionName: string, key: string, props: object }
//         ]
//     }
// ]
const initLibsCalls = {
  LibTemplate: [
    {
      functionName: "firstFunctionName",
      key: "keyThatWillUseTheFunctionToReturnValueOnThisWidgetState",
      props: {
        firstProp: "First value",
        secondProp: "Second value",
      },
    },
    {
      functionName: "secondFunctionName",
      key: "secondKey",
      props: {
        firstProp: "First value",
        secondProp: "Second value",
      },
    },
  ],
  LibSecondTemplate: [
    {
      functionName: "firstFunctionName",
      key: "thirdKey",
      props: {
        firstProp: "First value",
        secondProp: "Second value",
      },
    },
    {
      functionName: "secondFunctionName",
      key: "fourthKey",
      props: {
        firstProp: "First value",
        secondProp: "Second value",
      },
    },
  ],
};
State.init({ libsCalls: initLibsCalls });

let newLibsCalls = state.libsCalls;

State.update({ libsCalls: newLibsCalls });

//Array of libs that you'll use. They may not have special characters after "widget/"
const libSrcArray = [
  `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/LibTemplate`,
  `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/LibSecondTemplate`,
];

function stateUpdate(obj) {
  State.update(obj);
}

//Method to call librarys
function makeLibCall(src, stateUpdate, libsCalls) {
  console.log("libsCalls: ", libsCalls);
  const widgetName = src.split("widget/")[1];
  console.log("widgetName: ", widgetName);
  const libCalls = libsCalls[widgetName];
  console.log("libCalls: ", libCalls);
  return (
    <>
      <Widget
        src={src}
        props={{
          //Here you can pass every required prop for the librery but the next 2 must exist
          stateUpdate,
          libCalls,
        }}
      />
    </>
  );
}

//I use this to make sure the library never display anithing
const CallLibrary = styled.div`
  display: none;
`;

console.log(state);

return (
  <>
    {state.keyThatWillUseTheFunctionToReturnValueOnThisWidgetState && (
      <h1>keyThatWillUseTheFunctionToReturnValueOnThisWidgetState</h1>
    )}
    {state.secondKey && <h1>secondKey</h1>}
    {state.thirdKey && <h1>thirdKey</h1>}
    {state.fourthKey && <h1>fourthKey</h1>}
    {
      // <CallLibrary>
    }
    <div>
      {libSrcArray.map((src) => makeLibCall(src, stateUpdate, state.libsCalls))}
    </div>
    {
      // </CallLibrary>
    }
  </>
);
