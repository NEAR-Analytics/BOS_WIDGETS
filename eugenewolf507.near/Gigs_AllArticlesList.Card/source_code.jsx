State.init({ copiedShareUrl: true });
//TODO !!!!!! update authorForWidget
// const authorForWidget = "neardigitalcollective.near";
const authorForWidget = "eugenewolf507.near";
const article = props.article;
const statusChangeHandler = props.statusChangeHandler;
const openModalHandler = props.openModalHandler;
const closeModalHandler = props.closeModalHandler;
const cardWithOpenModal = props.cardWithOpenModal;
const statusTagsArr = props.statusTagsArr;
// const sharedArticleId = props.sharedArticleId;
const doesUserCanChangeStatus = props.doesUserCanChangeStatus;
const mainPartForSharingGig = `https://near.social/#/${authorForWidget}/widget/Gigs_AllArticlesList`;
const shareUrl = `${mainPartForSharingGig}?articleId=${article.articleId}`;

// ========== UTILS ==========
const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

// ========== STYLED ==========
const CardWrapper = styled.div`
  min-width: 340px;
  font-family: "Open Sans", sans-serif;
    margin-bottom: 16px;
  @media (min-width: 900px) {
    margin-bottom: 30px;
  }
`;

const Card = styled.div`
  position: "static";
  height: 100%;
  background: #F8F8F9;
  padding: 16px;
  border-radius: 10px;
  border: none;
  @media (min-width: 900px) {
    padding: 30px;
  }
`;

const PaddingWrapper = styled.div`
padding-bottom: 16px;
    @media (min-width: 900px) {
    padding-bottom: 30px;
  }
`;

const MainInfoWrrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  align-items: left;
  gap: 4px;
  border-radius: 6px;
  background: #FFF;
  font-size: 14px;
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
// ========== JSX ICONS ==========
const ShareText = () => (
  <>
    {state.copiedShareUrl ? (
      <Widget src="eugenewolf507.near/widget/CheckIcon" />
    ) : (
      <Widget src="eugenewolf507.near/widget/ShareIcon" />
    )}
    Share
  </>
);

// ========== JSX MODAL ==========
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
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
          >
            <Widget
              src="nui.sking.near/widget/Input.Button"
              props={{
                children: <ShareText />,
                variant: "primary",
                size: "sm",
                onClick: () => {
                  clipboard.writeText(shareUrl).then(() => {
                    State.update({ copiedShareUrl: true });
                  });
                },
              }}
            />
          </OverlayTrigger>
          <span
            role="button"
            onClick={onClose}
            style={{ fontSize: "1.5rem", width: "2rem", textAlign: "center" }}
          >
            <Widget src="eugenewolf507.near/widget/CloseIcon" />
          </span>
        </div>
        {children}
      </ModalStyles>
    </ModalWrapper>
  );
};

// ========== JSX CARD ==========
return (
  <CardWrapper key={article.articleId}>
    <Card>
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
      {cardWithOpenModal === article.articleId && (
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
      <div role="button" onClick={() => openModalHandler(article.articleId)}>
        <PaddingWrapper>
          <Widget
            src={`nui.sking.near/widget/Typography.Text`}
            props={{
              children: article.articleId,
              tag: "h2",
              size: "20px",
              className: "text-center pb-3 border-bottom",
            }}
          />
        </PaddingWrapper>
        <PaddingWrapper>
          <Widget
            src="nui.sking.near/widget/Element.User"
            props={{
              accountId: article.author,
              options: {
                size: "md",
                showSocialName: true,
                showImage: true,
                showHumanBadge: true,
              },
            }}
          />
        </PaddingWrapper>
        <MainInfoWrrapper>
          <div>Posted on {getDateLastEdit(article.timeCreate).date}</div>
          <div>Edited on {getDateLastEdit(article.timeLastEdit).date}</div>
          <div>
            Last edit by{" "}
            <a
              href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
              style={{ textDecoration: "underline" }}
            >
              {article.lastEditor}
            </a>
          </div>
          <div>Edit versions: {article.version}</div>
        </MainInfoWrrapper>
      </div>
    </Card>
  </CardWrapper>
);
