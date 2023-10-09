const contract = "tge-lockup.sweat";

const onBtnClick = () => {
  Near.call(contract, "claim", {}, 100000000000000);
};

// Define components
const claimForm = (
  <>
    <div class="text-center">
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Claim
      </button>
    </div>
  </>
);

const notLoggedInWarning = <p> Login to claim the sweatcoins </p>;

// Render
return (
  <>
    <div class="container border border-info p-3">
      <h3 class="text-center">Sweatcoin Claimer</h3>

      {context.accountId ? claimForm : notLoggedInWarning}
    </div>
  </>
);
