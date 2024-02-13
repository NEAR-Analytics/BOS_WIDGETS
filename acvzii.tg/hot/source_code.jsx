const contract = "game.hot.tg";
const balance = Near.view(contract, "ft_balance_of", {
  account_id: context.accountId,
});

// Use and manipulate state
State.init({ balance });

const onBtnClick = () => {
  Near.call(contract, "claim", {});
};

// Define components
const miningForm = (
  <>
    <div class="text-center py-4">
      <button class="btn btn-primary btn-lg" onClick={onBtnClick}>
        挖挖
      </button>
    </div>
  </>
);

const notLoggedInWarning = <p class="text-center py-2"> Login to continue </p>;

// Render
return (
  <>
    <div class="py-4">
      <h1 class="text-center py-4">$HOT mining</h1>
      <p class="text-center">
        錢錢: {context.accountId ? balance / 1000000 : 0} $HOT
      </p>
      {context.accountId ? miningForm : notLoggedInWarning}
    </div>
  </>
);
