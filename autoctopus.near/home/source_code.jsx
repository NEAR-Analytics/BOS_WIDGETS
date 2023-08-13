let logo = (
  <svg width="400" height="200" viewBox="0 0 400 200">
    <text x="10" y="150" font-size="40" font-family="Arial" fill="#B0B0B0">
      <tspan>Aut</tspan>
    </text>

    <circle
      cx="100"
      cy="130"
      r="20"
      fill="none"
      stroke="#B0B0B0"
      stroke-width="4"
    >
      <animate
        attributeName="stroke"
        values="#B0B0B0;#339BFF;#B0B0B0"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </circle>

    <text x="120" y="150" font-size="40" font-family="Courier" fill="#339BFF">
      <tspan>ctopus</tspan>
    </text>
  </svg>
);

const pills = [
  { id: "posts", title: "Introduce" },
  { id: "nfts", title: "Charge" },
  { id: "widget", title: "Profile" },
];

return (
  <div>
    {logo}
    <>
      <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
        {pills.map(({ id, title }, i) => (
          <li className="nav-item" role="presentation" key={i}>
            <button
              className={`nav-link ${i === 0 ? "active" : ""}`}
              id={`pills-${id}-tab`}
              data-bs-toggle="pill"
              data-bs-target={`#pills-${id}`}
              type="button"
              role="tab"
              aria-controls={`pills-${id}`}
              aria-selected={i === 0}
              onClick={() => {
                const key = `load${id}`;
                !state[key] && State.update({ [key]: true });
              }}
            >
              {title}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-posts"
          role="tabpanel"
          aria-labelledby="pills-posts-tab"
        >
          <div className="col-lg-8 mx-auto">
            <Widget src="autoctopus.near/widget/introduce"></Widget>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-nfts"
          role="tabpanel"
          aria-labelledby="pills-nfts-tab"
        >
          {state.loadnfts && (
            <Widget src="autoctopus.near/widget/charge"></Widget>
          )}
        </div>
        <div
          className="tab-pane fade widget"
          id="pills-widget"
          role="tabpanel"
          aria-labelledby="pills-widget-tab"
        >
          {state.loadwidget && (
            <Widget src="autoctopus.near/widget/introduce"></Widget>
          )}
        </div>
      </div>
    </>
  </div>
);
