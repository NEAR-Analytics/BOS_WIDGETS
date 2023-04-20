const addressForArticles = "wikiTest";
const writersWhiteList = ["testwiki.near", "eugenewolf507.near"];
const authorForWidget = "rodrigos.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

return (
  <div className="container-fluid border-start border-end">
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "articles", writersWhiteList }}
    />
    <div>
      <Widget
        src={`$f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/WikiOnSocialDB_AllArticlesList`}
        props={{ writersWhiteList }}
      />
    </div>
  </div>
);
