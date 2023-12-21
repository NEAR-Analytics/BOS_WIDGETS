const InputRateWarp = styled.div`
  width: 100%;
  display: flex;
  height: 20px;
  column-gap: 0.35rem;
  align-items: center;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  .rate-tab-box {
    flex: 1 1 0%;
    display: flex;
    background-color: #252526;
    border-radius: 8px;
    padding-left: 2px;
    padding-right: 2px;
  }
  .rate-tab {
    flex: 1 1 0%;
    text-align: center;
    cursor: pointer;
    &.active {
      background-color: #617168;
      font-weight: 600;
      border-radius: 8px;
    }
  }
  .rate-input-box {
    width: 24%;
    max-width: 100px;
    display: flex;
    align-items: center;
    background-color: #252526;
    border-radius: 8px;
    padding-left: 12px;
    padding-right: 12px;
    overflow: hidden;
    .rate-text {
      flex: none;
    }
    .rate-input {
      flex: 1 1 0%;
      border: 0;
      background-color: transparent;
      width: 100%;
      color: white;
      font-size: 12px;
      font-weight: 600;
      &:focus,
      &:focus-visible {
        border: none;
        outline: -webkit-focus-ring-color auto 0;
      }
      ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;
const tabs = [
  {
    value: "0.1",
    label: "10%",
  },
  {
    value: "0.2",
    label: "20%",
  },
  {
    value: "0.5",
    label: "50%",
  },
  {
    value: "1",
    label: "Max",
  },
];

const { onChange } = props;

State.init({
  tabIndex: -1,
  tabRate: 0,
  inputRate: "",
});

return (
  <InputRateWarp>
    <div class="rate-tab-box">
      {tabs.map((item, index) => (
        <div
          class={`rate-tab ${state.tabIndex === index ? "active" : ""}`}
          onClick={() => {
            State.update({ tabIndex: index, tabRate: item.value });
            onChange && onChange(item.value);
          }}
        >
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div class="rate-input-box">
      <input
        class="rate-input"
        type="number"
        maxlength={3}
        value={state.inputRate}
        onChange={(ev) => {
          let val = ev.target.value && parseInt(ev.target.value);
          ev.target.value = val;
          if (Number(val) > 100) {
            ev.target.value = 100;
          }

          State.update({ inputRate: ev.target.value });
          onChange && ev.target.value && onChange(ev.target.value / 100);
        }}
      />
      <span class="rate-text">%</span>
    </div>
  </InputRateWarp>
);
