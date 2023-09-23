return (
  <div className="row">
    <div className="col">
      <Widget
        src="andyh.near/widget/Circle"
        props={{
          color: "#C1200B",
          iconColor: "white",
          icon: props.circleIcon || "circle",
          radius: 40,
        }}
      />
    </div>
    <div className="col">
      <Widget
        src="andyh.near/widget/Square"
        props={{
          color: "#4A825A",
          iconColor: "white",
          icon: props.squareIcon || "square",
          length: 80,
        }}
      />
    </div>
    <div className="col">
      <Widget
        src="andyh.near/widget/Triangle"
        props={{
          color: "#0A81D1",
          iconColor: "white",
          icon: props.triangleIcon || "triangle",
          height: 80,
        }}
      />
    </div>
  </div>
);
