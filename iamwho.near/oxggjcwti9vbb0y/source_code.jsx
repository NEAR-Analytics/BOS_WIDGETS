const limits = [1, 10, 20, 50];
const handleOptionsChange = (e) => {
  State.update({
    limit: parseInt(e.target.value),
  });
  searchContracts(state.searchValue);
};

State.init({
  from_index: 0,
  limit: limits[0],
  searchValue: "",
  pages: 1,
  selectedPage: 1,
  searchBarProps: {
    placeHolder: "Account ID",
    handleSubmit: (value) => handleSubmit(value),
  },
  tableProps: {
    contracts: null,
  },
});

const handleSubmit = (value) => {
  State.update({ searchValue: value });
  searchContracts(value);
};

const searchContracts = (value) => {
  try {
    const res = Near.view("v1.sourcescan.near", "search", {
      key: value,
      from_index: state.from_index,
      limit: state.limit,
    });

    State.update({
      pages: res[1],
      tableProps: {
        ...state.tableProps,
        contracts: res[0],
      },
    });
  } catch {
    console.log("error");
  }
};

if (!state.tableProps.contracts) searchContracts(state.searchValue);

const range = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const handlePageChange = (x) => {
  state.update({
    selectedPage: x + 1,
    from_index: x * state.limit,
  });
};

return (
  <div class="flex items-center justify-center w-screen h-screen">
    <select onChange={(e) => handleOptionsChange(e)}>
      {limits.map((limit) => (
        <option value={limit}>{limit}</option>
      ))}
    </select>
    <Widget
      src={"iamwho.near/widget/szlhyjoIhy"}
      props={state.searchBarProps}
    />
    <Widget
      src={"iamwho.near/widget/oxakldakldlkadlkfalkf"}
      props={state.tableProps}
    />
    {state.pages ? (
      <div>
        {range(
          state.pages > 1
            ? state.selectedPage > 2
              ? state.selectedPage - 2
              : 0
            : state.selectedPage - 1,
          state.pages > 1
            ? state.selectedPage + 1 < state.pages
              ? state.selectedPage
              : state.pages - 1
            : state.pages - 1
        ).map((x, i) => (
          <button onClick={(x) => handlePageChange(x)}>{x + 1}</button>
        ))}
      </div>
    ) : null}
  </div>
);
