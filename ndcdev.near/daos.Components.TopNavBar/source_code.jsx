const { assets } = VM.require(`ndcdev.near/widget/daos.Config`);
const { title, hasNotifications, daoId, accountId } = props;

if (!assets) return <Widget src="flashui.near/widget/Loading" />;

const links = [
  {
    text: "Reports",
    href: `/ndcdev.near/widget/daos.App?page=reports${
      daoId ? `&dao_id=${daoId}` : accountId ? `&accountId=${accountId}` : ""
    }`,
    icon: <i className="bi bi-clipboard-data-fill fs-5" />,
  },
  {
    text: "Proposals",
    href: `/ndcdev.near/widget/daos.App?page=proposals${
      daoId ? `&dao_id=${daoId}` : accountId ? `&accountId=${accountId}` : ""
    }`,
    icon: <i className="bi bi-file-earmark-text-fill fs-5" />,
  },
  // {
  //   text: "Comments",
  //   href: `/ndcdev.near/widget/daos.App?page=comments`,
  //   disabled: true,
  //   icon: <i className="bi bi-chat-square-text-fill fs-5" />,
  // },
  // {
  //   text: "Favourites",
  //   href: `/ndcdev.near/widget/daos.App?page=favourites`,
  //   disabled: true,
  //   icon: <i className="bi bi-star-fill fs-5" />,
  // },
];

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3rem;
  gap: 3rem;
  align-items: center;
  border-radius: 20px;
  background: white;
  width: 100%;
`;

const LinksContainer = styled.div`
  color: #151718;
  font-size: 18px;
  display: flex;
  justify-content: space-between;

  a {
    width: 150px;
    padding: 2rem 1.5rem;
    text-align: center;
    justify-content: center;
    text-decoration: none;

    &.active:hover {
      background: rgba(164, 194, 253, 0.2);
      font-weight: bold;

      i {
        color: #a4c2fd;
      }
    }

    &.disabled {
      cursor: not-allowed;
      color: #ccc;
    }
  }

  @media screen and (max-width: 768px) {
    div.text {
      display: none;
    }
  }
`;

return (
  <Navbar>
    <div className="d-flex gap-3 items-center">{title}</div>
    <LinksContainer>
      {links.map(({ icon, disabled, text, href }) => (
        <a
          className={`d-flex gap-2 align-items-center ${
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
