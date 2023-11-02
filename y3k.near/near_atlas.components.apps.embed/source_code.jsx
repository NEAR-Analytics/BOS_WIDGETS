if (!props.docId) {
  props.docId = "1WAYL7Tohgssnta6pBQB0flb37fdtYZxh2l9zrHOeS9Y";
  //   return <div className="">No document ID provided.</div>;
}
const url = `https://docs.google.com/presentation/d/${props.docId}/?embedded=true`;
return (
  <>
    <iframe
      className="container-fluid vh-100 border border-primary rounded"
      src={url}
    />
  </>
);
