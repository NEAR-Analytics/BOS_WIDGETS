const utils = () => {
  const depositAmount = (actions) => {
    return actions
      .map((action) => {
        if (typeof action === "string") return "0";
        if ("FunctionCall" in action) return action.FunctionCall.deposit;
        if ("Transfer" in action) return action.Transfer.deposit;
        return "0";
      })
      .reduce((acc, deposit) => Big(acc).plus(deposit).toString(), "0");
  };
  const txnFee = (receiptsOutcome, txnTokensBurnt) => {
    return receiptsOutcome
      .map((receipt) => receipt.outcome.tokens_burnt)
      .reduce((acc, fee) => Big(acc).add(fee).toString(), txnTokensBurnt);
  };
  const gasLimit = (actions) => {
    const gasAttached = actions
      .map((action) => action.args)
      .filter((args) => "gas" in args);
    if (gasAttached.length === 0) return "0";
    return gasAttached.reduce(
      (acc, args) => Big(acc).add(args.gas).toString(),
      "0"
    );
  };
  const refund = (receipts) => {
    return receipts
      .filter(
        (nestedReceipt) =>
          "outcome" in nestedReceipt && nestedReceipt.predecessorId === "system"
      )
      .reduce((acc, nestedReceipt) => {
        let gasDeposit = "0";
        if ("outcome" in nestedReceipt) {
          gasDeposit = nestedReceipt.actions
            .map((action) =>
              "deposit" in action.args ? action.args.deposit : "0"
            )
            .reduce((acc, deposit) => Big(acc).add(deposit).toString(), "0");
        }
        return Big(acc).add(gasDeposit).toString();
      }, "0");
  };
  const shortenString = (string, prefixLen, suffixLen, minLen) => {
    const text = String(string);
    const prefix = prefixLen ?? 6;
    const suffix = suffixLen ?? 7;
    const threshold = minLen ?? 15;
    if (text.length <= threshold) return text;
    return `${text.slice(0, prefix)}...${text.slice(-suffix)}`;
  };
  return {
    depositAmount,
    gasLimit,
    refund,
    shortenString,
    txnFee,
  };
};
return utils(props);
