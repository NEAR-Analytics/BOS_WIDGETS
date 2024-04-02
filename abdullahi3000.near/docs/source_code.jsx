if (!props.docId) {
  props.docId = "1id_f8nkc8skMyrqfnecW6TOI8Q9r7dIy";
  //   return <div className="">No document ID provided.</div>;
}

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#151718",
};

const iframeStyles = {
  width: "100%",
  minHeight: "80vh",
  border: "none",
  overflowY: "scroll",
};

const url = `https://drive.google.com/file/d/${props.docId}/preview`;

return (
  <>
    <div style={containerStyles}>
      {url ? (
        <>
          <iframe
            style={iframe}
            className="container-fluid vh-100 border border-primary rounded"
            frameBorder="0"
            allowFullScreen
            src={url}
          />
          <Widget src={`abdullahi3000.near/widget/harmonic.docs`} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  </>
);
