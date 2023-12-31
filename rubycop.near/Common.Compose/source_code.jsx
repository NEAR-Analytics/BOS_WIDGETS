const { handleChange, rows, placeholder, type, withoutSeparator, getMentions } =
  props;

State.init({
  text: props.initialText || "",
});

const onSelect = (id) => {
  let text = id;

  if (!withoutSeparator) {
    text = state.text.replace(/[\s]{0,1}@[^\s]*$/, "");
    text = `${text} @${id}`.trim() + " ";
  }
  State.update({ text, showAccountAutocomplete: false });

  if (getMentions) getMentions(id);
  if (handleChange) handleChange(text);
};

const onChange = (text) => {
  const showAccountAutocomplete = withoutSeparator
    ? true
    : /@[\w][^\s]*$/.test(text);
  State.update({ text, showAccountAutocomplete });

  if (handleChange) handleChange(text);
};

const Input = styled.input`
  padding: 8px 10px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #d0d6d9;
  border-radius: 8px;
  font-size: 14px;
  color: #828688;
`;

const Textarea = styled.textarea`
  padding: 8px 10px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #d0d6d9;
  border-radius: 8px;
  font-size: 14px;
  color: #828688;
`;

const InputField = () => {
  return type === "input" ? (
    <Input
      value={state.text || ""}
      onInput={(event) => onChange(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Escape")
          State.update({ showAccountAutocomplete: false });
      }}
      placeholder={placeholder ?? ""}
    />
  ) : (
    <Textarea
      value={state.text || ""}
      onInput={(event) => onChange(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === "Escape")
          State.update({ showAccountAutocomplete: false });
      }}
      rows={rows ?? 5}
      placeholder={placeholder ?? ""}
    />
  );
};

return (
  <>
    <InputField />
    {state.showAccountAutocomplete && (
      <div className="pt-1 w-100 overflow-hidden">
        <Widget
          src="rubycop.near/widget/AccountAutocomplete"
          props={{
            term: withoutSeparator ? state.text : state.text.split("@").pop(),
            onSelect: onSelect,
            onClose: () => State.update({ showAccountAutocomplete: false }),
          }}
        />
      </div>
    )}
  </>
);
