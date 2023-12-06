const accountId = props.accountId ?? context.accountId;

const claimsData = Near.view("questsmock.near", "get_all_quests");

const claim = Near.view("questsmock.near", "get_quest_id", {
  quest_id: 813740323,
});

return (
  <>
    <div>{JSON.stringify(claimsData)}</div>
    <div>{JSON.stringify(claim)}</div>
  </>
);
