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
  width: 84px;
  height: 16px;
  overflow: hidden;

  &:hover {
    > div:nth-child(1) {
      background: ${state.liked ? "#fff" : colors.iconBackground};
      transition: top 0.3s 0s;
      top: -8px;

      svg:nth-child(1) {
        opacity: 0;
      }

      svg:nth-child(2) {
        display: block;

        * {
          fill: ${state.liked ? "#DB504A" : colors.icon};
        }
      }
    }

    > div:nth-child(2) {
      transition: top 0.3s 0s;
      top: -5px;

      > span:nth-child(1) {
        opacity: 0;
      }
    }
  }
`;

const LabelText = styled.div`
  padding: 0 4px;
  color: ${colors.text};
  text-align: center;
  width: 100%;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 10px */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 11px;
  transition: top 0.3s 1s;

  > span {
    height: 16px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  width: 18px;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  background: ${colors.iconBackground};
  flex-direction: column;
  position: relative;
  top: 8px;
  transition: top 0.3s 1s;

  * {
    fill: ${colors.icon};
  }

  > * {
    height: 16px;
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
