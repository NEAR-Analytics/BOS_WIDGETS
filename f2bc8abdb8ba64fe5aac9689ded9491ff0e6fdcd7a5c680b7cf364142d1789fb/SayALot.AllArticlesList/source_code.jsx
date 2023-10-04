//===============================================INITIALIZATION=====================================================

let {
  isTest,
  stateUpdate,
  finalArticles,
  tabs,
  widgets,
  addressForArticles,
  handleFilterArticles,
  handleOpenArticle,
  authorForWidget,
  initialCreateState,
  editArticleData,
  callLibs,
  handleEditArticle,
  showCreateArticle,
  sbtWhiteList,
  handleSbtSelection,
  sbts,
  createSbtOptions,
  // logedUserSbts,
} = props;

const libSrcArray = [widgets.libUpVotes];

let initLibCalls = [];

//For the moment we'll allways have only 1 sbt in the array. If this change remember to do the propper work in SayALot.lib.SBT and here.
const articleSbts = articleToRenderData.sbts[0] ?? [];

finalArticles.forEach((article) =>
  initLibCalls.push({
    functionName: "getUpVotes",
    key: `upVotes-${article.realArticleId}`,
    props: {
      realArticleId:
        article.realArticleId ?? `${article.author}-${article.timeCreate}`,
      articleSbts: article.sbts[0] ?? [],
    },
  })
);

if (initLibCalls.length > 0) {
  State.update({ libCalls: initLibCalls });
}

State.init({
  start: Date.now(),
  libCalls: initLibCalls,
});

let finalArticlesWithUpVotes = finalArticles.map((article) => {
  article.upVotes = state[`upVotes-${article.realArticleId}`];

  return article;
});

const articles = [
  {
    articleId: "Test",
    author: "silkking.near",
    lastEditor: "silkking.near",
    timeLastEdit: 1694531955307,
    timeCreate: 1694531955307,
    body: "Test",
    version: 0,
    navigation_id: null,
    tags: [],
    realArticleId: "silkking.near-1694531955308",
    blockHeight: 100967515,
    upVotes: [],
  },
  {
    articleId: "Pruebacondanito",
    author: "blaze.near",
    lastEditor: "blaze.near",
    timeLastEdit: 1690304697321,
    timeCreate: 1690304697321,
    body: "Texto de prueba",
    version: 0,
    navigation_id: null,
    tags: [],
    blockHeight: 97314358,
    realArticleId:
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb-1690304697321",
    upVotes: [
      {
        accountId: "ayelen.near",
        blockHeight: 99281192,
        value: {
          upVoteId: "uv-ayelen.near-1692579012586",
        },
      },
    ],
  },
];

const sortedFinalArticlesWithUpVotes = finalArticlesWithUpVotes.sort((a, b) => {
  const fiveDaysTimeLapse = 432000;
  const now = Date.now();
  const uploadDate = a.timeLastEdit;

  if (now - fiveDaysTimeLapse <= uploadDate) {
    return a.timeLastEdit - b.timeLastEdit;
  } else if (a.upVotes) {
    return b.upVotes.length - a.upVotes.length;
  } else {
    return 0;
  }
});

//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================

const ArticlesListContainer = styled.div`
  background-color: rgb(248, 248, 249);
`;

const CallLibrary = styled.div`
  display: none;
`;

//=================================================END CONSTS=======================================================

//==================================================FUNCTIONS=======================================================

function getDateLastEdit(timestamp) {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
}

function allArticlesListStateUpdate(obj) {
  State.update(obj);
}

//================================================END FUNCTIONS=====================================================

return (
  <>
    {
      // true && (
      showCreateArticle && (
        <Widget
          src={widgets.create}
          props={{
            isTest,
            addressForArticles,
            authorForWidget,
            stateUpdate,
            widgets,
            initialCreateState,
            editArticleData,
            callLibs,
            handleFilterArticles,
            handleEditArticle,
            initialBody: "",
            createSbtOptions,
          }}
        />
      )
    }
    <div className="mt-3 border-top pt-2">
      <Widget
        src={widgets.styledComponents}
        props={{
          Dropdown: {
            label: "Select sbt filter",
            value: sbts[0],
            handleChange: handleSbtSelection,
            options: createSbtOptions(),
          },
        }}
      />
    </div>
    <ArticlesListContainer className="row card-group mt-3 py-3 rounded">
      {sortedFinalArticlesWithUpVotes.length > 0 &&
        sortedFinalArticlesWithUpVotes.map((article, i) => {
          const authorProfileCall = Social.getr(`${article.author}/profile`);

          if (authorProfileCall) {
            article.authorProfile = authorProfileCall;
          }

          // If some widget posts data different than an array it will be ignored
          if (!Array.isArray(article.tags)) article.tags = [];
          return (
            <Widget
              src={widgets.generalCard}
              props={{
                widgets,
                isTest,
                data: article,
                displayOverlay: true,
                renderReactions: true,
                addressForArticles,
                handleOpenArticle,
                handleFilterArticles,
                authorForWidget,
                // logedUserSbts,
              }}
            />
          );
        })}
    </ArticlesListContainer>
    <CallLibrary>
      {callLibs(libSrcArray, allArticlesListStateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
