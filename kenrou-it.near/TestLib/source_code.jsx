const { stateUpdate, key, functionName } = props;

if (functionName === "get1") {
  stateUpdate({
    [key]: 1,
  });
}

return <></>;
