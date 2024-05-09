let { contractName } = VM.require(`ndcdev.near/widget/daos.Config`);

if (!contractName) return <Widget src="flashui.near/widget/Loading" />;

let { dao_id, type, accountId } = props;

let items = null;
let dao = null;

if (dao_id) {
  dao = Near.view(contractName, "get_dao_by_handle", {
    handle: dao_id,
  });

  if (!dao) <Widget src="flashui.near/widget/Loading" />;

  items = Near.view(contractName, "get_dao_posts", {
    dao_id: dao.id,
    page: 0,
    limit: 100,
  });

  if (dao.owners.includes(context.accountId)) {
    const inReviewItems = Near.view(contractName, "get_dao_posts", {
      dao_id: dao.id,
      page: 0,
      limit: 100,
      status: "InReview",
    });

    items = [...items, ...inReviewItems];
  }
} else if (accountId) {
  items = Near.view(contractName, "get_posts_by_author", {
    author: accountId,
    page: 0,
    limit: 100,
  });

  if (items.length === 0) {
    items = Near.view(contractName, "get_all_posts", { page: 0, limit: 100 });
    accountId = null;
  }
} else
  items = Near.view(contractName, "get_all_posts", { page: 0, limit: 100 });

if (!items) return <Widget src="flashui.near/widget/Loading" />;

const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem 0 3rem 0;

  .created {
    color: #5c656a;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .account-link {
    color: #4855fc;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f8f8f8;
  padding: 10px 16px;
  jusify-content: flex-start;
`;

const TableHeaderCell = styled.div`
  padding: 0 0 0 10px;
  display: flex;
  flex: ${(props) => props.flex || 1};
`;

const Mobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

return (
  <>
    {items.length === 0 ? (
      <div className="w-100 my-5 d-flex justify-content-center align-tems-center">
        <h1>No active Reports</h1>
      </div>
    ) : (
      <>
        <Table>
          <TableHeader>
            <TableHeaderCell flex={0.7}>Status</TableHeaderCell>
            <TableHeaderCell flex={2.3}>DAO</TableHeaderCell>
            <TableHeaderCell> Modified </TableHeaderCell>
            <TableHeaderCell flex={3}>Proposals states</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableHeader>
          {items.map((row, index) => (
            <Widget
              src="ndcdev.near/widget/daos.Components.Post"
              props={{ item: row, index, type, rowId: row.id }}
            />
          ))}
        </Table>
        <Mobile>
          {items.map((row, index) => (
            <Widget
              src="ndcdev.near/widget/daos.Components.Post"
              props={{ item: row, index, type, rowId: row.id, isMobile: true }}
            />
          ))}
        </Mobile>
      </>
    )}
  </>
);
