const SearchBar = styled.div`
    display: flex;
    align-items: center;
    border-radius:10px;
    padding-left:10px;
    overflow:hidden;
    border: 1px solid #E2E8F0;
`;

const StyledInput = styled.input`
    padding: 10px 15px;
    font-size: 18px;
    width: 100%;
    border-width:0px;
    box-sizing: border-box;
     &::placeholder {
    font-size: 18px;
    }

    &:focus {
        outline: none;
        border-color: #6C757D;  // Slightly darker border when focused
    }
`;

return (
  <>
    <SearchBar>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M8.16667 14.8333C11.8486 14.8333 14.8333 11.8486 14.8333 8.16667C14.8333 4.48477 11.8486 1.5 8.16667 1.5C4.48477 1.5 1.5 4.48477 1.5 8.16667C1.5 11.8486 4.48477 14.8333 8.16667 14.8333Z"
          fill="white"
        />
        <path
          d="M16.5 16.5L12.875 12.875M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z"
          stroke="#475569"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <StyledInput placeholder="Search" {...props.inputProps} />
    </SearchBar>
  </>
);
