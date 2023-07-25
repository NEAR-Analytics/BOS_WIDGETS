//TODO !!!!!! update authorForWidget and authorsWhitelist!!!
// const authorForWidget = "neardigitalcollective.near";
const authorForWidget = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
const addressForArticles = "ndcGigArticle";
const authorsWhitelist = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "eugenewolf507.near",
  "inc4social.near",
];
// const authorsWhitelist = props.writersWhiteList ?? [
//   "neardigitalcollective.near",
//   "blaze.near",
//   "jlw.near",
//   "kazanderdad.near",
//   "joep.near",
//   "sarahkornfeld.near",
//   "yuensid.near",
// ];
const sharedArticleId = props.articleId;
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];
const statusTagsArr = ["open", "claimed", "closed"];

const getActualArticles = () => {
  // ========== GET INDEX ARRAY FOR ARTICLES ==========
  const postsIndex = Social.index(addressForArticles, "main", {
    order: "desc",
    accountId: undefined,
  });
  // ========== GET ALL ARTICLES ==========
  const resultArticles =
    postsIndex &&
    postsIndex
      .reduce((acc, { accountId, blockHeight }) => {
        const postData = Social.get(
          `${accountId}/${addressForArticles}/main`,
          blockHeight
        );
        const postDataWithBlockHeight = {
          ...JSON.parse(postData),
          blockHeight,
        };
        return [...acc, postDataWithBlockHeight];
      }, [])
      .filter((article) =>
        authorsWhitelist.some((addr) => addr === article.author)
      )
      .filter((article) => !articleBlackList.includes(article.blockHeight));
  // ========== FILTER DUPLICATES ==========
  const filteredArticles =
    resultArticles.length &&
    resultArticles.reduce((acc, article) => {
      if (!acc.some(({ articleId }) => articleId === article.articleId)) {
        return [...acc, article];
      } else {
        return acc;
      }
    }, []);

  if (filteredArticles === 0 || filteredArticles === undefined) {
    return;
  }
  const result =
    filteredArticles &&
    filteredArticles.reduce(
      (acc, article) => {
        if (article.statusTag === "claimed") {
          const claimed = [...acc.claimed, article];
          const tempRes = { claimed };
          return { ...acc, ...tempRes };
        }
        if (article.statusTag === "closed") {
          const closed = [...acc.closed, article];
          const tempRes = { closed };
          return { ...acc, ...tempRes };
        }
        const intermediateArticle = { ...article, statusTag: "open" };
        const open = [...acc.open, intermediateArticle];
        const tempRes = { open };
        return { ...acc, ...tempRes };
      },
      { open: [], claimed: [], closed: [] }
    );
  return result;
};

// ========== LOCAL STORAGE ==========
const localStorageData = JSON.parse(
  Storage.privateGet("sortedArticlesByTagFromStorage")
);
const doesDataFresh = localStorageData.time
  ? Date.now() - localStorageData.time < 4000
  : false;

const initialCardWithOpenModal = { cardWithOpenModal: sharedArticleId };

if (doesDataFresh && localStorageData.sortedArticlesByTag) {
  // ========== STATE INIT ========== with articles from Storage
  State.init({
    ...localStorageData.sortedArticlesByTag,
    ...initialCardWithOpenModal,
  });
} else {
  Storage.privateSet("sortedArticlesByTagFromStorage", "");

  // ========== STATE INIT ========== with articles from near.social
  const sortedArticlesByTag = getActualArticles();
  sortedArticlesByTag &&
    State.init({ ...sortedArticlesByTag, ...initialCardWithOpenModal });

  const dataForStorage = {
    sortedArticlesByTag,
    time: Date.now(),
  };
  Storage.privateSet(
    "sortedArticlesByTagFromStorage",
    JSON.stringify(dataForStorage)
  );
}

// ========== UTILS ==========
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const composeData = (gigObject) => {
  const data = {
    ndcGigArticle: {
      main: JSON.stringify(gigObject),
    },
    index: {
      ndcGigArticle: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };
  return data;
};

const doesUserCanChangeStatus = authorsWhitelist.some(
  (whiteAddr) => whiteAddr === accountId
);

// if (sharedArticleId) {
//   State.update({ cardWithOpenModal: sharedArticleId });
// }

// ========== HANDLER ==========
const openModalHandler = (text) => {
  State.update({ cardWithOpenModal: text });
};

const closeModalHandler = () => {
  State.update({ cardWithOpenModal: false });
};

const updateStatusHandler = (oldStatus, newStatus, articleId) => {
  const actualTag = oldStatus.toLowerCase();
  const newTag = newStatus.toLowerCase();
  // Find the index of the object to be moved
  const objectIndex = state[actualTag].findIndex(
    (obj) => obj.articleId === articleId
  );
  // Check if an object was found and user have permission to change status
  if (objectIndex !== -1 && doesUserCanChangeStatus) {
    const objectToMove = state[actualTag].slice(objectIndex, 1)[0];
    const updatedObjectToMove = {
      ...objectToMove,
      lastEditor: accountId,
      timeLastEdit: Date.now(),
      statusTag: newStatus,
    };
    const newData = composeData(updatedObjectToMove);
    Social.set(newData, {
      force: true,
      onCommit: () => {
        state[actualTag].splice(objectIndex, 1);
        state[newTag].unshift(updatedObjectToMove);
        state.cardWithOpenModal = "";
        State.update();
      },
    });
  }
};
console.log("STATE", state);

// ========== JSX ==========
const ScrollWrapper = styled.div`
  overflow-x: scroll !important;
  position: relative;
  padding-bottom: 15px;
`;

return (
  <ScrollWrapper>
    <div class="row gx-2 d-flex flex-nowrap">
      {statusTagsArr.map((tag) => (
        <div class="col">
          <div class="border border-dark rounded-2 px-3 px-xl-4">
            <div className="row card-group">
              <h4 className="pt-2 text-center">{capitalize(tag)}</h4>
              {state[tag].length > 0 &&
                state[tag].map((item) => (
                  <Widget
                    src={`${authorForWidget}/widget/Gigs_AllArticlesList.Card`}
                    props={{
                      article: item,
                      statusChangeHandler: updateStatusHandler,
                      statusTagsArr,
                      sharedArticleId,
                      doesUserCanChangeStatus,
                      openModalHandler,
                      closeModalHandler,
                      cardWithOpenModal: state.cardWithOpenModal,
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </ScrollWrapper>
);
