const Overlay = styled.div`
    position: fixed; /* Sit on top of the page content */
    ${props.modalState ? "display: flex;" : "display: none;"}
    justify-content: center;
    align-items: center;
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
`;

console.log(props);

const Modal = styled.div`
    width: 50%;
    height: 50%;
    background-color: white;
`;

return (
  <Overlay onClick={props.turnOffModal}>
    <Modal></Modal>
  </Overlay>
);
