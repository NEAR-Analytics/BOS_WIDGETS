// Conditionally initialize state if props.fileType is falsy
props.fileType ||
  initState({
    json: props.data ?? "", // Use props.data as json, defaulting to an empty string if it's nullish
  });

// Helper function to generate a URL for accessing IPFS content
const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

// Function to upload JSON data to IPFS
const UploadJson = () => {
  if (state.json.length) {
    // Check if there is JSON data to upload
    const body = new Blob([state.json], { type: "application/json" }); // Prepare the JSON data as a blob for upload
    console.log(body);
    // Perform an asynchronous fetch request to upload the JSON data
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid; // Extract the CID from the response
      console.log("CID", cid);
      // Update the state with the new file's CID
      State.update({
        file: {
          cid,
        },
      });
    });
  } else {
    // If there is no JSON data, set the file in the state to null
    State.update({
      file: null,
    });
  }
};

// Function to handle changes in the 'name' field
const onChangeName = (name) => {
  State.update({
    name, // Update the state with the new name
  });
};

// Function to generate a unique identifier
function generateUID() {
  return (
    Math.random().toString(16).slice(2) + // Generate a random string
    Date.now().toString(36) + // Add the current timestamp in base 36
    Math.random().toString(16).slice(2) // Add another random string
  );
}

// Determine the thingId, using the name from the state or generating a new UID
const thingId = state.name ?? generateUID();

// Function to handle the creation process
const handleCreate = () => {
  const hyperfile = {
    thing: {
      [thingId]: {
        // Use thingId as the key
        "": JSON.stringify({
          // Convert the file information to a JSON string
          fileformat: props.fileformat,
          source: "IPFS",
          adapter: "hack.near/widget/adapter.ipfs",
          reference: {
            cid: state.file.cid, // Reference the uploaded file's CID
          },
        }),
      },
      metadata: {
        type: props.type, // Set the type from props
      },
    },
  };

  Social.set(hyperfile); // Update the social platform with the new hyperfile data
};

// Render the component
return (
  <>
    <textarea
      className="form-control mb-3"
      rows={5}
      value={state.json}
      onChange={(e) => {
        state.json = e.target.value; // Update the JSON data in the state on change
        State.update();
      }}
    />
    <a type="button" class="btn btn-success" onClick={() => UploadJson()}>
      Upload
    </a>
    <br />
    {state.file && ( // Conditionally render the file section if a file exists in the state
      <div>
        <br />
        Your file:
        <a href={ipfsUrl(state.file.cid)}>{state.file.cid}</a>{" "}
        {/* Link to the uploaded file on IPFS */}
        <br />
        <h5 className="mt-3">Name</h5>
        <input
          type="text"
          value={state.name}
          onChange={(e) => onChangeName(e.target.value)} // Update the name in the state on change
        />
        <button className="btn btn-outline-success mt-3" onClick={handleCreate}>
          Create
        </button>
      </div>
    )}
  </>
);
