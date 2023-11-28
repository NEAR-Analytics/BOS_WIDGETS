import(["constants"]);

const SearchInputContainer = styled.div`
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  gap: 4px;
  background: #ffffff0d;
  transition: all 0.3s ease-in-out;

  &:focus-within {
    color: #ffffff0d;
    background: #ffffff14;
  }
`;

const SearchImg = styled.img`
  width: 24px;
  height: 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  font-weight: 600;
  border: none;
  background: transparent;
  outline: none;
  color: white;
  &::placeholder {
    color: #ffffff59;
  }
`;
return (
  <SearchInputContainer>
    <SearchImg
      src={`${ipfsPrefix}/bafkreih5hkojsnvueri63sn42e5zff4dcabzi7grctluyurmh5u3yw7gaa`}
    />
    <SearchInput placeholder="Search ID/NO." />
  </SearchInputContainer>
);
