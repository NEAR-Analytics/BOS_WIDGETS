const AvatarRoot = styled("Avatar.Root")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: ${(props) => (props.size ? props.size : 26)}px;
  height: ${(props) => (props.size ? props.size : 26)}px;
  border-radius: 100%;
`;

const AvatarImage = styled("Avatar.Image")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const { src, size, ...rest } = props;

return (
  <AvatarRoot size={size} {...rest}>
    <AvatarImage src={src}></AvatarImage>
  </AvatarRoot>
);
