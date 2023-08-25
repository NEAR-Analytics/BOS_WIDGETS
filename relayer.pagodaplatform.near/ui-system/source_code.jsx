const NavbarContainer = styled.div`
  position: absolute;
  width: 100%;
  background: rgba(56, 51, 51, 0.1);
  backdrop-filter: blur(5px);
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 45px;
  padding-right: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #2E2E2E; /* Add border at the bottom */
`;

const Logo = styled.img`
  height: 50px;
  width: 100px;
  object-fit: contain;
`;

const NavLinks = styled.div`
  list-style: none;
  display: flex;
  gap: 1rem;
  color: #757479;
`;

const NavLink = styled.div`
    color: #757479;
  text-decoration: none;
  cursor: pointer;
  font-size: 12px;
  transition: text-decoration 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.div`
  text-decoration: none;
  cursor: pointer;
  padding: 8px 24px;
  font-size: 12px;
  background-color: #6F3CE4;
  color: white; /* Set text color to white */
  border: none;
  display: inline-block; /* Display as inline-block to fit content */
`;

return (
  <NavbarContainer>
    <Logo src="https://dex-sync.vercel.app/dexsynclogo.svg" />
    <NavLinks>
      <NavLink>About</NavLink>
      <NavLink>Contact</NavLink>
    </NavLinks>
    <a href="https://dex-sync.vercel.app/" target="_blank">
      <Button>Launch App</Button>
    </a>
  </NavbarContainer>
);
