const { assets } = VM.require(`ndcdev.near/widget/daos.Config`);
const { hasNotifications } = props;

if (!assets) return <Widget src="flashui.near/widget/Loading" />;
const accountId = context.accountId;
const [admin, _widget, _name] = `ndcdev.near/widget/daos.Config`.split("/");
const [showNav, setShowNav] = useState(false);

const Container = styled.div`
  padding: 1.5rem 3rem;
  width: 100%;
  background: #151718;

  .navigation {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    color: white;
    display: none;

    @media screen and (max-width: 768px) {
      display: flex;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  color: white;

  @media screen and (max-width: 768px) {
    gap: 1rem;
  }

  a {
    &:hover {
      text-decoration: none;
      color: #a4c2fd;
    }
  }

  .circle {
    position: absolute;
    top: 5px;
    width: 15px;
    height: 15px;
    background-color: #ee9cbf;
    border-radius: 50%;
    border: 3px solid #151718;
  }

  .links {
    display: flex;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .menu-icon {
    display: none;

    @media screen and (max-width: 768px) {
      display: flex;
    }
  }
`;

const NavigationLinks = () => (
  <div className="d-flex align-items-center gap-5">
    <a href={`/ndcdev.near/widget/daos.App?page=daos`}>DAOs</a>
    <a href={`/ndcdev.near/widget/daos.App?page=proposals`}>Proposals</a>
    <a
      className="post-btn d-flex align-items-center gap-2"
      href={`/ndcdev.near/widget/daos.App?page=create_post`}
    >
      <i className="ph ph-plus fs-5" />
      Create Post
    </a>
  </div>
);

return (
  <Container className="position-relative">
    <Navbar>
      <a href={`/ndcdev.near/widget/daos.App`}>
        <img src={assets.logoWhite} />
      </a>
      <div className="d-flex gap-5 align-items-center">
        {accountId && (
          <LinksContainer>
            <div className="links gap-5">
              <NavigationLinks />
            </div>
            <a href="#">
              <i
                className="menu-icon bi bi-list fs-1"
                onClick={() => setShowNav(!showNav)}
              />
            </a>

            <a href={`/ndcdev.near/widget/daos.App?page=settings`}>
              <i className="bi bi-gear-fill fs-3" />
            </a>

            <a
              href={`/ndcdev.near/widget/daos.App?page=proposals&accountId=${context.accountId}`}
            >
              <i className="bi bi-person-circle fs-3" />
            </a>
          </LinksContainer>
        )}
      </div>
    </Navbar>
    {showNav && (
      <div className="navigation">
        <NavigationLinks />
      </div>
    )}
  </Container>
);
