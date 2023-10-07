function DropdownMenu({ TriggerElement, TriggerChildren, items }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger as={TriggerElement}>
        <TriggerChildren />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items &&
          items.map((item, index) => {
            return (
              <DropdownMenu.Item key={index} onSelect={item.onSelect}>
                {item.Children}
              </DropdownMenu.Item>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
