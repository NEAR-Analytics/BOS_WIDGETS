const ThemeProvider = VM.require("rambo-dev.near/widget/ThemeProvider");
const theme = Storage.get("theme");

const Bullet = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background: ${(props) => `${theme.seablue500}33`};
  color: ${(props) => theme.seablue500};
  border: 1px solid ${(props) => `${theme.seablue500}33`};
  font-family: Satoshi, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
`;

return <Bullet>{props.children}</Bullet>;
