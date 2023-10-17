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

const dotSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4"
    height="5"
    viewBox="0 0 4 5"
    fill="none"
  >
    <circle cx="2" cy="2.5" r="2" fill="#B0B0B0" />
  </svg>
);

const Root = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
`;

const Right = styled.div`
`;

const TopLeft = styled.div`

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

const Top = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const Username = styled.div`
    display: flex;
    svg {
        margin: 7px;
    }
    h2 {
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

const Svg = styled.div`
    svg {
         margin-top: 2px;
        margin-left: 3px;
    }
`;

const TopRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFF;
     p {
        border: 1px solid #000;
        border-radius: 32px;
        color: #000;
        padding: 7px 20px;
        text-align: center;
        font-family: Helvetica Neue;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        margin-bottom: 0;
        cursor: pointer;
     }
     p:hover {
        background: black;
        color: white;
     }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;

`;
const ImageContainer = styled.div`
    width: 544px;
    height: 544px;
    background: black;
`;
const PriceSection = styled.div`
    margin-top: 20px;
    width: 544px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;
const Price = styled.div`
    h1 {
        color: #B0B0B0;
        font-family: Helvetica Neue;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
    }
`;

const Owner = styled.div`
    h2 {
        margin: 0;
        overflow: hidden;
color: #000;
text-overflow: ellipsis;
font-family: Helvetica Neue;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: uppercase;
    }
    p {
        color: #B0B0B0;
font-family: Helvetica Neue;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
margin-bottom: 7px;
    }
`;

const PriceAmount = styled.div`
    display: flex;
    align-items: baseline;
    h2 {
        color: #000;
font-family: Helvetica Neue;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: uppercase;
    }
    h5 {
        color: #000;
font-family: Helvetica Neue;
font-size: 20px;
font-style: normal;
font-weight: 300;
line-height: normal;
text-transform: uppercase;
margin-left: 10px;
    }
`

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    button:first-child {
        display: flex;
        width: 268px;
        padding: 7px 0px;
        justify-content: center;
        align-items: center;
        border: 1px solid #000;
        background: #000;
        border-radius: 0;
    }
    button:first-child:hover {
        background: white;
        color: black;
        border-color: black;
    }
        button:last-child {
        display: flex;
        width: 268px;
        padding: 7px 0px;
        justify-content: center;
        align-items: center;
        border: 1px solid #000;
        background: #fff;
        border-radius: 0;
        color: black;
    }
    button:last-child:hover {
        background: black;
        color: white;
    }
`

return (
  <Root>
    <Right>
      <Top>
        <TopLeft>
          <h1>Lorem Ipsum Header </h1>
          <Username>
            <h2>My User</h2>
            <Svg>{verifiedCheck}</Svg>
            {dotSVG}
            <h2>1 HR AGO</h2>
          </Username>
        </TopLeft>
        <TopRight>
          <p>Follow Artist</p>
        </TopRight>
      </Top>
    </Right>
    <Left>
      <ImageContainer></ImageContainer>
      <PriceSection>
        <Price>
          <h1>CURRENT PRICE</h1>
          <PriceAmount>
            <h2>7.239</h2>
            <h5>$11,496.32M</h5>
          </PriceAmount>
        </Price>
        <Owner>
            <p>Current Owner</p>
            <h2>LOREMIP...</h2>
        </Owner>
      </PriceSection>
      <Buttons>
        <button>Buy Now</button>
        <button>Trade NFT</button>
      </Buttons>
    </Left>
  </Root>
);
