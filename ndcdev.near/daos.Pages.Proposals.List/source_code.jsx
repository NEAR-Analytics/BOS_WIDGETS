let { contractName } = VM.require(`ndcdev.near/widget/daos.Config`);

if (!contractName || !Near) return <Widget src="flashui.near/widget/Loading" />;
const daos = Near.view(contractName, "get_dao_list");

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

    if (items) {
      items = [...items, ...inReviewItems];
    }
  }
} else if (accountId) {
  items = Near.view(contractName, "get_posts_by_author", {
    author: accountId,
    page: 0,
    limit: 100,
  });

  if (items && items.length === 0) {
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
  gap: 2rem;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Select = styled.select`
  border: none;
  max-width: 150px;
  height: 100%;
  background: #f8f8f8;

  @media screen and (max-width: 768px) {
    background: unset;
    min-width: 100%;
    font-size: 22px;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const FilterButton = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 95.238px;
  border: 0.952px solid
    var(--NEAR-Primary-Colors-Off-White-Variation-1, #f0efe7);
  background: var(--Primary-Base-White, #fff);
`;

const MobileTitle = styled.div`
  color: var(--NEAR-Primary-Colors-Black-Variation-1, #000);
  font-family: "FK Grotesk";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const FiltersContainer = styled.div`
  display: flex;
  height: 768px;
  width: 100%
  padding: 64px 16px 48px 16px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
  border-radius: 14px 14px 0px 0px;
  background: var(--Primary-Base-White, #FFF);
  box-shadow: 0px -305px 85px 0px rgba(0, 0, 0, 0.00), 0px -195px 78px 0px rgba(0, 0, 0, 0.00), 0px -110px 66px 0px rgba(0, 0, 0, 0.01), 0px -49px 49px 0px rgba(0, 0, 0, 0.01), 0px -12px 27px 0px rgba(0, 0, 0, 0.02);
`;

const HeaderFilter = styled.div`
  width: 100%;
  padding: 1rem;
`;

const [filteredDao, useFilteredDao] = useState(false);
const [filteredStatus, useFilteredStatus] = useState(false);

const handleFilterDaoChange = (e) => {
  if (e.target.value === "all") {
    useFilteredDao(false);
  } else {
    useFilteredDao(e.target.value);
  }
};

const handleFilterStatusChange = (e) => {
  if (e.target.value === "all") {
    useFilteredStatus(false);
  } else {
    useFilteredStatus(e.target.value);
  }
};

const [preparedItems, setPreparedItems] = useState(items);

if (items) {
  setPreparedItems(
    items
      .sort((a, b) => b.created_at - a.created_at)
      .filter((item) => {
        if (filteredDao) {
          return item.dao_id === parseInt(filteredDao);
        }
        return item;
      })
      .filter((item) => {
        if (filteredStatus) {
          return item.status === filteredStatus;
        }
        return item;
      }),
  );
}

const statuses = [
  { key: "InReview", value: "In Review" },
  { key: "New", value: "New" },
  { key: "Approved", value: "Approved" },
  { key: "Rejected", value: "Rejected" },
  { key: "Closed", value: "Closed" },
];

const [showMobileFilter, setShowMobileFilter] = useState(false);

const handleMobileFilter = () => {
  setShowMobileFilter(!showMobileFilter);
};

if (!preparedItems) return <Widget src="flashui.near/widget/Loading" />;

return (
  <>
    <Table>
      <TableHeader>
        <TableHeaderCell flex={0.7}>
          <div className="d-flex justify-content-between">
            <div>Status</div>
            <Select value={filteredStatus} onChange={handleFilterStatusChange}>
              <option value="all">All</option>
              {statuses.map((status, index) => (
                <option key={index} value={status.key}>
                  {status.value}
                </option>
              ))}
            </Select>
          </div>
        </TableHeaderCell>
        <TableHeaderCell flex={2.5}>
          <div className="d-flex justify-content-between">
            <div>DAO</div>
            <Select value={filteredDao} onChange={handleFilterDaoChange}>
              <option value="all">All</option>
              {daos.map((dao, index) => (
                <option key={index} value={dao.id}>
                  {dao.title}
                </option>
              ))}
            </Select>
          </div>
        </TableHeaderCell>
        <TableHeaderCell flex={2}> Modified </TableHeaderCell>
        <TableHeaderCell flex={5.5}>Proposals states</TableHeaderCell>
        <TableHeaderCell></TableHeaderCell>
        <TableHeaderCell></TableHeaderCell>
      </TableHeader>

      {preparedItems.length === 0 ? (
        <div className="w-100 my-5 d-flex justify-content-center align-tems-center">
          <h1>No active Reports</h1>
        </div>
      ) : (
        preparedItems.map((row, index) => (
          <div key={row.title}>
            <Widget
              src="ndcdev.near/widget/daos.Components.Post"
              props={{ item: row, index, type, rowId: row.id }}
            />
          </div>
        ))
      )}
    </Table>
    <Mobile>
      <>
        <MobileHeader>
          <MobileTitle>All Proposals</MobileTitle>
          <FilterButton onClick={handleMobileFilter}>
            <i class="ph ph-funnel"></i>
          </FilterButton>
        </MobileHeader>
        {showMobileFilter ? (
          <FiltersContainer>
            <HeaderFilter className="d-flex justify-content-between">
              <MobileTitle>Filters</MobileTitle>
              <MobileTitle
                onClick={() => setShowMobileFilter(!showMobileFilter)}
              >
                <i class="ph ph-x"></i>
              </MobileTitle>
            </HeaderFilter>
            <HeaderFilter>
              <MobileTitle>Status</MobileTitle>
              <Select
                value={filteredStatus}
                onChange={handleFilterStatusChange}
              >
                <option value="all">All</option>
                {statuses.map((status, index) => (
                  <option key={index} value={status.key}>
                    {status.value}
                  </option>
                ))}
              </Select>
            </HeaderFilter>
            <HeaderFilter>
              <MobileTitle>DAO</MobileTitle>
              <Select value={filteredDao} onChange={handleFilterDaoChange}>
                <option value="all">All</option>
                {daos.map((dao, index) => (
                  <option key={index} value={dao.id}>
                    {dao.title}
                  </option>
                ))}
              </Select>
            </HeaderFilter>
          </FiltersContainer>
        ) : preparedItems.length === 0 ? (
          <div className="w-100 my-5 d-flex justify-content-center align-tems-center">
            <h1>No active Reports</h1>
          </div>
        ) : (
          preparedItems.map((row, index) => (
            <div key={row.title}>
              <Widget
                src="ndcdev.near/widget/daos.Components.Post"
                props={{
                  item: row,
                  index,
                  type,
                  rowId: row.id,
                  isMobile: true,
                }}
              />
            </div>
          ))
        )}
      </>
    </Mobile>
  </>
);
