const [decryptSk, setDecryptSk] = useState(null);
// Callback function to handle the private key from PrivateMailBox
const handlePrivateKey = (key) => {
  setDecryptSk(key);
  console.log("DecryptSk:", decryptSk); // Add this line to debug
};
return (
  <div className="p-3 border bg-light">
    {/*<Widget src="hyperbuild.near/widget/tools.ipfsPDF" />*/}
    <Widget
      src="hyperbuild.near/widget/tools.local.index"
      props={{
        onPrivateKeyRetrieved: handlePrivateKey, // Pass the callback to retrieve the private key
      }}
    />
    <hr />
    <h1>Data Explorer</h1>
    <Widget
      src="hyperbuild.near/widget/tools.files.index"
      props={{
        decryptSk,
      }}
    />
  </div>
);
