function handleClick() {
  Near.call("app.paywall.near", "buy", {
    content_id: "some_content_id_123",
  });
}

return (
  <div>
    <div>Click to buy content</div>
    <div>
      <button onClick={handleClick}>Send TX</button>
    </div>
  </div>
);
