return (
  <button
    style={{
      border: "none",
      background: "none",
      margin: 0,
      padding: 2,
      cursor: "pointer",
    }}
    title="Capybara 1.0"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(props);
    }}
  >
    <Widget src="nikter.near/widget/Capybara" />
  </button>
);
