const {
  getValue,
  placeholder,
  contractSymbol,
  price,
  onChange,
  priceShowDecimals,
  quantityShowDecimals,
  nearId,
} = props;

State.init({
  theme: Storage.privateGet("theme") || "dark",
  inputValue: "",
  activeIndex: 0,
  value: "",
  nearId:
    nearId ||
    "720288545047ae42c47ce521b155241fb760359af60496c46cb74c4358c5870a",
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

const append = () => {
  const contact = contractSymbol || ["BTC", "USD"];
  return (
    <appendDiv>
      <appendUl>
        {contact.map((item, index) => (
          <li
            className={`coin-li ${state.activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => {
              const amount = changeCoin();
              State.update({ activeIndex: index, inputValue: amount });
            }}
          >
            {item}
          </li>
        ))}
      </appendUl>
    </appendDiv>
  );
};

const usdTotal = (val) => {
  const total = Big(val)
    .times(price)
    .toFixed(priceShowDecimals || 2);
  return Big(total).valueOf();
};

const coinQuantity = (val) => {
  const quantity = Big(val)
    .div(price)
    .toFixed(quantityShowDecimals || 4);
  return Big(quantity).valueOf();
};

const changeCoin = () => {
  if (state.value && price) {
    if (state.activeIndex === 0) return usdTotal(state.value);
    else return coinQuantity(state.value);
  }
  return "0";
};

const amountTotal = (val) => {
  if (val && price) {
    if (state.activeIndex === 0) {
      const total = usdTotal(val);
      return total;
    } else {
      const quantity = coinQuantity(val);
      const total = Big(quantity)
        .times(price)
        .toFixed(priceShowDecimals || 2);
      return Big(total).valueOf();
    }
  }
  return "0";
};

const onInputChange = (val) => {
  State.update({ value: val });
  const amount = amountTotal(val);
  onChange && onChange(amount);
};

return (
  <Widget
    src={`${state.nearId}/widget/input`}
    props={{
      prepend: prepend(),
      append: append(),
      placeholder: placeholder || "0.00",
      onChange: onInputChange,
      value: state.inputValue,
    }}
  />
);
