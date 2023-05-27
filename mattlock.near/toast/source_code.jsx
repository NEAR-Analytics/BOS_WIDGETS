// CSS

const css = `
  .toasted-container {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999999;
    padding: 64px 0;
    background: #00000088;
  }
  .toasted {
    position: relative;
    background: black;
    border: 1px solid #BB4444;
    box-shadow: 0 0 16px #884444;
    border-radius: 4px;
    padding: 16px;
    margin: 0 5vw;
    > .close {
      position: absolute;
      top: -5px;
      right: 6px;
      cursor:pointer;
      font-weight: bold;
      font-size: 24px;
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
    //debug: "Debugging sample toast message!",
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
              state.debug ? () => State.update({ debug: false }) : onClose
            }
          >
            ⨉
          </div>
        </div>
      </div>
    )}
  </Theme>
);
