const { onClick, content, inline, ...props } = props;

const Button = styled.button`
  display: ${inline ? "inline-flex" : "flex"};
  flex-direction: column;
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "unset")};
  border-radius: 4px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  max-width: 220px;

  > * {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

return (
  <Button onClick={onClick ?? undefined} {...props}>
    {content ?? ""}
  </Button>
);
