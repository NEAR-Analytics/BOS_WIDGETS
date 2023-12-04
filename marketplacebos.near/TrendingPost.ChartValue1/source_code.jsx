const findHashtags = (str) => {
  const regexp = /\B\#\w\w+\b/g;
  let match;
  let tags = [];
  while ((match = regexp.exec(str)) !== null) {
    tags.push(match[0]);
  }
  return tags;
};
const respBlock = fetch("https://api.nearblocks.io/v1/stats");

const newBlock30Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (30 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);


// 1 days
const newBlock1Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (1 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);

let BlockHeightPost1Days = [];
const getBlockHeight1daysPost = Social.index("post", "main", {
  from: newBlock1Days,
  limit: 99999,
});
getBlockHeight1daysPost.forEach((item) => {
  BlockHeightPost1Days.push({
    accountId: item.accountId,
    blockHeight: item.blockHeight,
  });
});

if (!getBlockHeight1daysPost) {
  return "Loading...";
}

let post1days = [];
BlockHeightPost1Days.forEach((item) => {
  const post = Social.get(`${item.accountId}/post/main`, item.blockHeight);
  if (post) {
    post1days.push(JSON.parse(post).text);
  }
});

let tagCount1Days = {};
post1days.forEach((item) => {
  const tags = findHashtags(item);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      if (tagCount1Days[tag]) {
        tagCount1Days[tag] = tagCount1Days[tag] + 1;
      } else {
        tagCount1Days[tag] = 1;
      }
    });
  }
});
let entries1days = Object.entries(tagCount1Days);
let post1daySorted = entries1days.sort((b, a) => a[1] - b[1]);


let totalItems1Day = 0;

// Sum the values in the day1PostSorted array
for (let i = 0; i < post1daySorted.length; i++) {
  totalItems1Day += post1daySorted[i][1];
}

const labelN = "Top 10 trending tags on NEAR Social in right now";

const backgroundcolorP = [
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
];

const borderColorP = [
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
  "blue",
];

// Assuming item1 and item2 are properties of the objects in the 'sorted' array
let dataP = [];
let labelP = [];

for (let i = 0; i < 10; i++) {
  if (post1daySorted[i]) {
    dataP.push(post1daySorted[i][1]);
    labelP.push(post1daySorted[i][0]);
  }
}


const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: none;
  overflow: auto;
  @media (max-width: 968px) {
    font-size: 8px;
  }
  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const StyledTh = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f2f2f2;
  border: none;
  text-align: center;
`;

const StyledTd = styled.td`
  padding: 12px;
  border: none;
  text-align: center;
`;

const StyledTotalContainer = styled.div`
  border: 4px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledTotalLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const StyledTotalValue = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-top: 8px;
`;

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <StyledTotalContainer>
            <StyledTotalLabel>Total Posts</StyledTotalLabel>
            <StyledTotalValue>{totalItems1Day}</StyledTotalValue>
          </StyledTotalContainer>
          <br />
          <br />
          <br />

          <Widget
            src="marketplacebos.near/widget/TrendingPost.ChartPost"
            props={{
              dataP: dataP,
              labelP: labelP,
              backgroundcolorP: backgroundcolorP,
              borderColorP: borderColorP,
              labelN: labelN,
            }}
          />
          <br />
          <br />
          <br />
          <br />

          <StyledTable>
            <thead>
              <tr>
                <StyledTh>TAG NAME</StyledTh>
                <StyledTh>TOTAL POST</StyledTh>
              </tr>
            </thead>
            <tbody>
              {post1daySorted &&
                post1daySorted
                  .filter((item, index) => index <= 10)
                  .map((item) => (
                    <tr>
                      <StyledTd>
                        <a
                          href={`https://near.social/marketplacebos.near/widget/TrendingPost.TableValue?hashtag=${item[0].replace(
                            "#",
                            ""
                          )}`}
                        >
                          {item[0]}
                        </a>
                      </StyledTd>
                      <StyledTd>{item[1]}</StyledTd>
                    </tr>
                  ))}
            </tbody>
          </StyledTable>
        </>
      )}
    </>
  );
};

return (
  <>
    <Table />
  </>
);
