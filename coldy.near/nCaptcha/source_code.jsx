const contract = "v1.ncaptcha.near";

const ratingMessage = Near.view(contract, "get_rating_for_account", {
  account: "coldy.near",
});

return <div>{ratingMessage}</div>;
