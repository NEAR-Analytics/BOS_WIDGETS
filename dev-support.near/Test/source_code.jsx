const go = () => {
  const gas = 0;
  const deposit = 1;
  const yoctoNear = 1000000000000000000000000;
  const res = Near.call(contract, "donate", {}, gas, deposit * yoctoNear);
};

return <button onClick={go}> GO </button>;
