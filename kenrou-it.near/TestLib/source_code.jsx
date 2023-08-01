const { stateUpdate, key, functionName } = props;
console.log(2);
if (functionName === "get1") {
  console.log(3);
  stateUpdate({
    [key]: 1,
  });
}

return <></>;
