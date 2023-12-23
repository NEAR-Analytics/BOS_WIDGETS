const menu = [
  {
    name: "Conjugar Nombre",
    link: "/embed/gagdiez.near/widget/Darija.Nombre",
  },
  { name: "Posesivos", link: "/embed/gagdiez.near/widget/Darija.Posesivos" },
  {
    name: "Familia Nuclear",
    link: "/embed/gagdiez.near/widget/Darija.FamiliaNucleo",
  },
  {
    name: "Familia Extendida",
    link: "/embed/gagdiez.near/widget/Darija.FamiliaExtendida",
  },
];

return (
  <div className="p-2">
    <h4> Menu </h4>
    <ul className="list-group mt-3">
      {menu.map((item) => (
        <li class="list-group-item">
          <a href={item.link}>{item.name}</a>
        </li>
      ))}
    </ul>
  </div>
);
