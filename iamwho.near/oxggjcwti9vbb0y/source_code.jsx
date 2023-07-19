const limits = [1, 10, 20, 50];
const handleOptionsChange = (e) => {
  State.update({
    limit: parseInt(e.target.value),
  });
};

State.init({
  limit: limits[0],
  pages: 1,
  selectedPage: 1,
});

const handleSubmit = (value) => {
  State.update({ searchValue: value });
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
  </div>
);
