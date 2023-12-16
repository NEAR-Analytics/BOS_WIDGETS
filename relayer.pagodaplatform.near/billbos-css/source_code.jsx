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
        .brand-gradient-green {
            background: rgb(0,200,160);
            background: linear-gradient(0deg, rgba(0,200,160,1) 0%, rgba(0,227,180,1) 63%);
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
            padding-left: 150px;
            padding-right: 150px;
        }
    `,
  });
}
const Theme = state.theme;
return (
  <Theme>
    {children}
    <div className="bg-red-400 container">asd</div>
  </Theme>
);
