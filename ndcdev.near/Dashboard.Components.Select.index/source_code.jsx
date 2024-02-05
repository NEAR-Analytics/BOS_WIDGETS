const { Select, Check, TooltipContainer, TooltipText } = VM.require(
  `ndcdev.near/widget/Dashboard.Components.Select.styled`,
);

const { assets } = VM.require(`ndcdev.near/widget/Dashboard.Config`);

if (!Select || !Check || !assets)
  return <Widget src="flashui.near/widget/Loading" />;

const {
  values,
  multiple,
  options,
  onChange,
  defaultValue,
  isOpen,
  onClear,
  containerClass,
  text,
  isTooltipVisible,
  hintText,
  onFilterClick,
  filterIsOpen,
  id,
} = props;

const [open, setOpen] = useState(false);
const selectOptions = defaultValue ? [defaultValue, ...options] : options;
const isOpenDropdown = !!filterIsOpen ? filterIsOpen : open;

const setTitle = () => {
  if (text) return text;

  if (Array.isArray(values)) {
    return values.length ? `${values.length} Selected` : defaultValue;
  } else {
    return values;
  }
};

const TooltipIcon = styled.i`
  &:hover + ${TooltipText} {
    visibility: visible;
    opacity: 1;
    white-space: pre-wrap;
    color: #6b6c75;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    box-shadow: 50px 20px 50px 50px rgba(0, 0, 0, 0.05);
  }
`;

const handleOpen = () => {
  if (onFilterClick) {
    onFilterClick(id);
  } else {
    setOpen(!open);
  }
};

return (
  <Select onClick={() => !multiple && handleOpen()}>
    <div className={containerClass}>
      <div className="selected" onClick={handleOpen}>
        {setTitle()}
        {isTooltipVisible && (
          <TooltipContainer>
            <TooltipIcon className="bi bi-info-circle-fill"></TooltipIcon>
            <TooltipText>{hintText}</TooltipText>
          </TooltipContainer>
        )}
      </div>
      <div className="d-flex gap-2">
        {multiple && values.length > 0 && (
          <i
            className="bi bi-x fs-5 mt-1 mr-1"
            onClick={() => onClear() && setOpen(false)}
          />
        )}
        <i onClick={handleOpen} className="bi bi-chevron-down fs-5 mt-1" />
      </div>
    </div>
    {isOpenDropdown && (
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
