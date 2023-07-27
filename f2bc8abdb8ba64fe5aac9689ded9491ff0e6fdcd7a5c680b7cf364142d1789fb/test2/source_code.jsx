const isDebug = props.isDebug;
const author = props.author;
const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";

const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];

const writersWhiteList = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "fiftycent.near",
  "ozymandius.near",
  "chloe.near",
];

const sayALotWorkers = [
  "silkking.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  "blaze.near",
  "ayelen.near",
  "kenrou-it.near",
];

if (isDebug) {
  writersWhiteList = sayALotWorkers;
}

const allArticles = Social.index(addressForArticles, "main", {
  order: "asc",
  accountId: author,
})
  .filter((articleIndex) => writersWhiteList.includes(articleIndex.accountId))
  .filter(
    (articleIndex) => !articleBlackList.includes(articleIndex.blockHeight)
  );

let allFirstArticlesBlochHeight = [];

const allActualArticles = allArticles.map((articleData) => {
  let actualArticle = JSON.parse(
    Social.get(
      `${articleData.accountId}/${addressForArticles}/main`,
      articleData.blockHeight
    )
  );
  if (
    !allFirstArticlesBlochHeight.find(
      (articleBlockHeight) => articleBlockHeight[0] === actualArticle.articleId
    )
  ) {
    allFirstArticlesBlochHeight.push([
      actualArticle.articleId,
      articleData.blockHeight,
    ]);
  }
});

console.log(allFirstArticlesBlochHeight);

return <p></p>;
