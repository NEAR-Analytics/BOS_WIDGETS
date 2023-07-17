State.init({
  contracts: props.contracts,
});

const fetchContracts = () => {
  try {
    const res = Near.view("v1.sourcescan.near", "get_contracts", {
      from_index: props.from_index || 0,
      limit: props.from_index || 10,
    });
    console.log(res);

    if (!res) return;

    State.update({
      contracts: res[0],
    });
  } catch {
    console.log("error");
  }
};

if (!contracts) fetchContracts();

return (
  <div class="container mx-auto p-4">
    <table class="table-auto w-full border border-gray-300 p-4">
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
  </div>
);
