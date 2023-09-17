const account_id = context.accountId ?? props.accountId;

const data = Social.getr(`${account_id}/widget/*`, "final", {
  subscribe: true,
});

const widgetEntries =
  data === undefined || data === null ? [] : Object.entries(data);

const widgets = widgetEntries.map(([title]) => {
  return (
    <div
      style={{
        padding: "15px 15px 15px 15px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <a
          href={`/near/widget/ComponentDetailsPage?src=${account_id}/widget/${title}`}
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
        </a>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a
            href={`/${account_id}/widget/${title}`}
            style={{
              padding: "0 0 0 15px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "2em",
              fontWeight: "bold",
              color: "#000",
              wordBreak: "break-all",
            }}
          >
            {title}
          </a>
          <a
            href={`/near/widget/ProfilePage?accountId=${account_id}`}
            style={{
              padding: "0 0 0 14px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "1.3em",
              color: "#888",
              wordBreak: "break-all",
            }}
          >
            @{account_id}
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
});

return (
  <>
    <div>
      <h1>Widgets: {widgetEntries.length}</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {widgets}
      </div>
    </div>
  </>
);
