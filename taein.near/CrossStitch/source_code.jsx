const UnFilledButton = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 15px;
  height: 15px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 15px;
`;

const FilledButton = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 15px;
  height: 15px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 15px;
`;

const SmallFilled = styled.div`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 5px;
  height: 5px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 5px;
`;

const emptyBoard = Array(20).fill(Array(20).fill("x"));

State.init({
  squares: emptyBoard,
  selectedColor: "#FF0000",
});

function handleSquareClick(x, y) {
  let sqr = state.squares.map((line) => line.slice());
  if (sqr[y][x] !== "x") {
    sqr[y][x] = "x";
  } else {
    sqr[y][x] = state.selectedColor;
  }

  State.update({
    squares: sqr,
    selectedColor: state.selectedColor,
  });
}

const borderRow = {
  clear: "both",
  content: "",
  display: "table",
};

function handleOnClearClick() {
  State.update({
    squares: emptyBoard,
    selectedColor: state.selectedColor,
  });
}

function handleOnSaveClick() {
  const time = Date.now();
  Social.set({
    cross_stitch_yj3: {
      [time]: JSON.stringify(state.squares),
    },
  });
}

function changeColor(color) {
  State.update({
    squares: state.squares,
    selectedColor: color,
  });
}

function ColorPicker() {
  const colors = [
    "#000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];

  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => changeColor(color)}
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: color,
            border: color === state.selectedColor ? "3px solid black" : "none",
            margin: "2px",
          }}
        />
      ))}
    </div>
  );
}

function getOtherUserDrawing() {
  const result = Social.keys("*/cross_stitch_yj3/*", "final");
  const accounts = Object.keys(result);
  const drawings = [];
  for (let account of accounts) {
    const keys = Object.keys(result[account]["cross_stitch_yj3"]);
    for (let key of keys) {
      const data = Social.get(`${account}/cross_stitch_yj3/${key}`);
      drawings.push(JSON.parse(data));
    }
  }
  return drawings;
}

function showDrawings() {
  const drawings = getOtherUserDrawing();
  const result = [];
  for (const drawing of drawings) {
    result.push(smallDrawing(drawing));
  }
  return result;
}

function smallDrawing(drawing) {
  return (
    <div style={{ margin: 10 }}>
      {drawing.map((line) => (
        <div style={borderRow}>
          {line.map((sqr) => (
            <SmallFilled style={{ backgroundColor: sqr }} />
          ))}
        </div>
      ))}
    </div>
  );
}

return (
  <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "black",
        }}
      ></div>
      <div style={{ flex: 0, fontSize: 35, fontWeight: "600", marginTop: 20 }}>
        Cross Stitch
      </div>
      <ColorPicker />
      <div style={{ flex: 0, marginTop: 10 }}>
        {state.squares.map((line, y) => (
          <div style={borderRow}>
            {line.map((sqr, x) => (
              <>
                {state.squares[y][x] !== "x" ? (
                  <FilledButton
                    onClick={() => handleSquareClick(x, y)}
                    style={{ backgroundColor: state.squares[y][x] }}
                  ></FilledButton>
                ) : (
                  <UnFilledButton
                    onClick={() => handleSquareClick(x, y)}
                  ></UnFilledButton>
                )}
              </>
            ))}
          </div>
        ))}
      </div>
      <div style={{ flex: 0, display: "flex" }}>
        <div
          style={{ margin: 10, color: "#008CBA", cursor: "pointer" }}
          onClick={handleOnClearClick}
        >
          Clear
        </div>
        <div
          style={{ margin: 10, color: "#008CBA", cursor: "pointer" }}
          onClick={handleOnSaveClick}
        >
          Save
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "black",
          marginBottom: 20,
        }}
      ></div>
      <div
        style={{ flex: 0, fontSize: 20, fontWeight: "600", marginBottom: 10 }}
      >
        Gallery
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", marginBottom: 40 }}>
          {showDrawings()}
        </div>
      </div>
    </div>
  </>
);
