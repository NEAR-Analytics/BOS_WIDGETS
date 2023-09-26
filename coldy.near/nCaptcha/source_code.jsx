const contract = "v1.ncaptcha.near";

const ratingMessage = Near.call(contract, "get_rating_for_account", {
  account: "coldy.near",
});

return <div>{ratingMessage}</div>;
