//TODO !!!!!! update authorForWidget, writersWhiteList and authorsWhitelist!!!
const addressForArticles = "ndcGigsArticle";
// const authorsWhitelist = [
//   "neardigitalcollective.near",
//   "blaze.near",
//   "jlw.near",
//   "kazanderdad.near",
//   "joep.near",
//   "sarahkornfeld.near",
//   "yuensid.near",
//   "james.near",
//   "ndcplug.near",
// ];
const writersWhiteList = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "james.near",
  "ndcplug.near",
  "eugenewolf507.near",
];
// const authorForWidget = "neardigitalcollective.near";
const authorForWidget = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
// if (!accountId) {
//   return "No account ID";
// }
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

return (
  <div className="container-fluid">
    <Widget
      src={`${authorForWidget}/widget/Gigs_MainNavigation`}
      props={{ currentNavPill: "articles", writersWhiteList }}
    />
    <div style={{ margin: "0 auto", minWidth: "360px" }}>
      <Widget
        src={`${authorForWidget}/widget/Gigs_AllArticlesList`}
        props={{ writersWhiteList }}
      />
    </div>
  </div>
);
