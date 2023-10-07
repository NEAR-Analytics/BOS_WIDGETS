function DropdownMenu({ Trigger, items }) {
  const Item = item.Item || (() => {});
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Trigger />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items &&
          items.map((item, index) => {
            return (
              <DropdownMenu.Item key={index}>
                <Item label={item.label} onSelect={item.onSelect} />
              </DropdownMenu.Item>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

return { DropdownMenu };
