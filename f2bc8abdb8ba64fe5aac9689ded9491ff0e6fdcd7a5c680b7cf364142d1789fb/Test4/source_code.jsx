State.init({ start: Date.now() });

const isDebug = props.isDebug;
const author = props.author;

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

const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];

const widgets = {
  card: `${authorForWidget}/widget/NDC_GeneralCard`,
};

function getLastEditionsByArticle() {
  const allArticles = Social.index(addressForArticles, "main", {
    order: "desc",
    accountId: author,
  });

  const oldFormatArticlesTestBasicDataArray = [
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      97325392,
    ],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      97317287,
    ],
    ["ayelen.near", 96927579],
    ["kenrou-it.near", 96924422],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      96879470,
    ],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      96878182,
    ],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      96643643,
    ],
    ["silkking.near", 96491128],
  ];

  const oldFormatArticlesMainBasicDataArray = [
    ["ozymandius.near", 97329049],
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
    ["ozymandius.near", 95810612],
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

  const oldFormatArticlesBasicDataArray = isDebug
    ? oldFormatArticlesTestBasicDataArray
    : oldFormatArticlesMainBasicDataArray;

  if (author) {
    oldFormatArticlesBasicDataArray = oldFormatArticlesBasicDataArray.filter(
      (articleBasicData) => articleBasicData[0] === author
    );
  }

  let oldFormatArticlesArray = oldFormatArticlesBasicDataArray.map(
    (oldFormatBasicArticleData) => {
      let article = Social.get(
        `${oldFormatBasicArticleData[0]}/${addressForArticles}/main`,
        oldFormatBasicArticleData[1]
      );

      let articleParsed = JSON.parse(article);
      if (articleParsed) {
        articleParsed.blockHeight = oldFormatBasicArticleData[1];
      }

      return articleParsed;
    }
  );

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

  let lastestEditArticlesDataArray = newFormatArticlesData.filter(
    (articleData) => {
      const latestEditForThisArticle = newFormatArticlesData.find(
        (newArticleData) => newArticleData.value.id
      );
      return (
        JSON.stringify(articleData) === JSON.stringify(latestEditForThisArticle)
      );
    }
  );

  let finalNewFormatArticles = lastestEditArticlesDataArray.map(
    (latestEditArticle) => {
      const article = Social.get(
        `${latestEditArticle.accountId}/${addressForArticles}/main`,
        latestEditArticle.blockHeight
      );

      let articleParsed = JSON.parse(article);
      articleParsed.blockHeight = latestEditArticle.blockHeight;

      return articleParsed;
    }
  );

  let finalOldFormatArticles = oldFormatArticlesArray.filter(
    (oldFormatArticle) => {
      return !finalNewFormatArticles.find(
        (newFormatArticle) =>
          newFormatArticle.articleId === oldFormatArticle.articleId
      );
    }
  );

  let finalArticles = finalNewFormatArticles.concat(finalOldFormatArticles);

  return finalArticles;
}
const finalArticles = getLastEditionsByArticle();

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

return (
  <div className="row card-group py-3">
    {finalArticles.length > 0 &&
      finalArticles.map((article) => {
        // If some widget posts data different than an array it will be ignored
        if (!Array.isArray(article.tags)) article.tags = [];
        return (
          <Widget
            src={widgets.card}
            props={{ data: article, cardType: "sayalot" }}
          />
        );
      })}
  </div>
);
