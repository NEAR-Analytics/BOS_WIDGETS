const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  min-width:350px;
  border-radius: 4px;
  overflow: visible;
`;

const Modal = ({ isOpen, children, overlayStyles, contentStyles }) => {
  return (
    <MUIDialog open={isOpen} {...overlayStyles}>
      <ModalContent {...contentStyles}>{children}</ModalContent>
    </MUIDialog>
  );
};

return <Modal {...props} />;
