const Container = styled.div`
  width: 100%;
  height: max-content;
  padding: 3rem;

  @media screen and (max-width: 786px) {
    padding: 1rem;
  }
`;

const Button = styled.a`
  border-radius: 10px;
  background: #151718;
  color: white !important;
  text-decoration: none;
  display: flex;
  gap: 1rem;
  box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 40px 10px 25px;

  &:hover {
    text-decoration: none;
  }
`;

const items = Social.index("graph", "v1.ndc.mdao", { order: "desc" });

return (
  <Container>
    <h1>{items[0].value.type === "proposal" ? "Proposals" : "Reports"} List</h1>
    <div className="d-flex justify-content-end mb-4">
      <Button href="/ndcdev.near/widget/MDAO.App?page=createProposal">
        <i className="bi bi-plus-circle" />
        Post
      </Button>
    </div>
    <div className="d-flex flex-column gap-4">
      {items &&
        items
          .filter((i) => i.value.type === props.type)
          .map((item, index) => (
            <Widget
              src="ndcdev.near/widget/MDAO.Components.Item"
              props={{ item: item.value, index }}
            />
          ))}
    </div>
  </Container>
);
