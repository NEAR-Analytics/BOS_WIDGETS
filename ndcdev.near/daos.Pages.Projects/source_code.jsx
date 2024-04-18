let { assets, content, contractName } = VM.require(
  `ndcdev.near/widget/daos.Config`,
);

content = content.home;

const projects = Near.view(contractName, "get_dao_communities");

if (!contractName || !content || !projects)
  return <Widget src="flashui.near/widget/Loading" />;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 50px;
`;

return (
  <>
    {projects?.length > 0 ? (
      <Wrapper>
        <Widget
          src={`ndcdev.near/widget/daos.Components.Dao.Communities`}
          props={{
            title: content.featuredProducts.title,
            projects: projects.filter((p) => p.status === "Active"),
          }}
        />
      </Wrapper>
    ) : (
      <></>
    )}
  </>
);
