const account_id = context.accountId;

const data = Social.getr(`${account_id}/widget/*`);
const widgetEntries = data === undefined ? [] : Object.entries(data);

console.log(widgetEntries);

const widgets = widgetEntries.map(([title, content]) => {
  return (
    <div
      style={{ padding: "15px 15px 150px 15px", width: "45%", height: "80%" }}
    >
      <h2
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          wordBreak: "break-all",
        }}
      >
        {title}
      </h2>
      <button
        style={{
          padding: "15px",
          border: "solid 2px #bbb",
          backgroundColor: "#fff",
          color: "#0d6efd",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        &lt;&nbsp;&gt;
      </button>
      <hr />
    </div>
  );
});

return (
  <>
    <h1>
      Your("{account_id}") Widgets: {widgetEntries.length}
    </h1>
    <hr />
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {widgets}
    </div>
  </>
);
