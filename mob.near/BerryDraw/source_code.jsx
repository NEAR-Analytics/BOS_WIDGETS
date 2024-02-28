const img = `
..XX.XX..
.X##X##X.
X#######X
X#######X
.X#####X.
..X###X..
...X#X...
....X....
`.trim();

const rgb = (r, g, b) => r * 65536 + g * 256 + b;

function draw() {
  const lines = img.split("\n");
  const w = lines[0].length;
  const h = lines.length;

  const x = Math.floor(Math.random() * (50 - w));
  const y = Math.floor(Math.random() * (50 - h));
  const pixels = [];
  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      const c = lines[i].charAt(j);
      if (c == ".") {
        continue;
      }
      const color =
        c == "#"
          ? rgb(
              Math.floor(Math.random() * 64 + 192),
              Math.floor(Math.random() * 32),
              Math.floor(Math.random() * 32)
            )
          : rgb(
              Math.floor(Math.random() * 32),
              Math.floor(Math.random() * 32),
              Math.floor(Math.random() * 32)
            );
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
        className="btn btn-outline-danger mb-1 flex-grow-1"
        onClick={() => draw()}
      >
        DRAW ❤️
      </button>
    </div>
    <Widget src="mob.near/widget/BerryclubBoard" props={{}} />
  </div>
);
