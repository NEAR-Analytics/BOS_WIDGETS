const Root = styled.div`
    width: 328px;
height: 200px;
flex-shrink: 0;
border-radius: 8px;
background: #000;
display: flex;
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
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    background: white;
    border-radius: 50%;
`

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
`
const Tags = styled.div`
    display:flex;
    gap: 7px;
    margin-left: 10px;
`

return (
  <Root>
    <div />
    <Content>
    <ImageContainer>
    </ImageContainer>
    <div>
        <h1>Lorem Ipsum DAO</h1>
        <Tags>
        <Tag>Category</Tag>
        <Tag>Tag</Tag>
        <Tag>Anything</Tag>
        </Tags>
    </div>
    </Content>
  </Root>
);
