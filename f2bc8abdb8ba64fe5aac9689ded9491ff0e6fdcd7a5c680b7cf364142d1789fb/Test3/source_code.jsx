const isDebug = props.isDebug;
const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";

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

const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];

function getLastEditionsByArticle() {
  const allArticles = Social.index(addressForArticles, "main", {
    order: "desc",
    accountId: undefined,
  });

  const oldFormatArticlesData = isDebug
    ? [
        ["ayelen.near", 96927579],
        [
          "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
          96399182,
        ],
      ]
    : [
        ["fiftycent.near", 97322138],
        ["blaze.near", 97255023],
        ["jlw.near", 97250015],
        ["kazanderdad.near", 96692435],
        ["blaze.near", 96414482],
        ["blaze.near", 96412953],
        ["sarahkornfeld.near", 96402919],
        ["sarahkornfeld.near", 96402476],
        ["sarahkornfeld.near", 96402330],
        ["sarahkornfeld.near", 96401880],
        ["blaze.near", 95766756],
        ["blaze.near", 95766700],
        ["jlw.near", 95705034],
        ["blaze.near", 95413943],
        ["blaze.near", 94936576],
        ["yuensid.near", 94866690],
        ["sarahkornfeld.near", 94863580],
        ["blaze.near", 94801223],
        ["sarahkornfeld.near", 94344236],
        ["sarahkornfeld.near", 94188387],
        ["jlw.near", 93986868],
        ["blaze.near", 92999498],
      ];
  let oldFormatArticles = [];

  for (let i = 0; i < oldFormatArticlesData.length; i++) {
    let article = Social.get(
      `${oldFormatArticlesData[i][0]}/${addressForArticles}/main`,
      oldFormatArticlesData[i][1]
    );

    oldFormatArticles.push(JSON.parse(article));
  }

  let newFormatArticlesData = allArticles
    .filter((articleIndex) => articleIndex.value.id)
    .filter(
      (articleIndex) =>
        articleIndex.value.id.split("-")[0] === articleIndex.accountId
    )
    .filter((articleIndex) => writersWhiteList.includes(articleIndex.accountId))
    .filter(
      (articleIndex) => !articleBlackList.includes(articleIndex.blockHeight)
    );

  let reducedArticlesData = [];

  for (let i = 0; i < newFormatArticlesData.length; i++) {
    let currentArticleData = newFormatArticlesData[i];
    let articleWithSameId = reducedArticlesData.find(
      (article) => article.value.id === currentArticleData.value.id
    );

    if (!articleWithSameId) {
      reducedArticlesData.push(currentArticleData);
    }
  }

  let reducedArticles = [];
  for (let i = 0; i < reducedArticlesData.length; i++) {
    const article = Social.get(
      `${reducedArticlesData[i].accountId}/${addressForArticles}/main`,
      reducedArticlesData[i].blockHeight
    );
    reducedArticles.push(JSON.parse(article));
  }

  let finalArticles = [];
  for (let i = 0; i < oldFormatArticles.length; i++) {
    let articleWithNewStructure = reducedArticles.find(
      (article) => article.articleId === oldFormatArticles[i].articleId
    );

    if (!articleWithNewStructure) {
      finalArticles.push(oldFormatArticles[i]);
    }
  }

  for (let i = 0; i < reducedArticles.length; i++) {
    finalArticles.push(reducedArticles[i]);
  }

  return finalArticles;
}

console.log(getLastEditionsByArticle());

return <div>{JSON.stringify(getLastEditionsByArticle())}</div>;
