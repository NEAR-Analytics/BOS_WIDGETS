const DEFAULT_COLOR = "gray";

const palette = {
  red: {
    iconBackground: "#222222",
    textBackground: "#DB504A",
    text: "#fff",
    icon: "#fff",
  },
  green: {
    iconBackground: "#222222",
    textBackground: "#16AD38",
    text: "#fff",
    icon: "#fff",
  },
  blue: {
    iconBackground: "#222222",
    textBackground: "#4A73DB",
    text: "#fff",
    icon: "#fff",
  },
  gray: {
    iconBackground: "#222222",
    textBackground: "#E7ECEF",
    text: "#222222",
    icon: "#fff",
  },
};

const colors = palette[props.color ?? DEFAULT_COLOR];

const Chip = styled.div`
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
        text-transform: uppercase;
    }
`;

const IconWrapper = styled.div`
    display: flex;
    height: 16px;
    justify-content: center;
    align-items: center;
    padding: 2px;
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
