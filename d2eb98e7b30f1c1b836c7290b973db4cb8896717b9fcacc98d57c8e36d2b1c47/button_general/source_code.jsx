const value = props.value || "no-name button";
const handleButtonClick =
  props.handleButtonClick ||
  (() => (window.location.href = "https://example.com"));

return (
  <button class="btn btn-primary" onClick={handleButtonClick}>
    {value}
  </button>
);
