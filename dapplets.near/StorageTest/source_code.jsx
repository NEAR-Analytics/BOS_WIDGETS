const storeValue = () => {
  const date = Date.now();
  Storage.set("time_now", date);
};

return (
  <>
    <p> Time Stored: {Storage.get("time_now")} </p>
    <button onClick={storeValue}>Store Date.now()</button>
  </>
);
