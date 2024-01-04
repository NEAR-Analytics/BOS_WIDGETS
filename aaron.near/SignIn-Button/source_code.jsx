const Button = styled.a`
  // width: 100%;
  // height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  background: #f8f9fa;
  overflow: hidden;
  border-radius: 45px;
  border: 1px solid #e9ecef;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: black;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    cursor: ${props.disabled ? "not-allowed" : "pointer"};
  }
`;

return (
  <Button
    target={props.target}
    onClick={(e) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }
      if (props.onClick) {
        props.onClick(e);
      }
    }}
    disabled={props.disabled}
    style={{ ...props.style }}
  >
    Sign In
  </Button>
);
