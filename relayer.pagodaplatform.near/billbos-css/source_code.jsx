const children = props.children;

const tw = Storage.get("tailwindCss");

let tailwindCss;
if (!tw) {
  tailwindCss = fetch(
    "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
  ).body;
  Storage.set("tailwindCss", tailwindCss);
} else {
  tailwindCss = tw;
}

const font = fetch("https://fonts.cdnfonts.com/css/mona-sans").body;

State.init({
  theme: null,
});

const loading = (
  <div class="spinner-grow" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
);

if (!tailwindCss || !font) return loading;

if (!state.theme) {
  State.update({
    theme: styled.div`
        ${font}
        ${tailwindCss}
        font-family: 'Mona Sans', sans-serif;
        font-style: normal;
        font-weight: 400;
        .brand-green {
            background-color:#00E3B4;
        }
        .brand-gradient-green {
            background: rgb(0,200,160);
            background: linear-gradient(0deg, rgba(0,200,160,1) 0%, rgba(0,227,180,1) 63%);
        }
        .brand-gradient-green-radial {
            background: rgb(0,227,180);
            background: radial-gradient(circle, rgba(0,227,180,1) 0%, rgba(0,200,160,1) 100%);
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
        .secondary-surface {
            background-color: #EAFFF8;
        }
        .gray-surface {
            background-color: #F7F9F9;
        }
        .web3-connect {
            font-size: 12px;
            font-weight: bold;

            display: grid;
            place-content: center;

            background: #262626;
            border-radius: 5px;
            border: 0;

            color: white;
            transition: all 300ms ease-in-out;
            &:hover {
            background: #262626;
            opacity: 0.5;
            }
            &:active {
            background: #262626 !important;
            }
        }
        .container {
            padding-left: 120px;
            padding-right: 120px;
        }
    `,
  });
}
const Theme = state.theme;
return (
  <>
    <Theme>{children}</Theme>
  </>
);
