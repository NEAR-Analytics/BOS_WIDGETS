const Button = styled.a`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  gap: 8px;
  display: inline-flex;
  text-align: center;
  color: #212529;
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
    {props.text}
  </Button>
);
