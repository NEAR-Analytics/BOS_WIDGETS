const children = props.children;

const tailwindCssUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css";

const tailwindCss = fetch(tailwindCssUrl).body;

State.init({
  theme: null,
});

if (!tailwindCss) return "tailwind css not load";

if (!state.theme) {
  State.update({
    theme: styled.div`
        ${tailwindCss}
        .brand-green {
            background-color:#00E3B4;
        }
        .brand-dark-green {
            background-color:#00C8A0;
        }
        .primary-text {
            color: #262930;
        }
        .secondary-text {
            color: #656973;
        }
        .tertiary-text {
            color: #A3A3A3;
        }
        .green-text {
            color: #00C8A0;
        }
        .blue-text {
            color: #00B2FF;
        }
        .error-text {
            color: #F6465D;
        }
        .secondary-serface {
            background-color: #EAFFF8;
        }
        .gray-serface {
            background-color: #F7F9F9;
        }
    `,
  });
}
const Theme = state.theme;
return <Theme>{children}</Theme>;
