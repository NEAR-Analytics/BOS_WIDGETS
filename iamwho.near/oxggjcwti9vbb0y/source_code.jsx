State.init({
  searchValue: "",
  searchBarProps: {
    placeHolder: "Account ID",
    handleSubmit: (value) => handleSubmit(value),
  },
  tableProps: {
    contracts: null,
    from_index: 0,
    limit: 10,
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
      from_index: props.from_index || 0,
      limit: props.limit || 10,
    });

    State.update({
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

const options = [1, 10, 20, 50];
const handleOptionsChange = (e) => {
  State.update({
    tableProps: {
      ...state.tableProps,
      from_index: e.target.value,
    },
  });
};

return (
  <div class="flex items-center justify-center w-screen h-screen">
    <select onChange={(e) => handleOptionsChange(e)}>
      {options.map((option) => (
        <option value={option}>{option}</option>
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
  </div>
);
