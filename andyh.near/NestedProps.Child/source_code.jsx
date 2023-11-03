function x(v) {
  console.log(v);
}
function y() {
  console.log(7);
}

const [, , hello] = props.arr;

return (
  <>
    <button
      className="btn btn-primary"
      onClick={() => hello().then(console.log)}
    >
      hello
    </button>
    <button className="btn btn-warning" onClick={() => props.incrementByOne(y)}>
      +1
    </button>
    <button className="btn btn-danger" onClick={() => props.byTen.increment(x)}>
      +10
    </button>
  </>
);
