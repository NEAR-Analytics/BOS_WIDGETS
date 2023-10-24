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
      src="andyh.near/widget/ShapeSet"
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
