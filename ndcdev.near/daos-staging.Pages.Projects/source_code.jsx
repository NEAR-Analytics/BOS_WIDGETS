let { assets, content, contractName } = VM.require(
  `ndcdev.near/widget/daos-staging.Config`,
);

content = content.home;

let projects = [];

// NDC
let projectsDaoId1 = Near.view(contractName, "get_dao_communities", {
  dao_id: parseInt(1),
});

let projectsDaoId2 = Near.view(contractName, "get_dao_communities", {
  dao_id: parseInt(2),
});

// Marketing DAO
let projectsDaoId4 = Near.view(contractName, "get_dao_communities", {
  dao_id: parseInt(4),
});

// Gaming DAO
let projectsDaoId3 = Near.view(contractName, "get_dao_communities", {
  dao_id: parseInt(3),
});

if (
  !contractName ||
  !content ||
  !projects ||
  !projectsDaoId1 ||
  !projectsDaoId2 ||
  !projectsDaoId4 ||
  !projectsDaoId3
)
  return <Widget src="flashui.near/widget/Loading" />;

projects = [
  ...projectsDaoId1,
  ...projectsDaoId2,
  ...projectsDaoId4,
  ...projectsDaoId3,
];

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
          src={`ndcdev.near/widget/daos-staging.Components.Dao.Communities`}
          props={{
            title: content.featuredProducts.title,
            projects: content.featuredProducts.projects.map((title) =>
              projects.find((p) => p.title === title),
            ),
          }}
        />
      </Wrapper>
    ) : (
      <></>
    )}
  </>
);
