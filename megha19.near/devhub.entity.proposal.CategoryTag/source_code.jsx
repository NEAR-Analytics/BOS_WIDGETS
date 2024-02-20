const category = props.category;
const getClassNameByCategory = () => {
  switch (category) {
    case "DevDAO Operations":
      return "purple";
    case "Decentralized DevRel":
      return "cyan";
    case "NEAR Campus":
      return "mustard";
    case "Marketing":
      return "red";
    case "Events":
      return "green";
    case "Tooling & Infrastructure":
      return "pink";
    default:
      return "grey";
  }
};

const Container = styled.div`
  .tag {
    color: white;
    padding-inline: 6px;
    padding-block: 3px;
    font-size: 13px;
  }
  .purple-bg {
    background-color: #7c66dc;
  }
  .cyan-bg {
    background-color: #0daebb;
  }
  .pink-bg {
    background-color: #d366dc;
  }
  .grey-bg {
    background-color: #818181;
  }
  .red-bg {
    background-color: #dc6666;
  }
  .green-bg {
    background-color: #04a46e;
  }
  .mustard-bg {
    background-color: #dc9866;
  }
`;

return (
  <Container>
    <div className={getClassNameByCategory() + "-bg rounded-1 tag"}>
      {category}
    </div>
  </Container>
);
