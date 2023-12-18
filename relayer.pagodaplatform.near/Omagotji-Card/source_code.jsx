const font = fetch("https://fonts.cdnfonts.com/css/nunito").body;

const Theme = styled.div`
  ${font}

  .nes-container.is-rounded {
    border-style: solid;
    border-width: 4px;
  }
  .nes-container {
    font-family: "Nunito", sans-serif;
    font-weight: 800;
    position: relative;
    padding: 1.5rem 2rem;
    border-color: black;
    border-style: solid;
    border-width: 4px;
  }

  .nes-container > :last-child {
    margin-bottom: 0;
  }

  .nes-container.is-centered {
    text-align: center;
  }

  .nes-container.is-right {
    text-align: right;
  }

  .nes-container.with-title > .title {
    display: table;
    padding: 0 0.5rem;
    margin: -1.8rem 0 1rem;
    font-size: 1rem;
    background-color: #fff;
  }

  .nes-container.with-title.is-centered > .title {
    margin: -2rem auto 1rem;
  }

  .nes-container.with-title.is-right > .title {
    margin: -2rem 0 1rem auto;
  }

  .nes-container.is-dark {
    position: relative;
    margin: 4px;
    color: #fff;
    background-color: #212529;
    border-color: white;
  }

  .nes-container.is-dark::after {
    position: absolute;
    top: -7.2px;
    right: -7.2px;
    bottom: -7.2px;
    left: -7.2px;
    z-index: -1;
    content: "";
    background-color: #212529;
  }

  .nes-container.is-dark.with-title > .title {
    color: #fff;
    background-color: #212529;
  }

  .nes-container.is-rounded {
    border-image-slice: 3;
    border-image-width: 3;
    border-image-repeat: stretch;
    border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
    border-image-outset: 2;
    padding: 1rem 1.5rem;
    margin: 4px;
  }

  @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    .nes-container.is-rounded {
      border-image-repeat: space;
    }
  }

  @supports (-moz-appearance: meterbar) {
    .nes-container.is-rounded {
      border-image-repeat: stretch;
    }
  }

  .nes-container.is-rounded.with-title > .title {
    margin-top: -1.5rem;
  }

  .nes-container.is-rounded.with-title.is-centered > .title {
    margin: -1.5rem auto 1rem;
  }

  .nes-container.is-rounded.with-title.is-right > .title {
    margin: -1.5rem 0 1rem auto;
  }

  .nes-container.is-rounded.is-dark {
    border-image-slice: 3;
    border-image-width: 3;
    border-image-repeat: stretch;
    border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(255,255,255)" /></svg>');
    border-image-outset: 0;
  }

  @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    .nes-container.is-rounded.is-dark {
      border-image-repeat: space;
    }
  }

  @supports (-moz-appearance: meterbar) {
    .nes-container.is-rounded.is-dark {
      border-image-repeat: stretch;
    }
  }

  .nes-container.is-rounded.is-dark::after {
    content: none;
  }

  .nes-container.is-rounded.is-dark.with-title > .title {
    margin-top: -1.3rem;
  }

  .nes-container.is-rounded.is-dark.with-title.is-centered > .title {
    margin: -1.3rem auto 1rem;
  }

  .nes-container.is-rounded.is-dark.with-title.is-right > .title {
    margin: -1.3rem 0 1rem auto;
  }
  .nes-container{
    background-color:white;
  }
`;

const Card = styled.div`
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
    <Card className="nes-container is-rounded">
      {props.children ? props.children : ""}
    </Card>
  </Theme>
);
