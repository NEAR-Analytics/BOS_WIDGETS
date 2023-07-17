State.init({
  contracts: props.contracts,
});

if (props.contracts)
  State.update({
    contracts: props.contracts,
  });

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
