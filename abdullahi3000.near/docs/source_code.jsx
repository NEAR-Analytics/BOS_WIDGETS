if (!props.docId) {
  props.docId = "1Zlr1LDw-eMwMoocH9Y90kmsZCeX5gYVZugFonDpiKhg";
  //   return <div className="">No document ID provided.</div>;
}

const url = `https://docs.google.com/document/d/${props.docId}/edit`;

return (
  <>
    <iframe
      className="container-fluid vh-100 border border-primary rounded"
      src={url}
    />
  </>
);
