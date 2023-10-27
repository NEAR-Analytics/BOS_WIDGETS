const { onLoad } = props;

const sender = Ethers.send("eth_requestAccounts", [])[0];

const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);

const quest_url = `https://test-api.dapdap.net/api/action/get-action-by-account?account_id=${sender}&action_network_id=zkEVM&account_info=''`;

const trend_url =
  "https://test-api.dapdap.net/api/action/get-hot-action?action_network_id=zkEVM";

let myQuestList = [];

let trendList = [];

const resQuest = fetch(
  quest_url,
  { headers: { Authorization: AccessKey } }.body
);
console.log("resQuest: ", resQuest);

const resTrend = fetch(
  trend_url,
  { headers: { Authorization: AccessKey } }.body
);

if (Number(resQuest.code) == 0) {
  myQuestList = resQuest.data;
}

if (Number(resTrend.code) == 0) {
  trendList = resTrend.data;
}

onLoad({
  myQuestList,
  trendList,
});

return <div />;
