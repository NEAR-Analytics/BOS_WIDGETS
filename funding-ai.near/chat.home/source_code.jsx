const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
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
  height:100vh;
  align-items:center;
  justify-content:center;

  .content{
    margin:auto;
    max-width:85%;
    @media screen and (max-width:768px){
      max-width:100%;
    }
  }
  .container{
    width:100%;
    padding: 0 20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media screen and (max-width:768px){
      padding: 0 10px;
    }
  }
  .header{
    display:flex;
    flex-direction:column;
    width:100%;
    align-items:center;
    justify-content:center;
    text-align:center;
  }
  .title{
    font-size:45px;
    font-weight:700;
    color:#3730a3;
    @media screen and (max-width:768px){
      font-size: 30px;
    }
  }
  .search{
    width:100%;
    position:relative;
    &::placeholder{
      color:#9b97d1;
    }
    color:#3730a3;
    font-weight:500;
    
  }
`;

const SearchBar = styled.div`
  position:relative;
  width:65%;
  display:flex;
  align-items:center;
  @media screen and (max-width:768px){
    width:100%;
  }
  .search{
    width:100%;
    border-radius:25px;
    border: 2px solid #c7d2fe;
    padding: 10px 20px;
    outline:none;
    :focus{
      border: 2px solid #3730a3;
    }
    :hover{
      border: 2px solid #3730a3;
    }
    @media screen and (max-width:768px){
      padding: 15px 20px;
    }
  }
  .arrow{
    position:absolute;
    right:10px;
    top:8px;
    cursor:default;
    @media screen and (max-width:768px){
      top:11px;
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
    position:absolute;
    right:5px;
    top:8px;
  }:
`;

const Ideas = styled.div`
  margin-top:20px;
  width:50%;
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
const [value, setValue] = useState("");
const [isShow, setIsShow] = useState(false);
const hanleInput = (e) => {
  const value = e.target.value;
  setValue(value);
};
const hanleClick = () => {
  setIsShow(true);
};
return (
  <Container>
    <Row>
      <Header>
        <a class="logo" href="/funding-ai.near/widget/chat.home">
          funding<span class="text-white">.ai</span>
        </a>
        <div class="info">
          <a
            href="https://discord.com/invite/Z5m88a5qWu"
            target="_blank"
            rel="noredirect"
            class="icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M108,136a16,16,0,1,1-16-16A16,16,0,0,1,108,136Zm56-16a16,16,0,1,0,16,16A16,16,0,0,0,164,120Zm76.07,76.56-67,29.71A20.15,20.15,0,0,1,146,214.9l-8.54-23.13c-3.13.14-6.27.24-9.45.24s-6.32-.1-9.45-.24L110,214.9a20.19,20.19,0,0,1-27.08,11.37l-67-29.71A19.93,19.93,0,0,1,4.62,173.41L34.15,57A20,20,0,0,1,50.37,42.19l36.06-5.93A20.26,20.26,0,0,1,109.22,51.1l4.41,17.41c4.74-.33,9.52-.51,14.37-.51s9.63.18,14.37.51l4.41-17.41a20.25,20.25,0,0,1,22.79-14.84l36.06,5.93A20,20,0,0,1,221.85,57l29.53,116.38A19.93,19.93,0,0,1,240.07,196.56ZM227.28,176,199.23,65.46l-30.07-4.94-2.84,11.17c2.9.58,5.78,1.2,8.61,1.92a12,12,0,1,1-5.86,23.27A168.43,168.43,0,0,0,128,92a168.43,168.43,0,0,0-41.07,4.88,12,12,0,0,1-5.86-23.27c2.83-.72,5.71-1.34,8.61-1.92L86.85,60.52,56.77,65.46,28.72,176l60.22,26.7,5-13.57c-4.37-.76-8.67-1.65-12.88-2.71a12,12,0,0,1,5.86-23.28A168.43,168.43,0,0,0,128,168a168.43,168.43,0,0,0,41.07-4.88,12,12,0,0,1,5.86,23.28c-4.21,1.06-8.51,1.95-12.88,2.71l5,13.57Z"></path>
            </svg>
          </a>
          <a href="" target="_blank" rel="noredirect" class="icon">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2439 2.25H21.5519L14.3249 10.51L22.8269 21.75H16.1699L10.9559 14.933L4.98991 21.75H1.67991L9.40991 12.915L1.25391 2.25H8.07991L12.7929 8.481L18.2439 2.25ZM17.0829 19.77H18.9159L7.08391 4.126H5.11691L17.0829 19.77Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
          <a href="" target="_blank" rel="noredirect" class="icon">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.89453 2.73682H20.1045V4.92605H3.89453V2.73682Z"
                fill="currentColor"
              ></path>
              <path
                d="M20.1045 6.91009H3.89453V9.09969H20.1045V6.91009Z"
                fill="currentColor"
              ></path>
              <path
                d="M3.89453 11.0834V21.2636L11.9992 16.7171L20.1052 21.2636V11.0834H3.89453Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>
      </Header>
      {isShow ? (
        <Widget
          src="funding-ai.near/widget/chat.show"
          props={{ search: value }}
        />
      ) : (
        <Content>
          <div class="content">
            <div class="container">
              <div class="header">
                <h1 class="title">Fund public goods like magic</h1>
                <SearchBar>
                  <input
                    class="search"
                    type="input"
                    placeholder="What would you like to fund?"
                    value={value}
                    onChange={hanleInput}
                  />
                  <div class="arrow">
                    <button
                      class="button-arrow"
                      type="submit"
                      onClick={hanleClick}
                    >
                      <svg
                        class="icon-arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="white"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                      </svg>
                    </button>
                  </div>
                </SearchBar>
              </div>
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
            </div>
          </div>
        </Content>
      )}
    </Row>
  </Container>
);
