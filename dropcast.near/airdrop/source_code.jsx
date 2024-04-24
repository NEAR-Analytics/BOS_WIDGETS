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

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 4px;
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
const DepButton = styled.button`
    color: #FFF;
    padding: 1px 4px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241), rgb(99, 102, 241));
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
const [selectedToken, setSelectedToken] = useState("");
const [tokenList, setTokenList] = useState([]);
const [airdropFee, setAirdropFee] = useState(0);
const [notification, setNotification] = useState("");

const changeOption = (value) => {
  setSelectedToken({ value });
};

const handleFileChange = (files) => {
  setFile(files[0]);
};

const handleDeposit = async () => {
  if (!airdropFee) {
    setNotification("First, upload file, then you will get fee amount.");
    return;
  }
  const oneTeraGas = 1000000000000;
  const oneNEARInYoctoNEAR = 1000000000000000000000000;
  const receiver = "humans-of-near.near";

  Near.call(
    "transfer-near.near",
    "transfer_near",
    receiver,
    oneTeraGas,
    Number(airdropFee) * oneNEARInYoctoNEAR
  );
  // res.then((data) => {
  //   console.log(data);
  // });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) {
    setNotification("Please select file");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const fileData = reader.result;
    try {
      const response = asyncFetch("http://localhost:2402/api/project/airdrop", {
        method: "POST",
        body: JSON.stringify({
          data: fileData,
          name: file.name,
          userId: USER?._id || "65dc747ae9ed2a19c505e1c2",
        }),
        headers: {
          "Content-Type": "application/json",
          // "x-a uth-token": TOKEN,
        },
      });
      response.then(({ body }) => {
        if (body.status === true) {
          setNotification("You have uploaded file successfully.");
          setAirdropFee(body.airdropFee);
          Storage.set("timeId", body.timeId);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsDataURL(file);
};
console.log(Storage.get("timeId"));
useEffect(() => {
  const response = asyncFetch(
    `http://localhost:2402/api/project/get_token_list`,
    {
      method: "POST",
      body: JSON.stringify({
        accountId,
      }),

      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
    }
  );
  response.then(({ body }) => {
    setTokenList(body.data);
  });
}, []);

useEffect(() => {
  if (props.transactionHashes && Storage.get("timeId")) {
    asyncFetch("https://rpc.mainnet.near.org", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "dontcare",
        method: "tx",
        params: [props.transactionHashes, accountId],
      }),
    }).then((tx) => {
      console.log(tx);
      if (tx.ok) {
        const response = asyncFetch(
          `http://localhost:2402/api/project/verifytx`,
          {
            method: "POST",
            body: JSON.stringify({
              time_id: Storage.get("timeId"),
              tx_hash: props.transactionHashes,
              userId: USER?._id || "65dc747ae9ed2a19c505e1c2",
            }),

            headers: {
              "Content-Type": "application/json",
              "x-auth-token": TOKEN,
            },
          }
        );
        response.then(({ body }) => {
          setTokenList(body.data);
        });
      }
    });
  }
}, [Storage.get("timeId")]);

return (
  <Wrapper>
    <Card>
      <div>
        <Label>{`Select airdrop token`}</Label>
        <Widget
          props={{
            noLabel: true,
            width: "40vw",
            options: tokenList,
            value: selectedToken.value,
            onChange: (val) => changeOption(val),
          }}
          src={`${Owner}/widget/Select`}
        />
      </div>
      <div>
        <Label>Airdrop Fee(NEAR)</Label>
        <div className="d-flex flex-row">
          <input
            type="number"
            name="airdrop_fee"
            value={airdropFee}
            className="w-full px-2 py-1 rounded-3 border-0"
            onChange={(e) => {}}
            style={{ fontSize: 14, width: "90%" }}
          />
          <DepButton className="btn" onClick={handleDeposit}>
            Deposit
          </DepButton>
        </div>
      </div>
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
      {notification && (
        <div
          className="d-flex justify-content-end position-absolute"
          style={{ right: 10 }}
        >
          <Widget
            props={{
              text: notification,
              type: "info",
              setNotification,
            }}
            src={`${Owner}/widget/Alert`}
          />
        </div>
      )}
    </Card>
  </Wrapper>
);
