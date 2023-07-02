const { accountId, profile } = props;
const addressForArticles = "ndcWikiArticle";
const authorsWhitelist = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "psalm.near",
  "fiftycent.near",
];
const authorForWidget = "neardigitalcollective.near";
accountId = accountId || context.accountId;
profile = profile || Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

return (
  <div
    className="container-fluid"
    style={{
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "0",
    }}
  >
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "articles", writersWhiteList }}
    />
    <div style={{ margin: "0 auto", width: "90%", minWidth: "360px" }}>
      <Widget
        src={`mattb.near/widget/NDCDocs.Components.ArticlesList`}
        props={{ writersWhiteList }}
      />
    </div>
  </div>
);
