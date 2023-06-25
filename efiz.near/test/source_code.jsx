function onCapture(src) {
  console.log(src);
}

return (
  <>
    <p>{JSON.stringify(src)}</p>
    <Widget
      src="efiz.near/widget/Common.Camera"
      props={{ onCapture: onCapture }}
    />
  </>
);
