const Switcher = styled.div`
  border-radius: 12px;
  display: flex;
  border: 1px solid #2c334b;
  color: #979abe;
  height: 42px;
  background-color: #222436;
  align-items: center;
  padding: 0px 5px;
  margin-bottom: 20px;
`;
const Item = styled.div`
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  font-weight: 500px;
  transition: 0.5s;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  flex-grow: 1;
  &.active {
    background-color: #373a53;
    color: #fff;
  }
`;
const Types = ["Mint", "Redeem"];
return (
  <Switcher>
    {Types.map((type) => (
      <Item
        key={type}
        className={props.type === type && "active"}
        onClick={() => {
          props.onChange?.(type);
        }}
      >
        {type}
      </Item>
    ))}
  </Switcher>
);
