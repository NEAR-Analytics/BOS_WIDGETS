const themeColors = {
  default: {
    background: "#EAF0FE",
    color: "#1E48AD",
  },
  success: {
    background: "#EFFAEA",
    color: "#43931E",
  },
  info: {
    background: "#EAF0FE",
    color: "#1E48AD",
  },
  error: {
    background: "#FBEAE9",
    color: "#D92D20",
  },
  warning: {
    background: "#FFF6EA",
    color: "#FFA229",
  },
  disable: {
    background: "#D2D2D2",
    color: "#E8E8E8",
  },
};

const variant = props.variant || "default";

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 16px;
  background-color: ${themeColors[variant].background};
  color: ${themeColors[variant].color};
  font-size: 14px;
  & > svg {
    margin-right: 4px;
    fill: #333;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StartIcon = styled.span`
  margin-right: 4px;
  svg {
    fill: #fff;
  }
`;

const EndIcon = styled.span`
  margin-left: 4px;
  svg {
    fill: #fff;
  }
`;

return (
  <Chip style={props.style}>
    <LabelWrapper>
      <StartIcon>{props.startIcon}</StartIcon>
      {props.label || "Sample Text"}
      <EndIcon>{props.endIcon}</EndIcon>
    </LabelWrapper>
  </Chip>
);
