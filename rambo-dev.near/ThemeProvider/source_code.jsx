const colors = {
  yellow500: "#FFAF51",
  seablue500: "#51FFEA",
  blue500: "#51B6FF",
  bg1: "#0B0C14",
  bg2: "#23242B",
  black100: "#000000",
  black50: "Black/50",
  white100: "#FFFFFF",
  white50: "White/50",
  error: "#FD2A5C",
  success: "#38C793",
  warning: "#F17B2C",
};

const props = { colors };

const StyledThemeProvider = styled.div`
  display: none;
  visibility: hidden;
  opacity: 0;
`;

function ThemeProvider({ children, props }) {
  return <StyledThemeProvider {...props}>{children}</StyledThemeProvider>;
}

return { ThemeProvider };
