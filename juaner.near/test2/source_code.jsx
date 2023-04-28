const { buttonStatus } = state;
console.log("000000000000-test2组件更新了");
return (
  <div>
    <button
      onClick={() => {
        const latestStatus = !buttonStatus;
        State.update({
          buttonStatus: latestStatus,
        });
        // Storage.set("buttonStatus", latestStatus);
        console.log("000000000-buttonStatus", latestStatus);
      }}
    >
      click me {buttonStatus}
    </button>
    Hello World
  </div>
);
