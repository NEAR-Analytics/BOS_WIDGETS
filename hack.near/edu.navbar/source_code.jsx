const navItems = props.navItems;
if (!navItems) return "must define nav items";
const ownerId = "hack.near";
const daoId = props.daoId ?? "build.sputnik-dao.near";

return (
  <div className="d-flex flex-column">
    <Widget src="near/widget/Profile" props={{ accountId: daoId }} />
    <a
      className="nav-link mt-2"
      href={`https://near.social/#/${ownerId}/widget/edu.library?tab=home`}
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
          href={`https://near.social/#/${ownerId}/widget/edu.library?tab=category&id=${item.id}`}
          onClick={() => props.onSelect({ tab: "category", id: item.id })}
        >
          {" "}
          <i className={item.icon} /> <span>{item.category}</span>{" "}
        </a>
      );
    })}
  </div>
);
