const handleClick = async () => {
  setLoading(true);
  // const callArray = convertEdgeNodeToArray(nodeEdges, nodeData);
  // console.log({ callArray });
  // const axlCall = await axlCallMapping(callArray, userContract);
  // console.log({ axlCall });

  const axlCall = [
    {
      axlSuperCall: "0x7F83B301e5Faa1d98bD9D4607932dC40D32f4b25",
      callData:
        "0x41304fac000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000",
      chain: "ethereum-2",
      fee: "355180580507613496",
      subCalls: [],
      target: "",
    },
  ];
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

const [first, setfirst] = useState("");
const [payload, setPayload] = useState({
  contractChain: "",
  contractName: "",
  contractFunction: "",
  args: "",
});
useEffect(() => {
  setfirst("hello");
}, []);

return (
  <div>
    <Web3Connect className="bg-white hover:text-red-500" />
    <input
      required
      placeholder="Contract chain"
      onChange={(e) => {
        setPayload((prevInsurance) => ({
          ...prevInsurance,
          contractChain: e.target.value,
        }));
      }}
    />
    <input
      required
      placeholder="Contract name"
      onChange={(e) => {
        setPayload((prevInsurance) => ({
          ...prevInsurance,
          contractName: e.target.value,
        }));
      }}
    />
    <input
      required
      placeholder="Contract function"
      onChange={(e) => {
        setPayload((prevInsurance) => ({
          ...prevInsurance,
          contractFunction: e.target.value,
        }));
      }}
    />
    <input
      required
      placeholder="param"
      onChange={(e) => {
        setPayload((prevInsurance) => ({
          ...prevInsurance,
          args: e.target.value,
        }));
      }}
    />
    {first}
    <button onClick={handleClick}>Start</button>
  </div>
);
