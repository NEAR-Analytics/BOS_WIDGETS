const { label, iconSrc, color } = props;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

State.init({ liked: false, likes: randomIntFromInterval(0, 100) });

function handleClick() {
  State.update({
    liked: !state.liked,
    likes: state.liked ? state.likes - 1 : state.likes + 1,
  });
}

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

const colors = palette[color ?? DEFAULT_COLOR];

const Chip = styled.div`
  font-family: sans-serif;
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  background: ${colors.textBackground};
  cursor: pointer;

  svg:nth-child(1) {
    display: block;
  }

  svg:nth-child(2) {
    display: none;
  }

  span:nth-child(1) {
    display: block;
  }

  span:nth-child(2) {
    display: none;
  }

  &:hover {
    > div:nth-child(1) {
      background: ${state.liked ? "#fff" : colors.iconBackground};
    }

    svg:nth-child(1) {
      display: none;
    }

    svg:nth-child(2) {
      display: block;
      * {
        fill: ${state.liked ? "#DB504A" : colors.icon};
      }
    }

    span:nth-child(1) {
      display: none;
    }

    span:nth-child(2) {
      display: block;
    }
  }
`;

const LabelText = styled.div`
  padding: 0 4px;
  color: ${colors.text};
  text-align: center;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 10px */
`;

const IconWrapper = styled.div`
  display: flex;
  width: 18px;
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
  <Chip onClick={handleClick}>
    <IconWrapper>
      <Widget src={iconSrc} />
      <Widget src={"mybadge.near/widget/Generic.HeartIcon"} />
    </IconWrapper>
    <LabelText>
      <span>{label}</span>
      <span>{state.likes}</span>
    </LabelText>
  </Chip>
);
