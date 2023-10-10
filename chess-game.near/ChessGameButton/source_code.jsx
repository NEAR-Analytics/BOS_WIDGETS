const {
  onClick,
  content,
  inline,
  fontSize,
  alignSelf,
  fontWeight,
  flexDirection,
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
  background-color: rgb(68, 152, 224);
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-weight: ${fontWeight ? fontWeight : "400"};

  > * {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

return <Button onClick={onClick ?? undefined}>{content ?? ""}</Button>;
