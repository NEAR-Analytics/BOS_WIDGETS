const UploadContainer = styled.div`
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    position: relative;
    cursor: pointer;
    border-radius:10px;
`;

const UploadCTA = styled.p`
    margin: 0;
    color: gray;
`;

const UploadButton = styled.button`
    background-color: white;
    color: #000;
    padding: 10px 15px;
    border: 1px solid lightgray;
    border-radius:100px;
    cursor: pointer;
    margin-top: 10px;
`;

const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 10px auto;
`;

const imageUploader = () => {
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        State.update({ selectedImage: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        State.update({ selectedImage: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <UploadContainer onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      {state.selectedImage ? (
        <>
          <ImagePreview src={state.selectedImage} alt="Uploaded preview" />
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
          >
            <path
              d="M27 35.5H11.5523C10.5426 35.5 10.0377 35.5 9.80397 35.3003C9.60113 35.1271 9.49348 34.8672 9.51441 34.6013C9.53853 34.2948 9.89552 33.9378 10.6095 33.2239L24.781 19.0523C25.4411 18.3923 25.7711 18.0622 26.1516 17.9386C26.4864 17.8298 26.847 17.8298 27.1817 17.9386C27.5622 18.0622 27.8923 18.3923 28.5523 19.0523L35 25.5V27.5M27 35.5C29.8003 35.5 31.2004 35.5 32.27 34.955C33.2108 34.4757 33.9757 33.7108 34.455 32.77C35 31.7004 35 30.3003 35 27.5M27 35.5H13C10.1997 35.5 8.79961 35.5 7.73005 34.955C6.78924 34.4757 6.02433 33.7108 5.54497 32.77C5 31.7004 5 30.3003 5 27.5V13.5C5 10.6997 5 9.29961 5.54497 8.23005C6.02433 7.28924 6.78924 6.52433 7.73005 6.04497C8.79961 5.5 10.1997 5.5 13 5.5H27C29.8003 5.5 31.2004 5.5 32.27 6.04497C33.2108 6.52433 33.9757 7.28924 34.455 8.23005C35 9.29961 35 10.6997 35 13.5V27.5M17.5 14.6667C17.5 16.5076 16.0076 18 14.1667 18C12.3257 18 10.8333 16.5076 10.8333 14.6667C10.8333 12.8257 12.3257 11.3333 14.1667 11.3333C16.0076 11.3333 17.5 12.8257 17.5 14.6667Z"
              stroke="#94A3B8"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <UploadCTA>Browse or drag and drop your image file here.</UploadCTA>
        </>
      )}
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onFileChange}
        id="fileupload"
        ref={(input) =>
          input &&
          input.addEventListener("click", (e) => {
            e.stopPropagation();
          })
        }
      />
      <UploadButton
        onClick={(e) => document.getElementById("fileupload").click()}
      >
        Browse images
      </UploadButton>
    </UploadContainer>
  );
};

return imageUploader();
