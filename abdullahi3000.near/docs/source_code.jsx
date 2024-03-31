if (!props.docId) {
  props.docId = "b3c9ae3826e7425c94b23f9da797f1dd";
  //   return <div className="">No document ID provided.</div>;
}

const url = `https://www.notion.so/${props.docId}?pvs=4`;

return (
  <>
    <iframe
      className="container-fluid vh-100 border border-primary rounded"
      src={url}
    />
  </>
);
