{
  /*
            <Label>Source</Label>
            <Widget
              src="hyperfiles.near/widget/MetadataEditor"
              props={{
                initialMetadata: profile,
                onChange: (newValue) => {
                  console.log("New Source:", newValue);
                  setSource(newValue); // Update local state
                  State.update({
                    profile: { ...profile, source: newValue }, // Update external state
                  });
                },
                value: source,
                options: {
                  source: {
                    sourcePattern: "*/ source;
  /*",
                    placeholder: "Select a source",
                  },
                },
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Schema</Label>
            <Widget src="hyperfiles.near/widget/schema.array" />
            <Widget
              src="hyperfiles.near/widget/MetadataEditor"
              props={{
                initialMetadata: profile,
                onChange: (newValue) => {
                  console.log("New Schema:", newValue);
                  setSchema(newValue); // Update local state
                  State.update({
                    profile: { ...profile, schema: newValue }, // Update external state
                  });
                },
                value: schema,
                options: {
                  source: {
                    schemaPattern: "*/ schema; /*",
                    placeholder: "Select a schema",
                  },
                },
              }}
            />
            */
}

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const TabContent = styled.div`
  margin-top: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button``;

const adapters = [
  // these can come from the user (or app) settings
  // {
  //   title: "Local Storage",
  //   value: "everycanvas.near/widget/adapter.local_storage",
  //   saveRef: false
  // },
  // {
  //   title: "SocialDB",
  //   value: "everycanvas.near/widget/adapter.social",
  // },
  {
    title: "IPFS",
    value: "hyperfiles.near/widget/adapter.ipfs",
  },
  {
    title: "GitHub",
    value: "hyperfiles.near/widget/adapter.github",
  },
  // {
  //   title: "Obsidian",
  //   value: "hack.near/widget/adapter.obsidian",
  // },
  // {
  //   title: "Tldraw",
  //   value: "hack.near/widget/adapter.tldraw",
  // },
];

const defaultAdapter = adapters[0];

const { creatorId } = props;

const [json, setJson] = useState(props.data ?? "");
const [source, setSource] = useState(props.source ?? "");
const [adapter, setAdapter] = useState(defaultAdapter.value ?? "");
const [reference, setReference] = useState(undefined);
const [filename, setFilename] = useState(props.filename ?? "");
const [activeTab, setActiveTab] = useState("data");
const [name, setName] = useState(props.name ?? "");
const [description, setDescription] = useState(props.description ?? "");

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const handleCreate = () => {
  const isCreator = context.accountId === creatorId;

  // load in the state.adapter (modules for IPFS, Arweave, Ceramic, Verida, On Machina... )
  const { create } = VM.require(adapter) || (() => {});
  if (create) {
    // store the data somewhere, based on the adapter
    create(json).then((reference) => {
      // now we have a reference to the data
      // we need to name it... are we the original creator or are we forking? We don't want to overwrite any of the users custom (or maybe we do!)
      const thingId = filename ?? generateUID();

      const hyperfile = {
        [props.type]: {
          // which we store in the social contract
          [thingId]: {
            "": JSON.stringify({
              fileformat: `${props.type}.${source}`,
              source: source,
              adapter: adapter,
              reference: reference,
            }),
            metadata: {
              name: name,
              description: description,
              type: props.type,
            },
          },
        },
      };

      if (creatorId !== context.accountId) {
        // handle request merge
        hyperfile.index = {
          notify: JSON.stringify({
            key: creatorId,
            value: {
              type: "request",
              data: {
                type: "merge",
                upstream: `${creatorId}/${props.type}/${props.filename}`,
                origin: `${context.accountId}/${props.type}/${thingId}`,
              },
            },
          }),
        };
        hyperfile[props.type][thingId].metadata = {
          ...hyperfile[props.type][thingId].metadata,
          upstream: `${creatorId}/${props.type}/${props.filename}`,
        };
        // I want to make a request to merge
        // set upstream and downstream
      }

      // sometimes we're not logged in, so it doesn't do anything!
      Social.set(hyperfile, { force: true });
    });
  }
};

function parseAdapter(code) {
  let match;
  const functions = [];
  const functionRegex = /function\s+(\w+)\s*\(([^)]*)\)\s*{([\s\S]*?)\n}/g;

  while ((match = functionRegex.exec(code)) !== null) {
    const [_, functionName, params, content] = match;
    functions.push({ functionName, params, content });
  }

  return functions.map((func, index) => (
    <FormGroup key={index}>
      <Label>{func.functionName}</Label>
      <textarea
        className="form-control"
        style={{ width: "100%", height: "100%" }}
        value={func.content.trim()}
        disabled
      />
    </FormGroup>
  ));
}

const [rawAdapter, setRawAdapter] = useState(null);

useEffect(() => {
  if (adapter) {
    const module = VM.require(adapter);
    if (module) {
      const { source } = module;
      setRawAdapter(source); // Assuming 'source' contains the raw JS code of the adapter
    }
  }
}, [adapter]);

return (
  <div className="row">
    <div className="col">
      <div className="p-3 border bg-light">
        <Form>
          <h3>Data</h3>
          <FormGroup>
            <Widget src="hyperfiles.near/widget/schema.select" />
          </FormGroup>
          <FormGroup>
            <Label>Raw Data</Label>
            <textarea
              className="form-control"
              style={{ width: "100%", height: "400px" }}
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
            />
          </FormGroup>
        </Form>
      </div>
    </div>
    <div className="col">
      <div className="p-3 border bg-light">
        <Form>
          <h3>Storage</h3>
          <FormGroup>
            <Label>Adapter</Label>
            <Select
              value={adapter}
              onChange={(e) => setAdapter(e.target.value)}
            >
              {adapters.map((o) => (
                <option value={o.value}>{o.title}</option>
              ))}
            </Select>
          </FormGroup>
          {rawAdapter && <>{parseAdapter(rawAdapter)}</>}

          {adapter === "hyperfiles.near/widget/adapter.ipfs" && (
            <Widget src="everycanvas.near/widget/adapter.ipfs"></Widget>
          )}
          {adapter === "hyperfiles.near/widget/adapter.github" && (
            <Widget
              src="flowscience.near/widget/GitHubSearchSelect"
              onSelectRepository={handleSelectRepository}
            ></Widget>
          )}
        </Form>
      </div>
    </div>
    <div className="col">
      <div className="p-3 border bg-light">
        <Form>
          <Button
            onClick={handleCreate}
            disabled={!adapter || !schema || !source || !rawData}
          >
            create reference
          </Button>
          {hyperfile !== "" && (
            <>
              <FormGroup>
                <textarea
                  className="form-control"
                  value={hyperfile}
                  disabled
                  style={{ width: "100%", height: "400px" }}
                />
              </FormGroup>
              <Button
                onClick={() =>
                  Social.set(JSON.parse(hyperfile), {
                    force: true,
                  })
                }
              >
                save
              </Button>
            </>
          )}
        </Form>
      </div>
    </div>
  </div>
);
