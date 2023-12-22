const LeverageWarp = styled.div`
  background-color: #080d17;
  padding: 10px 0.75rem;
  font-size: 14px;
  .lever-position-warp {
    display: flex;
    align-items: center;
  }
  .lever-info {
    flex: 1 1 0%;
  }
  .position-select-box {
    flex: none;
  }
  .lever-text {
    font-weight: 600;
    color: #fff;
  }
  .lever-num {
    color: #98969e;
    font-weight: 600;
  }
`;

const SelectWarp = styled.div`
  .select-trigger {
    background-color: #323232;
    color: #fff;
    padding: 3px 8px;
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
    border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    line-height: 1;
    height: 26px;
    min-width: 76px;
  }
  .select-icon {
    margin-top: -3px;
  }
  .select-content {
    background-color: #323232;
    color: #fff;
    border-radius: 8px;
    z-index: 10;
  }
  .select-viewport {
    padding: 5px;
  }

  .select-item {
    font-size: 13px;
    line-height: 1;
    min-width: 76px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    position: relative;
    user-select: none;
  }
`;
const SliderWarp = styled.div`
  padding: 0 0.75rem;
  background-color: #080d17;
  .slider-root {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: 100%;
    height: 30px;
  }

  .slider-track {
    position: relative;
    flex-grow: 1;
    background: linear-gradient(270deg, #617168 0%, rgba(97, 113, 104, 0) 100%);
    border-radius: 9999px;
    height: 8px;
  }

  .slider-range {
    position: absolute;
    border-radius: 9999px;
    height: 100%;
  }
  .slider-thumb {
    display: block;
    width: 20px;
    height: 20px;
    background-color: #111114;
    border: 1px solid #617168;
    box-shadow: 0 2px 10px #000;
    border-radius: 10px;
  }
  .lever-min-max {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
    color: #98969e;
  }
`;

const typeList = [
  { name: "Isolated", value: 3 },
  { name: "Cross", value: 4 },
];

const { onTypeChange, onLeverChange, lever, min, max } = props;

State.init({
  levers: [lever || 10],
  lever: lever || 10,
  type: 3,
  min: min || 1,
  max: max || 25,
  typeLabel: "Isolated",
});

useEffect(() => {
  const info = typeList.find((item) => item.value === state.type);
  info && State.update({ typeLabel: info.name });
  onTypeChange && onTypeChange(state.typeLabel);
}, [state.type]);

return (
  <>
    <LeverageWarp>
      <div class="lever-position-warp">
        <div class="lever-info">
          <span class="lever-text">Leverage</span>
          <span class="lever-num">{state.lever}X</span>
        </div>

        <div class="position-select-box">
          <SelectWarp>
            <Select.Root
              value={state.type}
              onValueChange={(val) => {
                State.update({ type: val });
              }}
            >
              <Select.Trigger class="select-trigger">
                <Select.Value aria-label={state.type}>
                  {state.typeLabel}
                </Select.Value>

                <Select.Icon className="select-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M5.29301 8.14981C5.68353 8.54039 6.31674 8.54042 6.70729 8.14987L9.00512 5.85203L8.29862 5.14453L6.00012 7.44454L3.70212 5.14453L2.99512 5.85153L5.29301 8.14981Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Content
                position="popper"
                sideOffset={5}
                className="select-content"
              >
                <Select.Viewport className="select-viewport">
                  <Select.Group>
                    {typeList.map((item) => (
                      <Select.Item
                        className="select-item"
                        value={item.value}
                        key={item.value}
                      >
                        {item.name}
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </SelectWarp>
        </div>
      </div>
    </LeverageWarp>
    <SliderWarp>
      <Slider.Root
        className="slider-root"
        defaultValue={state.levers}
        max={state.max}
        min={state.min}
        step={1}
        aria-label="Volume"
        onValueChange={(val) => {
          onLeverChange && onLeverChange(val);
          State.update({ lever: val });
        }}
      >
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
      <div class="lever-min-max">
        <div class="lever-min">{state.min}X</div>
        <div class="lever-max">{state.max}X</div>
      </div>
    </SliderWarp>
  </>
);
