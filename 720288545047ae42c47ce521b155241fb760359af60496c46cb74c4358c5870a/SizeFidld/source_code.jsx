State.init({
  theme: Storage.privateGet("theme") || "dark",
});

const dark = {
  name: "dark",
  baseColor: "#fff",
};
const light = {
  name: "light",
  baseColor: "#000",
};

const useTheme = (light, dark) => {
  return state.theme === "light" ? light : dark;
};

const prependSpan = styled.span`
color: ${useTheme(light.baseColor, dark.baseColor)};
`;

const prepend = () => {
  return <prependSpan>Size</prependSpan>;
};

return (
  <Widget
    src="720288545047ae42c47ce521b155241fb760359af60496c46cb74c4358c5870a/widget/input"
    props={{
      prepend: prepend(),
      placeholder: "0.00",
    }}
  />
);
