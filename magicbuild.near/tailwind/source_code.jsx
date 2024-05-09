const children = props.children;

const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

State.init({
  theme: null,
});

const tailwindCss = fetch(tailwindCssUrl).body;

if (!tailwindCss) return "Can't load CSS 😔.";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${tailwindCss}`,
  });
}

const Theme = state.theme;

return <Theme>{children}</Theme>;
