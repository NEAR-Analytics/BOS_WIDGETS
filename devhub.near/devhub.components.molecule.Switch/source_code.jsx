const {
  className,
  currentValue,
  isHidden,
  key,
  onChange,
  options,
  title,
  style,
} = props;

return (
  <div
    className={[
      "btn-group shadow",
      className ?? "",
      isHidden ?? false ? "d-none" : "",
    ].join(" ")}
    style={style ?? {}}
    role="group"
    aria-label={title}
    key={`${key}-${value}`}
    {...{ title }}
  >
    {options.map(({ label, value }) => (
      <>
        <input
          checked={currentValue === value}
          className="btn-check"
          id={`${key}-${value}`}
          name={`${key}-${value}`}
          type="radio"
          {...{ onChange, value }}
        />

        <label
          className={[
            "btn btn-sm",
            currentValue === value ? "btn-dark" : "btn-light",
          ].join(" ")}
          for={`${key}-${value}`}
        >
          {label}
        </label>
      </>
    ))}
  </div>
);
