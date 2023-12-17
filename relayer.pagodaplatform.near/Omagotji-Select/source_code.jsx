const font = fetch("https://fonts.cdnfonts.com/css/nunito").body;

const Theme = styled.div`
  ${font}

  a,
  button {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer;
  }

  .nes-btn,
  .nes-select select {
    font-family: "Nunito", sans-serif;
    font-weight: 800;
    border-style: solid;
    border-width: 4px;
  }

  .nes-select::after {
    width: 3px;
    height: 3px;
    color: #212529;
    box-shadow: 3px 3px, 6px 3px, 9px 3px, 12px 3px, 15px 3px, 18px 3px,
      21px 3px, 3px 6px, 6px 6px, 9px 6px, 12px 6px, 15px 6px, 18px 6px,
      21px 6px, 6px 9px, 9px 9px, 12px 9px, 15px 9px, 18px 9px, 6px 12px,
      9px 12px, 12px 12px, 15px 12px, 18px 12px, 9px 15px, 12px 15px, 15px 15px,
      12px 18px;
    position: absolute;
    top: calc(50% - 11px);
    right: 36px;
    pointer-events: none;
    content: "";
  }

  .nes-select select:invalid {
    color: #adafbc !important;
  }

  .nes-select {
    position: relative;
    width: calc(100% - 8px);
    margin: 4px;
  }

  @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    .nes-select select {
      border-image-repeat: space;
    }
  }

  @supports (-moz-appearance: meterbar) {
    .nes-select select {
      border-image-repeat: stretch;
    }
  }

  .nes-select select {
    border-image-slice: 2;
    border-image-width: 2;
    border-image-repeat: stretch;
    border-image-source: url('data:image/svg+xml;utf8,<svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
    border-image-outset: 2;
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
        14 0,
      pointer;
    border-radius: 0;
    outline-color: #e7e7e7;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const Select = styled.select`
  border-image-slice: 2;
  border-image-width: 2;
  border-image-repeat: stretch;
  border-image-source: url('data:image/svg+xml;utf8,<svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
  border-image-outset: 2;
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC)
      14 0,
    pointer;
  border-radius: 0;
  outline-color: #e7e7e7;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

return (
  <Theme>
    <div className="nes-select">
      <Select onChange={props.onChange}>
        <option value disabled selected hidden>
          {props.selectPlaceholder}
        </option>
        {props.options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </Select>
    </div>
  </Theme>
);
