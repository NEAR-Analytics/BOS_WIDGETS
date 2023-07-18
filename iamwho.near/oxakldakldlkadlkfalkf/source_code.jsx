return (
  <table class="table">
    <thead>
      <tr>
        <th class="px-4 py-2">Kek</th>
        <th class="px-4 py-2">Lol</th>
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
