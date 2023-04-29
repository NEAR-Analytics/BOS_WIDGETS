function getData() {
  // mob.near/widget/*
  return Social.get("ref-admin.near/widget/test/myname");
}
const data = getData();
console.log("7777777777777777-data", data);
return (
  <div>
    <button
      onClick={() => {
        test();
      }}
    >
      {" "}
      click me to storage data
    </button>
  </div>
);
