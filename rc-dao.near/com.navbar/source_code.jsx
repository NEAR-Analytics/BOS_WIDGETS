const navItems = props.navItems;
if (!navItems) return "must define nav items";
const ownerId = "rc-dao.near";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

return (
  <div className="d-flex flex-column">
    <a href="#/rc-dao.near/widget/com.page">
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{ accountId: "academy.near" }}
      />
    </a>
    <br />
    <a
      className="nav-link mt-2"
      href="/rc-dao.near/widget/com.library?tab=home"
      onClick={() => props.onSelect({ tab: "home", id: "" })}
    >
      <i className="bi-house" />
      <span>Home</span>
    </a>
    <hr className="border-2" />
    {navItems.map((item) => {
      console.log(item);
      return (
        <a
          className={`nav-link mt-2 rounded-3${
            item.id === props.tab ? "bg-secondary" : ""
          }`}
          href="/rc-dao.near/widget/com.library?tab=category&id=${item.id}"
          onClick={() => props.onSelect({ tab: "category", id: item.id })}
        >
          <i className={item.icon} /> <span>{item.category}</span>
        </a>
      );
    })}
  </div>
);
