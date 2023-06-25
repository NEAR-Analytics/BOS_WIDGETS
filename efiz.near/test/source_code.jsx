function onCapture(src) {
  State.update({ imgSrc: src });
}

return (
  <>
    {(state.imageSrc && (
      <div>
        <h3>Captured Image:</h3>
        <img src={state.imageSrc} alt="Captured" />
      </div>
    )) || (
      <Widget
        src="efiz.near/widget/Common.Camera"
        props={{ onCapture: onCapture, height: "800px" }}
      />
    )}
  </>
);
