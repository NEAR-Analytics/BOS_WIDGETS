const { getValue, placeholder, contractSymbol, coinPrice, value } = props;

State.init({
  theme: Storage.privateGet("theme") || "dark",
});

const dark = {
  name: "dark",
  baseColor: "#fff",
  appendBgColor: "#323232",
};
const light = {
  name: "light",
  baseColor: "#000",
  appendBgColor: "#eeefef",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const prependSpan = styled.span`
  color: ${useTheme(light.baseColor, dark.baseColor)};
`;

const appendDiv = styled.div`
  color: ${useTheme(light.baseColor, dark.baseColor)};
  height: 26px;
  min-width: 50px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${useTheme(light.appendBgColor, dark.appendBgColor)};
`;
const appendUl = styled.ul`
  display: flex;
  column-gap: 0.25rem;
  width: 100%;
  height: 100%;
  padding-left: 2px;
  padding-right: 2px;
  list-style: none;
  align-items: center;
  justify-content: center;
  .coin-li {
    height: 20px;
    font-size: 12px;
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
      background-color: #617168;
      color: #fff;
    }
  }
`;

const prepend = () => {
  return <prependSpan>Size</prependSpan>;
};

const getInputValue = (val) => {
  getValue && getValue(val);
};

const append = () => {
  const contact = contractSymbol || ["BTC"];
  return (
    <appendDiv>
      <appendUl>
        {contact.map((item, index) => (
          <li className="coin-li" key={index}>
            {item}
          </li>
        ))}
      </appendUl>
    </appendDiv>
  );
};

return (
  <Widget
    src="720288545047ae42c47ce521b155241fb760359af60496c46cb74c4358c5870a/widget/input"
    props={{
      prepend: prepend(),
      append: append(),
      placeholder: placeholder || "0.00",
      getValue: getInputValue,
      value: value,
    }}
  />
);
