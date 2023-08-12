const balances = Near.view("lolcoin.qbit.near", "ft_balances", {});

if (!balances) {
  return <></>;
}

const sendOneLolcent = (accountId) => {
  Near.call(
    "lolcoin.qbit.near",
    "ft_transfer",
    {
      receiver_id: accountId,
      amount: "1",
    },
    30000000000000,
    1
  );
};

return (
  <table>
    {balances.map(([accountId, balance]) => (
      <tr>
        <td>{accountId}</td>
        <td>{parseInt(balance) / 100} ЛОЛ</td>
        <td>
          <button onClick={() => sendOneLolcent(accountId)}>
            Відправити 1 ЛОЛкопійку
          </button>
        </td>
      </tr>
    ))}
  </table>
);
