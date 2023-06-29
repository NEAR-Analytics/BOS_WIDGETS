const { accountId, date, description } = props;

const widget = {
  button: "rubycop.near/widget/NDC.StyledComponents",
  modal: "frichard5.near/widget/NDC-modal",
};

State.init({
  showModal: false,
  comment: "",
});

return (
  <Widget
    src={widget.modal}
    props={{
      isOpen: state.showModal,
      toggleModal: () => State.update({ showModal: !state.showModal }),
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
