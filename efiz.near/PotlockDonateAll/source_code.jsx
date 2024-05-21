const { getApprovedApplications } = VM.require("potlock.near/widget/SDK.pot");

const POT_ID = "oss.v1.potfactory.potlock.near";
const DONATION_CONTRACT_ID = "donate.potlock.near";
const AMOUNT = "0.1";
const referrer_id = props.referrer_id || "efiz.near";

const projects = getApprovedApplications(POT_ID);

const handleDonateAll = () => {
  const projectIds = projects.map((it) => it.project_id);
  const transactions = [];

  projectIds.forEach((projectId) => {
    const amountIndivisible = Big(parseFloat(AMOUNT)).mul(Big(10).pow(24));
    const args = {};

    args.project_id = projectId;
    args.referrer_id = referrer_id;
    args.bypass_protocol_fee = false;
    args.message = "";

    transactions.push({
      contractName: POT_ID,
      methodName: "donate",
      args,
      deposit: amountIndivisible.toString(),
      gas: "300000000000000",
    });
  });

  Near.call(transactions);
};

return <button onClick={handleDonateAll}>donate</button>;
