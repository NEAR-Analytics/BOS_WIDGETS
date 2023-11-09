const accountId = props.accountId ?? context.accountId;

const creatorId = props.creatorId ?? "hack.near";
const pageId = props.pageId ?? "community.page";

return (
  <>
    <Widget
      src={`${creatorId}/widget/${pageId}`}
      props={{
        accountId,
        communityId: "every.near",
        contractId: "mint.sharddog.near",

        h1: "EVERY",
        h2: "ONE",

        tagline: "Build a Community Page",
        taglineFont: "Courier",

        h1Color: "#000",
        h1Font: "Courier",
        h1FontSize: "89px",

        h2Color: "#fff",
        h2Font: "Courier",
        h2FontSize: "89px",
        bgColor: "#000",

        buttonText: "View Template",
        link: "#/hack.near/widget/community.page",
      }}
    />
  </>
);
