const completed = props.percent ? props.percent : 0;
const height = props.height ? props.height : 32;
const Theme = styled.div`
  

  .progress {
    border-style: solid;
    border-width: 4px;
  }

  .progress-bar {
    background-color: ${completed >= 100 ? "#92cc41" : "#f7d51d"};
    border-radius: none !important;
    width: ${completed >= 100 ? 100 : completed}%;
  }

  .progress {
    border-image-slice: 2;
    border-image-width: 2;
    border-image-repeat: stretch;
    border-image-source: url('data:image/svg+xml;utf8,<svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
    border-image-outset: 2;
    width: 100%;
    height: ${height}px;
    margin: 4px;
    color: #212529;
    background-color: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: none !important;
  }
`;

return (
  <Theme>
    <div className="progress nes-progress">
      <div className="progress-bar"></div>
    </div>
  </Theme>
);
