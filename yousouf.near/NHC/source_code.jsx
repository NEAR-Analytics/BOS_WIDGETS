const accountId = props.accountId ?? context.accountId;
const ownerId = props.ownerId ?? "hack.near";
const pageId = props.pageId ?? "community.page";
return (
  <Widget
    src="hack.near/widget/community.page"
    props={{
      accountId,
      communityId: "nearhausa.near",
      contractId: "",
      h1: "NearHausa Community",
      h2: "NHC",
      tagline: "Building Better Future with Blockchain",
      mainColor: "",
      buttonText: "Let's go!",
      link: "https://libertydao.online",
    }}
  />
);
