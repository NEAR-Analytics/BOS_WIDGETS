State.init({ root: 0, parent: 0, child: 0 });

const roots = { red: state.red, green: state.green, blue: state.blue };

return (
  <div className="col">
    {Object.entries(roots).map(([color, colorState], i) => {
      const children = (
        <span style={{ padding: "50% 50%", color: "white" }}>xyz</span>
      );

      return (
        <div className="row" key={i}>
          <div className="col">
            <div className="row">
              <Widget
                src="andyh.near/widget/Circle"
                props={{ radius: 50, color: "#C1200B", children }}
              />
            </div>
            <div className="row">
              <Widget
                src="andyh.near/widget/Circle"
                props={{ radius: 50, color: "red", children }}
              />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
