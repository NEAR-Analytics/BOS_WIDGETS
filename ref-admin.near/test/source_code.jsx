function getData() {
  //   return Social.get("ref-admin.near/myage", "90669335");
  return Social.keys("ref-admin.near/myage", "final", {
    return_type: "History",
  });

  //   "index/tosAccept"
  //   return Social.index("test", "test-key-2");
  //   return Social.keys("ref-admin.near/myname", "final", {
  //     //   History, True, BlockHeight
  //     return_type: "True",
  //   });
}
const data = getData();
console.log("77777777777777777-data", data);
function test() {
  Social.set(
    {
      myage: "9",
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
