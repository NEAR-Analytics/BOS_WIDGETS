const contract = "v1.ncaptcha.near";

const ratingMessage = Near.call(contract, "get_rating_for_account", {
  account: "coldy.near",
});
console.log(ratingMessage);

return <div>{ratingMessage}</div>;
