const [activeTab, setActiveTab] = useState("getAttestation");
const [attestationId, setAttestationId] = useState("");
const [schemaId, setSchemaId] = useState("");
const [attester, setAttester] = useState("");
const [subject, setSubject] = useState("");
const [data, setData] = useState("");

const handleGetAttestation = async () => {
  const result = await EAS.getAttestation(attestationId);
  console.log(result);
};

const handleAttest = async () => {
  const result = await EAS.attest({
    schemaId,
    attester,
    subject,
    data: JSON.parse(data),
  });
  console.log(result);
};

const handleGetSchema = async () => {
  const result = await EAS.getSchema(schemaId);
  console.log(result);
};

const handleRegister = async () => {
  const result = await EAS.register(schemaId, JSON.parse(data));
  console.log(result);
};

return (
  <div>
    <div>
      <button onClick={() => setActiveTab("getAttestation")}>
        Get Attestation
      </button>
      <button onClick={() => setActiveTab("attest")}>Attest</button>
      <button onClick={() => setActiveTab("getSchema")}>Get Schema</button>
      <button onClick={() => setActiveTab("register")}>Register</button>
    </div>
    {activeTab === "getAttestation" && (
      <div>
        <input
          type="text"
          value={attestationId}
          onChange={(e) => setAttestationId(e.target.value)}
          placeholder="Attestation ID"
        />
        <button onClick={handleGetAttestation}>Submit</button>
      </div>
    )}
    {activeTab === "attest" && (
      <div>
        <input
          type="text"
          value={schemaId}
          onChange={(e) => setSchemaId(e.target.value)}
          placeholder="Schema ID"
        />
        <input
          type="text"
          value={attester}
          onChange={(e) => setAttester(e.target.value)}
          placeholder="Attester Address"
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject Address"
        />
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data (JSON format)"
        />
        <button onClick={handleAttest}>Submit</button>
      </div>
    )}
    {activeTab === "getSchema" && (
      <div>
        <input
          type="text"
          value={schemaId}
          onChange={(e) => setSchemaId(e.target.value)}
          placeholder="Schema ID"
        />
        <button onClick={handleGetSchema}>Submit</button>
      </div>
    )}
    {activeTab === "register" && (
      <div>
        <input
          type="text"
          value={schemaId}
          onChange={(e) => setSchemaId(e.target.value)}
          placeholder="Schema ID"
        />
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data (JSON format)"
        />
        <button onClick={handleRegister}>Submit</button>
      </div>
    )}
  </div>
);

return { EasInterface };
