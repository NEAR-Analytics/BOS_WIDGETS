if (context.loading) {
  return;
}

const { evaluatorContract, userAccountId } = props;

function isAccountRegistered() {
  return Near.view(evaluatorContract, "check_account_registered", { account_id: userAccountId });
}

function registerAccount() {
  Near.call(evaluatorContract, "register", {}); // TODO Fetch the required amount amount from the contract
}

return (
  <>
    <div class="text-gray-800">
      <h1 class="text-6xl font-bold">Evaluator Program</h1>
      <div class="h-1 bg-gray-800"></div>
      <div class="mt-4">
        <p>This course is an opportunity for web developers to earn a Certificate of Completion that represents the ability to design, develop, test and deploy smart contracts on the NEAR platform.</p>

        <h3 class="text-xl py-2 font-bold">Welcome</h3>
        <p>
          Glad you could join us. We will be working together to learn to build decentralized applications on the smart contract platform known as NEAR Protocol.
        </p>

      </div>
      <div class="text-right">
        <button class="rounded-lg py-2 px-4 bg-blue-600 hover:bg-blue-700 text-gray-100">
          {isAccountRegistered() ? "Continue to the lessons" : "Enroll in the program now"}
        </button>
      </div>
    </div>
  </>
);
