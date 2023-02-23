const items = props.items ?? [];

const menuItems = items.reduce(
  (list, { text, icon, href, onClick, toggle, target }) => [
    ...list,
    list.length > 0 ? (
      <li>
        <hr className="dropdown-divider" />
      </li>
    ) : (
      <></>
    ),
    <li>
      <a
        className="dropdown-item btn"
        href={href}
        onClick={onClick}
        role="button"
      >
        <i className={icon} />
        <span>{text}</span>
      </a>
    </li>,
  ],
  []
);

const menuIcon = styled.a`
  &:before {
    display: none !important;
  }
`;

return (
  <div className="btn-group dropstart">
    <menuIcon
      className="btn btn-outline-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="bi-three-dots-vertical" />
    </menuIcon>

    <ul className="dropdown-menu">{menuItems}</ul>
  </div>
);
