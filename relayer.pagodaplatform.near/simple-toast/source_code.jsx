// CSS

const css = `
  .toasted-container {
    isolation: isolate;
    text-align: center;
    position: absolute;
    inset: 0;
    z-index: 2;
    padding: 2em 0;
    border: 1px solid red;
    color: white;
    background: #00000088;
  }
  .toasted {
    position: relative;
    background: black;
    border: 1px solid #BB4444;
    box-shadow: 0 0 16px #884444;
    border-radius: 8px;
    padding: 1em;
    margin: 0 5vw;
    > .close {
      position: absolute;
      top: 0px;
      right: 5px;
      cursor:pointer;
      font-weight: bold;
      font-size: 24px;
      line-height: 20px;
      color: white;
    }
  }
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    box-sizing: border-box;
    font-family: Sans-Serif;
    ${css}`,
    // uncomment to preview toast
    debug: "Debugging sample toast message!",
  });
}

const Theme = props.theme || state.theme;

return (
  <Theme>
    {(props.toast || state.debug) && (
      <div class="toasted-container">
        <div class="toasted">
          {props.toast || state.debug}
          <div
            class="close"
            onClick={
              state.debug ? () => State.update({ debug: false }) : props.onClose
            }
          >
            ⨉
          </div>
        </div>
      </div>
    )}
  </Theme>
);
