const ThemeProvider = VM.require("rambo-dev.near/widget/ThemeProvider");
const theme = Storage.get("theme");

const StyledBullet = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  background: ${() => `${theme.seablue500}33`};
  color: ${() => theme.seablue500};
  border: 1px solid ${() => `${theme.seablue500}33`};
  font-family: Satoshi, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
`;

function Bullet({ children }) {
  return <StyledBullet>{children}</StyledBullet>;
}

return { Bullet };
