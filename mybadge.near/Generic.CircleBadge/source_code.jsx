const DEFAULT_COLOR = "gray";

const palette = {
  red: {
    background: "#DB504A",
    text: "#222222",
  },
  green: {
    background: "#16AD38",
    text: "#222222",
  },
  blue: {
    background: "#4A73DB",
    text: "#222222",
  },
  gray: {
    background: "#E7ECEF",
    text: "#222222",
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
