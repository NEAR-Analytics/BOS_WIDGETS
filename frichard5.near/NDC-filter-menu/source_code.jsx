const { widgetProvider, comps, filters, removeFilter } = props;

State.init({
  isOpen: false,
  filters,
});

State.update({ isOpen: false });

const FilterMenu = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    background: white;
    width: 100%;
    padding: 20px;
    box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
`;

const FilterButton = styled.button`
  color: black;
  background:rgba(255, 213, 13, 0.5);
  border: none;
  &:hover {
    background:rgba(255, 213, 13, 1);
    color: black;
  }
  &:active {
      background-color:rgba(255, 213, 13, 0.8);
      color: black !important;
  }
`;

const handleFilterRemove = (filter) => {
  removeFilter(filter);
};

return (
  <>
    <FilterButton onClick={() => State.update({ isOpen: !state.isOpen })}>
      <span>open</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 13h4.667v-1.5H2V13zm0-9v1.5h12V4H2zm0 5.25h8.333v-1.5H2v1.5z"
          fill="currentColor"
        ></path>
      </svg>
    </FilterButton>
    {filters &&
      filters.map((f) => <div onClick={() => handleFilterRemove(f)}>{f}</div>)}
    {state.isOpen && <FilterMenu>{comps.map((c) => c)}</FilterMenu>}
  </>
);
