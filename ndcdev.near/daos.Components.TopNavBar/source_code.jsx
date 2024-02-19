const { assets } = VM.require(`ndcdev.near/widget/daos.Config`);
const { hasNotifications } = props;

const links = [
  {
    text: "Proposals",
    href: "/ndcdev.near/widget/daos.App?page=proposals",
    icon: <i className="bi bi-file-earmark-text-fill fs-5" />,
  },
  {
    text: "Reports",
    href: "/ndcdev.near/widget/daos.App?page=reports",
    disabled: true,
    icon: <i className="bi bi-clipboard-data-fill fs-5" />,
  },
  {
    text: "Comments",
    href: "/ndcdev.near/widget/daos.App?page=comments",
    disabled: true,
    icon: <i className="bi bi-chat-square-text-fill fs-5" />,
  },
  {
    text: "Favourites",
    href: "/ndcdev.near/widget/daos.App?page=favourites",
    disabled: true,
    icon: <i className="bi bi-star-fill fs-5" />,
  },
];

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 3rem;
  gap: 3rem;
  align-items: center;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
`;

const LinksContainer = styled.div`
  color: #151718;
  font-size: 18px;

  a {
    padding: 2rem 1.5rem;
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
`;

return (
  <Navbar>
    <div className="d-flex gap-3 items-center">
      <i style={{ color: "#a4c2fd" }} className="bi bi-person-circle fs-5" />
      <h4>
        <b>My Activity</b>
      </h4>
    </div>
    <LinksContainer className="d-flex justify-content-between">
      {links.map(({ icon, disabled, text, href }) => (
        <a
          className={`d-flex gap-2 align-items-center ${
            disabled ? "disabled" : "active"
          }`}
          href={href}
        >
          {icon}
          <div>{text}</div>
        </a>
      ))}
    </LinksContainer>
  </Navbar>
);
