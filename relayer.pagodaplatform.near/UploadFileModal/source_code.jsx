const Overlay = styled.div`
    position: absolute; /* Sit on top of the page content */
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

const Container = styled.div`
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
    z-index: 1
`;

const Modal = styled.div`
    width: 50%;
    background-color: #D9D9D9;
    cursor: default;
    z-index: 3
`;

const CloseButton = styled.div`
  cursor: pointer;
  
  :hover{
    opacity: 0.7
  }
`;

const UploadButton = styled.button`
  background-color: #0057F9;
  color: white;

  :hover{
    color: white;
    background-color: #0057F9;
    opaticy: 0.8
  }
`;

console.log(props);

State.init({
  file: null,
  onChange: (files) => {
    let file = files[0];

    if (file) {
      props.setFile(file);

      State.update({
        file: {
          name: file.name,
          file: file,
        },
      });
    }
  },
  isSuccess: false,
  message: "",
});

const handleClick = async (e) => {
  const response = await props.uploadFile(e);

  State.update({
    ...state,
    isSuccess: response.state,
    message: response.message,
  });
};

return (
  <Container>
    <Overlay id="overlay" onClick={props.turnOffModal} />
    <Modal className="rounded d-flex align-items-center flex-column pb-4 position-absolute top-50 start-50 translate-middle">
      <div className="w-100 d-flex justify-content-end px-3">
        <CloseButton onClick={props.turnOffModal} className="fs-1">
          &#215;
        </CloseButton>
      </div>
      <div className="d-flex align-items-center justify-content-center w-75 bg-white rounded">
        <Files
          className="d-flex flex-column align-items-center justify-content-center w-100 rounded py-5"
          style={{ cursor: "pointer", border: "solid 1px dash #000" }}
          onChange={state.onChange}
          clickable
          multiple={false}
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <p className="mb-2">
              <span className="fw-bold fs-2">Drag & Drop</span>
            </p>
            <p className="">Support svg</p>
          </div>
        </Files>
      </div>
      {state.file && (
        <div id="fileName" className="px-3 py-1 mt-3 bg-white rounded-pill">
          {state.file?.name}
        </div>
      )}
      <div>
        <UploadButton className="btn px-5 py-2 mt-3" onClick={handleClick}>
          Upload
        </UploadButton>
      </div>
    </Modal>
  </Container>
);
