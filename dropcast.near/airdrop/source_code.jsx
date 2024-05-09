const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:2402";
const USER = props.USER || {};
const TOKEN = props.TOKEN || "";
const Logout = props.Logout;
const Admin = "humans-of-near.near";

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
const [uploaded, setUploaded] = useState(false);
const [selectedToken, setSelectedToken] = useState({});
const [tokenList, setTokenList] = useState([]);
const [airdropFee, setAirdropFee] = useState(0);
const [airdropTotalAmount, setAirdropTotalAmount] = useState(0);
const [notification, setNotification] = useState("");

const changeOption = (value) => {
  setSelectedToken({ value });
};

const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x.toString();
};

const handleFeeDeposit = async () => {
  if (Storage.get("airdropData").isNPaid) {
    setNotification("You already deposited.");
    return;
  }
  if (!airdropFee) {
    setNotification("First, upload file, then you will get fee amount.");
    return;
  }
  const oneTeraGas = 1000000000000;
  const oneNEARInYoctoNEAR = 1000000000000000000000000;
  Storage.set("transfering", "near");
  Near.call(
    "transfer-near.near",
    "transfer_near",
    Admin,
    oneTeraGas,
    Number(airdropFee) * oneNEARInYoctoNEAR
  );
};
const handleTokenDeposit = async () => {
  if (Storage.get("airdropData").isTPaid) {
    setNotification("You already deposited.");
    return;
  }
  if (!airdropTotalAmount) {
    setNotification(
      "First, upload file, then you will get total token amount."
    );
    return;
  }

  const oneTeraGas = 1000000000000;

  Storage.set("transfering", "token");
  const { token_contract, tokenDecimal } = Storage.get("airdropData");

  Near.call(
    token_contract,
    "ft_transfer",
    {
      receiver_id: Admin,
      amount: toFixed(`${airdropTotalAmount * Math.pow(10, tokenDecimal)}`),
    },
    oneTeraGas,
    1
  );
};

const handleFileChange = (files) => {
  console.log("on change-----", files);
  setFile(files[0]);
};
console.log("file-----", file);

const handleSubmit = async (e) => {
  e.preventDefault();
  // if (
  //   !confirm(
  //     "You have already uploaded sheet file, Do you want to upload new file?"
  //   )
  // ) {
  //   return;
  // }

  if (!file) {
    setNotification("Please select file");
    return;
  }

  if (!selectedToken.value) {
    setNotification("Please select aridrop token in your list");
    return;
  }
  const reader = new FileReader();

  reader.onload = () => {
    const fileData = reader.result;
    try {
      const response = asyncFetch(`${API_URL}/api/project/airdrop`, {
        method: "POST",
        body: JSON.stringify({
          data: fileData,
          //   name: file.name,
          userId: USER?._id || "65dc747ae9ed2a19c505e1c2",
          token_contract: selectedToken.value,
          accountId,
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
          setAirdropTotalAmount(body.totalAmount);
          Storage.set("airdropData", {
            timeId: body.timeId,
            uploaded: true,
            isNPaid: false,
            isTPaid: false,
            totalAmount: body.totalAmount,
            tokenDecimal: body.tokenDecimal,
            airdropFee: body.airdropFee,
            token_contract: selectedToken.value,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsDataURL(file);
};

useEffect(() => {
  const { uploaded, token_contract, airdropFee, totalAmount } =
    Storage.get("airdropData");
  setUploaded(uploaded || false);
  setSelectedToken({ value: token_contract } || {});
  setAirdropFee(airdropFee || 0);
  setAirdropTotalAmount(totalAmount || 0);

  console.log(props.transactionHashes, Storage.get("airdropData"));
  if (props.transactionHashes && Storage.get("airdropData")) {
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
      const txMethodName =
        tx?.body?.result?.transaction?.actions[0].FunctionCall.method_name;
      const args = atob(
        tx?.body?.result?.transaction?.actions[0].FunctionCall.args
      );
      const isTrue =
        tx.ok &&
        args.includes(Admin) &&
        (txMethodName === "transfer_near" || txMethodName === "ft_transfer");
      const isToken = txMethodName === "transfer_near" ? false : true;
      if (isTrue) {
        const response = asyncFetch(`${API_URL}/api/project/verifytx`, {
          method: "POST",
          body: JSON.stringify({
            time_id: Storage.get("airdropData").timeId,
            tx_hash: props.transactionHashes,
            userId: USER?._id || "65dc747ae9ed2a19c505e1c2",
            isToken,
          }),

          headers: {
            "Content-Type": "application/json",
            "x-auth-token": TOKEN,
          },
        });
        response.then(({ body }) => {
          console.log("body", body);
          const data = Storage.get("airdropData");
          if (!isToken) {
            Storage.set("airdropData", { ...data, isNPaid: true });
          } else {
            Storage.set("airdropData", { ...data, isTPaid: true });
          }
          if (body.isDone === true) {
            setNotification("Your airdrop started.");
            setTimeout(() => {
              Storage.set("airdropData", {});
            }, 3000);
          }
        });
      }
    });
  }
}, [Storage.get("airdropData")]);

useEffect(() => {
  console.log("Storage.get('airdropData')", Storage.get("airdropData"));
  const response = asyncFetch(`${API_URL}/api/project/get_token_list`, {
    method: "POST",
    body: JSON.stringify({
      accountId,
    }),

    headers: {
      "Content-Type": "application/json",
      "x-auth-token": TOKEN,
    },
  });
  response.then(({ body }) => {
    setTokenList(body.data);
  });
}, []);

return (
  <Wrapper>
    <Card>
      <div>
        <h5 className="m-0" style={{ fontSize: 18, color: "red" }}>
          {`Airdrop only works with Mynear Wallet`}
        </h5>
      </div>
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
        <Label>Airdrop Token Total Amount</Label>
        <div className="d-flex flex-row">
          <input
            type="number"
            name="airdrop_total"
            value={airdropTotalAmount}
            className="w-full px-2 py-1 rounded-3 border-0"
            onChange={(e) => {}}
            style={{ fontSize: 14, width: "90%" }}
          />
          <DepButton className="btn" onClick={handleTokenDeposit}>
            Deposit
          </DepButton>
        </div>
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
          <DepButton className="btn" onClick={handleFeeDeposit}>
            Deposit
          </DepButton>
        </div>
      </div>
      <CardText>Upload Files</CardText>
      <DropBox>
        <DropBoxText1>Select File here</DropBoxText1>
        <DropBoxText2>Files Supported: .xls, .xlsx</DropBoxText2>
        <Files
          onChange={handleFileChange}
          accepts={[".xlsx", ".xls"]}
          clickable
          multiple={false}
        >
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
