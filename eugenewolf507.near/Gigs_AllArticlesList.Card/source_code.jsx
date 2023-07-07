const authorForWidget = "eugenewolf507.near";
State.init({ showModal: false });
const article = props.article;
const statusChangeHandler = props.statusChangeHandler;
const statusTagsArr = props.statusTagsArr;

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
const CardWrapper = styled.div`
  min-width: 340px;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .375rem;
  background: rgba(100, 100, 100, 0.7);
  z-index:100;
`;
const ModalStyles = styled.div`
  width: 95%;
  height: 95%;
  background: #fff;
  border-radius: .375rem;
`;

// ========== JSX ==========
const StatusTagGroup = ({ activeStatus, articleId }) => (
  <div className="d-flex flex-row flex-nowrap justify-content-between px-3 pb-3 ">
    {statusTagsArr.map((tag) => (
      <button
        onClick={() => statusChangeHandler(activeStatus, tag, articleId)}
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

const Modal = ({ onClose, children }) => {
  return (
    <ModalWrapper>
      <ModalStyles>
        <div
          class="d-flex justify-content-between"
          style={{ padding: "1rem 2rem 0" }}
        >
          <button onClick={onClose} class="btn btn-outline-dark btn-sm">
            share
          </button>
          <button onClick={onClose} class="btn btn-outline-dark btn-sm">
            &times;
          </button>
        </div>
        {children}
      </ModalStyles>
    </ModalWrapper>
  );
};

return (
  <CardWrapper className="col gy-3" key={article.articleId}>
    <div className="card h-100" style={{ position: "static" }}>
      {state.showModal && (
        <Modal onClose={closeModalHandler}>
          <Widget
            src={`${authorForWidget}/widget/Gigs_AllArticlesList.OneArticle`}
            props={{
              articleId: article.articleId,
              blockHeight: article.blockHeight,
              lastEditor: article.lastEditor,
            }}
          />
        </Modal>
      )}
      {/*
      <a
        className="text-decoration-none text-dark"
        href={`#/${authorForWidget}/widget/Gigs_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
      >
      */}
      <div role="button" className="card-body" onClick={openModalHandler}>
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
      {/*</a>*/}
      <StatusTagGroup
        activeStatus={article.statusTag}
        articleId={article.articleId}
      />
    </div>
  </CardWrapper>
);
