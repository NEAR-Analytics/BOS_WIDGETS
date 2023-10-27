const accountId = context.accountId;

const action = accountId
  ? Social.get(`${accountId}/settings/every/action`)
  : undefined;

if (action === null) {
  return "Loading";
}

const Button = styled.button``;

return (
  <div>
    <Button
      onClick={() => Social.set({ settings: { every: { action: null } } })}
    >
      reset
    </Button>
    <Widget src={action ?? "efiz.near/widget/action.default"} />
  </div>
);
