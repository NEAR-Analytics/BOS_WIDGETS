const { Select, Check } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Select.styled`,
);

if (!Select || !Check) <Widget src="flashui.near/widget/Loading" />;

const {
  values,
  multiple,
  options,
  onChange,
  defaultValue,
  isOpen,
  onClear,
  containerClass,
} = props;
const [open, setOpen] = useState(isOpen);
const selectOptions = defaultValue ? [defaultValue, ...options] : options;

const title = () => {
  if (Array.isArray(values)) {
    return values.length ? `${values.length} Selected` : defaultValue;
  } else {
    return values;
  }
};

return (
  <Select onClick={() => setOpen(!open)}>
    <div className={containerClass}>
      <div className="selected">{title()}</div>
      <div className="d-flex gap-2">
        {multiple && values.length > 0 && (
          <i
            className="bi bi-x fs-5 mt-1 mr-1"
            onClick={() => onClear() && setOpen(false)}
          />
        )}
        <i className="bi bi-chevron-down fs-5 mt-1" />
      </div>
    </div>
    {open && (
      <ul>
        {selectOptions.map((option) => (
          <li onClick={() => onChange(option)}>
            {multiple && (
              <Check selected={values.includes(option)}>
                {values.includes(option) && (
                  <i className="mt-1 bi bi-check-lg" />
                )}
              </Check>
            )}
            <div className="truncate">{option}</div>
          </li>
        ))}
      </ul>
    )}
  </Select>
);
