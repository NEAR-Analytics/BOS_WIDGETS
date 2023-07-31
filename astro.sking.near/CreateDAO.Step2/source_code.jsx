return (
  <div className="d-flex flex-column gap-4">
    <div>
      <div className="d-flex gap-2 justify-content-between">
        <h2 className="h5 fw-bold">
          <span
            className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
            style={{
              width: "48px",
              height: "48px",
              border: "1px solid #82E299",
            }}
          >
            2
          </span>
          Links and socials{" "}
          <span className="text-black-50 fw-light small">(optional)</span>
        </h2>
        <Widget
          src="nui.sking.near/widget/Input.Button"
          props={{
            children: <i className="bi bi-plus-lg" />,
            variant: "icon info outline",
            size: "lg",
          }}
        />
      </div>
      <p className="text-black-50 fw-light small">
        Looking to grow the DAO members? Add links to allow people to learn more
        about your DAO. You can only add 10 links.
      </p>
    </div>

    <div className="d-flex align-items-center gap-2">
      <Widget
        src="nui.sking.near/widget/Input.Text"
        props={{
          placeholder: "https://",
          size: "lg",
        }}
      />
      <Widget
        src="nui.sking.near/widget/Input.Button"
        props={{
          children: <i className="bi bi-trash" />,
          variant: "icon danger outline",
          size: "lg",
        }}
      />
    </div>
  </div>
);
