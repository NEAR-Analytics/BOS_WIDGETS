function getData() {
  // mob.near/widget/*
  return Social.get("ref-admin.near/widget/test/myname");
}
// const data = getData();
console.log("7777777777777777-data", data);
function test() {
  Social.set(
    {
      myname: "nature",
    },
    {
      force: true,
      onCommit: () => {
        // State.update({ commitLoading: false });
      },
      onCancel: () => {
        // State.update({ commitLoading: false });
      },
    }
  );
}
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
