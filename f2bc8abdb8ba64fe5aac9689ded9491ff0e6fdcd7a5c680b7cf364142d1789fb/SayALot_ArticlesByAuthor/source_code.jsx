const isDebug = props.isDebug;

const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const tagSelected = props.tag;
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
  return dateString;
};

const articleBlackList = [
  91092435, 91092174, 91051228, 91092223, 91051203, 96414482, 96402919,
  96402330, 96401880, 96412953, 96412953, 95766840, 95413943,
];

// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
});

console.log(0, postsIndex);

if (!postsIndex) {
  return "Loading...";
}

// ========== GET ALL ARTICLES ==========
const resultArticles =
  postsIndex &&
  postsIndex.reduce((acc, { accountId, blockHeight }) => {
    const postData = Social.get(
      `${accountId}/${addressForArticles}/main`,
      blockHeight
    );
    const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
    return [...acc, postDataWithBlockHeight];
  }, []);
console.log(1, resultArticles);

// ========== FILTER DUBLICATES ==========
const filteredArticles =
  resultArticles.length &&
  resultArticles
    .reduce((acc, article) => {
      if (!acc.some(({ articleId }) => articleId === article.articleId)) {
        return [...acc, article];
      } else {
        return acc;
      }
    }, [])
    .filter((article) => !articleBlackList.includes(article.blockHeight));
console.log(2, filteredArticles);

const filteredArticlesByTag =
  filteredArticles.length &&
  filteredArticles.reduce((acc, article) => {
    if (article.tags && article.tags.includes(tagSelected)) {
      console.log(article);
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);
console.log(3, filteredArticlesByTag);

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/SayALot_MainNavigation`}
      props={{ currentNavPill: "articles", isDebug }}
    />
    <div>
      Tag:
      {tagSelected}
    </div>
    <ol>
      {filteredArticlesByTag &&
        filteredArticlesByTag.map((article, index) => (
          <li key={article.articleId}>
            <a
              href={
                isDebug
                  ? `#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}&isDebug=true
            `
                  : `#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `
              }
            >
              {article.articleId}{" "}
              <small>
                (last edited:
                {getDateLastEdit(article.timeLastEdit)})
              </small>
            </a>
            <Widget
              src={`${authorForWidget}/widget/SayALot_TagList`}
              props={{ tags: article.tags, isDebug }}
            />
          </li>
        ))}
    </ol>
  </>
);
