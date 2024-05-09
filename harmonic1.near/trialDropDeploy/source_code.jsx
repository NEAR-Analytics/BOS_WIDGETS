// Just fetch the CSS (ideally, only do it once per page instead of doing it in each component)
const css = fetch("https://floatui.com/tailwind.css").body;
if (!css) return "";
const Tailwind = styled.div`${css}`;

const wasm = VM.require("jass-build.near/widget/trialAccountWasm");
const contract = "v2.keypom.near";

// Utility function to convert NEAR to YoctoNEAR (assuming it's not already provided)
// const parseNearAmount = (nearAmount) => {
//     return new BN(nearAmount).multipliedBy(new BN("1000000000000000000000000")).toString();
// };

const parseNearAmount = (nearAmount) => {
  //
  // YoctoNEAR per NEAR (1 NEAR = 10^24 YoctoNEAR)
  console.log(nearAmount);
  const nearToYocto = new Big("1000000000000000000000000");
  console.log(
    nearAmount ? new Big(nearAmount).times(nearToYocto).toFixed() : "0"
  );
  return nearAmount ? new Big(nearAmount).times(nearToYocto).toFixed() : "0";
};

// State.init({
//   callableContract: "",
//   maxAttachableYoctoPerContract: "1",
//   callableMethods: "*",
//   startingBalance: "",
//   trialEndFloor: "",
// });

const [callableContract, setCallableContract] = useState("");

const handleCallableContractChange = (e) => {
  setCallableContract(e.target.value);
};

//const [maxAttachableYoctoPerContract, setMaxAttachableYoctoPerContract] = useState("1");
//const [callableMethods, setCallableMethods] = useState("*");
const [startingBalance, setStartingBalance] = useState("");
const [trialEndFloor, setTrialEndFloor] = useState("");

const PARAM_START = "|kP|";
const PARAM_STOP = "|kS|";

const wrapTxnParamsForTrial = (params) => {
  let newParams = {}; // Initialize newParams inside the function
  Object.entries(params).forEach(([k, v]) => {
    if (k === "args" && typeof v !== "string") {
      v = JSON.stringify(v);
    }
    if (Array.isArray(v)) v = v.join();
    newParams[PARAM_START + k] = v + PARAM_STOP;
  });
  return newParams;
};

// // What contracts can the trial account call?
// const callableContracts = [
//     'social.near'
// ]
// // What is the maximum amount of $NEAR that can be attached to a call for each callable contract?
// const maxAttachableYoctoPerContract = [
//     '1', //convert this into Yocto
// ]
// // What methods can the trial account call?
// const callableMethods = [
//     ['*'],
// ]

const DROP_CONFIG = {
  // How many claims can each key have.
  uses_per_key: 1,

  // Should the drop be automatically deleted when all the keys are used? This is defaulted to false and
  // Must be overwritten
  delete_on_empty: true,

  // When this drop is deleted and it is the owner's *last* drop, automatically withdraw their balance.
  auto_withdraw: true,

  // Minimum block timestamp that keys can be used. If None, keys can be used immediately
  // Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
  start_timestamp: null,

  // How often can a key be used
  // Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
  throttle_timestamp: null,

  // If claim is called, refund the deposit to the owner's balance. If None, default to false.
  on_claim_refund_deposit: null,

  // Can the access key only call the claim method_name? Default to both method_name callable
  claim_permission: null,

  // Root account that all sub-accounts will default to. If None, default to the global drop root.
  drop_root: null,
};

const deployTrialAccount = () => {
  const startingBalanceYocto = parseNearAmount(startingBalance);
  const trialEndFloorYocto = parseNearAmount(trialEndFloor);

  const maxAttachableYoctoPerContract = "1";
  const callableMethods = "*";

  //Before you pass callableContract and other two varss to create_drop
  //You need to add the mapping contract there too.
  // callableContracts.push('v1.mapping.keypom.near'); ////testnet: 'v1.mapping.keypom.testnet',
  const attachableForMapping = parseNearAmount("0.002"); // put the equivent yocto amount

  // Generate the proper args for setup:
  let actualContracts = callableContract + ",v1.mapping.keypom.near";
  let actualAmounts =
    maxAttachableYoctoPerContract + "," + attachableForMapping;
  let actualMethods = callableMethods + "," + "set";

  //Disclaimer to extend above logic to support Arrays, please refer to original keypom functions.

  //Take the storage cost into consideration for the attached deposit and trial end floor
  const storageCost = parseNearAmount("0.35"); //Deposit for contract state, put in yocto
  console.log("After storage");
  // const attachedDeposit = new BN(startingBalanceYocto).add(new BN(storageCost)).toString();
  // trialEndFloorYocto = new BN(attachedDeposit).sub(new BN(trialEndFloorYocto)).toString();
  const attachedDeposit = new Big(startingBalanceYocto)
    .plus(new Big(storageCost))
    .toFixed();
  trialEndFloorYocto = new Big(attachedDeposit)
    .minus(new Big(trialEndFloorYocto))
    .toFixed();

  console.log("Before storage");

  const repayAmountYocto = "0";
  const repayTo = context.accountId;

  const fcData = {
    methods: [
      [
        {
          receiver_id: "near",
          method_name: "create_account_advanced",
          attached_deposit: attachedDeposit,
          args: JSON.stringify({
            new_account_id: "INSERT_NEW_ACCOUNT",
            options: {
              contract_bytes: wasm.contract_bytes,
              limited_access_keys: [
                {
                  public_key: "INSERT_TRIAL_PUBLIC_KEY",
                  allowance: "0",
                  receiver_id: "INSERT_NEW_ACCOUNT",
                  method_names: "execute,create_account_and_claim",
                },
              ],
            },
          }),
          user_args_rule: "UserPreferred",
        },
        {
          receiver_id: "",
          method_name: "setup",
          attached_deposit: "0",
          args: JSON.stringify(
            wrapTxnParamsForTrial({
              contracts: actualContracts,
              amounts: actualAmounts,
              methods: actualMethods,
              funder: repayTo,
              repay: repayAmountYocto,
              floor: trialEndFloorYocto,
            })
          ),
          receiver_to_claimer: true,
        },
      ],
    ],
  };

  const drop_id = Date.now().toString();

  const createDropArgs = {
    drop_id: drop_id,
    public_keys: [],
    deposit_per_use: "0", // I don't know was this zero but we take this input from users
    config: DROP_CONFIG,
    //metadata,//unique identifer, don't need it for now I guess.
    required_gas: "150000000000000",
    fc: fcData,
  };

  Near.call(
    contract,
    "create_drop",
    createDropArgs,
    100000000000000,
    950000000000000000000000
  );
};

return (
  <Tailwind>
    <div className="flex overflow-hidden">
      <div className="py-12 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
        <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
          <div>
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Create Trials for your dApps
            </h3>
            <p className="mt-3">
              Configure your unique trial experience powered by Keypom.
            </p>
          </div>
          {context.accountId ? (
            <div className="space-y-5 mt-12 lg:pb-12">
              <div>
                <label className="font-medium">Callable Contract</label>
                <input
                  type="text"
                  //placeholder="social.near"
                  onChange={handleCallableContractChange}
                  //required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Callable Methods</label>
                <input
                  //type="email"
                  placeholder="set,get (comma seperated method names)"
                  //onChange={(e) => setCallableContract(e.target.value)}
                  //required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Starting Balance</label>
                <input
                  //type="text"
                  placeholder="0.1"
                  onChange={(e) => setStartingBalance(e.target.value)}
                  //required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Trial End Floor</label>
                <input
                  //type="email"
                  placeholder="0.01"
                  onChange={(e) => setTrialEndFloor(e.target.value)}
                  //required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>

              <button
                onClick={async () => {
                  deployTrialAccount();
                }}
                className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
              >
                Create Drop
              </button>
            </div>
          ) : (
            <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Please sign in with your account
            </h2>
          )}
        </div>
      </div>
    </div>
  </Tailwind>
);

// <Tailwind>
//   <div class="p-3">
//     <br />
//     {context.accountId ? (
//       <div class="border border-black p-3">
//         <h3>Configure your trial</h3>
//         <div class="row">
//           <div>
//             <input
//               placeholder="Starting Balance (NEAR)"
//               onChange={(e) => setStartingBalance(e.target.value)}
//             />
//             <input
//               placeholder="Trial End Floor (NEAR)"
//               onChange={(e) => setTrialEndFloor(e.target.value)}
//             />
//             <input
//               placeholder="Callable Contract"
//               onChange={(e) => setCallableContract(e.target.value)}
//             />
//           </div>
//         </div>
//         <button
//           class="btn btn-primary mt-2"
//           onClick={async () => {
//             deployTrialAccount();
//           }}
//         >
//           Create Trial Account Drop
//         </button>
//       </div>
//     ) : (
//       <p class="text-center py-2">Please connect your account</p>
//     )}
//     <br />
//   </div>
// </Tailwind>
