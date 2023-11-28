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

console.log(tagCount);

let entries = Object.entries(tagCount);

let sorted = entries.sort((b, a) => a[1] - b[1]);

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

const Table = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTags = sorted.filter((item) =>
    item[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>TAG NAME</StyledTh>
            <StyledTh>TOTAL TAG</StyledTh>
          </tr>
        </thead>
        <tbody>
          {filteredTags.map((item) => (
            <tr key={item[0]}>
              <StyledTd>{item[0]}</StyledTd>
              <StyledTd>{item[1]}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

return (<>
<Table />
</>)