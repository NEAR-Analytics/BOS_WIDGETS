const menu = [
  { name: "Familia", link: "gagdiez.near/widget/Darija.Familia" },
  { name: "Conjugar Nombre", link: "gagdiez.near/widget/Darija.Nombre" },
  { name: "Posesivos", link: "gagdiez.near/widget/Darija.Posesivos" },
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
