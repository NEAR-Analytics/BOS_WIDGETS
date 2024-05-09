const Switcher = styled.div`
  background-color: #373a53;
  border-radius: 8px;
  padding: 5px;
  display: flex;
  @media (max-width: 768px) {
    background-color: transparent;
    border-radius: 0px;
    padding: 0px;
    border-bottom: 1px solid #373a53;
  }
`;
const Item = styled.div`
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  font-weight: 500px;
  color: #787da1;
  transition: 0.5s;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  flex-grow: 1;

  &.active {
    background-color: #c7ff18;
    color: #332c4b;
  }
  @media (max-width: 768px) {
    border-radius: 6px;
    &.active {
      background-color: transparent;
      color: #fff;
      display: flex;
      justify-content: center;
      .switcher-label {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: #c7ff18;
          bottom: 0px;
          left: 0px;
        }
      }
    }
  }
`;
const Types = [
  {
    name: "Stake",
    key: 0,
  },
  {
    name: "Fast Unstake",
    key: 1,
  },
  {
    name: "Delayed Unstake",
    key: 2,
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
        <span className="switcher-label">{type.name}</span>
      </Item>
    ))}
  </Switcher>
);
