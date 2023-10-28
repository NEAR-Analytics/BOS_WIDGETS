function x() {
  console.log(4);
}

return (
  <>
    <button className="btn btn-warning" onClick={() => props.incrementByOne()}>
      +1
    </button>
    <button className="btn btn-danger" onClick={() => props.byTen.increment(x)}>
      +10
    </button>
  </>
);
