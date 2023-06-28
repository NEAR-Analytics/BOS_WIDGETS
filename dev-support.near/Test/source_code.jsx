const go = () => {
  const gas = 0;
  const deposit = 1;
  const yoctoNear = 2;
  const res = Near.call(contract, "donate", {}, gas, deposit * yoctoNear);
};

console.log(props);

return (
  <>
    {JSON.stringify(props)}
    <button onClick={go}> GO </button>
  </>
);
