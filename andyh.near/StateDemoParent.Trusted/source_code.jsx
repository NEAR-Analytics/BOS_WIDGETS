// State.init({ parent: 0, child: 0 });

const {
  circle,
  square,
  triangle,
  updateCircle,
  updateSquare,
  updateTriangle,
  id,
} = props;

return (
  <div>
    <Widget
      id={id}
      src="andyh.near/widget/ShapeSet.Trusted"
      props={{
        circle,
        square,
        triangle,
        updateCircle,
        updateSquare,
        updateTriangle,
      }}
    />
  </div>
);
