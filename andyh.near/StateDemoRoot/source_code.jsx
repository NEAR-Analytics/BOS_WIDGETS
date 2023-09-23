State.init({
  red: { a: 0, b: 0, c: 0 },
  green: { a: 0, b: 0, c: 0 },
  blue: { a: 0, b: 0, c: 0 },
});

const roots = { red: state.red, green: state.green, blue: state.blue };

return (
  <div className="row">
    {Object.entries(roots).map(([color, colorState], i) => {
      const children = (
        <span style={{ padding: "50% 50%", color: "white" }}>xyz</span>
      );

      return (
        <div className="col" key={i}>
          {color === "red" && (
            <Widget
              src="andyh.near/widget/Circle"
              props={{ radius: 50, color: "red", children }}
            />
          )}
        </div>
      );
    })}
  </div>
);
