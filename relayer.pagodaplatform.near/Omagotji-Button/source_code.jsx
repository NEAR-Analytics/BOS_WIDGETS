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
    border-style: solid;
    border-width: 4px;
  }

  @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    .nes-btn {
      border-image-repeat: space;
    }
  }

  @supports (-moz-appearance: meterbar) {
    .nes-btn {
      border-image-repeat: stretch;
    }
  }

  .nes-btn::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #adafbc;
  }

  .nes-btn:hover {
    color: #212529;
    text-decoration: none;
    background-color: #e7e7e7;
  }

  .nes-btn:hover::after {
    box-shadow: inset -6px -6px #adafbc;
  }

  .nes-btn:active:not(.is-disabled)::after {
    box-shadow: inset 4px 4px #adafbc;
  }

  .nes-btn:focus {
    outline: 0;
  }

  .nes-btn.is-primary {
    color: #fff;
    background-color: #209cee;
  }

  .nes-btn.is-primary::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #006bb3;
  }

  .nes-btn.is-primary:hover {
    color: #fff;
    text-decoration: none;
    background-color: #108de0;
  }

  .nes-btn.is-primary:hover::after {
    box-shadow: inset -6px -6px #006bb3;
  }

  .nes-btn.is-primary:active:not(.is-disabled)::after {
    box-shadow: inset 4px 4px #006bb3;
  }

  .nes-btn.is-primary:focus {
    outline: 0;
  }

  .nes-btn.is-success {
    color: #fff;
    background-color: #92cc41;
  }

  .nes-btn.is-success::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #4aa52e;
  }

  .nes-btn.is-success:hover {
    color: #fff;
    text-decoration: none;
    background-color: #76c442;
  }

  .nes-btn.is-success:hover::after {
    box-shadow: inset -6px -6px #4aa52e;
  }

  .nes-btn.is-success:active:not(.is-disabled)::after {
    box-shadow: inset 4px 4px #4aa52e;
  }

  .nes-btn.is-warning {
    color: #212529;
    background-color: #f7d51d;
  }

  .nes-btn.is-warning::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #e59400;
  }

  .nes-btn.is-warning:hover {
    color: #212529;
    text-decoration: none;
    background-color: #f2c409;
  }

  .nes-btn.is-warning:hover::after {
    box-shadow: inset -6px -6px #e59400;
  }

  .nes-btn.is-warning:active:not(.is-disabled)::after {
    box-shadow: inset 4px 4px #e59400;
  }

  .nes-btn.is-error {
    color: #fff;
    background-color: #ce372b;
  }

  .nes-btn.is-error::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #8c2022;
  }

  .nes-btn.is-error:hover {
    color: #fff;
    text-decoration: none;
    background-color: #e76e55;
  }

  .nes-btn.is-error:hover::after {
    box-shadow: inset -6px -6px #8c2022;
  }

  .nes-btn.is-error:active:not(.is-disabled)::after {
    box-shadow: inset 4px 4px #8c2022;
  }
`;

const Button = styled.button`
  border-image-slice: 2;
  border-image-width: 2;
  border-image-repeat: stretch;
  border-image-source: url('data:image/svg+xml;utf8,<svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
  border-image-outset: 2;
  position: relative;
  display: inline-block;
  padding: 6px 8px;
  margin: 4px;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #212529;
  background-color: #fff;
  font-weight: 700;
`;

return (
  <Theme>
    <Button className={`nes-btn is-${props.color}`}>{props.label}</Button>
  </Theme>
);
