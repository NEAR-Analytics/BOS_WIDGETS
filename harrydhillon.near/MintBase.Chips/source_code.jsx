return (
  <div
    style={{
      backgroundColor: "white",
      padding: 5,
      paddingLeft: 15,
      paddingRight: 0,
      width: "fit-content",
      borderRadius: 10,
      fontSize: 14,
      justifyContent: "space-between",
      display: "flex",
    }}
  >
    <p style={{ margin: 0, marginRight: 10 }}>{props.label ?? "Label"}</p>
    <div
      style={{
        width: 24,
        marginLeft: 10,
        padding: 0,
        margin: 0,
        backgroundColor: "transparent",
        borderWidth: 0,
        color: "black",
      }}
      onClick={props.onClick}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 36 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </div>
  </div>
);
