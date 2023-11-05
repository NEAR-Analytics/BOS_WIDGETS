const user = "e8794e6edab6fbd5467dd00ecdf030817330f61e295b91271e3e64d2d46747c8";
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adjust shadow to match your design
    padding: "10px",
    maxWidth: "500px", // Adjust the size as necessary
  },
  title: {
    marginRight: "20px",
    fontWeight: "bold",
  },
  input: {
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "10px 15px",
    marginRight: "10px",
    flexGrow: 1, // Input will grow to fill available space
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#007bff", // Use brand color for the button
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

return (
  <div style={styles.container}>
    <div style={styles.title}>Keep updated</div>
    <input
      type="email"
      placeholder="Enter your email"
      style={styles.input}
      value={"kamenets@hotmail.fr"}
    />
    <Widget
      src={`${user}/widget/button_general`}
      props={{ title: "Press kit", startup: "Logo" }}
    />
  </div>
);
