const DEFAULT_COLOR = "gray";

const palette = {
  red: {
    iconBackground: "#DB504A",
    textBackground: "#E7ECEF",
    text: "#222",
    icon: "#fff",
  },
  green: {
    iconBackground: "#16AD38",
    textBackground: "#E7ECEF",
    text: "#222",
    icon: "#fff",
  },
  blue: {
    iconBackground: "#4A73DB",
    textBackground: "#E7ECEF",
    text: "#222",
    icon: "#fff",
  },
  gray: {
    iconBackground: "#222",
    textBackground: "#E7ECEF",
    text: "#222",
    icon: "#fff",
  },
};

const colors = palette[props.color ?? DEFAULT_COLOR];

const Chip = styled.div`
    font-family: sans-serif;
    display: flex;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    background: ${colors.textBackground};
    
    span {
        padding: 0 4px;
        color: ${colors.text};
        text-align: center;
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%; /* 10px */
    }
`;

const IconWrapper = styled.div`
    display: flex;
    height: 16px;
    justify-content: center;
    align-items: center;
    padding: 2px 4px;
    background: ${colors.iconBackground};

    * {
        fill: ${colors.icon};
    }
`;

return (
  <Chip>
    <IconWrapper>
      <Widget src={props.iconSrc} />
    </IconWrapper>
    <span>{props.label}</span>
  </Chip>
);
