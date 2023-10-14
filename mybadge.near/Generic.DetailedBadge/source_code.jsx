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
  gap: 6px;
  width: 128px;
  cursor: pointer;

  // ICON
  > div:nth-child(1) {
    > *:nth-child(1) {
      display: initial;
    }
    > *:nth-child(2) {
      display: none;
    }
  }

  // LABEL
  > div:nth-child(2) {
    > *:nth-child(1),
    > *:nth-child(2) {
      display: initial;
    }
    > *:nth-child(3) {
      display: none;
    }
  }

  &:hover {
    // ICON
    > div:nth-child(1) {
      background-color: #fff;
      > *:nth-child(1) {
        display: none;
      }
      > *:nth-child(2) {
        display: initial;
        * {
          fill: ${state.liked ? "#DB504A" : colors.icon};
        }
      }
    }

    // LABEL
    > div:nth-child(2) {
      > *:nth-child(1),
      > *:nth-child(2) {
        display: none;
      }
      > *:nth-child(3) {
        display: initial;
      }
    }
  }
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
`;

const SecondaryText = styled.div`
  color: ${colors.text};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

return (
  <Chip onClick={handleClick}>
    <IconWrapper>
      <Widget src={props.iconSrc} />
      <Widget src={"mybadge.near/widget/Generic.HeartIcon"} />
    </IconWrapper>
    <TextWrapper>
      <PrimaryText>{props.primaryText}</PrimaryText>
      <SecondaryText>{props.secondaryText}</SecondaryText>
      <PrimaryText>
        {state.likes > 1 ? `${state.likes} LIKES` : `${state.likes} LIKE`}
      </PrimaryText>
    </TextWrapper>
  </Chip>
);
