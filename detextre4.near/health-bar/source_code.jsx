// * STYLES
const HealthBar = styled.div`
  position: var(--position, relative);
  isolation: isolate;
  width: 20px;
  height: 140px;
  background: var(--bg, #000);
  border-radius: 5px;

  div {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border: 2px solid var(--bg, #000);
    border-radius: 5px;
    transition: all .2s ease;
    &.hide { height: 0% }

    &.bar-1 {
      height: 100%;
      background: var(--color1, green);
    }
    &.bar-2 {
      height: 65%;
      background: var(--color2, blue);
    }
    &.bar-3 {
      height: 45%;
      background: var(--color3, yellow);
    }
    &.bar-4 {
      height: 25%;
      background: var(--color4, red);
    }
  }
`;

const healthBars = props.healthBars ?? [1, 2, 3, 4];

return (
  <HealthBar
    className={`health-bar ${props.className ? props.className : ""}`}
    style={{
      "--position": props.position,
      "--bg": props.bg,
      "--color1": props.color1,
      "--color2": props.color2,
      "--color3": props.color3,
      "--color4": props.color4,
    }}
  >
    {/* render health bars based on [Array<number>] */}
    {healthBars.map((health, i) => (
      <div className={`bar-${health} ${health != i + 1 ? "hide" : ""}`} />
    ))}
  </HealthBar>
);
