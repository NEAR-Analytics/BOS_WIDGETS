State.init({ showModal: false, copiedShareUrl: false });
console.log(article.articleId, state);
//TODO !!!!!! update authorForWidget
// const authorForWidget = "neardigitalcollective.near";

const authorForWidget = "eugenewolf507.near";
const article = props.article;
const statusChangeHandler = props.statusChangeHandler;
const statusTagsArr = props.statusTagsArr;
const sharedArticleId = props.sharedArticleId;
const doesUserCanChangeStatus = props.doesUserCanChangeStatus;
const mainPartForSharingGig =
  "https://near.social/#/eugenewolf507.near/widget/Gigs_AllArticlesList";
const shareUrl = `${mainPartForSharingGig}?articleId=${article.articleId}`;

if (sharedArticleId === article.articleId && sharedArticleId) {
  State.update({ showModal: true, copiedShareUrl: false });
}
//else {
//   State.init({ showModal: false, copiedShareUrl: false });
// }

if (state.showModal) {
  console.log("+++", article.articleId, state);
}
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
  State.update({ showModal: true });
};

const closeModalHandler = () => {
  State.update({ showModal: false });
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
  padding: 2rem;
  border-radius: .375rem;
  background: rgba(100, 100, 100, 0.7); 
  z-index:100;
`;
const ModalStyles = styled.div`
  height: calc(100% - 3rem);
  background: #fff;
  border-radius: .375rem;
`;

const ShareButtonWrapper = styled.div`
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    color: #11181c !important;

    &:hover,
    &:focus {
      text-decoration: none;
      outline: none;
    }

    i {
      color: #000;
    }

    .bi-16 {
      font-size: 21px;
    }
  }
`;

// ========== JSX ==========
const Modal = ({ onClose, children }) => {
  return (
    <ModalWrapper>
      <ModalStyles>
        <div
          class="d-flex justify-content-between align-items-baseline"
          style={{ padding: "1rem 2rem 0" }}
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
          >
            <ShareButtonWrapper>
              <button
                className="button"
                type="button"
                onMouseLeave={() => {
                  State.update({ copiedShareUrl: false });
                }}
                onClick={() => {
                  clipboard.writeText(shareUrl).then(() => {
                    State.update({ copiedShareUrl: true });
                  });
                }}
              >
                {state.copiedShareUrl ? (
                  <i className="bi-16 bi bi-check"></i>
                ) : (
                  <i className="bi-16 bi-link-45deg"></i>
                )}
              </button>
            </ShareButtonWrapper>
          </OverlayTrigger>
          <span
            role="button"
            onClick={onClose}
            style={{ fontSize: "1.5rem", width: "2rem", textAlign: "center" }}
          >
            &times;
          </span>
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
              article,
              statusChangeHandler,
              statusTagsArr,
              doesUserCanChangeStatus,
              closeModalHandler,
            }}
          />
        </Modal>
      )}
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
    </div>
  </CardWrapper>
);
