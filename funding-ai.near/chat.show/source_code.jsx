const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  height:100vh;
  background-image: linear-gradient(to right top, #cad5fe, #ced9fe, #d3ddff, #d7e0ff, #dce4ff);
`;

const Row = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  overflow: auto;
`;

const Header = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  font-size: 0.875rem; 
  line-height: 1.25rem; 
  padding: 15px 20px;
  background: #acbafc;
  .logo{
    display:flex;
    color: #3730a3;
    font-size:20px;
    font-weight:700;
    text-decoration:none;
  }
  .info{
    margin-left: 10px;
    display:flex;
    gap:10px;
    align-items:center;
  }
  .icon{
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 50%;
    background: #9aa8fb;
    padding: 2px;
  }
`;

const Content = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  
`;

const SearchBar = styled.div`
  position:relative;
  width:80%;
  display:flex;
  margin: 1rem auto;
  flex-direction:column;
  @media screen and (max-width:768px){
    width:100%;
    padding:0 10px;
  }

  .title{
    color:#807eca;
    margin-bottom:5px;
  }
  input{
    &::placeholder{
      color:#9b97d1;
    }
  }
  .search{
    width:100%;
    border-radius:15px;
    border: 2px solid #c7d2fe;
    padding: 10px 20px;
    outline:none;
    color:#3730a3;
    font-weight:500;
    :focus{
      border: 2px solid #3730a3;
    }
    :hover{
      border: 2px solid #3730a3;
    }
    &::placeholder{
      color:#9b97d1;
    }
    @media screen and (max-width:768px){
      padding: 15px 20px;
    }
  }
  .arrow{
    position:absolute;
    right:10px;
    top: 50%;
    cursor:default;
    outline:none;
    border:2px solid #a5b4fc;
    background: none;
    border-radius:50px;
    @media screen and (max-width:768px){
      top:52%;
      right:20px;
    }
  }
  .button-arrow{
    border-radius: 100%;
    outline:none;
    border:none;
    background:#5d76cb;
    @media screen and (max-width:768px){
      border-radius: 50px;
      width:30px;
      height:30px;
    }
  }
  .icon-arrow{
    //position:absolute;
    right:5px;
    top:6px;
  }
`;

const View = styled.div`
    padding: 0 10px;
`;

const ListResult = styled.div`
    display:flex;
    flex-direction:column;
    border: 2px solid #c7d2fe;
    border-radius:15px;
    color:#7c7bc8;
    background:#eef2ff;
    max-width:80%;
    margin: 0 auto;
    height:100%;
    //max-height:100%;
    @media screen and (max-width:768px){
        max-width:100%;
    }
    .allProject{
      display:flex;
      flex-direction:row;
      align-items:center;
      margin-top:10px;
      margin-left:38px;
      gap:10px;
      @media screen and (max-width:768px){
        margin-left:32px;
      }
    }
    .header{
      margin-left:15px;
      font-size:16px;
      font-weight:600;
    }
    .listItem{
        display:flex;
        flex-direction:column;
        gap:20px;
        margin-top:10px;
        padding-bottom:20px;
        padding:0 10px;
        padding-bottom:20px;
        @media screen and (max-width:768px){
            padding:0 5px;
            padding-bottom:20px;
        }
    }
    .item{
        display:flex;
        flex-direction:row;
        text-align:left;
        align-items:center;
        gap:10px;
        width:100%;
        border: 1px solid #a5b4fc;
        min-height:20px;
        border-radius:15px;
        padding:10px 20px;
        text-decoration:none;
        max-height:90px;
    }
    .itemLeft{
      width:30px;
      height:30px;
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .itemRight{
      display:flex;
      flex-direction:row;
      text-align:left;
      align-items:center;
      width:100%;
      cursor:pointer;
      gap:10px;
    }
    .image{
        border-radius:50px;
        border: 2px solid #c7d2fe;
        width:50px;
        height:50px;
    }
    .project{
        display:flex;
        flex-direction:column;
        gap:2px;
    }
    .title{
        color:#7c7bc8;
        font-size:15px;
        font-weight:500;
        @media screen and (max-width:768px){
            font-size:12px;
        }
    }
    .decs{
        font-size:11px;
        @media screen and (max-width:768px){
            font-size:10px;
        }
    }
`;

const Ideas = styled.div`

  // width:50%;
  // display:flex;
  // justify-content:center;
  // flex-direction:column;
  @media screen and (max-width:768px){
    width:75%;
  }
  .text{
    display:flex;
    justify-content:center;
    font-size:16px;
    font-weight:400;
    color:#3730a3;
    @media screen and (max-width:768px){
      font-size:13px;
    }
  }
  .des{
    display:flex;
    flex-wrap:wrap;
    width:100%;
    padding: 20px;
    padding-top: 5px;
    justify-content:center;
    flex direction:row;
    gap:10px;
    @media screen and (max-width:768px){
      padding: 5px;
    }
  }
  .btn-idea{
    background:#6366f1;
    border:1px solid #574fe6;
    padding: 5px 10px;
    border-radius:25px;
    color:white;
  }
`;

const Footer = styled.div`
  border-top:1px solid #e0e7ff;
  padding:10px 20px;
  display:flex;
  justify-content:space-between;
  gap:20px;
  align-items:center;
  @media screen and (max-width:768px){
    flex-direction:column;
    gap:10px;
  }
  .amount{
    padding:5px 20px;
    outline:none;
    border:1px solid #c7d2fe;
    border-radius:15px;
    color:#3e37a6;
    :focus{
      border: 1px solid #4f46e5;
    }
    @media screen and (max-width:768px){
      width:100%;
    }
  }
  .footerRight{
    @media screen and (max-width:768px){
      display:flex;
      justify-content:flex-end;
    }
  }
  .btn-donate{
    background:#4f46e5;
    color:white;
    border-radius:15px;
    font-weight:600;
    border:none;
    box-shadow:2px 2px #3730a3;
    padding:10px 20px;
    display:flex;
    align-items:center;
    @media screen and (max-width:768px){
      display:flex;
      font-size: 13px;
      justify-content:flex-end;
    }
  }
`;

const [value, setValue] = useState(props.search || "public good");
const requestOptions = {
  method: "POST",
  body: JSON.stringify({ messages: value }),
  header: {
    "Content-Type": "application/json",
  },
};
const res = fetch(
  "https://chat-ai.dropwallet.io/api/chat-potlock",
  requestOptions
);
console.log("Res", res);
const [data, setData] = useState([]);
const [name, setName] = useState("");
const [image, setImage] = useState("");
const [description, setDescription] = useState("");
const [isCheckAll, setIsCheckAll] = useState(false);
const [isCheck, setIsCheck] = useState([]);
const [amount, setAmount] = useState(0);
const hanleInput = (e) => {
  const value = e.target.value;
  setValue(value);
};
const profileData = [];
res.body &&
  res.body.forEach((projectId) => {
    // console.log(projectId);
    if (projectId != undefined) {
      const datas = Social.getr(`${projectId}/profile`);
      if (datas) {
        profileData.push({ accountId: projectId, data: datas });
      }
    }
  });

const handleSelectAll = (e) => {
  setIsCheckAll(!isCheckAll);
  setIsCheck(profileData.map(({ accountId }) => accountId));
  if (isCheckAll) {
    setIsCheck([]);
  }
};

const Checkbox = ({ className, id, type, handleClick, isChecked }) => {
  return (
    <input
      class={className}
      id={id}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
  );
};

const handleDonate = () => {
  const transactions = [];
  Object.entries(isCheck).forEach((projectId) => {
    const amountFloat = parseFloat(amount || 0);
    const amountIndivisible = new Big(amountFloat).mul(new Big(10).pow(24));
    const donateContractArgs = {};
    donateContractArgs.recipient_id = projectId;

    transactions.push({
      contractName: "donate.potlock.near",
      methodName: "donate",
      args: donateContractArgs,
      deposit: amountIndivisible.toString(),
      gas: "300000000000000",
    });
  });
};

console.log(profileData);
return (
  <Container>
    <Row>
      <Content>
        <SearchBar>
          <div class="title">Results for</div>
          <div>
            <input
              value={value}
              onChange={hanleInput}
              placeholder="What would you like to fund?"
              class="search"
              type="text"
            />
            <button class="arrow" type="submit">
              <svg
                class="icon-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#5950e6"
                viewBox="0 0 256 256"
              >
                <path d="M244,56v48a12,12,0,0,1-12,12H184a12,12,0,1,1,0-24H201.1l-19-17.38c-.13-.12-.26-.24-.38-.37A76,76,0,1,0,127,204h1a75.53,75.53,0,0,0,52.15-20.72,12,12,0,0,1,16.49,17.45A99.45,99.45,0,0,1,128,228h-1.37A100,100,0,1,1,198.51,57.06L220,76.72V56a12,12,0,0,1,24,0Z"></path>
              </svg>
            </button>
          </div>
        </SearchBar>
        {value == "" && (
          <Ideas>
            <div class="text">Some ideas: </div>
            <div class="des">
              <div>
                <button
                  onClick={() => {
                    setValue("open source");
                    setIsShow(true);
                  }}
                  class="btn-idea"
                >
                  Open Source
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setValue("desci");
                    setIsShow(true);
                  }}
                  class="btn-idea"
                >
                  Desci
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setValue("nft");
                    setIsShow(true);
                  }}
                  class="btn-idea"
                >
                  NFT
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setValue("social impact");
                    setIsShow(true);
                  }}
                  class="btn-idea"
                >
                  Social Impact
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setValue("ai");
                    setIsShow(true);
                  }}
                  class="btn-idea"
                >
                  AI
                </button>
              </div>
            </div>
          </Ideas>
        )}
        <View>
          <ListResult>
            <div class="allProject">
              <Checkbox
                className="form-check-input"
                type="checkbox"
                name="selectAll"
                id="selectAll"
                handleClick={handleSelectAll}
                isChecked={isCheckAll}
              />
              <div class="header">ALL PROJECT</div>
            </div>
            <div class="listItem">
              <Widget
                src="funding-ai.near/widget/chat.modal"
                props={{
                  profileData,
                  isCheck,
                  setIsCheck: (value) => {
                    setIsCheck(value);
                  },
                }}
              />
            </div>
            <Footer>
              <input
                type="text"
                class="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              <div class="footerRight">
                <button class="btn-donate" onClick={handleDonate}>
                  Fund {isCheck.length} project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                  </svg>
                </button>
              </div>
            </Footer>
          </ListResult>
        </View>
      </Content>
    </Row>
  </Container>
);
