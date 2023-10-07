function DropdownMenu({ Trigger, items }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Trigger />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {items &&
          items.map((item, index) => {
            // const Item = item.Item || <></>;
            return (
              <DropdownMenu.Item key={index} onSelect={item.onSelect}>
                <p>hello</p>
              </DropdownMenu.Item>
            );
          })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
