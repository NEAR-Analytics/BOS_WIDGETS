const children = props.children;

const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

const tailwindCss = fetch(tailwindCssUrl).body;

State.init({
  theme: null,
});

if (!tailwindCss) return "tailwind css not load";

if (!state.theme) {
  State.update({
    theme: styled.div`
      ${tailwindCss}
    `,
  });
}
const Theme = state.theme;
return <Theme>{children}</Theme>;
