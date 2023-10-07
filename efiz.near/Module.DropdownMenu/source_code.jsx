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
              <DropdownMenu.Item key={index} onSelect={item.onSelect}>
                <Item />
              </DropdownMenu.Item>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

return { DropdownMenu };
