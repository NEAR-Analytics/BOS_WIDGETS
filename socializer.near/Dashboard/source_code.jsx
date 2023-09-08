const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  background: #FAFAFA;
`;

const HeadComponent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
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

return (
  <MainComponent>
    <HeadComponent>
      <TitleComponent>
        <FilterContent>
          <SearchInput placeholder="Search" />
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
