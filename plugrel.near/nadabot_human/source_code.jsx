const accountId = props.accountId ?? "odins_eyehole.near";

Near.asyncView("v1.nadabot.near", "is_human", { account_id: accountId }).then(
  (result) => {
    State.update({ human: result });
  }
);

return <>{state.human && <span>✅</span>}</>;
