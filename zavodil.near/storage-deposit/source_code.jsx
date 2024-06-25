const [amount, setAmount] = useState(0.1);

const Deposit = () => {
  const amount_ynear = Big(amount.toString()).mul(Big(10).pow(24)).toFixed();
  Near.call(
    "social.near",
    "storage_deposit",
    { account_id: context.accountId },
    30000000000000,
    amount_ynear
  );
};

return (
  <>
    <h1>Deposit to Social DB Storage</h1>
    <div class="mb-2">
      Amount (NEAR):{" "}
      <input
        style={{ maxWidth: "100px" }}
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
    <div>
      <button onClick={Deposit}>Deposit</button>
    </div>
  </>
);
