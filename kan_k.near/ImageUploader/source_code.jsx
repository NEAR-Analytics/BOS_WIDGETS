State.init({
  img: null,
});

return (
  <div className="container">
    <div>
      {props.label} <br />
      <IpfsImageUpload image={state.img} />
    </div>
  </div>
);
