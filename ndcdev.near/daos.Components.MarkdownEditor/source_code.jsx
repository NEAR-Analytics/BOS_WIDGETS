const { element, handleChange } = props;

const AutoComplete = styled.div`
  z-index: 5;

  &
    > [data-component="devhub.near/widget/devhub.components.molecule.AccountAutocomplete"] {
    ::before {
      background: none;
    }
    background: white;
    border-radius: 10px;
  }
`;
const [text, setText] = useState(element.value);
const [handler, setHandler] = useState(null);
const [mentionInput, setMentionInput] = useState("");
const [mentionsArray, setMentionsArray] = useState([]);
const [showAccountAutocomplete, setShowAccountAutocomplete] = useState(false);

function handleTextChange(value) {
  const words = value.split(/\s+/);
  const allMentiones = words
    .filter((word) => word.startsWith("@"))
    .map((mention) => mention.slice(1));
  const newMentiones = allMentiones.filter(
    (item) => !mentionsArray.includes(item),
  );

  setText(value);
  setShowAccountAutocomplete(newMentiones?.length > 0);
  setMentionInput(newMentiones?.[0] ?? "");
  setMentionsArray(allMentiones);
}

function handleAutoComplete(id) {
  let currentIndex = 0;
  const updatedText = text.replace(/(?:^|\s)(@[^\s]*)/g, (match) => {
    if (currentIndex === mentionsArray.indexOf(mentionInput)) {
      currentIndex++;
      return ` @${id}`;
    } else {
      currentIndex++;
      return match;
    }
  });

  setHandler("autocompleteSelected");
  setShowAccountAutocomplete(false);
  setText(updatedText);
}

return (
  <>
    <Widget
      src={"devhub.near/widget/devhub.components.molecule.MarkdownEditor"}
      props={{
        data: { handler, content: text },
        onChange: (val) => {
          handleChange(element, val);
          setHandler("update");
          handleTextChange(val);
        },
      }}
    />
    {showAccountAutocomplete && (
      <AutoComplete>
        <Widget
          src="devhub.near/widget/devhub.components.molecule.AccountAutocomplete"
          props={{
            term: mentionInput,
            onSelect: handleAutoComplete,
            onClose: () => setShowAccountAutocomplete(false),
          }}
        />
      </AutoComplete>
    )}
  </>
);
