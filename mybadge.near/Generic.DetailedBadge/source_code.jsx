const DEFAULT_COLOR = "gray";

const palette = {
  red: {
    iconBackground: "#fff",
    textBackground: "#DB504A",
    text: "#fff",
    icon: "#DB504A",
  },
  green: {
    iconBackground: "#fff",
    textBackground: "#16AD38",
    text: "#fff",
    icon: "#16AD38",
  },
  blue: {
    iconBackground: "#fff",
    textBackground: "#4A73DB",
    text: "#fff",
    icon: "#4A73DB",
  },
  gray: {
    iconBackground: "#222222",
    textBackground: "#E7ECEF",
    text: "#222222",
    icon: "#fff",
  },
  yellow: {
    iconBackground: "#fff",
    textBackground: "#D8AF21",
    text: "#fff",
    icon: "#D8AF21",
  },
  violet: {
    iconBackground: "#412EBA",
    textBackground: "#fff",
    text: "#222",
    icon: "#fff",
  },
  orange: {
    iconBackground: "#fff",
    textBackground: "#ffb259",
    text: "#222",
    icon: "#222",
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
    height: 32px;
    padding: 0 3px;
    gap: 3px;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.iconBackground};
    width: 28px;
    height: 28px;
    border-radius: 14px;

    * {
        fill: ${colors.icon};
        width: 20px;
        height: 20px;
    }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrimaryText = styled.div`
    color: ${colors.text};
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
`;

const SecondaryText = styled.div`
    color: ${colors.text};
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

return (
  <Chip>
    <IconWrapper>
      <Widget src={props.iconSrc} />
    </IconWrapper>
    <TextWrapper>
      <PrimaryText>{props.primaryText}</PrimaryText>
      <SecondaryText>{props.secondaryText}</SecondaryText>
    </TextWrapper>
  </Chip>
);
