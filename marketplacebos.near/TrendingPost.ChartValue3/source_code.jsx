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

// 30 days
let BlockHeightPost30Days = [];
const getBlockHeight30daysPost = Social.index("post", "main", {
  from: newBlock30Days,
  limit: 99999,
});
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

// 3 days
const newBlock3Days = Math.round(
  parseInt(respBlock.body.stats[0].block) -
    (3 * 24 * 3600) / parseInt(respBlock.body.stats[0].avg_block_time)
);

let BlockHeightPost3Days = [];
const getBlockHeight3daysPost = Social.index("post", "main", {
  from: newBlock3Days,
  limit: 99999,
});

getBlockHeight3daysPost.forEach((item) => {
  BlockHeightPost3Days.push({
    accountId: item.accountId,
    blockHeight: item.blockHeight,
  });
});

let post3days = [];
BlockHeightPost3Days.forEach((item) => {
  const post = Social.get(`${item.accountId}/post/main`, item.blockHeight);
  if (post) {
    post3days.push(JSON.parse(post).text);
  }
});

let tagCount3Days = {};
post3days.forEach((item) => {
  const tags = findHashtags(item);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      if (tagCount3Days[tag]) {
        tagCount3Days[tag] = tagCount3Days[tag] + 1;
      } else {
        tagCount3Days[tag] = 1;
      }
    });
  }
});
let entries3days = Object.entries(tagCount3Days);
let post3daySorted = entries3days.sort((b, a) => a[1] - b[1]);

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
let totalItems3Days = 0;

// Sum the values in the day3PostSorted array
for (let i = 0; i < post3daySorted.length; i++) {
  totalItems3Days += post3daySorted[i][1];
}

const labelN = "Top 10 trending tags on NEAR Social in 3 days";

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
  if (post3daySorted[i]) {
    dataP.push(post3daySorted[i][1]); // Assuming item[1] contains the data for dataP
    labelP.push(post3daySorted[i][0]); // Assuming item[0] contains the data for labelP
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

  // Filtered tags based on the search term
  // Limit to the top 10 filtered tags
  return (
    <>
      <StyledTotalContainer>
        <StyledTotalLabel>Total Posts</StyledTotalLabel>
        <StyledTotalValue>{totalItems3Days}</StyledTotalValue>
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
          {post3daySorted &&
            post3daySorted
              .filter((item, index) => index <= 10)
              .map((item) => (
                <tr>
                  <StyledTd>
                    <a
                      href={`https://near.social/marketplacebos.near/widget/TrendingPost.ChartValueProps?hashtag=${item[0].replace(
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
