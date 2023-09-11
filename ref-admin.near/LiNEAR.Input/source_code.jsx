const InputWrapper = styled.div`
  width: 100%;
  color: white;
`;

const HorizentalLine = styled.hr`
  height: 1px;
  border: none;
  background: #304352;
  margin-top: 2px;
  margin-bottom: 8px;
`;

const BalanceContainer = styled.div`
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  p {
    margin-bottom: 30px;
  }

  @media (max-width: 770px) {
    font-size: 13px;
  }
`;

const NEARInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .error {
    color: #ff4895;
    font-size: 14px;
    width:70%;
    @media (max-width:900px) {
      width: auto;
      white-space: nowrap;
    }
  }

  @media (max-width: 770px) {
    height: 25px;
  }
`;

const NEARTexture = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

const LogoWithText = styled.div`
  display: flex;
  align-items: center;
`;

const MaxTexture = styled.div`
  font-size: 16px;
  color: #7e8a93;
  cursor: pointer;
  @media (max-width: 770px) {
    font-size: 13px;
  }
`;

return (
  <InputWrapper>
    <NEARInputContainer>
      <input
        style={{
          width: "100%",
          background: "transparent",
          border: "0",
          "font-size": "16px",
          "font-weight": "bold",
          "padding-left": "0px",
          color: props.inputError ? "#ec6868" : "#fff",
          outline: "none",
          "box-shadow": "none",
          "margin-right": "16px",

          "-webkit-appearance": "none",
          "-moz-appearance": "textfield",
        }}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <span className="error">{props.inputError}</span>
      <MaxTexture onClick={props.onClickMax}>Max</MaxTexture>
    </NEARInputContainer>
    <HorizentalLine />
    <BalanceContainer>
      <p>{props.firstIconName} Balance</p>
      <p>{props.balance}</p>
    </BalanceContainer>
  </InputWrapper>
);
