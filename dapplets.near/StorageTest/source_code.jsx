const storeValue = () => {
  const date = Date.now();
  Storage.set("time_now", date);
};

const time = Storage.get("time_now");

console.log({ time });

return (
  <>
    <p> Time Stored: {time} </p>
    <button
      onClick={storeValue}
      style={{ backgroundColor: !time ? "#f00" : undefined }}
    >
      Store Date.now()
    </button>
  </>
);
