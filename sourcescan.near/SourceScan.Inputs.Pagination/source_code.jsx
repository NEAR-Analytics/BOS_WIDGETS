State.init({
  theme: props.theme || "light",
  pages: props.pages || 1,
  selectedPage: props.selectedPage || 1,
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

const PageButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid transparent;
  color: ${useTheme(light.color, dark.color)};
  background-color: ${useTheme(light.button.bg, dark.button.bg)}; 
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${useTheme(light.bg, dark.bg)};
  }
`;

const range = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

const handlePageChange = (x) => {
  console.log(x);
  State.update({
    selectedPage: x + 1,
    from_index: x * state.limit,
  });
  searchContracts();
};

return (
  <>
    {state.pages ? (
      <HStack>
        {range(
          state.pages > 1
            ? state.selectedPage > 2
              ? state.selectedPage - 2
              : 0
            : state.selectedPage - 1,
          state.pages > 1
            ? state.selectedPage + 1 < state.pages
              ? state.selectedPage
              : state.pages - 1
            : state.pages - 1,
          1
        ).map((x, i) => (
          <PageButton onClick={() => props.handlePageChange(x)}>
            {x + 1}
          </PageButton>
        ))}
      </HStack>
    ) : null}
  </>
);
