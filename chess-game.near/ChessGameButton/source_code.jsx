const {
  onClick,
  secondary,
  content,
  inline,
  fontSize,
  alignSelf,
  fontWeight,
  flexDirection,
  disabled,
} = props;

const Button = styled.button`
  display: ${inline ? "inline-flex" : "flex"};
  gap: 0.5rem;
  flex-direction: ${flexDirection ? flexDirection : "row"};
  align-self: ${alignSelf ? alignSelf : "unset"};
  border-radius: 4px;
  border: 1px solid rgb(68, 152, 224);
  font-size: ${fontSize ? fontSize : "1.1rem"};
  max-width: 220px;
  background-color: ${secondary ? "#ddd" : "rgb(68, 152, 224)"};
  color: ${secondary ? "#000" : "#fff"};
  padding: 0.3rem 0.8rem;
  font-weight: ${fontWeight ? fontWeight : "400"};

  &:hover {
    opacity: 0.85;
  }

  &.disabled {
    pointer-events: none;
    background-color: grey;
    border-color: grey;
    color: #fff;
  }

  > * {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
`;

return (
  <Button onClick={onClick ?? undefined} className={disabled ? "disabled" : ""}>
    {content ?? ""}
  </Button>
);
