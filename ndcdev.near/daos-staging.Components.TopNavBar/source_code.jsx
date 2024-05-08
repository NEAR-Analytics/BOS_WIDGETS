const { assets } = VM.require(`ndcdev.near/widget/daos-staging.Config`);
const { title, hasNotifications, daoId, accountId } = props;

if (!assets) return <Widget src="flashui.near/widget/Loading" />;

const links = [
  {
    text: "Reports",
    href: `/ndcdev.near/widget/daos-staging.App?page=reports${
      daoId ? `&dao_id=${daoId}` : accountId ? `&accountId=${accountId}` : ""
    }`,
    style: "outlined",
    icon: <i className="ph ph-presentation-chart fs-5" />,
  },
  {
    text: "Proposals",
    href: `/ndcdev.near/widget/daos-staging.App?page=proposals${
      daoId ? `&dao_id=${daoId}` : accountId ? `&accountId=${accountId}` : ""
    }`,
    style: "invresed",
    icon: <i className="ph ph-clipboard-text fs-5" />,
  },
];

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  align-items: center;
  width: 100%;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  a {
    text-align: center;
    justify-content: center;
    text-decoration: none;
  }

  .text {
    display: flex;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

return (
  <Navbar>
    <div>{title}</div>
    <LinksContainer>
      {links.map(({ icon, style, disabled, text, href }) => (
        <a
          className={`btn-secondary btn-icon ${style} ${
            disabled ? "disabled" : "active"
          }`}
          href={href}
        >
          {icon}
          <div className="text">{text}</div>
        </a>
      ))}
    </LinksContainer>
  </Navbar>
);
