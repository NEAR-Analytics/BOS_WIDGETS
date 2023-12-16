const children = props.children;

const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@3.3.6/lib/index.min.js";

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
