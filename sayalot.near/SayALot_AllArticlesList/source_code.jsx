State.init({ start: Date.now() });

const isDebug = props.isDebug;
const author = props.author;

const writersWhiteList = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "zarmade.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "fiftycent.near",
  "ozymandius.near",
];

const sayALotWorkers = [
  "silkking.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  "blaze.near",
  "ayelen.near",
  "kenrou-it.near",
  "sayalot.near",
];

if (isDebug) {
  writersWhiteList = sayALotWorkers;
}

const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";
const authorForWidget = "sayalot.near";
// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];

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
          <div
            className="col-sm-12 col-lg-6 col-2xl-4 gy-3"
            key={article.articleId}
          >
            <div className="card h-100">
              <a
                className="text-decoration-none text-dark"
                href={
                  isDebug
                    ? `#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}&isDebug=true
            `
                    : `#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `
                }
              >
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <h5 className="card-title text-center pb-2 border-bottom">
                      {article.articleId}
                    </h5>
                    <div className="col flex-grow-1">
                      <Widget
                        src="mob.near/widget/Profile.ShortInlineBlock"
                        props={{ accountId: article.author, tooltip: true }}
                      />
                    </div>
                    <div className="col flex-grow-0">
                      <p className="card-subtitle text-muted text-end">
                        {getDateLastEdit(article.timeCreate).date}
                      </p>{" "}
                      <p className="card-subtitle text-muted text-end">
                        {getDateLastEdit(article.timeCreate).time}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-3 alert alert-secondary"
                    style={{ backgroundColor: "white" }}
                  >
                    <div>
                      Last edit by{" "}
                      <a
                        href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
                        style={{ textDecoration: "underline" }}
                      >
                        {article.lastEditor}
                      </a>
                      <br />
                      Edited on {getDateLastEdit(article.timeLastEdit).date}
                      <br />
                      Edit versions: {article.version}
                    </div>
                    <Widget
                      src={`${authorForWidget}/widget/SayALot_TagList`}
                      props={{ tags: article.tags, isDebug }}
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        );
      })}
  </div>
);
