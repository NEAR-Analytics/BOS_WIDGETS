const accountId = context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/near.social/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

return (
  <Widget
    src="evrything.near/widget/Everything.Template"
    props={{
      accountId: "evrything-docs.near", // which account's Types to use (your near account)
      font: "Times New Roman", // select a web safe font
      text: "Everything", // main title
      domain: "everything-docs", // domain data should be saved to
      video: "video",
    }}
  />
);
