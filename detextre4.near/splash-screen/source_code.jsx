// STYLES
const Wrapper = styled.div`
  position: relative;
  background: #f71b1b;
  border: 10px solid #000;
  border-radius: 20px;
  max-width: 800px;
  min-height: 100vh;
  display: grid;
  place-content: center;
  margin-inline: auto;
  margin-block: 20px;
  overflow: hidden;

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Fantasy;
    color: #ffF;
  }
  
  h1 {
    isolation: isolate;
    display: grid;
    grid-template-areas: "stack";
    place-items: center;
    max-width: var(--width);
    height: min(100vh, var(--height));
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
    position: relative;

    * { z-index: -1 }
  }

  .live {
    position: absolute;
    inset: 0;
    margin-inline: auto;
    top: 20px;
    text-align: center;
    width: max-content;
    height: max-content;
    background: #000;
    padding: 6px 1.5ch 6px 2ch;
    border-radius: 8px;
    border: 1px solid #fff;
    font-size: 20px;
    letter-spacing: .7ch;
  }
  `,
  Bubbles = styled.div`
  grid-area: stack;
  position: absolute;
  top: var(--top);
  left: var(--left);
  width: var(--size, var(--w, 20px));
  height: var(--size, var(--h, 20px));
  background: var(--color, #fff);
  border-radius: var(--br, 50%);
  box-shadow: -2px 4px 12px 2px rgba(0, 0, 0, .4);
`;

// SCRIPT
const CONTRACT_ACCOUNT = "social.near",
  bubbles = [],
  width = 600,
  height = 600;

let socialLive;

// generate random ranged value
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function init() {
  // get near social status
  socialLive = Near.view(CONTRACT_ACCOUNT, "get_status");

  const numBubbles = 20;

  // create bubbles on screen
  for (let i = 0; i < numBubbles; i++) {
    const size = getRandomValue(10, 100),
      bubble = {
        top: getRandomValue(0 - size, height),
        left: getRandomValue(0 - size, width - size),
        size,
        color: getRandomColor(),
      };

    bubbles.push(bubble);
  }
}
init();

// RENDER TEMPLATE
return (
  <Wrapper>
    <h6 className="live">{socialLive}</h6>

    <h1 style={{ "--width": `${width}px`, "--height": `${height}px` }}>
      ¡WELCOME {context.accountId}!
      {bubbles.map((item) => (
        // render list of bubbles as decoration
        <Bubbles
          style={{
            "--top": `${item.top}px`,
            "--left": `${item.left}px`,
            "--size": `${item.size}px`,
            "--color": item.color,
          }}
        />
      ))}
    </h1>
  </Wrapper>
);
