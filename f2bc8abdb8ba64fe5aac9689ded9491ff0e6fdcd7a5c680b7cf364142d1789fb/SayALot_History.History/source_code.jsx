/*
---props---
count(count: number)?: function,
*/

const isDebug = props.isDebug;
const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";

const author = props.author;

const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const { articleId } = props;

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
  "chloe.near",
  "ozymandius.near",
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

// if (typeof props.widgetPath !== "string")
//   return "send {widgetPath} as string in props";

State.init({
  selectedTab: "code",
  selectedBlockHeight: null,
});

// // ========== GET INDEX ARRAY FOR ARTICLES ==========
// const postsIndex = Social.index(addressForArticles, "main", {
//   order: "desc",
//   accountId: undefined,
// });
// // ========== GET ALL ARTICLES ==========
// const resultArticles =
//   postsIndex &&
//   postsIndex.reduce((acc, { accountId, blockHeight }) => {
//     const postData = Social.get(
//       `${accountId}/${addressForArticles}/main`,
//       blockHeight
//     );
//     const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
//     return [...acc, postDataWithBlockHeight];
//   }, []);
// if (resultArticles === null) return "loading...";
// // ========== FIND ALL VERSIONS OF ONE ARTICLE ==========
// const filteredArticles =
//   resultArticles.length &&
//   resultArticles.reduce((acc, article) => {
//     if (article.articleId === articleId) {
//       return [...acc, article];
//     } else {
//       return acc;
//     }
//   }, []);

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
      articleParsed.blockHeight = oldFormatBasicArticleData[1];

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
// ========== GET ARRAY OF BLOCK HEIGHT AND LAST EDITOR ==========
let blocksChanges =
  finalArticles &&
  finalArticles.map((item) => ({
    blockHeight: item.blockHeight,
    lastEditor: item.lastEditor,
  }));

if (props.count) props.count(blocksChanges.length);
// if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const renderBlockChangesLink = (blockHeight) => {
  return (
    <div>
      <button
        className={`list-group-item list-group-item-action ${
          state.selectedBlockHeight.blockHeight != blockHeight
            ? ""
            : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight.blockHeight} *{" "}
        {getDatastringFromBlockHeight(blockHeight.blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToWidgetCode(blockHeightObject) {
  const index = blocksChanges.findIndex(
    (el) => el.blockHeight == blockHeightObject.blockHeight
  );
  const prevBlockHeightObject = blocksChanges[index + 1];
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeightObject.blockHeight}
      src={`neardigitalcollective.near/widget/WikiOnSocialDB_History.ArticleHistoryCard`}
      props={{
        pathToCurrentArticle: `${blockHeightObject.lastEditor}/${addressForArticles}/main`,
        currentBlockHeight: blockHeightObject.blockHeight,
        pathToPrevArticle: `${prevBlockHeightObject.lastEditor}/${addressForArticles}/main`,
        prevBlockHeight: prevBlockHeightObject.blockHeight,
      }}
    />
  );
}

function blockHeightToWidgetRender(blockHeightObject, allArticles) {
  const index = blocksChanges.findIndex(
    (el) => el.blockHeight == blockHeightObject.blockHeight
  );
  return <Markdown text={allArticles[index].body} />;
}

//styles forked from calebjacob.near/widget/Activity
const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091FF;
  }
`;

return (
  <div>
    <h3 class="text-center">Widget History</h3>
    {!blocksChanges ? (
      <div>incorrent widget path</div>
    ) : (
      <div>
        <div div class="card mb-3">
          <h3 class="card-header">{blocksChanges.length} Commits</h3>
          <div class="list-group">
            {blocksChanges
              .slice(0, 5)
              .map((height) => renderBlockChangesLink(height))}
            <div class="collapse" id="collapseExample">
              {blocksChanges
                .slice(5)
                .map((height) => renderBlockChangesLink(height))}
            </div>
            {blocksChanges.length > 5 && (
              <button
                class="list-group-item active"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <Tabs>
          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "code",
              })
            }
            selected={state.selectedTab == "code"}
          >
            Code
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "render",
              })
            }
            selected={state.selectedTab == "render"}
          >
            Render
          </TabsButton>
        </Tabs>

        {state.selectedTab == "code" && (
          <div>{blockHeightToWidgetCode(state.selectedBlockHeight)}</div>
        )}

        {state.selectedTab == "render" && (
          <div>
            {blockHeightToWidgetRender(
              state.selectedBlockHeight,
              finalArticles
            )}
          </div>
        )}
      </div>
    )}
  </div>
);
