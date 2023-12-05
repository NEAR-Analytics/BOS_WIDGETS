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
  border-radius: 12px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  padding: 20px;
  position: absolute;
  z-index: 20;
  right: -100px;
  top: 100px;

  @media (max-width: 768px) {
    right: 8px;
    top: 64px;
  }
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #101010;
`;
const Inputs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;
const SlippageActions = styled.div`
  background-color: #ffe6c7;
  border-radius: 8px;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;
const SlippageAction = styled.div`
  padding: 6px;
  border-radius: 6px;
  color: #101010;
  cursor: pointer;
  height: 36px;
  box-sizing: border-box;
  &.active {
    background-color: #fff;
  }
`;
const InputWrapper = styled.div`
  width: 103px;
  height: 45px;
  border-radius: 12px;
  border: 1px solid #473935;
  color: #101010;
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
  color: #101010;
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
