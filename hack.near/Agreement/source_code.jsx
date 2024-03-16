const ownerId = "hack.near";

State.init({
  signature: true,
  isFetched: false,
  agreement: true,
});

if (context.accountId && !state.isFetched) {
  Near.asyncView(
    "social.near",
    "get",
    {
      keys: [
        `${context.accountId}/profile/builder`,
        `${context.accountId}/index/agreement`,
      ],
    },
    "final",
    false
  ).then((data) =>
    State.update({
      signature: data[context.accountId]?.profile?.builder === "true",
      agreement:
        data[context.accountId]?.index?.agreement &&
        data[context.accountId]?.index?.agreement.length > 0,
      isFetched: true,
    })
  );
}

const showAgreement = !state.signature && state.agreement;

return (
  <>
    <Widget src={`${ownerId}/widget/Support`} />
    <Widget
      src={`${ownerId}/widget/AgreementModal`}
      props={{
        open: showAgreement,
        accept: () =>
          Social.set(
            { profile: { builder: true } },
            {
              onCommit: () => {
                State.update({ signature: true });
              },
            }
          ),
      }}
    />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Widget src={`${ownerId}/widget/AgreementPage`} />
    </div>
  </>
);
