const { accountId, date, description, showModal } = props;

const widget = {
  button: "rubycop.near/widget/NDC.StyledComponents",
  modal: "frichard5.near/widget/NDC-modal",
};

State.init({
  showModal,
  comment: "",
});

const Modal = styled.div`
  background: #F8F8F9;
  margin: 20% auto;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  
  @media (max-width: 768px) {
    width: 90%;
  }

  .content {
    margin: 18px 0; 
  }
`;

const InputField = styled.div`
  margin: 20px 0;
`;

const Description = styled.div`
  max-height: 100px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 14px;
  margin: 12px 0;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;

  b {
    font-weight: 500;
  }
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  margin-left: 5px;
`;

const UserLink = ({ title, src }) => (
  <>
    <StyledLink href={src}>{title}</StyledLink>
  </>
);

return (
  <Widget
    src={widget.modal}
    props={{
      isOpen: state.showModal,
      toggleModal: (val) => State.update({ showModal: val }),
      component: (
        <Modal>
          <h4>Reply to comment</h4>
          <div className="content">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    accountId,
                    imageClassName: "rounded-circle w-100 h-100",
                    style: { width: "32px", height: "32px", marginRight: 5 },
                  }}
                />
                <UserLink
                  src={`https://wallet.near.org/profile/${accountId}`}
                  title={accountId}
                />
              </div>
              <CreatedAt>
                <i className="bi bi-clock" />
                {date}
              </CreatedAt>
            </div>
            <Description className="text-secondary">{description}</Description>
            <InputField>
              <input
                type="text"
                onChange={(e) => State.update({ comment: e.target.value })}
              />
            </InputField>
          </div>
          <div className="d-grid gap-3 d-flex align-items-center justify-content-end">
            <Widget
              src={widget.button}
              props={{
                Button: {
                  text: "Cancel",
                  className: "secondary",
                  onClick: () => State.update({ showModal: false }),
                },
              }}
            />
            <Widget
              src={widget.button}
              props={{
                Button: {
                  text: "Submit",
                  onClick: () => State.update({ showModal: false }),
                },
              }}
            />
          </div>
        </Modal>
      ),
    }}
  />
);
