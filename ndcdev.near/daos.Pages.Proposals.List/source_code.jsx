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

  items = Near.view(contractName, "get_all_posts", {
    dao_id: dao.id,
    page: 0,
    limit: 100,
  });

  if (dao.owners.includes(context.accountId)) {
    const inReviewItems = Near.view(contractName, "get_all_posts", {
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

  .selected-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;

    i {
      color: #b0afb1;
    }

    &.dao {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }
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
  flex-shrink: 0;
  border-radius: 14px 14px 0px 0px;
  background: var(--Primary-Base-White, #FFF);
  box-shadow: 0px -305px 85px 0px rgba(0, 0, 0, 0.03), 0px -195px 78px 0px rgba(0, 0, 0, 0.03), 0px -110px 66px 0px rgba(0, 0, 0, 0.01), 0px -49px 49px 0px rgba(0, 0, 0, 0.01), 0px -12px 27px 0px rgba(0, 0, 0, 0.02);
`;

const HeaderFilter = styled.div`
  width: 100%;
  padding: 1rem;
`;

const FilterLayout = styled.div`
  min-height: 50px;
  max-height: 400px;
  overflow-y: auto;
  padding: 1rem 0;
`;

const FilterEntry = styled.div`
  padding: 10px 5px;
  font-size: 14px;
  background-color: ${(props) => (props.selected ? "#F5F6FE;" : "white")};
  border-left: ${(props) => (props.selected ? "2px solid #626AD1" : "none")};
  cursor: pointer;
  font-size: 20px;

  .dao-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .dao-container {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
  }

  .text {
    color: #666;
  }

  .owner {
    font-size: 12px;
  }

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const [filteredDao, useFilteredDao] = useState(false);
const [filteredStatus, useFilteredStatus] = useState(false);

const handleFilterDaoChange = () => {
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

const statuses = [
  { key: "InReview", value: "In Review" },
  { key: "New", value: "New" },
  { key: "Approved", value: "Approved" },
  { key: "Rejected", value: "Rejected" },
  { key: "Closed", value: "Closed" },
];

const [sortOrders, setSortOrders] = useState({});

const sortData = (entity, field) => {
  const isAsc = sortOrders[entity][field] !== "ASC";
  const newSortOrder = isAsc ? "ASC" : "DESC";

  const sortedItems = [...preparedItems].sort((a, b) => {
    if (a[entity][field] === b[entity][field]) return 0;
    return (
      isAsc
        ? a[entity][field] > b[entity][field]
        : a[entity][field] < b[entity][field]
    )
      ? 1
      : -1;
  });

  setPreparedItems(sortedItems);
  setSortOrders({ ...sortOrders, [entity]: { [field]: newSortOrder } });
};

useEffect(() => {
  setPreparedItems(
    items
      .sort((a, b) => b.created_at - a.created_at)
      .filter((item) => {
        if (filteredDao) {
          return item.post.dao_id === daos[filteredDao].id;
        }
        return item;
      })
      .filter((item) => {
        if (filteredStatus) {
          return item.post.status === statuses[filteredStatus].value;
        }
        return item;
      }),
  );
}, [filteredDao, filteredStatus]);

const [showMobileFilter, setShowMobileFilter] = useState(false);
const [showMobileDaoFilter, setShowMobileDaoFilter] = useState(false);
const [showMobileStatusFilter, setShowMobileStatusFilter] = useState(false);

const handleMobileFilter = () => {
  setShowMobileFilter(!showMobileFilter);
};

if (!preparedItems) return <Widget src="flashui.near/widget/Loading" />;

return (
  <>
    <Table>
      <TableHeader>
        <TableHeaderCell>
          <SortContainer
            role="button"
            onClick={() => sortData("post", "status")}
          >
            <div>Status</div>
            <div className="selected-container">
              <i className="ph ph-caret-up-down fs-5" />
            </div>
            {/* <Select value={filteredStatus} onChange={handleFilterStatusChange}>
              <option value="all">All</option>
              {statuses.map((status, index) => (
                <option key={index} value={status.key}>
                  {status.value}
                </option>
              ))}
            </Select> */}
          </SortContainer>
        </TableHeaderCell>
        <TableHeaderCell flex={2}>
          <SortContainer role="button" onClick={() => sortData("dao", "title")}>
            <div>DAO</div>
            {/* <Select value={filteredDao} onChange={handleFilterDaoChange}>
              <option value="all">All</option>
              {daos.map((dao, index) => (
                <option key={index} value={dao.id}>
                  {dao.title}
                </option>
              ))}
            </Select> */}
            <div className="selected-container">
              <i className="ph ph-caret-up-down fs-5" />
            </div>
          </SortContainer>
        </TableHeaderCell>
        <TableHeaderCell
          role="button"
          onClick={() => sortData("post", "created_at")}
        >
          Created
          <div className="selected-container">
            <i className="ph ph-caret-up-down fs-5" />
          </div>
        </TableHeaderCell>
        <TableHeaderCell
          role="button"
          onClick={() => sortData("post", "author_id")}
        >
          Modified
          <div className="selected-container">
            <i className="ph ph-caret-up-down fs-5" />
          </div>
        </TableHeaderCell>
        <TableHeaderCell flex={3.2}>Proposals states</TableHeaderCell>
        <TableHeaderCell></TableHeaderCell>
        <TableHeaderCell></TableHeaderCell>
      </TableHeader>

      {preparedItems.length === 0 ? (
        <div className="w-100 my-5 d-flex justify-content-center align-tems-center">
          <h1>No active Reports</h1>
        </div>
      ) : (
        preparedItems.map((row, index) => (
          <div key={row.post.title}>
            <Widget
              src="ndcdev.near/widget/daos.Components.Post"
              props={{
                item: row.post,
                index,
                type,
                rowId: row.post.id,
                dao: row.dao,
              }}
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
              <div
                onClick={() => setShowMobileDaoFilter(!showMobileDaoFilter)}
                className="d-flex justify-content-between"
              >
                <MobileTitle>DAO</MobileTitle>
                {showMobileDaoFilter ? (
                  <i class="ph ph-caret-up"></i>
                ) : (
                  <i class="ph ph-caret-down"></i>
                )}
              </div>
              {showMobileDaoFilter && (
                <FilterLayout>
                  {daos.map((dao, index) => (
                    <FilterEntry
                      key={index}
                      selected={index === filteredDao}
                      onClick={() =>
                        useFilteredDao(filteredDao === index ? false : index)
                      }
                    >
                      <div className="dao-container">
                        <img className="dao-img" src={dao.logo_url} />
                        <div> {dao.title} </div>
                      </div>
                    </FilterEntry>
                  ))}
                </FilterLayout>
              )}
            </HeaderFilter>
            <HeaderFilter>
              <div
                onClick={() =>
                  setShowMobileStatusFilter(!showMobileStatusFilter)
                }
                className="d-flex justify-content-between"
              >
                <MobileTitle>Status</MobileTitle>
                {showMobileStatusFilter ? (
                  <i class="ph ph-caret-up"></i>
                ) : (
                  <i class="ph ph-caret-down"></i>
                )}
              </div>
              {showMobileStatusFilter && (
                <FilterLayout>
                  {statuses.map((status, index) => (
                    <FilterEntry
                      key={index}
                      selected={index === filteredStatus}
                      onClick={() =>
                        useFilteredStatus(
                          filteredStatus === index ? false : index,
                        )
                      }
                    >
                      {status.value}
                    </FilterEntry>
                  ))}
                </FilterLayout>
              )}
            </HeaderFilter>
          </FiltersContainer>
        ) : preparedItems.length === 0 ? (
          <div className="w-100 my-5 d-flex justify-content-center align-tems-center">
            <h1>No active Reports</h1>
          </div>
        ) : (
          preparedItems.map((row, index) => (
            <div key={row.post.title}>
              <Widget
                src="ndcdev.near/widget/daos.Components.Post"
                props={{
                  item: row.post,
                  index,
                  type,
                  rowId: row.post.id,
                  isMobile: true,
                  dao: row.dao,
                }}
              />
            </div>
          ))
        )}
      </>
    </Mobile>
  </>
);
