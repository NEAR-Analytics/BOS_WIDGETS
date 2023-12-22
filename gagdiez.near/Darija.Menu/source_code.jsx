const menu = [
  { name: "Conjugar Nombre", link: "gagdiez.near/widget/Darija.Nombre" },
  { name: "Posesivos", link: "gagdiez.near/widget/Darija.Posesivos" },
  { name: "Familia Nuclear", link: "gagdiez.near/widget/Darija.FamiliaNucleo" },
  {
    name: "Familia Extendida",
    link: "gagdiez.near/widget/Darija.FamiliaExtendida",
  },
];

return (
  <>
    <h4> Menu </h4>
    <ul>
      {menu.map((item) => (
        <li>
          <a href={item.link}>{item.name}</a>
        </li>
      ))}
    </ul>
  </>
);
