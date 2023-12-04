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

// 7 days
const newBlock7Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (7 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);

let BlockHeightPost7Days = [];
const getBlockHeight7daysPost = Social.index("post", "main", {
  from: newBlock7Days,
  limit: 99999,
});

getBlockHeight7daysPost.forEach((item) => {
  BlockHeightPost7Days.push({
    accountId: item.accountId,
    blockHeight: item.blockHeight,
  });
});

let post7days = [];
BlockHeightPost7Days.forEach((item) => {
  const post = Social.get(`${item.accountId}/post/main`, item.blockHeight);
  if (post) {
    post7days.push(JSON.parse(post).text);
  }
});

let tagCount7Days = {};
post7days.forEach((item) => {
  const tags = findHashtags(item);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      if (tagCount7Days[tag]) {
        tagCount7Days[tag] = tagCount7Days[tag] + 1;
      } else {
        tagCount7Days[tag] = 1;
      }
    });
  }
});
let entries7days = Object.entries(tagCount7Days);
let post7daySorted = entries7days.sort((b, a) => a[1] - b[1]);

let totalItems7Days = 0;

// Sum the values in the day7PostSorted array
for (let i = 0; i < post7daySorted.length; i++) {
  totalItems7Days += post7daySorted[i][1];
}

const labelN = "Top 10 trending tags on NEAR Social in 7 days";

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

let dataP = [];
let labelP = [];

// Assuming allPostSorted has at least 20 items
for (let i = 0; i < 10; i++) {
  if (post7daySorted[i]) {
    dataP.push(post7daySorted[i][1]); // Assuming item[1] contains the data for dataP
    labelP.push(post7daySorted[i][0]); // Assuming item[0] contains the data for labelP
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

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <StyledTotalContainer>
            <StyledTotalLabel>Total Posts</StyledTotalLabel>
            <StyledTotalValue>{totalItems7Days}</StyledTotalValue>
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
              {post7daySorted &&
                post7daySorted
                  .filter((item, index) => index <= 10)
                  .map((item) => (
                    <tr>
                      <StyledTd>
                        <a
                          href={`https://near.social/marketplacebos.near/widget/TrendingPost.ChartValueP7?hashtag=${item[0].replace(
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
