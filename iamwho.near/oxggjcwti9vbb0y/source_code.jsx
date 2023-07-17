const options = [1, 10, 20, 50];
const handleOptionsChange = (e) => {
  State.update({
    tableProps: {
      ...state.tableProps,
      limit: parseInt(e.target.value),
    },
  });
};

State.init({
  from_index: 0,
  limit: options[0],
  searchValue: "",
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
