State.init({
  data: "",
  description: "",
});

function onDataInput(event) {
  const data = JSON.parse(event.target.value);
  State.update({
    data: JSON.stringify(data, null, 2),
    description: data.description,
  });
}

function onDescriptionInput(event) {
  const data = JSON.parse(state.data);
  data.description = event.target.value;

  State.update({
    data: JSON.stringify(data, null, 2),
    description: event.target.value,
  });
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const Textarea = styled.textarea`
    border: 1px solid #000;
    padding: 1rem;
    height: 2000px;
`;

return (
  <Container>
    <Textarea
      placeholder="First, paste metadata.json here..."
      value={state.data}
      onInput={onDataInput}
    />
    <Textarea
      placeholder="Then view and edit markdown description here..."
      value={state.description}
      onInput={onDescriptionInput}
    />
  </Container>
);
