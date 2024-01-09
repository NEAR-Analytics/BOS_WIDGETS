const Bullet = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background: rgba(81, 255, 234, 0.20);
  color: rgba(81, 255, 234, 1);
  border: 1px solid rgba(81, 255, 234, 0.20);
  font-family: Satoshi, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
`;

return <Bullet>{props.text}</Bullet>;
