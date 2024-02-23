let { contractName } = VM.require(`ndcdev.near/widget/daos.Config`);

if (!contractName) return <Widget src="flashui.near/widget/Loading" />;

let { dao_id, type } = props;

const Container = styled.div`
  width: 100%;
  height: max-content;
  padding: 3rem 0;

  .dao-img {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 786px) {
    padding: 1rem;
  }
`;

let items = null;
let dao = null;

if (dao_id) {
  items = Near.view(contractName, "get_dao_posts", {
    dao_id: parseInt(dao_id),
  });
  dao = Near.view(contractName, "get_dao_by_id", {
    id: parseInt(dao_id),
  });
} else
  items = Near.view(contractName, "get_posts_by_author", {
    author: context.accountId,
  });

if (!items) return <Widget src="flashui.near/widget/Loading" />;

return (
  <Container>
    <>
      {dao_id ? (
        <>
          <h1>
            <img className="dao-img" src={dao.logo_url} />
            {dao.title}
          </h1>

          <div className="my-4">
            <a
              style={{ fontSize: "24px" }}
              className="btn-primary text-uppercase"
              href={`/ndcdev.near/widget/daos.App?page=create_proposal&dao_id=${dao_id}`}
            >
              create {type}
            </a>
          </div>
        </>
      ) : (
        <Widget
          src={`ndcdev.near/widget/daos.Components.TopNavBar`}
          props={props}
        />
      )}
      <div className="d-flex flex-column gap-4">
        {items?.length ? (
          items
            .filter((i) => i.post_type === type)
            .map((item, index) => (
              <Widget
                src="ndcdev.near/widget/daos.Components.Item"
                props={{ item, index, type, id: item.id }}
              />
            ))
        ) : (
          <div className="w-100 my-5 d-flex justify-content-center align-tems-center">
            <h1>No active {type}s</h1>
          </div>
        )}
      </div>
    </>
  </Container>
);
