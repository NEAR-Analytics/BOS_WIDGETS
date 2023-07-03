const { embedHeader, accountId, profile } = props;
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
    }}
  >
    {!embedHeader && (
      <Widget
        src="mattb.near/widget/NDC.Components.Header"
        props={{
          tabs: {
            articles: {
              text: "Articles",
            },
            authors: {
              text: "Authors",
            },
          },
          selectedTab: "articles",
        }}
      />
    )}
    <div
      style={{
        margin: "0 auto",
        width: "100%",
        minWidth: "360px",
        padding: "2rem",
      }}
    >
      <Widget
        src={`mattb.near/widget/NDCDocs.Components.ArticlesList`}
        props={{ writersWhiteList }}
      />
    </div>
  </div>
);
