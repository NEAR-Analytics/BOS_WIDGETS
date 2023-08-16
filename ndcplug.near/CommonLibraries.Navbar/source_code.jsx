const navItems = props.navItems;
if (!navItems) return "Must define nav items";
const ownerId = "manzanal.near";

return (
  <div className="d-flex flex-column">
    <h4 className="fs-4 text-nowrap d-flex flex-row align-items-center">
      <span>📚 Libraries</span>
    </h4>
    <a
      className="nav-link mt-2"
      href={`/ndcplug.near/widget/CommonLibraries.Main?catTab=home`}
      onClick={() => props.onSelect({ catTab: "home", id: "" })}
    >
      <i className="bi-house" />
      <span>Home</span>
    </a>
    <a
      className="nav-link mt-2"
      href={`ndcplug.near/widget/CommonLibraries.Main?catTab=searchComponents`}
      onClick={() => props.onSelect({ catTab: "searchComponents", id: "" })}
    >
      <i className="bi-search" />
      <span>Search</span>
    </a>
    <hr className="border-2" />
    {navItems.map((item) => {
      console.log(item);
      return (
        <a
          className={`nav-link mt-2 rounded-3${
            item.id === props.catTab ? "bg-secondary" : ""
          }`}
          href={`/ndcplug.near/widget/CommonLibraries.Main?catTab=category&id=${item.id}`}
          onClick={() => props.onSelect({ catTab: "category", id: item.id })}
        >
          {" "}
          <i className={item.icon} /> <span>{item.category}</span>{" "}
        </a>
      );
    })}
  </div>
);
