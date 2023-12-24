const { onLoad } = props;

const sender = Ethers.send("eth_requestAccounts", [])[0];

const quest_url = `https://bos-api.delink.one/get-action-by-account?account_id=${sender}&action_network_id=zkEVM&account_info=''`;

const trend_url =
  "https://bos-api.delink.one/get-hot-action?action_network_id=zkEVM";

let myQuestList = [];

let trendList = [];

const resQuest = JSON.parse(fetch(quest_url).body);
console.log("resQuest: ", resQuest);

const resTrend = JSON.parse(fetch(trend_url).body);

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
