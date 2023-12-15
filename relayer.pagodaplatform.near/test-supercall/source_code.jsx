const handleClick = async () => {
  setLoading(true);
  const callArray = convertEdgeNodeToArray(nodeEdges, nodeData);
  console.log({ callArray });
  const axlCall = await axlCallMapping(callArray, userContract);
  console.log({ axlCall });
  const axlCallEncoded = axlCall.map((call) => call.encode());
  const totalFee = axlCall
    .reduce((acc, cur) => acc + +cur.calculateTotalFee(), 0)
    .toString();
  const publicSuperCallAddr = axSuperContract(currentChainId).address;
  const _hash = await aggregate(
    publicSuperCallAddr,
    axlCallEncoded,
    BigInt(totalFee)
  );
  if (_hash) {
    setHash(_hash || "");
    setLoading(false);
    showModal();
  }
  setLoading(false);
};

return (
  <div>
    <input required placeholder="Contract Address" />
  </div>
);
