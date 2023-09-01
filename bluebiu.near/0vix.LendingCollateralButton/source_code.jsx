const Collateral = styled.div`
  width: 40px;
  height: 20px;
  box-sizing: border-box;
  background-color: #181a27;
  border: 1px solid #332c4b;
  border-radius: 16px;
  cursor: pointer;
  transition: 0.5s;
  &.active {
    background-color: #8b71c2;
  }
`;
const Handler = styled.div`
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-color: #979abe;
  border: 1px solid #332c4b;
  border-radius: 50%;
  transition: 0.5s;
  transform: translateX(0);
  margin-top: 1px;
  &.active {
    transform: translateX(22px);
    background-color: #fff;
    border-color: #523f7b;
  }
`;

const { active, onChange } = props;

return (
  <Collateral
    onClick={() => {
      onChange?.();
    }}
    className={active && "active"}
  >
    <Handler className={active && "active"} />
  </Collateral>
);
