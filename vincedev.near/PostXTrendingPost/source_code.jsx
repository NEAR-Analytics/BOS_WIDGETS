const bodyWrapper = styled.div`
background: #F3F9FF;
min-height: 560px;
max-height: 640px;
overflow-y:scroll;
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
width: 90%;

`;
const MajorTrends = styled.div`
display: flex;
flex-flow: column nowrap;
justify-content: center;
padding: 16px 0 0 8px;
font-family: Space Grotesk;
cursor:pointer;

&:hover{
 
  background-color:white;

}

`;

const SingleTrends = styled.div`
display: flex;
flex-flow: row nowrap;
gap:2px;
width: 100%;
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
word-break: break-word;

}
`;
const data = props.hashList;
const sortedHashList = data?.sort((a, b) => b[1] - a[1]);

return (
  <bodyWrapper>
    <mainHeader>Trending Tag</mainHeader>

    <AllTrends>
      {sortedHashList?.map((d, i) => {
        return (
          <MajorTrends
            style={{
              backgroundColor: `${props.activeTag === d[0] ? "white" : ""}`,
            }}
            onClick={() => props.singlePosthashTag(d[0])}
          >
            <SingleTrends>
              <div>{i + 1}.</div>
              <span>#{d[0]}</span>
            </SingleTrends>
            <p>
              {d[1]} {d[1] > 1 ? "Posts" : "Post"}
            </p>
          </MajorTrends>
        );
      })}
    </AllTrends>
  </bodyWrapper>
);
