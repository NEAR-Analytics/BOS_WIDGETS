const { assets } = VM.require(`ndcdev.near/widget/MDAO.Config`);

const [showMenu, setShowMenu] = useState(false);

const links = [
  {
    title: "ACTIVITY FEED",
    href: "/ndcdev.near/widget/MDAO.App?page=reports",
    color: "#FDEFB1",
    items: [
      {
        title: "List of Proposals",
        href: "/ndcdev.near/widget/MDAO.App?page=proposals",
      },
      {
        title: "List of Reports",
        href: "/ndcdev.near/widget/MDAO.App?page=reports",
      },
      {
        title: "Guidance for Proposals and Reports",
        href: "/ndcdev.near/widget/MDAO.App?page=guidance",
      },
    ],
  },
  {
    title: "COMMUNITIES",
    href: "/ndcdev.near/widget/MDAO.App?page=communities",
    color: "#F7CCFA",
  },
  {
    title: "ABOUT",
    href: "#about",
    color: "#AFC5FE",
    items: [
      {
        title: "MDAO Charter",
        target: "_blank",
        href: "https://docs.google.com/document/d/11m2-dmDRABz74WZfkcgGyFz7Wn6k4y9oPVXPCCyhXp8/edit",
      },
      {
        title: "MDAO social media strategy",
        href: "/ndcdev.near/widget/MDAO.App?page=info",
      },
      {
        title: "Achievements",
        href: "/ndcdev.near/widget/MDAO.App?page=achievements",
      },
      {
        title: "Councils",
        href: "/ndcdev.near/widget/MDAO.App?page=councils",
      },
      {
        title: "Meetings and Workshops Calendar",
        href: "/ndcdev.near/widget/MDAO.App?page=meetings",
      },
      {
        title: "MDAO Bounty program",
        target: "_blank",
        href: "https://docs.google.com/document/d/1pOUin4zeTSYxkir2Wo8zYziOapo-2vIU2WxJNCsmfLs/edit",
      },
    ],
  },
];

const Navbar = styled.div`
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #151718;

  @media screen and (max-width: 768px) {
    padding: 1.5rem 2rem;

    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;

  a {
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    height: 50px;

    &:hover .dropdown-content {
      display: block;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    width: 250px;
    top: 40px;
    right: 0;
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;

    .link {
      padding: 12px 16px;
      text-decoration: none;
      display: block;

      a {
        color: black;
        &:hover {
          text-decoration: none;
        }
      }

      &:hover {
        background-color: #ddd;
      }

      &:first-child {
        &:hover {
          border-radius: 10px 10px 0 0;
        }
      }

      &:last-child {
        &:hover {
          border-radius: 0 0 10px 10px;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.bg};
`;

const MobileNav = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  position: absolute;
  top: 0;
  right: 0;
  width: 270px;
  padding: 24px 36px 36px 16px;
  flex-direction: column;
  align-items: flex-end;
  gap: 2.5rem;
  flex-shrink: 0;

  border-radius: 0px 0px 0px 16px;
  background: rgba(21, 23, 24, 0.7);
  backdrop-filter: blur(5px);

  z-index: 50;

  a {
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const MobileLink = styled.a`
  color: #f4f4f4 !important;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  margin-bottom: 1rem;

  &.active {
    color: #00ec97 !important;
  }

  &:hover {
    text-decoration: none;
    color: #00ec97 !important;
  }
`;

const MobileMenu = styled.button`
  all: unset;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

return (
  <Navbar className="position-relative">
    <a href={`/ndcdev.near/widget/MDAO.App?page=home`}>
      <img src={assets.logoWhite} />
    </a>
    <div className="d-flex gap-3 align-items-center">
      <LinksContainer>
        {links.map((link) => (
          <a className="d-flex gap-2 align-items-center" href={link.href}>
            <Circle bg={link.color} />
            {link.items?.length > 0 ? (
              <div className="d-flex align-items-center  dropdown">
                <div>{link.title}</div>
                <div className="dropdown-content">
                  {link.items.map(({ title, href, target }) => (
                    <div className="d-flex gap-2 link align-items-center">
                      <i className="bi bi-chevron-right text-black" />
                      <a href={href} target={target}>
                        {title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>{link.title}</div>
            )}
          </a>
        ))}
      </LinksContainer>
      <MobileMenu className="fs-1" onClick={() => setShowMenu(!showMenu)}>
        <i className="bi bi-list text-white" />
      </MobileMenu>
    </div>

    {showMenu && (
      <MobileNav>
        <div
          onClick={() => setShowMenu(!showMenu)}
          style={{ cursor: "pointer" }}
          className="fs-1"
        >
          <i className="bi bi-x text-white" />
        </div>
        <div className="d-flex flex-column gap-4">
          {links.map((link) => (
            <>
              {link.items?.length > 0 ? (
                <>
                  <div className="d-flex gap-2 align-items-center">
                    <Circle bg={link.color} />
                    <div>{link.title}</div>
                  </div>
                  <div className="d-flex gap-3 flex-column">
                    {link.items.map(({ title, href, target }) => (
                      <div className="d-flex gap-2 align-items-center">
                        <i className="bi bi-chevron-right text-white" />
                        <a href={href} target={target}>
                          {title}
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <a className="d-flex gap-2 align-items-center" href={link.href}>
                  <Circle bg={link.color} />
                  <div>{link.title}</div>
                </a>
              )}
            </>
          ))}
        </div>
      </MobileNav>
    )}
  </Navbar>
);
