const accountId = "ayelen.near";
const sbtsNames = ["fractal.i-am-human.near - class 1"];

console.log("aID: ", accountId);
console.log("sbtsNames: ", sbtsNames);

const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: accountId,
});
console.log("userSBTs: ", userSBTs);

const sbtsData = sbtsNames.map((sbt) => {
  console.log("SBT: ", sbt);
  const data = sbt.split(" - class ");
  console.log("split: ", data);
  return { name: data[0], classNumber: data[1] };
});

console.log("sbtsData: ", sbtsData);

const sbtsFiltered = userSBTs.filter((sbt) => {
  return sbt[0] === sbtsData[0].name;
});

console.log("sbtsFiltered: ", sbtsFiltered);

const result =
  sbtsFiltered[0][1].find((sbt) => {
    console.log(1, "SBT: ", sbt);
    return Number(sbt.metadata["class"]) === Number(sbtsData[0].classNumber);
  }) !== undefined;

console.log("result: ", result);

return <></>;
