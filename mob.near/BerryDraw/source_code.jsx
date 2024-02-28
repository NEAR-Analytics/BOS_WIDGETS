const img = `
.##.##.
#######
.#####.
..###..
`.trim();

function draw() {
  const lines = img.split("\n");
  const w = lines[0].length;
  const h = lines.length;

  const x = Math.floor(Math.random() * (50 - w));
  const y = Math.floor(Math.random() * (50 - h));
  const color = Math.floor(Math.random() * 192 + 64) << 16;
  const pixels = [];
  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      pixels.push({
        x: x + j,
        y: y + i,
        color,
      });
    }
  }
  Near.call("berryclub.ek.near", "draw", { pixels }, "100000000000000");
}

return (
  <div>
    <div className="d-flex ">
      <button
        className="btn btn-danger mb-1 flex-grow-1"
        onClick={() => draw()}
      >
        DRAW
      </button>
    </div>
    <Widget src="mob.near/widget/BerryclubBoard" props={{}} />
  </div>
);
