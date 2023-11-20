const Layer = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;
const StyledContainer = styled.div`
  width: 280px;
  height: 129px;
  border: 1px solid #3d363d;
  border-radius: 12px;
  background-color: #131313;
  padding: 20px;
  position: absolute;
  z-index: 20;
  right: -100px;
  top: 100px;

  @media (max-width: 768px) {
    right: 8px;
    top: 64px;
    background: #2b2b2b;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
const Inputs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;
const SlippageActions = styled.div`
  border: 1px solid #3d363d;
  border-radius: 12px;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  @media (max-width: 768px) {
    background-color: #1b1b1b;
  }
`;
const SlippageAction = styled.div`
  padding: 6px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  &.active {
    color: #8e8e8e;
    background-color: #262626;
  }
  @media (max-width: 768px) {
    &.active {
      color: #fff;
      background: #3f3f3f;
    }
  }
`;
const InputWrapper = styled.div`
  width: 103px;
  height: 45px;
  border-radius: 12px;
  border: 1px solid #3d363d;
  background-color: #131313;
  color: #fff;
  display: flex;
  gap: 5px;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  line-height: 44px;
  padding-left: 20px;
  background-color: transparent;
  outline: none;
  width: 68px;
  color: #fff;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

State.init({
  type: props.slippage === "" ? "Auto" : "Custom",
});
const types = ["Auto", "Custom"];

const { slippage, onSetSlippage } = props;

return (
  <>
    <Layer
      onClick={() => {
        props.onClose?.();
      }}
    />
    <StyledContainer>
      <Label>Slippage Setting</Label>
      <Inputs>
        <SlippageActions>
          {types.map((type) => (
            <SlippageAction
              key={type}
              className={state.type === type && "active"}
              onClick={() => {
                State.update({
                  type,
                });
                onSetSlippage(state.type === "Auto" ? "" : "0.5");
              }}
            >
              {type}
            </SlippageAction>
          ))}
        </SlippageActions>
        <InputWrapper>
          <Input
            placeholder="0.5"
            value={slippage}
            onChange={(ev) => {
              onSetSlippage(ev.target.value);
              if (state.type === "Auto") {
                State.update({
                  type: "Custom",
                });
              }
              if (ev.target.value === "") {
                State.update({
                  type: "Auto",
                });
              }
            }}
            type="number"
          />
          <div>%</div>
        </InputWrapper>
      </Inputs>
    </StyledContainer>
  </>
);
