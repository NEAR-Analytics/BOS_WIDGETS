if (context.loading) {
  return;
}

const { evaluatorContract } = props;

// TODO: add colors here so we can iterate over the array
const curriculum = [{
  name: "Hello Near",
  subtext: "",
  path: "evaluator.near/widget/Curriculum.HelloNear",
  color: "lime"
},
{
  name: "Guest-book",
  subtext: "",
  path: "evaluator.near/widget/Curriculum.GuestBook",
  color: "pink"
},
{
  name: "Handle Complex Input",
  subtext: "",
  path: "evaluator.near/widget/Curriculum.ComplexInput",
  color: "indigo"
},
{
  name: "Cross Contract Calls",
  subtext: "",
  path: "evaluator.near/widget/Curriculum.XCC",
  color: "amber"
},
  // {
  //   name: "Complex Input",
  //   subtext: "(Advanced)",
  //   path: "evaluator.near/widget/Curriculum.CrossContractCalls",
  //   color: "sky"
  // }
];

function claimNFT() {
  return Near.call(evaluatorContract, "claim_nft", {});
}


function progress() {
  if (context.accountId === null) {
    return [false, false, false, false];
  }
  else {
    return Near.view(evaluatorContract, "get_progress", { account_id: context.accountId });
  }
}

const passedEvaluationsCount = progress().filter(v => v === true).length;
const evaluationsCount = curriculum.length;
const eligibleToClaimNFT = passedEvaluationsCount === evaluationsCount;

function DONE() {
  return <>
    <div class="h-1/5 flex justify-end px-2 ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Well Done!</span>
    </div>
  </>
}

function Item({ lesson, isPassed }) {
  return <>
    <div class="rounded-2xl w-52 h-60 bg-gray-100 shadow-xl border-4 border-gray-800 flex flex-col mr-4 mt-4">
      <div class={`bg-${lesson.color}-300 rounded-t-xl h-4/5 p-4`} style={{ clipPath: `polygon(100% 0, 100% 85%, 0 95%, 0 0)` }}>
        <h3 class="text-4xl font-bold leading-none text-gray-800">{lesson.name}</h3>
        {lesson.subtext !== "" ? <p class="text-xl">{lesson.subtext}</p> : ""}
      </div>

      <div class="h-1/5 text-right px-2">
        {isPassed
          ? <DONE />
          : <button class={`rounded-lg bg-${lesson.color}-300 font-bold py-1 px-2 text-sm hover:bg-${lesson.color}-400`} onClick={() => props.redirectTo({ path: lesson.path, bindings: {} })}>Go to lesson</button>}
      </div>
    </div>
  </>
}

return <>
  <h1 class="text-6xl font-bold">Your Progress: {`${passedEvaluationsCount} /${evaluationsCount}`}</h1 >
  {/* Claim NFT */}
  {eligibleToClaimNFT == true &&
    <div class="w-full text-gray-100 bg-blue-600 rounded-2xl py-4 px-4 mt-4 text-lg">
      <h2 class="text-6xl font-bold">Congratulations!</h2>
      <p class="mt-2 ">You have successfully completed all of the tasks and therefore eligible to claim your honorary NFT badge!</p>
      <button class="bg-gray-100 rounded-lg text-blue-600 py-2 px-4 mt-2 hover:bg-blue-700 hover:text-white" onClick={claimNFT}>Claim your badge now</button>
    </div>
  }
  {/* Tasks Cards */}
  <div class="flex flex-wrap">
    {curriculum.map((lesson, i) => {
      return <Item lesson={lesson} isPassed={progress()[i]} />
    })}
  </div>
</>
