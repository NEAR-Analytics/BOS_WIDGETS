const DEFAULT_COLOR = "gray";

const palette = {
  red: {
    background: "#DB504A",
    text: "#fff",
  },
  green: {
    background: "#16AD38",
    text: "#fff",
  },
  blue: {
    background: "#4A73DB",
    text: "#fff",
  },
  gray: {
    background: "#E7ECEF",
    text: "#222222",
  },
  orange: {
    background: "#ffb259",
    text: "#222",
  },
  black: {
    background: "#222",
    text: "#fff",
  },
};

const colors = palette[props.color ?? DEFAULT_COLOR];

const IconWrapper = styled.div`
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: ${colors.background};

    * {
        fill: ${colors.text};
    }
`;

return (
  <IconWrapper>
    <Widget src={props.iconSrc} />
  </IconWrapper>
);
