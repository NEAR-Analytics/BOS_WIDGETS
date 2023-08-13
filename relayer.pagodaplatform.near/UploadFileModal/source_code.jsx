const Overlay = styled.div`
    // position: fixed; /* Sit on top of the page content */
    position: relative;
    display: flex;
    // ${props.modalState ? "display: flex;" : "display: none;"}
    justify-content: center;
    align-items: center;
    width: 100vw; /* Full width (cover the whole page) */
    height: 100vh; /* Full height (cover the whole page) */
    // top: 0;
    // left: 0;
    // right: 0;
    // bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
`;

console.log(props);

const Modal = styled.div`
    width: 50%;
    height: 50%;
    background-color: #D9D9D9;
    cursor: default
`;

const CloseButton = styled.div`
  cursor: pointer
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

const fileChangeHandle = (e) => {
  console.log(e.target.files);
};

return (
  <Overlay onClick={props.turnOffModal}>
    <Modal className="rounded d-flex align-items-center flex-column">
      <div className="w-100 d-flex justify-content-end px-3">
        <CloseButton onClick={props.turnOffModal} className="fs-1">
          &#215;
        </CloseButton>
      </div>
      <div
        className="d-flex align-items-center justify-content-center w-75 bg-white rounded py-5"
        style={{ cursor: "pointer" }}
      >
        <label
          htmlFor="dropzone-file"
          className="d-flex flex-column align-items-center justify-content-center w-100 rounded"
        >
          <div className="d-flex flex-column align-items-center justify-content-center">
            <p className="mb-2">
              <span className="fw-bold fs-2">Drag & Drop</span>
            </p>
            <p className="">Support svg</p>
          </div>
          <input
            onChange={fileChangeHandle}
            id="dropzone-file"
            type="file"
            className="visually-hidden"
          />
        </label>
      </div>
      <div>
        <UploadButton className="btn px-5 py-2 mt-5">Upload</UploadButton>
      </div>
    </Modal>
  </Overlay>
);
