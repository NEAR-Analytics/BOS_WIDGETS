const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:2402";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";
const Logout = props.Logout;

//Styles
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 64px;
  height: fit-content;
  position: relative;
  align-items: stretch;
  flex-direction: column;
  color: rgb(229 229 229);
  background: rgb(23,23,23);
  @media (max-width: 510px) {
      padding: 30px;
  }
`;

const Card = styled.div`
    gap: 24px;
    display: flex;
    width: 100%;
    padding: 48px;
    border-radius: 8px;
    position: relative;
    flex-direction: column;
    background: rgb(38, 38, 38);
    @media (max-width: 620px) {
      padding: 15px;
      height: 100%;
      .menu {
        width: 74vw;
      }
    }  
`;

const DropBox = styled.label`
    margin: 10px 0;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 3px dotted #a3a3a3;
    border-radius: 5px;
`;

const Button = styled.button`
    color: #FFF;
    padding: 12px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

const UploadButton = styled.button`
    text-decoration: none;
    background-color: #005af0;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    outline: none;
    transition: 0.3s;
`;

const CardText = styled.h3`
    font-size: 22px;
    font-weight: 600;
`;

const DropBoxText1 = styled.h4`
    font-size: 17px;
    font-weight: 400;
`;
const DropBoxText2 = styled.h4`
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 12px;
    color: #a3a3a3;
`;

const [file, setFile] = useState(null);

const handleFileChange = (files) => {
  console.log(files);
  setFile(files[0]);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const reader = new FileReader();

  reader.onload = () => {
    console.log("TOKEN", TOKEN);
    const fileData = reader.result;
    // Send fileData to the server using fetch or any other AJAX library
    try {
      const response = asyncFetch("http://localhost:2402/api/project/airdrop", {
        method: "POST",
        body: fileData,
        "x-auth-token": TOKEN,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    console.log("File data:", fileData);
  };
  reader.readAsArrayBuffer(file);
};

return (
  <Wrapper>
    <Card>
      <CardText>Upload Files</CardText>
      <DropBox>
        <DropBoxText1>Select File here</DropBoxText1>
        <DropBoxText2>Files Supported: .xls, .xlsx</DropBoxText2>
        <Files onChange={handleFileChange} clickable multiple={false}>
          {file && (
            <div id="fileName" className="px-3 py-1 mt-3 rounded-pill">
              {file?.name}
            </div>
          )}
        </Files>
        <UploadButton onClick={handleSubmit}>Upload</UploadButton>
      </DropBox>
    </Card>
  </Wrapper>
);
