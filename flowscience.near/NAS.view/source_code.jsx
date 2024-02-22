const path = props.path; // every piece of data on social contract has a path
const blockHeight = props.blockHeight || "final"; // and a blockHeight (~version)
const options = props.options;

// split the path
const parts = path.split("/");
const creatorId = parts[0];
const [attestationData, setAttestationData] = useState(null);

let type;
let schema;
if (parts.length === 1) {
  if (parts[0].charAt(0) === "#") {
    // hashtag
    type = "hashtag";
  } else {
    // every root of a path is an account
    type = "account";
  }
} else {
  // otherwise the "standard" is the type (widget, post, type, thing...)
  // for thing, we'll extract the actual "Type" later
  type = parts[1];
}

State.init({});

const Container = styled.div`
  border: 1px solid #ccc;
  height: fit-content;
`;

const Content = styled.div`
  padding: 1px;
  min-height: 300px;
`;

useEffect(() => {
  const fetchData = () => {
    const data = Social.getr(path); // Adjust this line according to your data fetching method
    setAttestationData(data);
  };

  fetchData();
}, [path, blockHeight]);

function Thing() {
  console.log(`Type before switch: ${type}`); // Logs the initial type determined from the path
  console.log(`Path before switch: ${path}`);
  // Renders the path according to type
  switch (type) {
    case "thing": {
      // get the thing data
      const thing = JSON.parse(Social.get(path, blockHeight) || "null");
      type = thing.type || null;
      // get the type data
      const typeObj = JSON.parse(Social.get(type, blockHeight) || "null");
      if (typeObj === null) {
        console.log(
          `edge case: thing ${path} had an invalid type: ${thingType}`
        );
      }
      // determine the widget to render this thing (is there a default view?)
      const widgetSrc =
        options?.templateOverride ||
        thing.template?.src ||
        typeObj?.widgets?.view;
      // Template
      return (
        <Widget
          src={widgetSrc}
          props={{ data: thing.data, path, blockHeight }}
        />
      );
    }
    case "post": {
      return (
        <Widget
          src="every.near/widget/every.post.view"
          props={{
            path,
            blockHeight: a.blockHeight,
          }}
        />
      );
    }
    case "widget": {
      return <Widget src={path} props={props} />;
    }
    case "account": {
      return <Widget src="efiz.near/widget/Tree" props={{ rootPath: path }} />;
    }
    case "settings": {
      // Standardize path to {accountId}/settings/**
      parts.splice(2);
      parts.push("**");
      path = parts.join("/");
      return (
        <Widget
          src="efiz.near/widget/Every.Setting"
          props={{ path, blockHeight }}
        />
      );
    }
    case "type": {
      return (
        <Widget
          src="every.near/widget/every.type.create"
          props={{ typeSrc: path }}
        />
      );
    }
    case "hashtag": {
      return (
        <Widget
          src="efiz.near/widget/every.hashtag.view"
          props={{ hashtag: parts[0].substring(1) }}
        />
      );
    }
    case "schema": {
      return (
        <Widget
          src="every.near/widget/every.type.create"
          props={{ typeSrc: path }}
        />
      );
    }
    // Adjusted case for "attestation" to handle and render attestation data correctly
    case "attestation": {
      // Fetch the attestation data directly using the provided path and blockHeight
      console.log(`Path:`, path); // Ensure to log the actual object

      // Assuming attestationData directly contains the data structure you're interested in
      // No need to extract specificAttestation unless the structure necessitates it

      // Here, directly use attestationData to determine how to render
      // For example, if attestationData contains an image IPFS CID
      if (attestationData && attestationData.type === "every.near/type/image") {
        const imageUrl = `https://ipfs.io/ipfs/${attestationData.schema.ipfs_cid}`;
        return (
          <div>
            <p>Recipient ID: {attestationData.recipientId}</p>
            <p>Expire Date: {attestationData.expireDate}</p>
            <p>Expire Time: {attestationData.expireTime}</p>
            <img
              src={imageUrl}
              alt="Attestation Content"
              style={{ maxWidth: "100%" }}
            />
          </div>
        );
      } else {
        // For other types of attestations or if the attestation data structure is different,
        // adjust the rendering logic accordingly
        return <p>Unsupported attestation type or invalid data structure.</p>;
      }
    }

    // DEFAULT case to handle unsupported types
    default:
      console.log(`Unsupported type: ${type}`);
      return <p>The type: {type} is not yet supported.</p>;
  }
}

return (
  <Container id={path}>
    <Content>
      <Thing />
      <pre>{JSON.stringify(Social.getr(path), null, 2)}</pre>
    </Content>
  </Container>
);
