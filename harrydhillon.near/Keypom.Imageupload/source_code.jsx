import styled from "styled-components";

const UploadContainer = styled.div`
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    position: relative;
    cursor: pointer;
`;

const UploadCTA = styled.p`
    margin: 0;
`;

const UploadButton = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
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
        <ImagePreview src={state.selectedImage} alt="Uploaded preview" />
      ) : (
        <UploadCTA>Browse or drag and drop your image file here.</UploadCTA>
      )}
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onFileChange}
        ref={(input) =>
          input &&
          input.addEventListener("click", (e) => {
            e.stopPropagation();
          })
        }
      />
      <UploadButton onClick={(e) => e.target.previousSibling.click()}>
        Browse images
      </UploadButton>
    </UploadContainer>
  );
};

return imageUploader();
