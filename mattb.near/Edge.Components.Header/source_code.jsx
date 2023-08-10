const LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreie26u27gg5sxrotho2ferb7dj75ck6etivegc3do47mfyk2dmpl24";

const NAV_LINKS = [
  ["Home", "#"],
  ["About", "#about"],
  ["Speakers", "#speakers"],
  ["Program", "#program"],
  ["Sponsors", "#sponsors"],
  ["FAQ", "#faq"],
];

const Header = styled.div`
    position:relative;
    display:flex;
    align-items:space-between;
    padding:10px;
    box-sizing:border-box;
    border-bottom:1px solid rgba(0,0,0,.05);
    background-color:#fff;
`;

const Logo = styled.div`
    display:flex;
    font-family: Times New Roman;
    align-items:center;

    img {
        max-width:50px;
    }

    p {
        margin:0;
        padding:0;
        font-size:1.1rem;
        margin-left:.5rem;
        color:#000;
        font-weight:bold;
    }
`;

const Nav = styled.div`
    ul {
        display:flex;
        list-style:none;
        padding:0;
        margin:0;
        font-family:sans-serif;
        align-items:center;
        height:100%;

        li {
            &:not(:last-of-type) {
                margin-left:1rem;
            }

            a {
                color:#000;
                margin:0;
                padding:0;
            }
        }
    }
`;

const Button = styled.a`
    display:block;
    padding:.3rem 1rem!important;
    border:0;
    color:#fff!important;
    background-color:#000;
    border-radius:5px;
    transition: all .2s;
    font-weight:bold;
    font-size:.9rem;
    margin-left:1.5rem;
    
    &:hover {
        transition: all .2s;
    }
`;

return (
  <Header>
    <Logo>
      <img src={LOGO_URL} />
      <p>EDGE NETWORK</p>
    </Logo>
    <Nav>
      <ul>
        {NAV_LINKS.map(([text, link]) => (
          <li>
            <a href={link}>{text}</a>
          </li>
        ))}
        <li>
          <Button>TICKET</Button>
        </li>
      </ul>
    </Nav>
  </Header>
);
