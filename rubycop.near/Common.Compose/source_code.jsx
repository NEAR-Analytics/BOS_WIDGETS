const { handleChange, rows, placeholder } = props;

State.init({
  text: props.initialText || "",
});

function onSelect(id) {
  let text = value.replace(/[\s]{0,1}@[^\s]*$/, "");
  text = `${text} @${id}`.trim() + " ";
  State.update({ text, showAccountAutocomplete: false });

  handleChange(text);
}

const onChange = (text) => {
  const showAccountAutocomplete = /@[\w][^\s]*$/.test(text);
  State.update({ text, showAccountAutocomplete });

  handleChange(text);
};

const Textarea = styled.textarea`
  padding: 8px 10px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #d0d6d9;
  border-radius: 8px;
  font-size: 14px;
  color: #828688;
`;

return (
  <>
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
    {state.showAccountAutocomplete && (
      <div className="pt-1 w-100 overflow-hidden">
        <Widget
          src="rubycop.near/widget/AccountAutocomplete"
          props={{
            term: state.text.split("@").pop(),
            onSelect,
            onClose: () => State.update({ showAccountAutocomplete: false }),
          }}
        />
      </div>
    )}
  </>
);
