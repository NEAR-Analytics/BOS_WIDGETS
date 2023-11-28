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
const MajorTrends = styled.div`
font-family: Space Grotesk;

span{
font-size: 16px;
font-weight: 600;
line-height: 20px;
letter-spacing: 0.1em;
text-align: left;
color:#696969;

}
`;

const SingleTrends = styled.div`
display: flex;
flex-flow: row nowrap;
gap:2px;
align-items: center;


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
const data = props.hashList;
const sortedHashList = data?.sort((a, b) => b[1] - a[1]);

return (
  <bodyWrapper>
    <mainHeader>Trending Post</mainHeader>

    <AllTrends>
      {sortedHashList?.map((d, i) => {
        return (
          <MajorTrends>
            <SingleTrends>
              <div>{i + 1}.</div>
              <span>#{d[0]}</span>
            </SingleTrends>
            <span>{d[1]} Posts</span>
          </MajorTrends>
        );
      })}
    </AllTrends>
  </bodyWrapper>
);
