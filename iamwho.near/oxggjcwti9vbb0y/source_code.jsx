const limits = [1, 2, 3];

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
  </div>
);
