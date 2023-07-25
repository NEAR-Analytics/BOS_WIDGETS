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
const authorForWidget1 = "neardigitalcollective.near";
const authorForWidget2 = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
// if (!accountId) {
//   return "No account ID";
// }
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

const Wrapper = styled.div`
  padding: 30px;
`;

return (
  <Wrapper className="container-fluid">
    <Widget
      src={`${authorForWidget1}/widget/Gigs_MainNavigation`}
      props={{ currentNavPill: "articles", writersWhiteList }}
    />
    <div style={{ margin: "0 auto", width: "98%", minWidth: "360px" }}>
      <Widget
        src={`${authorForWidget2}/widget/Gigs_AllArticlesList`}
        props={{ writersWhiteList }}
      />
    </div>
  </Wrapper>
);
