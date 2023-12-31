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

let BlockHeightPost30Days = [];
const getBlockHeight30daysPost = Social.index("post", "main", {
  from: newBlock30Days,
  limit: 99999,
});

if (!getBlockHeight30daysPost) {
  return "Loading...";
}

getBlockHeight30daysPost.forEach((item) => {
  BlockHeightPost30Days.push({
    accountId: item.accountId,
    blockHeight: item.blockHeight,
  });
});

let post30days = [];
BlockHeightPost30Days.forEach((item) => {
  const post = Social.get(`${item.accountId}/post/main`, item.blockHeight);
  if (post) {
    post30days.push(JSON.parse(post).text);
  }
});

let tagCount30Days = {};
post30days.forEach((item) => {
  const tags = findHashtags(item);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      if (tagCount30Days[tag]) {
        tagCount30Days[tag] = tagCount30Days[tag] + 1;
      } else {
        tagCount30Days[tag] = 1;
      }
    });
  }
});
let entries30days = Object.entries(tagCount30Days);
let post30daySorted = entries30days.sort((b, a) => a[1] - b[1]);



let totalItemsAll = 0;

// Sum the values in the allPostSorted array
for (let i = 0; i < post30daySorted.length; i++) {
  totalItemsAll += post30daySorted[i][1];
}

const labelN = "Top 10 trending tags on NEAR Social in all time";

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

// Assuming allPostSorted has at least 20 items
for (let i = 0; i < 10; i++) {
  if (post30daySorted[i]) {
    dataP.push(post30daySorted[i][1]); // Assuming item[1] contains the data for dataP
    labelP.push(post30daySorted[i][0]); // Assuming item[0] contains the data for labelP
  }
}

// ... (rest of the code remains unchanged)

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
  const filteredTags = post30daySorted
    .filter((item) => item[0].toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10);
  return (
    <>
      <StyledTotalContainer>
        <StyledTotalLabel>Total Posts</StyledTotalLabel>
        <StyledTotalValue>{totalItemsAll}</StyledTotalValue>
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
          {post30daySorted &&
            post30daySorted
              .filter((item, index) => index <= 100)
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
  );
};

return (
  <>
    <Table />
  </>
);
