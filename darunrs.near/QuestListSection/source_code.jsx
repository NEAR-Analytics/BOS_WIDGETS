const count = props.count ?? 0;
const items = props.items ?? [];
const descriptor = props.descriptor ?? "projects";
const renderItem = props.renderItem ?? ((item) => <div>{item}</div>);

return (
  <Container>
    <Heading>
      <div>
        <span>
          <b>{count}</b> {descriptor}
        </span>
      </div>
    </Heading>
    <List>{items.map((item) => renderItem(item))}</List>
  </Container>
);
