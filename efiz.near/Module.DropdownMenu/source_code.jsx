function DropdownMenu({ Trigger, items }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Trigger />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items &&
          items.map((item, index) => {
            return (
              <DropdownMenu.Item key={index} onSelect={item.onSelect}>
                {item.Item}
              </DropdownMenu.Item>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
