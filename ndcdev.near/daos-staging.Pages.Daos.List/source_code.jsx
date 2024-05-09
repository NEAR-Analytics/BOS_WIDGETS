let { contractName, content } = VM.require(
  `ndcdev.near/widget/daos-staging.Config`,
);

if (!contractName || !content)
  return <Widget src="flashui.near/widget/Loading" />;

content = content.home;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0 5rem 0;

  @media screen and (max-width: 786px) {
    padding: 2rem;
  }
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 2rem;
  padding: 2rem 0 3rem 0;

  a {
    text-decoration: underline;
  }

  @media screen and (max-width: 786px) {
    justify-content: center;
    text-align: left;
  }
`;

const daos = Near.view(contractName, "get_dao_list");

if (!daos) return <Widget src="flashui.near/widget/Loading" />;

return (
  <Container>
    <Widget
      src="ndcdev.near/widget/daos-staging.Components.PageTitle"
      props={{ text: "DAOs" }}
    />

    <div className="d-flex flex-wrap justify-content-center gap-4">
      {daos
        .filter((dao) => dao.dao_type === "DAO")
        .sort((a, b) => a.title < b.title)
        .map((dao) => (
          <Widget
            src={`ndcdev.near/widget/daos-staging.Components.Dao.Card`}
            props={{ dao, index }}
          />
        ))}
    </div>
  </Container>
);
