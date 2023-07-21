State.init({
  theme: props.theme || "light",
  value: "",
});

const dark = {
  bg: "#28282b",
  color: "#e6eaee",
  border: "#748094",
  button: {
    bg: "#39393c",
  },
};

const light = {
  bg: "#e3e8ef",
  color: "#4c5566",
  border: "#748094",
  button: {
    bg: "#eef2f6",
  },
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const handleChange = (e) => {
  State.update({ value: e.target.value });
};

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const SearchInput = styled.input`
  border-radius: 5px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid ${useTheme(light.border, dark.border)};
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.bg, dark.bg)}; 
`;

const SearchButton = styled.button`
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid transparent;
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.button.bg, dark.button.bg)}; 
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${useTheme(light.bg, dark.bg)};
  }
`;

return (
  <HStack>
    <SearchInput
      placeholder={"Account ID"}
      value={state.value}
      onChange={handleChange}
      autoFocus
    />
    <SearchButton onClick={() => props.handleSubmit(state.value)}>
      Search
    </SearchButton>
  </HStack>
);
