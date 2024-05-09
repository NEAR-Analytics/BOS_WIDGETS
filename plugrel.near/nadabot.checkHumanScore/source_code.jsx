const accountId = props.accountId ?? "odins_eyehole.near";
const staging = props.staging ?? false;
const contract = staging ? "v1.staging.nada.bot" : "v1.nadabot.near";
Near.asyncView(contract, "get_human_score", {
  account_id: accountId,
}).then((result) => {
  State.update({ score_result: result });
});
// console.log(state.score.score);
return <>{state.score_result && <span>{state.score_result.score}</span>}</>;
