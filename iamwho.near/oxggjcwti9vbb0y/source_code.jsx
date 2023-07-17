State.init({
  searchBarProps: {
    placeHolder: "Account ID",
    handleSubmit: handleSubmit,
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
    console.log(res);

    if (!res) return;

    State.update({
      tableProps: {
        ...tableProps,
        contracts: res[0],
      },
    });
  } catch {
    console.log("error");
  }
};

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
