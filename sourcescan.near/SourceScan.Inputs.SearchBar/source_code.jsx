State.init({
  theme: props.theme || "light",
  value: "",
});

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const handleChange = (e) => {
  State.update({ value: e.target.value });
};

const SearchInput = styled.input`
  border-radius: 5px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid ${useTheme(light, border, dark.border)};
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)}; 
`;

const SearchButton = styled.button`
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid ${useTheme(light, border, dark.border)};
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)}; 
`;

return (
  <>
    <SearchInput
      placeholder={"Account ID"}
      value={state.value}
      onChange={handleChange}
      autoFocus
    />
    <SearchButton onClick={() => props.handleSubmit(state.value)}>
      Search
    </SearchButton>
  </>
);
