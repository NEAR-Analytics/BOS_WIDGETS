const addressForArticles = "ndcWikiArticle";
const authorsWhitelist = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "yuensid.near",
  "shubham007.near",
  "psalm.near",
  "fiftycent.near",
  "kdot.near",
  "vikash.near",
];
const authorForWidget = "abdullahi3000.near";
const accountId = props.accountId ?? context.accountId;
// if (!accountId) {
//   return "No account ID";
// }
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

return (
  <div
    className="container-fluid"
    style={{
      backgroundColor: "#151718",
      borderRadius: "20px",
      padding: "0",
    }}
  >
    {/*<Widget
      src={`abdullahi3000.near/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "articles", writersWhiteList }}
    />*/}
    <div style={{ margin: "0 auto", width: "90%", minWidth: "360px" }}>
      <Widget
        src={`${authorForWidget}/widget/NDCDocs_AllArticlesList`}
        props={{ writersWhiteList }}
      />
    </div>
  </div>
);
