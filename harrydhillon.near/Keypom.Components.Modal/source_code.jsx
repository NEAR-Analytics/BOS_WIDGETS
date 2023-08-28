const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props.background ?"": "rgba(0, 0, 0, 0.5)"};
  background:${props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  min-width:350px;
  border-radius: 4px;
`;

const Modal = ({ isOpen, children, overlayStyles, contentStyles }) => {
  if (!isOpen) return undefined;

  return (
    <ModalOverlay {...overlayStyles}>
      <ModalContent {...contentStyles}>{children}</ModalContent>
    </ModalOverlay>
  );
};

return <Modal {...props} />;
