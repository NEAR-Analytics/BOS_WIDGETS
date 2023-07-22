const pages = [
  {
    label: "SourceScan",
    href: "https://sourcescan.2bb.dev",
  },
  { label: "Contracts", href: null },
];

State.init({
  theme: props.theme || "light",
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

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const NavButton = styled.button`
  border-radius: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid transparent;
  background-color: ${useTheme(light.bg, dark.bg)};
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${useTheme(light.button.bg, dark.button.bg)}; 
  }
`;

return (
  <HStack>
    {pages.map((page) => (
      <NavButton>{page.label}</NavButton>
    ))}
  </HStack>
);
