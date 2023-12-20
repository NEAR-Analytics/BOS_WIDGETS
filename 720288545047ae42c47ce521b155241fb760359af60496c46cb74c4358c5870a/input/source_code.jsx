const { prepend, append, type, getValue, placeholder, inputTextAlign, value } =
  props;

State.init({
  theme: Storage.privateGet("theme") || "dark",
});

const [inputType, setInputType] = useState(type || "number");

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

const onChange = (ev) => {
  getValue && getValue(ev.target.value);
};

const Content = styled.div`
  width: 100%;
  height: 36px;
  padding: 0 8px;
  background-color: ${useTheme(light.inputBgColor, dark.inputBgColor)};
  border: 1px solid ${useTheme(light.inputBorderColor, dark.inputBorderColor)};
  display: flex;
  align-items: center;
  column-gap: 0.2rem;
  border-radius: 6px;
  overflow: hidden;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${useTheme(light.inputBgColor, dark.inputBgColor)};
  flex: 1 1 0%;
  font-size: 14px;
  color: ${useTheme(light.baseColor, dark.baseColor)};
  text-align: ${inputTextAlign ? inputTextAlign : "right"};

  &:focus,
  &:focus-visible {
    border: none;
    outline: -webkit-focus-ring-color auto 0;
  }
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const InputPrepend = styled.div`
  flex: none;
`;
const InputAppend = styled.div`
  flex: none;
`;

return (
  <Content>
    <InputPrepend>{prepend}</InputPrepend>
    <Input
      type={inputType}
      onChange={onChange}
      placeholder={placeholder || ""}
      value={value}
    />
    <InputAppend>{append}</InputAppend>
  </Content>
);
