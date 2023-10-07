function DropdownMenu({ Trigger, items }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Trigger />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items &&
          items.map((item, index) => {
            const Item = item.Item || <></>;
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
