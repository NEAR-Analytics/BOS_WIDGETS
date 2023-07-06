State.init({ showModal: false });
const article = props.article;
console.log(props);
//TODO get statusTagsArr from props
const statusTagsArr = ["open", "claimed", "closed"];

// ========== UTILS ==========
const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

// ========== HANDLERS ==========
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

// ========== STYLED ==========
const ScrollWrapper = styled.div`
  overflow-x: scroll !important;
  padding-bottom: 15px;
`;

const CardWrapper = styled.div`
  min-width: 340px;
`;

// ========== JSX ==========
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

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    <div>
      <div>
        <button onClick={onClose} class="btn btn-outline-dark btn-sm">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

return (
  <CardWrapper className="col gy-3" key={article.articleId}>
    <div className="card h-100">
      <Modal isOpen={state.showModal} onClose={closeModalHandler}>
        <h2>Hello</h2>
        <p>description</p>
      </Modal>
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
