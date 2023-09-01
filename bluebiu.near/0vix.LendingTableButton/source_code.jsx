const Button = styled.button`
  width: 86px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: rgba(139, 113, 194, 0.2);
  outline: none;
  border: 1px solid #8b71c2;
  &.primary {
    background-color: #8b71c2;
  }
`;

const { isPrimary, text, onClick } = props;

return (
  <Button className={isPrimary && "primary"} onClick={onClick}>
    {text}
  </Button>
);
