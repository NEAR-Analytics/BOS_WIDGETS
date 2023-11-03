function x() {
  console.log(3);
}
function y() {
  console.log(7);
}

console.log(props);

return (
  <>
    <button className="btn btn-warning" onClick={() => props.incrementByOne(y)}>
      +1
    </button>
    <button className="btn btn-danger" onClick={() => props.byTen.increment(x)}>
      +10
    </button>
  </>
);
