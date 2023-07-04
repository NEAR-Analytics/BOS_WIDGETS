const label = props.label ?? "Label";
const choices = props.choices ?? ["a", "b"];
const images = props.images;
const value = props.value ?? "0";
const onChange = props.onChange ?? (() => {});
const type = props.type ?? "single"; // single, multiple
const error = props.error ?? "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.45em;
  width: 100%;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.25em;
  color: #344054;
`;

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.75em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

const hasImage = images;

let Option;
if (hasImage) {
  Option = styled.div`
    margin-bottom: 24px;
    flex: 1;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    background: #fff;
    padding: 4px;
    cursor: pointer;
    border: 2px solid transparent;
    position: relative;
    min-width: 160px;
    max-width: 184px;
    aspect-ratio: 0.85;
    display: flex;
    flex-direction: column;

    h5 {
      font-size: 16px;
      font-weight: 600;
      padding: 6px 16px;
      text-align: center;
      margin: 0;
      padding-left: 8px;
    }

    img {
      width: 100%;
      aspect-ratio: 1;
      margin: 0 auto auto auto;
      max-width: 200px;
      border-radius: 16px;
      background: #eee;
    }

    &.active {
      border-color: #4f46e5;
    }

    input {
      accent-color: #4f46e5;
      margin: 0;
      margin-left: 6px;
    }
  `;
} else {
  Option = styled.div`
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    background: #fff;
    padding: 8px 16px;
    cursor: pointer;
    border: 2px solid transparent;
    display: flex;
    width: 100%;
    gap: 6px;
    align-items: center;

    h5 {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin: 0;
    }

    &.active {
      border-color: #4f46e5;
    }

    input {
      accent-color: #4f46e5;
      margin: 0;
      margin-right: 8px;
    }
  `;
}

const handleChange = (v) => {
  if (type === "single") {
    console.log(v);
    onChange(v);
    return;
  }
  if (type === "multiple") {
    if (value.includes(v)) {
      const new_value = value;
      const index = value.indexOf(v);
      if (index > -1) {
        new_value.splice(index, 1);
      }
      onChange(new_value);
    } else {
      onChange([...value, v]);
    }
    return;
  }
};

return (
  <Container>
    <Label>{label}</Label>
    <div
      className={`d-flex flex-wrap w-100 ${
        !hasImage ? "gap-3 flex-column" : "gap-3"
      }`}
    >
      {choices?.map((v, i) => (
        <Option
          role="button"
          className={value == v || value.includes(v) ? "active" : ""}
          onClick={() => handleChange(v)}
        >
          {hasImage && <img src={images[i]} />}
          <div className="d-flex gap-1 align-items-center">
            <input
              className="form-check-input"
              type={type === "single" ? "radio" : "checkbox"}
              checked={value == v || value.includes(v)}
            />
            <h5>{v}</h5>
          </div>
        </Option>
      ))}
    </div>
    <Error className={error ? "show" : ""}>{error}</Error>
  </Container>
);
