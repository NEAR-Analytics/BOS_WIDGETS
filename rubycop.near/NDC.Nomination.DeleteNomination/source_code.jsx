const { handleClose, house, nomination_contract } = props;

const ModalCard = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;
const CommentCard = styled.div`
  width: 305px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid transparent;
  margin: 0 auto;
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;

const ExitContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: end;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const widgets = {
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
};

function handleSelfRevoke() {
  Storage.privateSet("Houseselected", house);
  Near.call(nomination_contract, "self_revoke").then(() => handleClose());
}

return (
  <ModalCard>
    <CommentCard>
      <ExitContainer>
        <i role="button" className="fs-3 bi bi-x" onClick={handleClose} />
      </ExitContainer>
      <IconContainer>
        <i className="fs-1 bi bi-trash" />
      </IconContainer>
      <h5 className="text-center py-3">
        Are you sure you’d like to delete your nomination? You will lose the
        current upvotes and comments.
      </h5>
      <div className="d-flex justify-content-between align-items-center">
        <Widget
          src={widgets.styledComponents}
          props={{
            Button: {
              text: "Cancel",
              className: "dark primary",
              onClick: handleClose,
            },
          }}
        />

        <Widget
          src={widgets.styledComponents}
          props={{
            Button: {
              text: "Delete nomination",
              className: "danger",
              onClick: handleSelfRevoke,
            },
          }}
        />
      </div>
    </CommentCard>
  </ModalCard>
);
