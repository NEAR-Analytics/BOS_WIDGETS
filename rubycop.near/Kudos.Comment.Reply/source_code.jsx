const { isOpen, input } = props;

const widget = {
  button: "rubycop.near/widget/NDC.StyledComponents",
};

const Modal = styled.div`
  position: fixed;
  z-index: 101;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: ${(isOpen) => (props.isOpen ? "block" : "none")};
  background: rgba(128, 128, 128, 0.65);
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
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

const UserLink = ({ title, src }) => (
  <>
    <StyledLink href={src}>{title}</StyledLink>
  </>
);

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

const ContentDiv = () => (
  <Content>
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
      {input}
    </div>
    <div className="d-grid gap-3 d-flex align-items-center justify-content-end">
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Cancel",
            className: "secondary",
            onClick: handleClose,
          },
        }}
      />
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Submit",
            onClick: handleClose,
          },
        }}
      />
    </div>
  </Content>
);

return (
  <Modal id="modal" isOpen={isOpen}>
    <ComponentWrapper id="modal-comp" className="component-wrapper">
      <ContentDiv />
    </ComponentWrapper>
  </Modal>
);
