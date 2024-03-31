if (!props.docId) {
  props.docId = "15OHRDOitDKqy9nJb2vttezYF9m5wx9m-";
  //   return <div className="">No document ID provided.</div>;
}

const url = `https://drive.google.com/file/d/${props.docId}/view`;
return (
  <>
    <iframe
      className="container-fluid vh-100 border border-primary rounded"
      src={url}
    />
  </>
);
