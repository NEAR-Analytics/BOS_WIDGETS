// ===================== INPUTS ================
const options = props.options;
const onChange = props.onChange;
const value = props.value;
const placeholder = props.placeholder;

// =============================================

const arrowDownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="7"
    viewBox="0 0 11 7"
    fill="none"
  >
    <path
      d="M1 1L5.14645 5.14645C5.34171 5.34171 5.65829 5.34171 5.85355 5.14645L10 1"
      stroke="#656973"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

function handleSelect(index) {
  if (typeof onChange === "function") {
    onChange(index);
  }
}

return (
  <div style={{ width: "100%" }}>
    <div class="dropdown">
      <button
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: "100%",
          display: "flex",
          borderRadius: "8px",
          border: "1px solid #E9EBED",
          background: "#FFF",
          color: "#262930",
        }}
      >
        {options && value >= 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {options[value].label}
              </span>
            </div>
            <div>{arrowDownIcon}</div>
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
      </button>

      <ul
        class="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
        style={{
          width: "100%",
          border: "1px solid #E9EBED",
          background: "#FFF",
          color: "#262930",
          borderRadius: "8px",
          boxShadow: " 8px 8px 16px -4px rgba(16, 24, 40, 0.08)",
          padding: "0px 8px 0px 8px",
        }}
      >
        {options &&
          options.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(index)}
              style={{
                borderBottom:
                  index !== options.length - 1 && "1px solid #E9EBED",
              }}
            >
              <div class="dropdown-item" href="#" style={{ padding: "14px" }}>
                <span
                  style={{ fontSize: "12px", fontWeight: 500, marginLeft: 1 }}
                >
                  {item.label}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  </div>
);
