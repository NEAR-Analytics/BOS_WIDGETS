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

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", right: 28 }}
  >
    <g clip-path="url(#clip0_1_3884)">
      <path
        d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58334C17.5 5.21108 13.9555 1.66667 9.58329 1.66667C5.21104 1.66667 1.66663 5.21108 1.66663 9.58334C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z"
        stroke="#595959"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 18.3333L16.6666 16.6667"
        stroke="#595959"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_3884">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

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
            <SearchIcon />
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
