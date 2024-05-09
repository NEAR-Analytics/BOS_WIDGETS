const page = props.page;

const [showMenu, setShowMenu] = useState(false);

const { href: linkHref } = VM.require("devhub.near/widget/core.lib.url");

linkHref || (linkHref = () => {});

const Logo = () => {
  const Wrapper = styled.div`
    @media screen and (max-width: 768px) {
      svg {
        width: 90px;
        height: 12px;
        transform: scale(1.5);
        margin-left: 1rem;
      }
    }
    .title:hover{
        text-decoration:none;
    }
  `;

  const Title = styled.h1`
  color: #f4f4f4;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 80%; /* 88px */
  letter-spacing: -1.76px;

  @media screen and (max-width: 768px) {
    font-size: 2.25rem;
    letter-spacing: -0.72px;
    margin: 0;
  }

  .title{
    color: black;
  }

  .title:hover{
    text-decoration: none;
  }
`;

  return (
    <Wrapper>
      <Link
        className="title"
        to={linkHref({
          widgetSrc: "natapat.near/widget/DonationHub",
          params: { page: "home" },
        })}
      >
        <Title>
          <span style={{ color: "#000000" }}>Donation</span>
          <span style={{ color: "#02d767" }}>Hub</span>
        </Title>
      </Link>
    </Wrapper>
  );
};

const ProfileIcon = () => {
  const Wrapper = styled.svg`
    padding: 0.25rem;
    @media screen and (max-width: 768px) {
      display: none;
    }
  `;
  return (
    <Link
      to={linkHref({
        widgetSrc: "natapat.near/widget/DoantionHub",
        params: { page: "profile", accountId: context.accountId },
      })}
    ></Link>
  );
};

const Navbar = styled.div`
  padding: 1.5rem 3rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #f4f4f4;

  @media screen and (max-width: 768px) {
    padding: 1.875rem 1.375rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

return (
  <Navbar className="position-relative">
    <Logo />
    <div className="d-flex gap-3 align-items-center">
      {context.accountId && <ProfileIcon />}
    </div>
  </Navbar>
);
