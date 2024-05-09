const {
  prepend,
  append,
  type,
  onChange,
  placeholder,
  inputTextAlign,
  value,
  showDecimals,
} = props;

State.init({
  theme: Storage.privateGet("theme") || "dark",
  inputValue: value || "",
  inputType: type || "number",
  inputDecimals: showDecimals || 4,
});

useEffect(() => {
  State.update({ inputValue: value, inputDecimals: showDecimals || 4 });
}, [value, showDecimals]);

useEffect(() => {
  onChange && onChange(state.inputValue);
}, [state.inputValue]);

const dark = {
  name: "dark",
  inputBgColor: "#292728",
  inputBorderColor: "#323232",
  baseColor: "#fff",
};
const light = {
  name: "light",
  inputBgColor: "#EEEFEF",
  inputBorderColor: "#DFE1E0",
  baseColor: "#000",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const inputDecimals = (ev) => {
  const value = ev.target.value;
  const digits = value.split(".")[1];
  if (digits && digits.length > state.inputDecimals) {
    const num = Big(value).toFixed(state.inputDecimals);
    const val = Big(num).valueOf();
    return val;
  }
  return value;
};

const StyleWarp = styled.div`
  .input-inner {
    &:focus,
    &:focus-visible {
      border: none;
      outline: -webkit-focus-ring-color auto 0;
    }
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .prepend-append {
    flex: none;
  }
`;

return (
  <StyleWarp>
    <div
      style={{
        width: "100%",
        height: "36px",
        padding: "0 8px",
        backgroundColor: `${useTheme(light.inputBgColor, dark.inputBgColor)}`,
        border: `1px solid ${useTheme(
          light.inputBorderColor,
          dark.inputBorderColor
        )}`,
        display: "flex",
        alignItems: "center",
        columnGap: "0.2rem",
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <div class="prepend-append">{prepend}</div>
      <input
        class="input-inner"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: `${useTheme(light.inputBgColor, dark.inputBgColor)}`,
          flex: `1 1 0%`,
          fontSize: "14px",
          color: `${useTheme(light.baseColor, dark.baseColor)}`,
          textAlign: `${inputTextAlign ? inputTextAlign : "right"}`,
        }}
        type={state.inputType}
        onChange={(ev) => {
          const val = inputDecimals(ev);
          ev.target.value = val;
          State.update({ inputValue: ev.target.value });
        }}
        placeholder={placeholder || ""}
        value={state.inputValue}
      />
      <div class="prepend-append">{append}</div>
    </div>
  </StyleWarp>
);
