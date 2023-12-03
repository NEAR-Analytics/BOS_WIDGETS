const { app, provider, assets } = VM.require(`rubycop.near/widget/mdao.config`);

const links = [
  {
    title: "INFO",
    href: `${provider}/widget/${app}.app?page=info`,
    color: "#FDEFB1",
  },
  {
    title: "CONNECT",
    href: `${provider}/widget/${app}.app?page=connect`,
    color: "#F7CCFA",
  },
  {
    title: "GET SUPPORT",
    href: `${provider}/widget/${app}.app?page=get_support`,
    color: "#AFC5FE",
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
    padding: 1.875rem 1.375rem;
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
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.bg};
`;

return (
  <Navbar className="position-relative">
    <a href={`${provider}/widget/${app}.app?page=home`}>
      <img src={assets.logoWhite} />
    </a>
    <div className="d-flex gap-3 align-items-center">
      <LinksContainer>
        {links.map(({ title, href, color }) => (
          <a className="d-flex gap-2 align-items-center" href={href}>
            <Circle bg={color} />
            <div>{title}</div>
          </a>
        ))}
      </LinksContainer>
    </div>
  </Navbar>
);
