if (!props.docId) {
  props.docId = "1id_f8nkc8skMyrqfnecW6TOI8Q9r7dIy";
}

const url = `https://drive.google.com/file/d/${props.docId}/preview`;

return (
  <div
    className="container-fluid d-flex flex-column justify-content-center align-items-center"
    style={{ backgroundColor: "#151718" }}
  >
    {url ? (
      <>
        <iframe
          className="container-fluid vh-100 border border-primary rounded"
          style={{ border: "none", overflowY: "scroll" }} // Keep custom styles that aren't covered by Bootstrap
          frameBorder="0"
          allowFullScreen
          src={url}
        ></iframe>
        <Widget src={`abdullahi3000.near/widget/harmonic.docs`} />
      </>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);
