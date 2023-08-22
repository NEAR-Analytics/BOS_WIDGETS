const items = JSON.parse(Storage.get("demo-cart-items") || "null");

return (
  <div className="border">
    <p>Cart: {items.length}</p>
  </div>
);
