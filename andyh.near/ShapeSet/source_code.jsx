return (
  <div className="col">
    <div className="row">
      <Widget
        src="andyh.near/widget/Circle"
        props={{
          color: "#C1200B",
          iconColor: "white",
          icon: "circle",
          radius: 25,
        }}
      />
    </div>
    <div className="row">
      <Widget
        src="andyh.near/widget/Square"
        props={{
          color: "#4A825A",
          iconColor: "white",
          icon: "square",
          length: 50,
        }}
      />
    </div>
    <div className="row">
      <Widget
        src="andyh.near/widget/Triangle"
        props={{
          color: "#0A81D1",
          iconColor: "white",
          icon: "triangle",
          height: 50,
        }}
      />
    </div>
  </div>
);
