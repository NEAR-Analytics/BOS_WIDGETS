const cardStyles = {
  container: {
    display: "flex",
    height: "10%",
    width: "15%",
    boxShadow: "0 0 4px 1px black",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    padding: "1em",
  },
  userName: {
    color: "#9AA2AC",
    fontSize: 10,
  },
  startup: {
    alignItems: "left",
    color: "#27292C",
    fontSize: 20,
    fontFamily: "Sora",
    lineHeight: 48,
    wordWrap: "break-word",
    marginTop: "20%",
  },
};
return (
  <>
    <div style={cardStyles.container}>
      <p style={cardStyles.userName}>{props.title}</p>
      <div style={cardStyles.startup}>
        <p>{props.startup}</p>
      </div>
    </div>
  </>
);
