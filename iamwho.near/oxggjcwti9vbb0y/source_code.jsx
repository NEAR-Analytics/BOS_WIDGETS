State.init({
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
  searchContracts(value);
};

const searchContracts = (value) => {
  try {
    const res = Near.view("v1.sourcescan.near", "search", {
      key: value,
      from_index: props.from_index || 0,
      limit: props.limit || 10,
    });

    if (!res) return;

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

if (!state.tableProps.contracts) searchContracts("");

return (
  <div class="flex items-center justify-center w-screen h-screen">
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
