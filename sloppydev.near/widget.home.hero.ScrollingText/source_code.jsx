const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const words = props.words;
const Container = styled.div`
  border-radius: 24px !important;
  #animated-text-strip {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow: hidden;
    padding: 0.25rem 0;
    button {
      color: black;
      border-radius: 50rem;
    }
  }
  #animated-text-strip .marquee {
    white-space: nowrap;
    animation: marquee 60s linear infinite;
    animation-direction: ${props.direction ? props.direction : "normal"};
    max-width: none;
  }
  @keyframes marquee {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
  .marquee {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-right: 1rem;
  }
  @media screen and (max-width: 500px) {
    padding: 0.125rem 0;
  }
`;
const handleColor = (color) => {
  switch (color) {
    case "red":
      return "#d6366b";
    case "blue":
      return "#6767da";
    case "orange":
      return "#F26704";
    case "yellow":
      return "#ECA227";
    case "cyan":
      return "#586bdb";
    case "magenta":
      return "magenta";
    case "purple":
      return "#9a4be3";
    case "green":
      return "#63af63";
  }
};
return (
  <Container>
    <div id="animated-text-strip">
      <span class="marquee">
        {words.map((word) => (
          <Button
            style={{
              backgroundColor: `${handleColor(word.Color.toLowerCase())}`,
            }}
            key={word}
            onClick={() => {
              props.handleWordClick(word);
            }}
          >
            {word.Term}
          </Button>
        ))}
      </span>
      <span class="marquee">
        {words.map((word) => (
          <Button
            style={{
              backgroundColor: `${handleColor(word.Color.toLowerCase())}`,
            }}
            key={word + "1"}
            onClick={() => {
              props.handleWordClick(word);
            }}
          >
            {word.Term}
          </Button>
        ))}
      </span>
      <span class="marquee">
        {words.map((word) => (
          <Button
            style={{
              backgroundColor: `${handleColor(word.Color.toLowerCase())}`,
            }}
            key={word + "2"}
            onClick={() => {
              props.handleWordClick(word);
            }}
          >
            {word.Term}
          </Button>
        ))}
      </span>
    </div>
  </Container>
);
