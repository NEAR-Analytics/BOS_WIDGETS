// const { buttonStatus } = state;
Storage.get("buttonStatus");
console.log("000000000000-test2组件更新了");
return (
  <div>
    <button
      onClick={() => {
        const latestStatus = Math.random();
        console.log("000000000-latestStatus", latestStatus);
        // State.update({
        //   buttonStatus: latestStatus,
        // });
        Storage.set("buttonStatus", "1");
        // console.log("000000000-buttonStatus", latestStatus);
      }}
    >
      click me
    </button>
    Hello World
  </div>
);
