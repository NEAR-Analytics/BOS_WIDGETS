const Root = styled.a`
    width: 328px;
height: 200px;
flex-shrink: 0;
border-radius: 8px;
display: flex;
background-color: black;
text-decoration: none;
flex-direction: column;
justify-content: space-between;
padding: 16px;
`;

const Content = styled.div`
    display: flex;
    flex-direction:row;
    color: white;
    h1 {
        color: #FFF;
font-family: Helvetica Neue;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: uppercase;
margin-left: 8px;
    }
`;

const ImageContainer = styled.div`
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid white;
    }
`;

const Tag = styled.div`
    color: #FFF;
font-family: Helvetica Neue;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
border-radius: 50px;
background: #F8F8F8;
width: max-content;
color: #000;
text-align: center;
font-family: Helvetica Neue;
font-size: 10px;
font-style: normal;
font-weight: 500;
line-height: 150%; /* 15px */
padding: 3px 10px;
`;
const Tags = styled.div`
    display:flex;
    gap: 7px;
    margin-left: 10px;
`;

return (
  <Root
    href={`#/agwaze.near/widget/CPlanet.index?tab=singleNFT&contractId=${props.contractId}&tokenId=${props.tokenId}&chainState=${props.chainState}`}
    onClick={() => props.onButtonClick()}
  >
    <div />
    <Content>
      <ImageContainer>
        <img
          src={
            props.image ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRub7hFLkStCvZiaSeiUGznP4uzqPPcepghhg&usqp=CAU"
          }
        />
      </ImageContainer>
      <div>
        <h1>
          {props.title
            ? props.title > 11
              ? `${props.title.substring(0, 11)}...`
              : props.title
            : "MY NFT"}
        </h1>
        <Tags>
          <Tag>Category</Tag>
          <Tag>Tag</Tag>
          <Tag>Anything</Tag>
        </Tags>
      </div>
    </Content>
  </Root>
);
