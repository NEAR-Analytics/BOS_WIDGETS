const children = props.children;
const daisyUiTheme = props.daisyUiTheme || "light";

const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

const daisyUiCssUrl =
  "https://cdn.jsdelivr.net/npm/daisyui@2.6.0/dist/full.css";

State.init({
  theme: null,
});

const tailwindCss = fetch(tailwindCssUrl).body;

const daisyUiCss = fetch(daisyUiCssUrl).body;

if (!tailwindCss || !daisyUiCss) return "Can't load CSS 😔.";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${daisyUiCss}
    ${tailwindCss}
`,
  });
}

const Theme = state.theme;

return (
  <Theme>
    <div data-theme={daisyUiTheme}>{children}</div>
  </Theme>
);
