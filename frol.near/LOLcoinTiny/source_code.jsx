const balances = Near.view("lolcoin.qbit.near", "ft_balances", {});

if (!balances) {
  return <></>;
}

const sendOne = (accountId) => {
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
          <button onClick={() => sendOne(accountId)}>Send 1</button>
        </td>
      </tr>
    ))}
  </table>
);
