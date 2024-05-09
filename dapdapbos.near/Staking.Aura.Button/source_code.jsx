// type: primary || secondary

const Wrapper = styled.button`
  --white: #fff;
  --primary: #783ae3;
  --secondary: #3a4be3;
  /* --dark:#979ABE */

  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  border: none;
  color: var(--white);
  background-color: ${(props) => {
    console.log(222, props);

    switch (props.type) {
      case "primary":
        return "#783ae3";
      case "secondary":
        return "#3a4be3";
    }
  }};

  border-radius: 8px;
  /* font-size: ${size === "lg" ? "20px" : "16px"}; */
  font-weight: bold;
  overflow: hidden;

  &:disabled {
    opacity: 0.65;
  }
`;

const { type, text, disabled, loading, className, style, onClick } = props;

const handleClick = () => {
  if (loading || disabled) return false;
  if (onClick) onClick();
};

return (
  <Wrapper
    type={type}
    // disabled={disabled}
    onClick={handleClick}
    style={style}
    className={className}
  >
    {loading ? (
      <Widget src="dapdapbos.near/widget/Staking.Aura.Spinner" />
    ) : (
      text
    )}
  </Wrapper>
);
