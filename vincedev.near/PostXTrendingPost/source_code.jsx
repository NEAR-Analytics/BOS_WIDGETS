const bodyWrapper = styled.div`
background: #F3F9FF;
min-height: 560px;
width: 100%;
border-radius:8px;
padding:20px;
`;

const mainHeader = styled.h2`
font-family: Space Grotesk;
font-size: 28px;
font-weight: 700;
line-height: 36px;
letter-spacing: 0.1em;
text-align: left;

`;

const AllTrends = styled.div`
display: flex;
flex-flow:column;
gap:4px;

`;

const SingleTrends = styled.div`
display: flex;
flex-flow: row nowrap;
gap:2px;
align-items: center;
font-family: Space Grotesk;

div{
  display: flex;

font-size: 16px;
font-weight: 400;
line-height: 26px;
letter-spacing: 0.1em;
text-align: left;
color: #696969;
}

span{
  display: flex;
 
font-size: 20px;
font-weight: 700;
line-height: 26px;
letter-spacing: 0.1em;
text-align: left;
color: #010101;


}
`;

return (
  <bodyWrapper>
    <mainHeader>Trending Post</mainHeader>

    <AllTrends>
      <SingleTrends>
        <div>1.</div>
        <span>#BOS </span>
      </SingleTrends>
      <SingleTrends>
        <div>2.</div>
        <span>#Space</span>
      </SingleTrends>
    </AllTrends>
  </bodyWrapper>
);
