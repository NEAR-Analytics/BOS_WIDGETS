const LogoUrl =
  "https://aquamarine-official-jay-421.mypinata.cloud/ipfs/QmWNrv3KSZZk1rNcPu1DooTZVPWtLW9kxrhnzACsZavVfN";

const navbar = styled.div`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
align-items: center;
gap:1rem;
font-weight: 700;
`;

const Img = styled.img`
  width: 8rem;
`;

/* const NavbarLink = styled(NavigationMenu.Link)`
font-weight: 300;
`; */

return (
  <div className="navbar">
    <Img src={LogoUrl}></Img>

    <NavigationMenu.Root className="navbar">
      <NavigationMenu.Link
        className="navbarlink"
        href="https://github.com/radix-ui"
      >
        Home
      </NavigationMenu.Link>

      <NavigationMenu.Link
        className="navbarlink"
        href="https://github.com/radix-ui"
      >
        Bets
      </NavigationMenu.Link>

      <NavigationMenu.Link
        className="navbarlink"
        href="https://github.com/radix-ui"
      >
        About us
      </NavigationMenu.Link>
    </NavigationMenu.Root>
  </div>
);
