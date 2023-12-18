if (typeof props.onLoadSuccess === "function") {
  if (!state.initialized) {
    props.onLoadSuccess();
    State.update({ initialized: true });
  }
}

State.init({
  initialized: false,
});

return <></>;
