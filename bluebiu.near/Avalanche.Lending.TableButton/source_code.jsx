const Button = styled.button`
  height: 33px;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0px 10px;
  &.withdraw,
  &.claim {
    background-color: var(--withdraw-bg-color);
    border: 1px solid var(--withdraw-border-color);

    &:hover {
      background-color: var(--withdraw-bg-hover-color);
    }
  }
  &.repay {
    background-color: var(--repay-bg-color);
    border: 1px solid var(--repay-border-color);
    &:hover {
      background-color: var(--repay-bg-hover-color);
    }
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const { text, loading, onClick } = props;

return (
  <Button className={text.toLowerCase()} onClick={onClick}>
    {loading && (
      <Widget
        src="bluebiu.near/widget/0vix.LendingLoadingIcon"
        props={{
          size: 16,
        }}
      />
    )}
    {text}
  </Button>
);
