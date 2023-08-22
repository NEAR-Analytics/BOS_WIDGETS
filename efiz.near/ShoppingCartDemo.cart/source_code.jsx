const items = JSON.parse(Storage.get("demo-cart-items") || "null");

return (
  <div className="border">
    <p>Cart: {items.length || 0}</p>
  </div>
);
