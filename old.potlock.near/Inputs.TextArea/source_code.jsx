const label = props.label ?? "Label";
const placeholder = props.placeholder ?? "Placeholder";
const value = props.value ?? "";
const onChange = props.onChange ?? (() => {});
const validate = props.validate ?? (() => {});
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
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  word-wrap: break-word;
  color: #2e2e2e;
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
const Input = styled.textarea`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  width: 100%;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;
return (
  <Container style={props.containerStyle ?? {}}>
    {!props.noLabel && <Label style={props.labelStyle ?? {}}>{label}</Label>}
    <Input
      placeholder={placeholder}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      onBlur={() => validate()}
      rows={props.inputRows ?? 5}
      style={props.inputStyle ?? {}}
      disabled={!!props.disabled}
    />
    <Error style={props.errorStyle ?? {}} className={error ? "show" : ""}>
      {error}
    </Error>
  </Container>
);
