const tailwindCssUrl =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css";

State.init({
  theme: null,
});

const tailwindCss = fetch(tailwindCssUrl).body;
if (!tailwindCss) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${tailwindCss}`,
  });
}

const Theme = state.theme;

const Main = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:30px;
  @media screen and (max-width:768px){
    flex-direction:column;
  }
  .button-54 {
    margin-bottom: 2.5rem;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  @media screen and (max-width:768px){
    margin-bottom:10px;
  }
}

.button-54:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

@media (min-width: 768px) {
  
  .button-54 {
    padding: 0.25em 0.75em;
  }
}
@supports (-webkit-appearance: none) or (-moz-appearance: none) {
    .checkbox-wrapper-14 input[type=checkbox] {
      --active: #275EFE;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, .3);
      --border: #BBC1E1;
      --border-hover: #275EFE;
      --background: #fff;
      --disabled: #F6F8FF;
      --disabled-inner: #E1E6F9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      margin-bottom: 2.5rem;
      @media screen and (max-width:768px){
        display:none;
      }
    }
    .checkbox-wrapper-14 input[type=checkbox]:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
    }
    .checkbox-wrapper-14 input[type=checkbox]:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    .checkbox-wrapper-14 input[type=checkbox]:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
    }
    .checkbox-wrapper-14 input[type=checkbox]:disabled:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }
    .checkbox-wrapper-14 input[type=checkbox]:disabled + label {
      cursor: not-allowed;
    }
    .checkbox-wrapper-14 input[type=checkbox]:hover:not(:checked):not(:disabled) {
      --bc: var(--border-hover);
    }
    .checkbox-wrapper-14 input[type=checkbox]:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    .checkbox-wrapper-14 input[type=checkbox]:not(.switch) {
      width: 21px;
    }
    .checkbox-wrapper-14 input[type=checkbox]:not(.switch):after {
      opacity: var(--o, 0);
    }
    .checkbox-wrapper-14 input[type=checkbox]:not(.switch):checked {
      --o: 1;
    }
    .checkbox-wrapper-14 input[type=checkbox] + label {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-left: 4px;
    }

    .checkbox-wrapper-14 input[type=checkbox]:not(.switch) {
      border-radius: 7px;
    }
    .checkbox-wrapper-14 input[type=checkbox]:not(.switch):after {
      width: 5px;
      height: 9px;
      border: 2px solid var(--active-inner);
      border-top: 0;
      border-left: 0;
      left: 7px;
      top: 4px;
      transform: rotate(var(--r, 20deg));
    }
    .checkbox-wrapper-14 input[type=checkbox]:not(.switch):checked {
      --r: 43deg;
    }
    .checkbox-wrapper-14 input[type=checkbox].switch {
      width: 38px;
      border-radius: 11px;
    }
    .checkbox-wrapper-14 input[type=checkbox].switch:after {
      left: 2px;
      top: 2px;
      border-radius: 50%;
      width: 17px;
      height: 17px;
      background: var(--ab, var(--border));
      transform: translateX(var(--x, 0));
    }
    .checkbox-wrapper-14 input[type=checkbox].switch:checked {
      --ab: var(--active-inner);
      --x: 17px;
    }
    .checkbox-wrapper-14 input[type=checkbox].switch:disabled:not(:checked):after {
      opacity: 0.6;
    }
  }

  .checkbox-wrapper-14 * {
    box-sizing: inherit;
  }
  .checkbox-wrapper-14 *:before,
  .checkbox-wrapper-14 *:after {
    box-sizing: inherit;
  }
  .button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-bottom: 2.5rem;
  @media screen and (max-width:768px){
    display:none;
  }
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
`;

return (
  <Theme>
    <div class="flex overflow-hidden" style={{ height: "120vh" }}>
      <Widget src="louisdevzz.near/widget/openai.sidetab" />
      <div class="relative flex-1 overflow-hidden">
        <Widget src="louisdevzz.near/widget/openai.header" />
        <div class="code-preview-wrapper px-2">
          <div class="code-preview flex border-l border-r border-gray-300">
            <div
              class="code-responsive-wrapper w-full overflow-auto"
              style={{ height: "60vh" }}
            >
              <div class="flex h-full items-center bg-background" tabindex="0">
                <div class="relative mx-auto h-64 w-96  rounded-lg bg-white p-4 text-center text-zinc-600 shadow-lg dark:bg-zinc-800">
                  <Main>
                    <div>
                      <button class="button-54" role="button">
                        Button
                      </button>
                    </div>
                    <div>
                      <div class="checkbox-wrapper-14">
                        <input id="s1-14" type="checkbox" class="switch" />
                      </div>
                    </div>
                    <div>
                      <button class="button-85" role="button">
                        Button
                      </button>
                    </div>
                  </Main>
                  <div class="mt-2 text-xl">Please enter prompt.</div>
                  <div class="mt-2 text-sm">
                    You can also just explain what you want in the text box
                    below.
                  </div>
                  <div class="absolute inset-0 h-full w-full rounded-lg border-2 border-dashed border-zinc-400 bg-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Widget src="louisdevzz.near/widget/openai.footer" />
      </div>
    </div>
  </Theme>
);
