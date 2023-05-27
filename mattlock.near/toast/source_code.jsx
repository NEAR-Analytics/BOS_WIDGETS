const toast = (toast) => {
  State.update({
    toast,
  });
};

// CSS

const css = `
  .toasted-container {
    width: 100%;
    text-align: center;
    position: absolute;
    top: -32px;
    left: 0;
    z-index: 9999999;
    padding: 16px;
  }
  .toasted {
    position: relative;
    background: black;
    border: 2px solid #FF4444;
    box-shadow: 0 0 8px #FF4444;
    padding: 16px;
    margin: 16px;
    > .close {
      position: absolute;
      top: -9px;
      right: 4px;
      cursor:pointer;
      font-weight: bold;
      font-size: 32px;
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
  });
}

const Theme = props.theme || state.theme;

return (
  <Theme>
    {props.toast && (
      <div class="toasted-container">
        <div class="toasted">
          {state.toast}
          <div class="close" onClick={() => State.update({ toast: null })}>
            ⨉
          </div>
        </div>
      </div>
    )}
  </Theme>
);
