export default function (props) {
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
        src="andyh.near/ShapeSet"
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
}
