const {
  body: { account },
} = fetch(`https://api.nearblocks.io/v1/account/${props.wallet_id}`);
const native_balance = account[0].amount / 1e24;
const unspendable_balance = 0.05 + account[0].storage_usage / 1e5;
const spendable_balance = native_balance - unspendable_balance;

const balance = props.balance_type === 'spendable' ? spendable_balance : native_balance;

return balance.toFixed(props.decimal_places);
