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
const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

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
  console.log("data ", data);
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
    console.log("updatedObjectToMove", updatedObjectToMove);
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

// ========== Modal POP Up ==========
const openModalHandler = () => {
  State.update({
    showModal: true,
  });
};

const closeModalHandler = () => {
  State.update({
    showModal: false,
  });
};

const ModalWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(100, 100, 100, 0.7);
  z-index:100;
`;
const Modal = styled.div`
  width: 80%;
  height: 80%;
  background: #fff;
  
`;

// ========== JSX ==========
const ScrollWrapper = styled.div`
  overflow-x: scroll !important;
  padding-bottom: 15px;
`;

const CardWrapper = styled.div`
  min-width: 340px;
`;

const StatusTagGroup = ({ activeStatus, articleId }) => (
  <div className="d-flex flex-row flex-nowrap justify-content-between px-3 pb-3 ">
    {statusTagsArr.map((tag) => (
      <button
        onClick={() => clickHandler(activeStatus, tag, articleId)}
        className={`btn btn-sm ${
          activeStatus === tag ? "btn-primary" : "btn-outline-primary"
        }`}
        disabled={activeStatus === tag}
      >
        #{tag}
      </button>
    ))}
  </div>
);

const Card = ({ article }) => (
  <CardWrapper className="col gy-3" key={article.articleId}>
    <div className="card h-100">
      <a
        className="text-decoration-none text-dark"
        href={`#/${authorForWidget}/widget/Gigs_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
      >
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <h5 className="card-title text-center pb-2 border-bottom">
              {article.articleId}
            </h5>
            <div className="col flex-grow-1">
              <Widget
                src="mob.near/widget/Profile.ShortInlineBlock"
                props={{
                  accountId: article.author,
                  tooltip: true,
                }}
              />
            </div>
            {/*
            <div className="col flex-grow-0">
              <p className="card-subtitle text-muted text-end">
                {getDateLastEdit(article.timeCreate).date}
              </p>{" "}
              <p className="card-subtitle text-muted text-end">
                {getDateLastEdit(article.timeCreate).time}
              </p>
            </div>
            */}
          </div>
          <div
            className="mt-3 mb-0 alert alert-secondary"
            style={{ backgroundColor: "white" }}
          >
            <div>
              Posted on {getDateLastEdit(article.timeCreate).date}
              <br />
              Edited on {getDateLastEdit(article.timeLastEdit).date}
              <br />
              Last edit by{" "}
              <a
                href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
                style={{ textDecoration: "underline" }}
              >
                {article.lastEditor}
              </a>
              <br />
              Edit versions: {article.version}
            </div>
          </div>
        </div>
      </a>
      <StatusTagGroup
        activeStatus={article.statusTag}
        articleId={article.articleId}
      />
      <div>
        <button onClick={openModalHandler}>OpenModal</button>
      </div>
    </div>
  </CardWrapper>
);

return (
  <>
    {state.showModal && (
      <ModalWrapper>
        <Modal>
          Modal Window
          <button onClick={closeModalHandler}>CloseModal</button>
        </Modal>
      </ModalWrapper>
    )}
    <ScrollWrapper>
      <div class="row gx-2 d-flex flex-nowrap">
        {statusTagsArr.map((tag) => (
          <div class="col">
            <div class="border border-dark rounded-2 px-3 pb-3">
              <div className="row card-group">
                <h4 className="pt-2 text-center">{capitalize(tag)}</h4>
                {state[tag].length > 0 &&
                  state[tag].map((item) => <Card article={item} />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollWrapper>
  </>
);
