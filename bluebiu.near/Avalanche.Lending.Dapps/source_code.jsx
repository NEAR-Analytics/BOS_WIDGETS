const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 30px 0px;
`;
const Label = styled.div`
  width: 42px;
  color: #7c7f96;
`;
const Dapps = styled.div`
  width: calc(100% - 42px);
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Dapp = styled.div`
  height: 42px;
  border-radius: 10px;
  padding: 0px 10px;
  background-color: rgba(53, 55, 73, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #7c7f96;
  min-width: 48px;
  cursor: pointer;
  flex-shrink: 0;
  &.active {
    color: var(--button-text-color);
    background-color: var(--primary-color);
  }
`;
const DappIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const { dapps, currentDapp, onChange } = props;

return (
  <Wrapper>
    <Label>Dapp</Label>
    <Dapps>
      <Dapp
        className={currentDapp === "All" && "active"}
        onClick={() => {
          onChange("All");
        }}
      >
        <span>All</span>
      </Dapp>
      {dapps.map((dapp) => (
        <Dapp
          key={dapp.name}
          className={`${currentDapp === dapp.name && "active"}`}
          onClick={() => {
            onChange(dapp.name);
          }}
        >
          <DappIcon src={dapp.icon} alt={dapp.name} />
          <span>{dapp.name}</span>
        </Dapp>
      ))}
    </Dapps>
  </Wrapper>
);
