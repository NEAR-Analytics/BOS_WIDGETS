const { content } = props;

const widget = {
  button: "rubycop.near/widget/NDC.StyledComponents",
};

State.init({
  comment: "",
});

const Modal = styled.div`
  position: fixed;
  z-index: 101;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: ${state.isOpen ? "block" : "none"};
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

return (
  <Modal id="modal">
    <ComponentWrapper id="modal-comp" className="component-wrapper">
      {content}
    </ComponentWrapper>
  </Modal>
);
