const LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreie26u27gg5sxrotho2ferb7dj75ck6etivegc3do47mfyk2dmpl24";

const NAV_LINKS = [
  ["Home", "#"],
  ["About", "#about"],
  ["Speakers", "#speakers"],
  ["Program", "#programs"],
  ["Partners", "#partners"],
  ["FAQ", "#faq"],
];

const Header = styled.div`
    position:relative;
    display:flex;
    justify-content:space-between;
    padding:10px;
    box-sizing:border-box;
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
            text-transform:uppercase;

            &:not(:last-of-type) {
                margin-left:2rem;
            }

            &:last-of-type {
                margin-left:2rem;
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
    color:#000;
    background-color:#fff;
    transition: all .2s;
    font-size:.9rem;
    border:2px solid #000;
    text-decoraction:none!important;

    :hover {
        background-color:#000;
        color:#fff;
        box-shadow: 0 0 0 3px #000;
        border-color:#fff;
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
          <Button href="#">TICKET</Button>
        </li>
      </ul>
    </Nav>
  </Header>
);
