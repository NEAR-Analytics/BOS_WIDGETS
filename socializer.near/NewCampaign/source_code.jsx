const Owner = "socializer.near";

const changePage = props?.changePage || (() => {});
const page = props?.page || "";

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: #FAFAFA;
  flex-direction: column;
`;

const TableComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 13px;
`;

const HeadComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px;
`;

const TitleComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
`;

const FilterContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap:14px;
`;

const SearchInput = styled.input`
  border-radius: 10px;
  padding: 14px 48px 14px 28px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.12px;
`;

const Button = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 6px;
  background: var(--Dark, #121212); 
  color: var(--light_95, #F3F3F3);
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: normal;
`;

return (
  <MainComponent>
    <HeadComponent>
      <TitleComponent>
        <FilterContent>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchInput placeholder="Search" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 21,
            }}
          >
            <Button
              onClick={() => {
                changePage("new_campaigns");
              }}
            >
              {"+ Create New Campaigns"}
            </Button>
          </div>
        </FilterContent>
        <TitleContent>
          <h4 style={{ margin: 0 }}>Live Campaigns</h4>
          <p style={{ fontSize: 14, margin: 0 }}>
            The list of Near Social Posts are offering rewards
          </p>
        </TitleContent>
      </TitleComponent>
    </HeadComponent>
  </MainComponent>
);
