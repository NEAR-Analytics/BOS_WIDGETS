const accountId = context.accountId;
const moderatorAccount = props?.moderatorAccount || "adminalpha.near";

if (context.loading || !accountId) return <></>;

const filterUsersRaw = Social.get(
  `${moderatorAccount}/moderate/users`, //TODO
  "optimistic",
  {
    subscribe: true,
  }
);

if (filterUsers === null) {
  // haven't loaded filter list yet, return early
  return <></>;
}

const filterUsers = filterUsersRaw ? JSON.parse(filterUsersRaw) : [];
const notificationFeedSrc = "calebjacob.near/widget/NotificationsPage";
const lastBlockHeight = Storage.get("lastBlockHeight", notificationFeedSrc);
let notifications =
  Social.index("notify", accountId, {
    order: "asc",
    from: (lastBlockHeight ?? 0) + 1,
    subscribe: true,
  }) || [];
notifications = notifications.filter((i) => !filterUsers.includes(i.accountId));
const notificationsCount = notifications.length || 0;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #2B2F31;
  color: #ECEDEE;
  transition: all 200ms;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;

  &:hover {
    color: #fff;
    background: rgb(60 65 68);
  }

  &:focus {
    box-shadow: 0 0 0 1px #fff;
  }

  svg {
    width: 25px;
    height: 25px;
  }

  span {
    min-width: 13px;
    height: 13px;
    padding: 0 3px;
    display: block;
    color: #fff;
    background: #E5484D;
    border-radius: 100px;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    font-weight: 600;
    position: absolute;
    top: -2px;
    right: -1px;
  }
`;

return (
  <Button
    aria-label="View Notifications"
    style={{ backgroundColor: "transparent" }}
  >
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="NotificationsRoundedIcon"
      fill="#7b7c7d"
    >
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z"></path>
    </svg>

    {notificationsCount > 0 && (
      <span>{notificationsCount > 99 ? "99+" : notificationsCount}</span>
    )}
  </Button>
);
