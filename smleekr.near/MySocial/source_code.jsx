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
        padding: "10px 10px",
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
            padding: "10px",
            border: "solid 2px #bbb",
            backgroundColor: "#fff",
            color: "#0d6efd",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          &lt;&nbsp;&gt;
        </a>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a
            href={`/${account_id}/widget/${title}`}
            style={{
              padding: "0 0 0 10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "1em",
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
              padding: "0 0 0 10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "1em",
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
      <h3>My Widgets: {widgetEntries.length}</h3>
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
