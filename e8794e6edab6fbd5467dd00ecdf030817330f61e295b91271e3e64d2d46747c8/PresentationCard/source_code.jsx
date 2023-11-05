// MIT License: https://github.com/linear-protocol/linear-bos-components/blob/main/LICENSE
const cardStyles = {
  container: {
    backgroundColor: "white",
    borderRadius: "4px",
    alignItems: "center",
    textAlign: "center",
    width: "51%",
  },
  title: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  motto: {
    fontSize: "5px",
    color: "#999999",
    paddingBottom: "4px",
  },
  description: {
    fontSize: "4px",
    color: "#999999",
  },
};
return (
  <>
    <div style={cardStyles.container}>
      <div style={cardStyles.title}>{props.title}</div>
      <div style={cardStyles.motto}>{props.motto}</div>
      <div style={cardStyles.description}>{props.description}</div>
    </div>
  </>
);
