State.init({ parent: 0, child: 0 });

const { circle, square, triangle, updateCircle, updateSquare, updateTriangle } =
  props;

return (
  <div>
    <Widget
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
