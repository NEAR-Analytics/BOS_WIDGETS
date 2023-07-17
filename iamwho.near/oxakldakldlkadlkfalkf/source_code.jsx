State.init({
  contracts: props.contracts,
});

console.log("props", props);
console.log("state", state);

const fetchContracts = () => {
  try {
    const res = Near.view("v1.sourcescan.near", "get_contracts", {
      from_index: props.from_index || 0,
      limit: props.limit || 10,
    });

    if (!res) return;

    State.update({
      contracts: res[0],
    });
  } catch {
    console.log("error");
  }
};

if (props.contracts) {
  State.update({
    contracts: props.contracts,
  });
}
if (!contracts) fetchContracts();

return (
  <table class="table border border-gray-300">
    <thead>
      <tr>
        <th class="px-4 py-2">Contract</th>
        <th class="px-4 py-2">Lang</th>
        <th class="px-4 py-2">Source</th>
        <th class="px-4 py-2">Approved</th>
      </tr>
    </thead>
    <tbody>
      {state.contracts
        ? state.contracts.map((contract) => (
            <tr>
              <td class="border px-4 py-2">{contract[0]}</td>
              <td class="border px-4 py-2">{contract[1].lang}</td>
              <td class="border px-4 py-2">{contract[1].cid}</td>
              <td class="border px-4 py-2">{}</td>
            </tr>
          ))
        : null}
    </tbody>
  </table>
);
