const allPost = Social.get("*/post/main/", "final");

function findHashtags(str) {
  const regexp = /\B\#\w\w+\b/g;
  let match;
  let tags = [];
  while ((match = regexp.exec(str)) !== null) {
    tags.push(match[0]);
  }
  return tags;
}

const tagCount = {};
Object.keys(allPost).forEach((item) => {
  const tags = findHashtags(JSON.parse(allPost[item].post.main).text);
  if (tags.length > 0) {
    tags.forEach((tag) => {
      tagCount[tag] = tagCount[tag] + 1 || 1;
    });
  }
});

let entries = Object.entries(tagCount);

let sorted = entries.sort((b, a) => a[1] - b[1]);

let totalItems = 0;

// Sum the values in the sorted array
for (let i = 0; i < sorted.length; i++) {
  totalItems += sorted[i][1];
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: none;
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

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
    border: 4px solid blue;

`;

const StyledTotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  return (
    <>
      <StyledContainer>
        <StyledTotalContainer>
          <StyledTotalLabel>Total Posts</StyledTotalLabel>
          <StyledTotalValue>{totalItems}</StyledTotalValue>
        </StyledTotalContainer>
        <StyledTotalContainer>
          <StyledTotalLabel>Total Account Posts</StyledTotalLabel>
          <StyledTotalValue>Account Posts</StyledTotalValue>
        </StyledTotalContainer>
        <StyledTotalContainer>
          <StyledTotalLabel>Total Likes</StyledTotalLabel>
          <StyledTotalValue>Likes</StyledTotalValue>
        </StyledTotalContainer>
        <StyledTotalContainer>
          <StyledTotalLabel>Total Comments</StyledTotalLabel>
          <StyledTotalValue>Comments</StyledTotalValue>
        </StyledTotalContainer>
        <StyledTotalContainer>
          <StyledTotalLabel>Total Reposts</StyledTotalLabel>
          <StyledTotalValue>Repost</StyledTotalValue>
        </StyledTotalContainer>
      </StyledContainer>
      <br />
      <br />
      <br />
      <br />

      <StyledTable>
        <thead>
          <tr>
            <StyledTh>POST ID</StyledTh>
            <StyledTh>TOTAL POSTED</StyledTh>
            <StyledTh>TOTAL COMMENTS</StyledTh>
            <StyledTh>TOTAL LIKES</StyledTh>
            <StyledTh>TOTAL REPOSTS</StyledTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <StyledTd>1</StyledTd>
            <StyledTd>2</StyledTd>
            <StyledTd>1</StyledTd>
            <StyledTd>2</StyledTd>
            <StyledTd>1</StyledTd>
          </tr>
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
