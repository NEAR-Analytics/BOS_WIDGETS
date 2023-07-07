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
];
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];
const authorForWidget = "neardigitalcollective.near";
const statusTagsArr = ["open", "claimed", "closed"];
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
      const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
      return [...acc, postDataWithBlockHeight];
    }, [])
    .filter((article) =>
      authorsWhitelist.some((addr) => addr === article.author)
    )
    .filter((article) => !articleBlackList.includes(article.blockHeight));
// ========== FILTER DUPLICATES ==========
// const filteredArticles =
//   resultArticles.length &&
//   resultArticles.reduce((acc, article) => {
//     if (!acc.some(({ articleId }) => articleId === article.articleId)) {
//       return [...acc, article];
//     } else {
//       return acc;
//     }
//   }, []);

const filteredArticles = [
  {
    articleId: "EasyPollForHumans",
    author: "neardigitalcollective.near",
    lastEditor: "yuensid.near",
    timeLastEdit: 1684556562667,
    timeCreate: 1683245865699,
    body: "## Easy Poll Gig ",
    version: 6,
    navigation_id: null,
    blockHeight: 92271082,
    statusTag: "claimed",
  },
  {
    articleId: "IAMHUMANProgressMeter",
    author: "jlw.near",
    lastEditor: "yuensid.near",
    timeLastEdit: 1685208918024,
    timeCreate: 1683552279387,
    body: "## I-AM-HUMAN Progress Meter Widget (Closed)",
    version: 7,
    navigation_id: null,
    blockHeight: 92843969,
    statusTag: "open",
  },
  {
    articleId: "NdcProgressMeter",
    author: "kazanderdad.near",
    lastEditor: "yuensid.near",
    timeLastEdit: 1685208948805,
    timeCreate: 1684240650738,
    body: "## NDC Progress Meter Widget (Closed)",
    version: 4,
    navigation_id: null,
    blockHeight: 92843996,
    statusTag: "closed",
  },
  {
    articleId: "EngineerRecruiting",
    author: "jlw.near",
    lastEditor: "yuensid.near",
    timeLastEdit: 1685208768245,
    timeCreate: 1683571833722,
    body: "## Engineering Recruiting (Closed)",
    version: 4,
    navigation_id: null,
    blockHeight: 92843841,
    statusTag: "claimed",
  },
  {
    articleId: "MigrateGWGDocs",
    author: "neardigitalcollective.near",
    lastEditor: "yuensid.near",
    timeLastEdit: 1684559639688,
    timeCreate: 1683243150976,
    body: "## Migrate GWG Docs #1 (Closed)",
    version: 7,
    navigation_id: null,
    blockHeight: 92273748,
  },
];

const sortArticlesByTag = () => {
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

// ========== STATE INIT ==========
const sortedArticlesByTag = sortArticlesByTag();
sortedArticlesByTag && State.init(sortedArticlesByTag);

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

// ========== HANDLER ==========
const clickHandler = (oldStatus, newStatus, articleId) => {
  const actualTag = oldStatus.toLowerCase();
  const newTag = newStatus.toLowerCase();
  // Find the index of the object to be moved
  const objectIndex = state[actualTag].findIndex(
    (obj) => obj.articleId === articleId
  );
  // Check if an object was found
  if (objectIndex !== -1) {
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
        State.update();
      },
    });
  }
};

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
          <div class="border border-dark rounded-2 px-3 pb-3">
            <div className="row card-group">
              <h4 className="pt-2 text-center">{capitalize(tag)}</h4>
              {state[tag].length > 0 &&
                state[tag].map((item) => (
                  <Widget
                    src="eugenewolf507.near/widget/Gigs_AllArticlesList.Card"
                    props={{
                      article: item,
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
