return (
  <div className="d-flex flex-column gap-4">
    <div>
      <h2 className="h5 fw-bold">
        <span
          className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid #82E299",
          }}
        >
          3
        </span>
        Cool Down Period
      </h2>
      <p className="text-black-50 fw-light small">
        Setup the period between when a proposal is approved and is executed.
      </p>
    </div>

    <Widget
      src="nui.sking.near/widget/Input.Text"
      props={{
        label: "Define Period",
        placeholder: "Enter days",
        size: "lg",
        inputProps: {
          type: "number",
          min: 0,
          max: 3650,
        },
      }}
    />
  </div>
);
