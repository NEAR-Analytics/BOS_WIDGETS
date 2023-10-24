const verifiedCheck = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="13"
    viewBox="0 0 16 13"
    fill="none"
  >
    <rect y="0.5" width="16" height="12" rx="6" fill="#B0B0B0" />
    <path
      d="M5 6.69231L7 9L11 4"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CardRoot = styled.div`
    width: 315px;
    height: 448px;
    border: 1px solid #EFEFEF;
background: #FFF;
box-shadow: 2px 2px 12px 0px rgba(0, 0, 0, 0.05);
margin-bottom: 20px;
display: flex;
flex-direction: column;
`;
const Top = styled.div`
    height: 80px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    position: relative;
    width: 100%;
    background: black;
`;

const Bottom = styled.div`
    h1 {
        overflow: hidden;
        color: #000;
        text-overflow: ellipsis;
        whitespace: nowrap;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }
`;

const ImageProfile = styled.div`
  
  img {
    position: absolute;
    width: 66px;
    height: 66px;
    flex-shrink: 0;
    border: 1px solid white;
    border-radius: 50%;
    top: 45px;
    z-index: 99;
    object-fit: cover;
    background: black;
    left: 16px;
  }
`;

const HeaderText = styled.div`
  height: 150px;
  margin-top: 32px;
  p {
    margin-bottom: 10px;
    overflow: hidden;
    color: #B0B0B0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const CardBody = styled.div`
margin-top: 20px;
padding: 0 16px;
  h1 {
    color: #000;
font-family: Helvetica Neue;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: uppercase;
  }
  h3 {
    overflow: hidden;
color: #000;
text-overflow: ellipsis;
whitespace: nowrap;
font-family: Helvetica Neue;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 148%; 
  }
`;

const AmountSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  div {
    span {
      color: #B0B0B0;
      font-family: Helvetica Neue;
      font-size: 8px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }
    img {
      width: 15px;
      height: 15px;
    }
    p {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 5px;
        span {
          color: #000;
          font-family: Helvetica Neue;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-transform: uppercase;
        }
    }
  }
`;

const Button = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
margin-top: 10px;
  button {
    border: 1px solid black;
    border-radius: 0;
    color: white;
    background: black;
    text-align: center
    display: flex;
    width: 296px;
    padding: 7px 0px;
    cursor: pointer;
  }
  button:disabled {
    background: grey;
    border: grey;
    cursor: not-allowed;
  }
  button:hover {
    background: white;
    color: black;
    border-color: black;
  }
`;

const Tags = styled.div`
    display:flex;
    gap: 7px;
    margin-left: 10px;
    margin-top: 40px;
    .tag {
         color: #FFF;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        border-radius: 50px;
        background: #F8F8F8;
        width: max-content;
        color: #B0B0B0;
        text-align: center;
        font-family: Helvetica Neue;
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 15px */
        padding: 3px 10px;
    }
`;

return (
  <CardRoot>
    <Top>
      <img
        src={
          props.image ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
        }
        alt=""
      />
    </Top>
    <Bottom>
      <CardBody>
        <HeaderText>
          <h1>
            {props.title
              ? props.title.length > 15
                ? `${props.title.substring(0, 15)}...`
                : props.title
              : `DAO Name`}
          </h1>
          <h3>
            {props.description
              ? props.description.substring(0, 100)
              : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.`.substring(
                  0,
                  100
                )}
          </h3>
        </HeaderText>
        <AmountSec>
          <div>
            <span>Total Funds</span>
            <p>
              {props.totalFunds ?? "N/A"}/
              <span>NEAR</span>
            </p>
          </div>
          <div>
            <span>Members Group</span>
            <p>
              {props.membersGroup ?? "N/A"}/
              <span>99.9M</span>
            </p>
          </div>
          <div>
            <span>Active Proposal</span>
            <p>
              {props.activeProposal ?? "N/A"}
              <span>99.99</span>
            </p>
          </div>
        </AmountSec>
        <Tags>
          <div className="tag">Category</div>
          <div className="tag">Tag</div>
          <div className="tag">Anything</div>
        </Tags>
      </CardBody>
      <Button>
        <a>
          <button>View DAO</button>
        </a>
      </Button>
    </Bottom>
  </CardRoot>
);
