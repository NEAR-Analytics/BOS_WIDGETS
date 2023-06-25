function onCapture(src) {
  State.update({ imgSrc: src });
}

return (
  <>
    {(state.imgSrc && (
      <div>
        <h3>Captured Image:</h3>
        <img src={state.imgSrc} alt="Captured" />
      </div>
    )) || (
      <Widget
        src="efiz.near/widget/Common.Camera"
        props={{ onCapture: onCapture, height: "800px" }}
      />
    )}
  </>
);
