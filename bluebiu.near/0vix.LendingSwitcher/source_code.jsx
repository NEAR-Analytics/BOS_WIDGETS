const Switcher = styled.div`
  border-radius: 6px;
  padding: 2px;
  display: flex;
  border: 1px solid #332c4b;
  color: #fff;
  width: 440px;
  margin: 20px auto 10px;
  @media (max-width: 640px) {
    padding: 4px;
    background-color: #222436;
    margin: 20px 0px;
    width: 100%;
  }
`;
const Item = styled.div`
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  font-weight: 500px;
  transition: 0.5s;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  flex-grow: 1;
  &.active {
    background-color: #8b71c2;
  }
`;
const Types = [
  {
    name: "Supply",
    key: 0,
  },
  {
    name: "Borrow",
    key: 1,
  },
];
return (
  <Switcher>
    {Types.map((type) => (
      <Item
        key={type.key}
        className={props.type === type.key && "active"}
        onClick={() => {
          props.onChange?.(type.key);
        }}
      >
        {type.name}
      </Item>
    ))}
  </Switcher>
);
